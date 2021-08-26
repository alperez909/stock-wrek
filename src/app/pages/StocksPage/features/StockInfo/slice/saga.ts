import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { stockInfoActions as actions } from '.';
import { selectTicker } from 'app/pages/StocksPage/slice/selectors';
import { RequestError } from 'types/RequestError';
import { request } from 'utils/request';

function* getStockInfo() {
  yield delay(500);
  const ticker: string = yield select(selectTicker);

  if (!ticker) {
    yield put(actions.stockInfoError(RequestError.ERROR));
    return;
  }

  const requestURL = `${process.env.REACT_APP_API_URI}finance/stocks/info?ticker=${ticker}`;

  try {
    const stockInfo = yield call(request, requestURL);

    yield put(actions.stockInfoLoaded(stockInfo));
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.stockInfoError(RequestError.NOT_FOUND));
    } else {
      yield put(actions.stockInfoError(RequestError.ERROR));
    }
  }
}

export function* stockInfoSaga() {
  yield takeLatest(actions.loadStockInfo.type, getStockInfo);
}
