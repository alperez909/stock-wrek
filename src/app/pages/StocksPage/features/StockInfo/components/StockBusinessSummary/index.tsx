/**
 *
 * StockBusinessSummary
 *
 */
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { RequestStatus } from 'types/RequestStatus';
import { messages } from './messages';
import { selectStockInfo, selectStockInfoStatus } from '../../slice/selectors';

interface Props {}

export function StockBusinessSummary(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const stockInfo = useSelector(selectStockInfo);
  const stockInfoStatus = useSelector(selectStockInfoStatus);

  return (
    <Summary>
      {stockInfoStatus === RequestStatus.LOADING
        ? t(messages.loading())
        : stockInfo?.['longBusinessSummary']}
    </Summary>
  );
}

const Summary = styled.p``;
