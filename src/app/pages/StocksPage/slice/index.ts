import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { stockDetailsPageSaga } from './saga';
import { StockDetailsPageState, StockPeriod } from './types';

export const initialState: StockDetailsPageState = {
  ticker: 'AAPL',
  period: {
    value: 1,
    unit: 'mo',
  },
};

const slice = createSlice({
  name: 'stockDetailsPage',
  initialState,
  reducers: {
    changeTicker(state, actions: PayloadAction<string>) {
      state.ticker = actions.payload;
    },
    changePeriod(state, actions: PayloadAction<StockPeriod>) {
      state.period = actions.payload;
    },
  },
});

export const { actions: stockDetailsPageActions } = slice;

export const useStockDetailsPageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: stockDetailsPageSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useStockDetailsPageSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
