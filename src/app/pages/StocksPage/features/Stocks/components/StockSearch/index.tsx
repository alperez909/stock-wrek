/**
 *
 * StockSearch
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { TextField, Chip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useStocksSlice } from '../../slice';
import { useStockDetailsPageSlice } from '../../../../slice';
import { selectQuery, selectStocks, selectType } from '../../slice/selectors';
import StockList from '../../../../components/StockList';
import { StockType } from '../../slice/types';
import { useStockHistoricalDataSlice } from '../../../StockHistoricalData/slice';
import { useStockInfoSlice } from '../../../StockInfo/slice';
import { selectTicker } from '../../../../slice/selectors';
import { useStockNewsSlice } from '../../../StockNews/slice';

interface Props {}

export enum StockSearchChip {
  FAST_MOVING = 'fastMoving',
}

export function StockSearch(props: Props) {
  const { actions } = useStocksSlice();
  const { actions: stockDetailsActions } = useStockDetailsPageSlice();
  const { actions: stockHistoricalDataActions } = useStockHistoricalDataSlice();
  const { actions: stockInfoActions } = useStockInfoSlice();
  const { actions: stockNewsActions } = useStockNewsSlice();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const query = useSelector(selectQuery);
  const stocks = useSelector(selectStocks);
  const type = useSelector(selectType);
  const ticker = useSelector(selectTicker);

  const dispatch = useDispatch();

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(effect, []);
  };

  useEffectOnMount(() => {
    dispatch(actions.loadStocks());
    dispatch(stockHistoricalDataActions.loadStockHistoricalData());
    dispatch(stockInfoActions.loadStockInfo());
    dispatch(stockNewsActions.loadStockNews());
  });

  const _determineDefaultType = (query: string | null): StockType => {
    return query != null && query !== ''
      ? StockType.ALL
      : StockType.MOST_POPULAR;
  };

  const handleSearchChange = event => {
    const q = event.target.value;
    dispatch(actions.changeQuery(q));
    dispatch(actions.changeLimit(25));
    dispatch(actions.changeType(_determineDefaultType(q)));
    dispatch(actions.loadStocks());
  };

  const handleChipItemClick = (chip: StockType) => {
    if (type === chip) {
      dispatch(actions.changeLimit(25));
      dispatch(actions.changeType(_determineDefaultType(query)));
      dispatch(actions.loadStocks());
      return;
    }

    dispatch(actions.changeSort('percentage.desc'));
    dispatch(actions.changeLimit(100));
    dispatch(actions.changeType(chip));
    dispatch(actions.loadStocks());
  };

  const handleStockItemClick = stock => {
    if (stock?.symbol === ticker) return;

    dispatch(stockDetailsActions.changeTicker(stock?.symbol));
    dispatch(stockHistoricalDataActions.loadStockHistoricalData());
    dispatch(stockInfoActions.loadStockInfo());
    dispatch(stockNewsActions.loadStockNews());
  };

  return (
    <Wrapper>
      <form autoComplete="off">
        <TextField
          id="stock-search"
          label={t(...messages.inputLabel())}
          variant="outlined"
          type="search"
          size="small"
          fullWidth
          value={query}
          onChange={handleSearchChange}
        />
      </form>
      <ListWrapper>
        <ChipsWrapper>
          <Chip
            label={t(...messages.fastMovingLabel())}
            onClick={() => handleChipItemClick(StockType.FAST_MOVING)}
            color={type === StockType.FAST_MOVING ? 'primary' : 'default'}
          />
        </ChipsWrapper>
        <StockList
          list={stocks}
          subheader={t(...messages.symbolsLabel())}
          selected={ticker}
          onClick={handleStockItemClick}
        ></StockList>
      </ListWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px;
  padding-bottom: 0;
  flex: 1;
`;

const ListWrapper = styled.div`
  overflow: auto;
`;

const ChipsWrapper = styled.div`
  padding-top: 10px;
`;
