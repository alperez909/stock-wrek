import { selectTicker } from 'app/pages/StocksPage/slice/selectors';
import { delay, call, put, select, takeLatest } from 'redux-saga/effects';
import { RequestError } from 'types/RequestError';
import { request } from 'utils/request';
import { stockNewsActions as actions } from '.';

function* getStockNews() {
  yield delay(500);

  const ticker: string = yield select(selectTicker);

  if (!ticker) {
    yield put(actions.stockNewsError(RequestError.ERROR));
    return;
  }

  const requestURL = `${process.env.REACT_APP_API_URI}finance/news/everything?q="$${ticker}"`;

  try {
    const stockNews = yield call(request, requestURL);

    yield put(actions.stockNewsLoaded(stockNews));
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.stockNewsError(RequestError.NOT_FOUND));
    } else {
      yield put(actions.stockNewsError(RequestError.ERROR));
    }
  }
}

export function* stockNewsSaga() {
  yield takeLatest(actions.loadStockNews.type, getStockNews);
}
