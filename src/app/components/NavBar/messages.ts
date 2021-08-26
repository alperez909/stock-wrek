import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  expand: () => _t(translations.app.expandTitle),
  collapse: () => _t(translations.app.collapseTitle),
};
