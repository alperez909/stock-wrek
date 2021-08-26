import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { stockHistoricalDataSaga } from './saga';
import { StockHistoricalDataState } from './types';
import { RequestStatus } from 'types/RequestStatus';
import { RequestError } from 'types/RequestError';

export const initialState: StockHistoricalDataState = {
  stockHistoricalData: null,
  status: RequestStatus.IDLE,
  error: null,
};

const slice = createSlice({
  name: 'stockHistoricalData',
  initialState,
  reducers: {
    loadStockHistoricalData(state) {
      state.status = RequestStatus.LOADING;
      state.error = null;
    },
    stockHistoricalDataLoaded(state, actions: PayloadAction<any>) {
      state.stockHistoricalData = actions.payload;
      state.status = RequestStatus.SUCCEEDED;
    },
    stockHistoricalDataError(state, actions: PayloadAction<RequestError>) {
      state.stockHistoricalData = null;
      state.error = actions.payload;
      state.status = RequestStatus.FAILED;
    },
  },
});

export const { actions: stockHistoricalDataActions } = slice;

export const useStockHistoricalDataSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: stockHistoricalDataSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useStockHistoricalDataSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
