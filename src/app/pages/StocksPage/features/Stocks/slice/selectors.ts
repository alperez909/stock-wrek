import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.stocks || initialState;

export const selectStocks = createSelector(
  [selectSlice],
  state => state.stocks,
);

export const selectQuery = createSelector([selectSlice], state => state.query);

export const selectType = createSelector([selectSlice], state => state.type);

export const selectSort = createSelector([selectSlice], state => state.sort);

export const selectLimit = createSelector([selectSlice], state => state.limit);
