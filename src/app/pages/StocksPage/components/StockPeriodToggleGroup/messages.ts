/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */
import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  oneDayTitle: () => _t(translations.stockPeriodToggleGroup.oneDayTitle),
  oneWeekTitle: () => _t(translations.stockPeriodToggleGroup.oneWeekTitle),
  oneMonthTitle: () => _t(translations.stockPeriodToggleGroup.oneMonthTitle),
  threeMonthsTitle: () =>
    _t(translations.stockPeriodToggleGroup.threeMonthsTitle),
  oneYearTitle: () => _t(translations.stockPeriodToggleGroup.oneYearTitle),
  threeYearsTitle: () =>
    _t(translations.stockPeriodToggleGroup.threeYearsTitle),
};
