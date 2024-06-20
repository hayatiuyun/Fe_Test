import resolvedColors from './resolveColors';

interface ThemeConstantsType {
  paper: string;
  primary: {
    dark: string;
    main: string;
    light: string;
  };
  secondary: {
    main: string;
  };
  white: {
    main: string;
  };
  tertiary: {
    25: string;
    main: string;
    light: string;
  };
  warning: {
    main: string;
  };
  error: {
    main: string;
  };
  success: {
    main: string;
  };
  fg: {
    main: string;
    dark: string;
    black: string;
  };
  linear: {
    main: string;
  };
  breakpoints: {
    [key: string]: number;
  };
}

const themeConstants: ThemeConstantsType = resolvedColors;

export default themeConstants;