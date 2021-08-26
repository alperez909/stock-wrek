import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { stockNewsSaga } from './saga';
import { StockNewsState } from './types';
import { RequestStatus } from 'types/RequestStatus';
import { RequestError } from 'types/RequestError';

export const initialState: StockNewsState = {
  stockNews: null,
  status: RequestStatus.IDLE,
  error: null,
};

const slice = createSlice({
  name: 'stockNews',
  initialState,
  reducers: {
    loadStockNews(state) {
      state.stockNews = null;
      state.status = RequestStatus.LOADING;
      state.error = null;
    },
    stockNewsLoaded(state, actions: PayloadAction<any>) {
      state.stockNews = actions.payload;
      state.status = RequestStatus.SUCCEEDED;
    },
    stockNewsError(state, actions: PayloadAction<RequestError>) {
      state.error = actions.payload;
      state.status = RequestStatus.FAILED;
    },
  },
});

export const { actions: stockNewsActions } = slice;

export const useStockNewsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: stockNewsSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useStockNewsSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
