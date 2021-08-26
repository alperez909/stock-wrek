/* --- STATE --- */
import { RequestStatus } from 'types/RequestStatus';
import { RequestError } from 'types/RequestError';
export interface StockHistoricalDataState {
  stockHistoricalData: StockHistoricalData[] | null;
  status: RequestStatus;
  error: RequestError | null;
}

export interface StockHistoricalData {
  close: number;
  dividends: number;
  high: number;
  low: number;
  open: number;
  stockSplits: number;
  timestamp: string;
  volume: number;
}
