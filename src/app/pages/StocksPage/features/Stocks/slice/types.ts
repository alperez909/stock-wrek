import { RequestError } from 'types/RequestError';
import { RequestStatus } from 'types/RequestStatus';

/* --- STATE --- */
export interface StocksState {
  query: string;
  stocks: Stock[] | FastMoverStock[];
  status: RequestStatus;
  error: RequestError | null;
  type: StockType;
  limit: number;
  sort: string;
}

export enum StockType {
  ALL = 1,
  MOST_POPULAR = 2,
  FAST_MOVING = 3,
}

export interface Stock {
  nasdaqTraded: string;
  symbol: string;
  securityName: string;
  listingExchange: string;
  marketCategory: string;
  etf: string;
  roundLotSize: string;
  testIssue: string;
  financialStatus: string;
  cqsSymbol: string;
  nasdaqSymbol: string;
  nextshares: string;
  name: string;
}

export interface FastMoverStock {
  close: number;
  deltaPercent: number;
  deltaPrice: number;
  lastUpdated: string;
  name: string;
  symbol: string;
}
