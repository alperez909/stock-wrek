import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.stockNews || initialState;

export const selectStockNews = createSelector(
  [selectSlice],
  state => state.stockNews,
);
