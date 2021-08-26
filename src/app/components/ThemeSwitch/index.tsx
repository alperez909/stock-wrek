import * as React from 'react';
import { themeActions } from 'styles/theme/slice';
import { useDispatch, useSelector } from 'react-redux';
import { saveTheme } from 'styles/theme/utils';
import { selectThemeKey } from 'styles/theme/slice/selectors';
import { IconButton } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { isSystemDark } from 'styles/theme/utils';
import Tooltip from '@material-ui/core/Tooltip';
import { messages } from './messages';
import { useTranslation } from 'react-i18next';

export function ThemeSwitch() {
  const theme = useSelector(selectThemeKey);
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const isDark = theme === 'system' ? isSystemDark : theme === 'dark';

  const handleThemeToggle = () => {
    const newValue = isDark ? 'light' : 'dark';
    saveTheme(newValue);
    dispatch(themeActions.changeTheme(newValue));
  };

  return (
    <Tooltip title={t(messages.toggleThemeTitle()) as string}>
      <IconButton onClick={handleThemeToggle} color={'primary'}>
        {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
}
