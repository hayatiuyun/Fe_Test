import { createTheme, Theme } from '@mui/material/styles';
import themeConstants from './themeConstants';
import typography from './typography';

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
      xs: true; // removes the `xs` breakpoint
      sm: true;
      md: true;
      lg: true;
      xl: true;
        '2xl': true;
        '3xl': true;
        '4xl': true;
        '5xl': true;
    }
    interface Palette {
        tertiary: Palette["primary"];
        white: Palette["primary"];
        linear: Palette["primary"];
      }
      interface PaletteOptions {
        tertiary?: PaletteOptions["primary"];
        white?: PaletteOptions["primary"];
        linear: PaletteOptions["primary"];
      }
    
  }

const theme: Theme = createTheme({
  typography,
  palette: {
    mode: 'light',
    primary: themeConstants.primary,
    white: themeConstants.white,
    secondary: themeConstants.secondary,
    tertiary: themeConstants.tertiary,
    success: themeConstants.success,
    error: themeConstants.error,
    warning: themeConstants.warning,
    linear: themeConstants.linear,
    background: { paper: themeConstants.paper },
    text: {
      primary: themeConstants.fg.main,
      secondary: themeConstants.fg.dark,
    },
  },
  breakpoints: {
    values: {
        xs: 0,
        sm: 350,
        md: 768,
        lg: 1024,
        xl: 1280,
        '2xl': 1528,
        '3xl': 1920,
        '4xl': 2560,
        '5xl': 3840,
    },
  },
  components: {
    MuiContainer: {
        styleOverrides: {
          root: {
            maxWidth: '1440px !important',
          },
          maxWidthXl: {
            width: '100%',
            '@media (min-width: 1024px)': {
              width: '90% !important',
              paddingLeft: '0px !important',
              paddingRight: '0px !important',
            },
            '@media (min-width: 1528px)': {
              width: '85%  !important',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState }: { ownerState: any }) => ({
            padding: '0px 20px',
            fontSize: '1rem',
            borderRadius: '12px',
            height: '44px',
            textTransform: 'capitalize',
    
            ...(ownerState.variant === 'contained' && {
              boxShadow: 'none',
            }),
            ...(ownerState.variant === 'contained' &&
              ownerState.color === 'primary' && {
                backgroundColor: themeConstants.primary.main,
                color: themeConstants.fg.dark,
              }),
          }),
        },
      },
  },
});

export { theme };
