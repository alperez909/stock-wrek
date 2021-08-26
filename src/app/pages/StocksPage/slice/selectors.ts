import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.stockDetailsPage || initialState;

export const selectStockDetailsPage = createSelector(
  [selectSlice],
  state => state,
);

export const selectTicker = createSelector(
  [selectSlice],
  state => state.ticker,
);

export const selectPeriod = createSelector(
  [selectSlice],
  state => state.period,
);
