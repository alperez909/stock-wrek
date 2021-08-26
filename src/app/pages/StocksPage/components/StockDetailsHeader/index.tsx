/**
 *
 * StockDetailsHeader
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { selectStockHistoricalData } from '../../features/StockHistoricalData/slice/selectors';
import {
  selectStockInfo,
  selectStockInfoStatus,
} from '../../features/StockInfo/slice/selectors';
import { selectTicker } from '../../slice/selectors';
import { StockHistoricalData } from '../../features/StockHistoricalData/slice/types';
import { Paper } from '@material-ui/core';
import { TrackVisibility } from 'app/components/TrackVisibility';
import { messages } from './messages';
import { useTranslation } from 'react-i18next';
import { RequestStatus } from 'types/RequestStatus';

export interface StockDetailsHeaderPercentageProps {
  readonly variant: 'positive' | 'negative';
}

interface Props {}

export function StockDetailsHeader(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const ticker = useSelector(selectTicker);
  const stockInfo = useSelector(selectStockInfo);
  const stockInfoStatus = useSelector(selectStockInfoStatus);
  const stockHistoricalData = useSelector(selectStockHistoricalData);
  const [isElevated, setIsElevated] = React.useState(false);

  const handleIntersectionChange = (entry: IntersectionObserverEntry) => {
    setIsElevated(entry.intersectionRatio < 1);
  };

  const _getPercentageChange = (
    historical: StockHistoricalData[] | null,
  ): number | null => {
    if (!historical || !historical.length) return null;
    const percentage =
      ((historical[historical.length - 1].close - historical[0].close) /
        historical[0].close) *
      100;
    return Math.round((percentage + Number.EPSILON) * 100) / 100;
  };

  const percentageChange = _getPercentageChange(stockHistoricalData);

  return (
    <TrackVisibility
      threshold={1}
      rootMargin={'-64px'}
      onIntersectionChange={handleIntersectionChange}
    >
      <Content elevation={isElevated ? 3 : 0} square component="h2">
        <span>{ticker}</span>
        <StockDetailsHeaderDescription>
          {stockInfoStatus === RequestStatus.LOADING
            ? t(messages.loading())
            : stockInfo?.longName}
        </StockDetailsHeaderDescription>
        {percentageChange && (
          <StockDetailsHeaderPercentage
            variant={percentageChange > 0 ? 'positive' : 'negative'}
          >
            {percentageChange}
          </StockDetailsHeaderPercentage>
        )}
      </Content>
    </TrackVisibility>
  );
}

const Content = styled(Paper)`
  margin: 0;
  padding: 12px 24px;
  position: fixed;
  z-index: 100;
  width: 100%;
  background: ${p => p.theme.palette.background.paper};
  margin-top: -24px;
  margin-left: -24px;
  > * {
    padding-right: 3px;
  }
`;

const StockDetailsHeaderDescription = styled.small`
  font-weight: normal;
  color: ${p => p.theme.palette.text.secondary};
`;

const StockDetailsHeaderPercentage = styled.small<StockDetailsHeaderPercentageProps>`
  font-weight: normal;
  ${p => {
    switch (p.variant) {
      case 'positive':
        return `
          color: ${p.theme.palette.success.main};
        `;
      case 'negative':
        return `
        color: ${p.theme.palette.error.main};
        `;
    }
  }};
`;
