import { createTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';

const lightTheme = createTheme({
  palette: {
    primary: teal,
    type: 'light',
    success: teal,
  },
});
const darkTheme = createTheme({
  palette: {
    primary: grey,
    type: 'dark',
    success: teal,
  },
});

export type Theme = typeof lightTheme;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
