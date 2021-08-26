import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.stockInfo || initialState;

export const selectStockInfo = createSelector(
  [selectSlice],
  state => state.stockInfo,
);

export const selectStockInfoStatus = createSelector(
  [selectSlice],
  state => state.status,
);
