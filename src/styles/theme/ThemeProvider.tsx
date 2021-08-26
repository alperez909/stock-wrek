import * as React from 'react';
import { ThemeProvider as OriginalThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useThemeSlice } from './slice';
import { selectTheme } from './slice/selectors';

export const ThemeProvider = (props: { children: React.ReactChild }) => {
  useThemeSlice();

  const theme = useSelector(selectTheme);
  return (
    <MuiThemeProvider theme={theme}>
      <OriginalThemeProvider theme={theme}>
        {React.Children.only(props.children)}
      </OriginalThemeProvider>
    </MuiThemeProvider>
  );
};
