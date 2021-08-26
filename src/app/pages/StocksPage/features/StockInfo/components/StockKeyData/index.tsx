/**
 *
 * StockKeyData
 *
 */
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import Grid from '@material-ui/core/Grid';
import { selectStockInfo } from '../../slice/selectors';
import { useSelector } from 'react-redux';
import KeyValuePairsTable from '../../../../components/KeyValuePairsTable';
import { GridSize } from '@material-ui/core';

interface Props {}
//const StockGraph = React.memo((props: Props)
export const StockKeyData = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const stockInfo = useSelector(selectStockInfo);

  const _createData = (key, value) => {
    return { key, value };
  };

  const _formatNumber = (number: number): string => {
    return (
      // Nine Zeroes for Billions
      Math.abs(Number(number)) >= 1.0e9
        ? (Math.abs(Number(number)) / 1.0e9).toFixed(2) + 'B'
        : // Six Zeroes for Millions
        Math.abs(Number(number)) >= 1.0e6
        ? (Math.abs(Number(number)) / 1.0e6).toFixed(2) + 'M'
        : // Three Zeroes for Thousands
        Math.abs(Number(number)) >= 1.0e3
        ? (Math.abs(Number(number)) / 1.0e3).toFixed(2) + 'K'
        : Math.abs(Number(number)).toFixed(2) + ''
    );
  };

  const _getDisplayValue = (object, key) => {
    if (object == null || object[key] == null) return '-';

    let value = object[key];
    if (!window.isNaN(value)) value = _formatNumber(value);

    return value;
  };

  const keyData = [
    [
      _createData(t(messages.open()), _getDisplayValue(stockInfo, 'open')),
      _createData(t(messages.high()), _getDisplayValue(stockInfo, 'dayHigh')),
      _createData(t(messages.low()), _getDisplayValue(stockInfo, 'dayLow')),
    ],
    [
      _createData(t(messages.volume()), _getDisplayValue(stockInfo, 'volume')),
      _createData(
        t(messages.priceToEarningsRatio()),
        _getDisplayValue(stockInfo, 'trailingPE'),
      ),
      _createData(
        t(messages.marketCap()),
        _getDisplayValue(stockInfo, 'marketCap'),
      ),
    ],
    [
      _createData(
        t(messages.fiftyTwoWeekHigh()),
        _getDisplayValue(stockInfo, 'fiftyTwoWeekHigh'),
      ),
      _createData(
        t(messages.fiftyTwoWeekLow()),
        _getDisplayValue(stockInfo, 'fiftyTwoWeekLow'),
      ),
      _createData(
        t(messages.averageVolume()),
        _getDisplayValue(stockInfo, 'averageVolume'),
      ),
    ],
  ];
  const mdValue: GridSize = Math.ceil(12 / (keyData.length || 1)) as any;

  return (
    <>
      <Grid container spacing={1}>
        {keyData.map((entries, index) => {
          return (
            <Grid container md={mdValue} item xs={12} sm={12} key={index}>
              <KeyValuePairsTable entries={entries}></KeyValuePairsTable>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
