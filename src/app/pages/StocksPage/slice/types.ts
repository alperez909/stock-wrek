/* --- STATE --- */
export interface StockDetailsPageState {
  ticker: string | null;
  period: StockPeriod | null;
}

export interface StockPeriod {
  value: number;
  unit: 'h' | 'd' | 'wk' | 'mo' | 'y';
}
