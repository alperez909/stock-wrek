import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import Drawer from '@material-ui/core/Drawer';
import { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import styled, { css } from 'styled-components/macro';
import { StockSearch } from './features/Stocks/components/StockSearch';
import { StockDetails } from './components/StockDetails';
import { LoadingBackdrop } from './components/LoadingBackdrop';
import { useStocksSlice } from './features/Stocks/slice';
import { useStockHistoricalDataSlice } from './features/StockHistoricalData/slice';
import { useStockInfoSlice } from './features/StockInfo/slice';
import { useStockNewsSlice } from './features/StockNews/slice';
import { useDispatch } from 'react-redux';

interface ContentProps {
  open: boolean;
}

const maxDrawerWidth = 300;

const PageWrapper = styled.div`
  display: flex;
  color: ${p => p.theme.palette.text.primary};
`;

const ClippedDrawer = styled(Drawer)`
  width: ${maxDrawerWidth}px;
  flex-shrink: 0;
  & .MuiDrawer-paper {
    width: ${maxDrawerWidth}px;
    box-shadow: ${p => p.theme.shadows[16]};
    @media (min-width: ${p => p.theme.breakpoints.values.sm}px) {
      box-shadow: none;
    }
  }
`;

const DrawerWrapper = styled.div`
  overflow: auto;
  height: 100%;
`;

const Content = styled.main`
  overflow: auto;
  flex-grow: 1;
  margin-left: -${maxDrawerWidth}px;
  padding: 24px;
  transition: margin ${p => p.theme.transitions.duration.leavingScreen}ms
    ${p => p.theme.transitions.easing.sharp};
  ${(props: ContentProps) =>
    props.open &&
    css`
      transition: margin ${p => p.theme.transitions.duration.enteringScreen}ms
        ${p => p.theme.transitions.easing.easeIn};
      margin-left: -${maxDrawerWidth}px;
      @media (min-width: ${p => p.theme.breakpoints.values.sm}px) {
        margin-left: 0;
      }
    `}
`;

export function StocksPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const handleNavDrawerToggleClick = () => {
    const nextValue = !isDrawerOpen;
    setIsDrawerOpen(nextValue);
  };
  const dispatch = useDispatch();
  const { actions } = useStocksSlice();
  const { actions: stockHistoricalDataActions } = useStockHistoricalDataSlice();
  const { actions: stockInfoActions } = useStockInfoSlice();
  const { actions: stockNewsActions } = useStockNewsSlice();

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

  return (
    <>
      <Helmet>
        <title>Stocks</title>
        <meta name="description"></meta>
      </Helmet>
      <PageWrapper>
        <NavBar
          open={isDrawerOpen}
          onNavDrawerToggleClick={handleNavDrawerToggleClick}
        />
        <ClippedDrawer
          open={isDrawerOpen}
          onClose={() => {}}
          variant="persistent"
        >
          <Toolbar />
          <DrawerWrapper>
            <StockSearch />
          </DrawerWrapper>
        </ClippedDrawer>
        <Content open={isDrawerOpen}>
          <StockDetails />
        </Content>
      </PageWrapper>
      <LoadingBackdrop />
    </>
  );
}
