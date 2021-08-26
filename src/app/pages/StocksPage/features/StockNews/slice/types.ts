/* --- STATE --- */
import { RequestError } from 'types/RequestError';
import { RequestStatus } from 'types/RequestStatus';

export interface StockNewsState {
  stockNews: StockNews | null;
  status: RequestStatus;
  error: RequestError | null;
}

export interface StockNews {
  articles?: StockNewsArticlesEntity[] | null;
  status: string;
  totalResults: number;
}

export interface StockNewsArticlesEntity {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: StockNewsSource;
  title: string;
  url: string;
  urlToImage: string;
}

export interface StockNewsSource {
  id?: string | null;
  name: string;
}
