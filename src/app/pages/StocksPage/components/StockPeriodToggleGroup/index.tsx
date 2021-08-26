/**
 *
 * StockPeriodToggleGroup
 *
 */
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { selectPeriod } from '../../slice/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useStockDetailsPageSlice } from '../../slice';
import { StockPeriod } from '../../slice/types';
import { useStockHistoricalDataSlice } from '../../features/StockHistoricalData/slice';

interface Props {}

export function StockPeriodToggleGroup(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const activePeriod = useSelector(selectPeriod);
  const { actions } = useStockDetailsPageSlice();
  const { actions: stockHistoricalDataActions } = useStockHistoricalDataSlice();
  const dispatch = useDispatch();

  const setPeriod = (period: StockPeriod) => {
    dispatch(actions.changePeriod(period));
    dispatch(stockHistoricalDataActions.loadStockHistoricalData());
  };

  const isPeriodActive = (period: StockPeriod): boolean => {
    return (
      activePeriod?.value === period?.value &&
      activePeriod?.unit === period?.unit
    );
  };

  const getPeriodVariant = (
    period: StockPeriod,
  ): 'text' | 'outlined' | 'contained' | undefined => {
    return isPeriodActive(period) ? 'contained' : 'text';
  };

  return (
    <ButtonGroup
      color="primary"
      variant="text"
      fullWidth={true}
      disableElevation={true}
    >
      <Button
        onClick={() => {
          setPeriod({ value: 24, unit: 'h' });
        }}
        variant={getPeriodVariant({ value: 24, unit: 'h' })}
      >
        {t(messages.oneDayTitle())}
      </Button>
      <Button
        onClick={() => {
          setPeriod({ value: 1, unit: 'wk' });
        }}
        variant={getPeriodVariant({ value: 1, unit: 'wk' })}
      >
        {t(messages.oneWeekTitle())}
      </Button>
      <Button
        onClick={() => {
          setPeriod({ value: 1, unit: 'mo' });
        }}
        variant={getPeriodVariant({ value: 1, unit: 'mo' })}
      >
        {t(messages.oneMonthTitle())}
      </Button>
      <Button
        onClick={() => {
          setPeriod({ value: 3, unit: 'mo' });
        }}
        variant={getPeriodVariant({ value: 3, unit: 'mo' })}
      >
        {t(messages.threeMonthsTitle())}
      </Button>
      <Button
        onClick={() => {
          setPeriod({ value: 1, unit: 'y' });
        }}
        variant={getPeriodVariant({ value: 1, unit: 'y' })}
      >
        {t(messages.oneYearTitle())}
      </Button>
      <Button
        onClick={() => {
          setPeriod({ value: 3, unit: 'y' });
        }}
        variant={getPeriodVariant({ value: 3, unit: 'y' })}
      >
        {t(messages.threeYearsTitle())}
      </Button>
    </ButtonGroup>
  );
}
