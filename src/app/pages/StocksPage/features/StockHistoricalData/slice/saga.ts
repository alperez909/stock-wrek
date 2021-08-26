import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { stockHistoricalDataActions as actions } from '.';
import {
  selectTicker,
  selectPeriod,
} from 'app/pages/StocksPage/slice/selectors';
import { StockPeriod } from 'app/pages/StocksPage/slice/types';
import { RequestError } from 'types/RequestError';
import { request } from 'utils/request';

function* getStockHistoricalData() {
  yield delay(500);
  const ticker: string = yield select(selectTicker);
  const period: StockPeriod = yield select(selectPeriod);

  if (!ticker) {
    yield put(actions.stockHistoricalDataError(RequestError.ERROR));
    return;
  }

  const p = period?.value + period?.unit;
  const requestURL = `${process.env.REACT_APP_API_URI}finance/stocks/historical?ticker=${ticker}&period=${p}`;

  try {
    const stockHistoricalData = yield call(request, requestURL);

    yield put(actions.stockHistoricalDataLoaded(stockHistoricalData));
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.stockHistoricalDataError(RequestError.NOT_FOUND));
    } else {
      yield put(actions.stockHistoricalDataError(RequestError.ERROR));
    }
  }
}

export function* stockHistoricalDataSaga() {
  yield takeLatest(
    actions.loadStockHistoricalData.type,
    getStockHistoricalData,
  );
}
