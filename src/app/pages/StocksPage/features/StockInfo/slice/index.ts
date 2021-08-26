import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { stockInfoSaga } from './saga';
import { StockInfoState } from './types';
import { RequestStatus } from 'types/RequestStatus';
import { RequestError } from 'types/RequestError';

export const initialState: StockInfoState = {
  stockInfo: null,
  status: RequestStatus.IDLE,
  error: null,
};

const slice = createSlice({
  name: 'stockInfo',
  initialState,
  reducers: {
    loadStockInfo(state) {
      state.stockInfo = null;
      state.status = RequestStatus.LOADING;
      state.error = null;
    },
    stockInfoLoaded(state, actions: PayloadAction<any>) {
      state.stockInfo = actions.payload;
      state.status = RequestStatus.SUCCEEDED;
    },
    stockInfoError(state, actions: PayloadAction<RequestError>) {
      state.error = actions.payload;
      state.status = RequestStatus.FAILED;
    },
  },
});

export const { actions: stockInfoActions } = slice;

export const useStockInfoSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: stockInfoSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useStockInfoSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
