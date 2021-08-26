import { PayloadAction } from '@reduxjs/toolkit';
import { RequestError } from 'types/RequestError';
import { RequestStatus } from 'types/RequestStatus';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { stocksSaga } from './saga';
import { StockType, StocksState } from './types';

export const initialState: StocksState = {
  query: '',
  status: RequestStatus.IDLE,
  error: null,
  stocks: [],
  type: StockType.MOST_POPULAR,
  limit: 25,
  sort: '',
};

const slice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    changeQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    changeType(state, action: PayloadAction<StockType>) {
      state.type = action.payload;
    },
    changeLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    changeSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
    loadStocks(state) {
      state.status = RequestStatus.LOADING;
      state.error = null;
      state.stocks = [];
    },
    stocksLoaded(state, action: PayloadAction<[]>) {
      const stocks = action.payload;
      state.status = RequestStatus.SUCCEEDED;
      state.error = null;
      state.stocks = stocks;
    },
    stocksError(state, action: PayloadAction<RequestError>) {
      state.error = action.payload;
      state.status = RequestStatus.FAILED;
      state.stocks = [];
    },
  },
});

export const { actions: stocksActions } = slice;

export const useStocksSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: stocksSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useStocksSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
