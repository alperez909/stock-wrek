import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { stocksActions as actions } from '.';
import { selectQuery, selectType, selectLimit, selectSort } from './selectors';
import { request } from 'utils/request';
import { RequestError } from 'types/RequestError';
import { StockType } from './types';

export function* getStocks() {
  yield delay(500);
  const query: string = yield select(selectQuery);
  const type: StockType = yield select(selectType);
  const limit: number = yield select(selectLimit);
  const sort: string = yield select(selectSort);

  let requestURL;

  switch (type) {
    case StockType.ALL:
      if (query.length === 0) {
        yield put(actions.stocksError(RequestError.ERROR));
        return;
      }
      requestURL = `${process.env.REACT_APP_API_URI}finance/stocks/search?q=${query}&limit=${limit}`;

      try {
        const stocks = yield call(request, requestURL);

        yield put(actions.stocksLoaded(stocks));
      } catch (err) {
        if (err.response?.status === 404) {
          yield put(actions.stocksError(RequestError.NOT_FOUND));
        } else {
          yield put(actions.stocksError(RequestError.ERROR));
        }
      }
      break;
    case StockType.MOST_POPULAR:
      requestURL = `${process.env.REACT_APP_API_URI}finance/stocks/most-popular`;
      try {
        const stocks = yield call(request, requestURL);

        yield put(actions.stocksLoaded(stocks));
      } catch (err) {
        if (err.response?.status === 404) {
          yield put(actions.stocksError(RequestError.NOT_FOUND));
        } else {
          yield put(actions.stocksError(RequestError.ERROR));
        }
      }
      break;
    case StockType.FAST_MOVING:
      requestURL = `${process.env.REACT_APP_API_URI}finance/stocks/fast-moving?sort=${sort}&limit=${limit}`;
      try {
        const stocks = yield call(request, requestURL);

        yield put(actions.stocksLoaded(stocks));
      } catch (err) {
        if (err.response?.status === 404) {
          yield put(actions.stocksError(RequestError.NOT_FOUND));
        } else {
          yield put(actions.stocksError(RequestError.ERROR));
        }
      }
      break;
    default:
      yield put(actions.stocksError(RequestError.ERROR));
      break;
  }
}

export function* stocksSaga() {
  yield takeLatest(actions.loadStocks.type, getStocks);
}
