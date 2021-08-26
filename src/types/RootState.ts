import { ThemeState } from 'styles/theme/slice/types';
import { StocksState } from 'app/pages/StocksPage/features/Stocks/slice/types';
import { StockDetailsPageState } from 'app/pages/StocksPage/slice/types';
import { StockHistoricalDataState } from 'app/pages/StocksPage/features/StockHistoricalData/slice/types';
import { StockInfoState } from 'app/pages/StocksPage/features/StockInfo/slice/types';
import { StockNewsState } from 'app/pages/StocksPage/features/StockNews/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface RootState {
  theme?: ThemeState;
  stocks?: StocksState;
  stockDetailsPage?: StockDetailsPageState;
  stockHistoricalData?: StockHistoricalDataState;
  stockInfo?: StockInfoState;
  stockNews?: StockNewsState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
