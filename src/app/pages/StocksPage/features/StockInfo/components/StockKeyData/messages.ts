/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */
import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  open: () => _t(translations.stockKeyData.open),
  high: () => _t(translations.stockKeyData.high),
  low: () => _t(translations.stockKeyData.low),
  volume: () => _t(translations.stockKeyData.volume),
  priceToEarningsRatio: () =>
    _t(translations.stockKeyData.priceToEarningsRatio),
  marketCap: () => _t(translations.stockKeyData.marketCap),
  fiftyTwoWeekHigh: () => _t(translations.stockKeyData.fiftyTwoWeekHigh),
  fiftyTwoWeekLow: () => _t(translations.stockKeyData.fiftyTwoWeekLow),
  averageVolume: () => _t(translations.stockKeyData.averageVolume),
};
