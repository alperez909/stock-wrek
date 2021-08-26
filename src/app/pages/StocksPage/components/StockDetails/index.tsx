/**
 *
 * StockDetails
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { StockDetailsHeader } from '../StockDetailsHeader';
import { StockGraph } from '../../features/StockHistoricalData/components/StockGraph';
import { StockPeriodToggleGroup } from '../StockPeriodToggleGroup';
import { StockKeyData } from '../../features/StockInfo/components/StockKeyData';
import { StockNewsGrid } from '../../features/StockNews/components/StockNewsGrid';
import { StockBusinessSummary } from '../../features/StockInfo/components/StockBusinessSummary';

interface Props {}

export function StockDetails(props: Props) {
  return (
    <>
      <StockDetailsHeader />
      <StockDetailsContent>
        <StockGraph />
        <StockPeriodToggleGroup />
        <StockKeyData />
        <StockBusinessSummary />
        <StockNewsGrid />
      </StockDetailsContent>
    </>
  );
}

const StockDetailsContent = styled.div`
  margin-top: 72px;
`;
