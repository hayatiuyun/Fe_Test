import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';

const fullConfig = resolveConfig(tailwindConfig);

// Safely access the colors from the resolved config
const getColor = (colorPath: string): string => {
  const colorParts = colorPath.split('.');
  let color: any = fullConfig.theme.colors;
  for (const part of colorParts) {
    if (color[part]) {
      color = color[part];
    } else {
      console.error(`Color path ${colorPath} not found in Tailwind config.`);
      return '#000000'; // Default fallback color
    }
  }
  return color as string;
};

// Resolve all colors once
const resolvedColors = {
  paper: "#FFFFFF",
  primary: {
    dark: getColor('primary.600'),
    main: getColor('primary.500'),
    light: getColor('primary.25'),
  },
  secondary: {
    main: getColor('secondary.500'),
  },
  white: {
    main: '#FFFFFF',
  },
  tertiary: {
    25: getColor('tertiary.25'),
    main: getColor('tertiary.700'),
    light: getColor('tertiary.400'),
  },
  warning: {
    main: getColor('warning.500'),
  },
  error: {
    main: getColor('error.500'),
  },
  success: {
    main: getColor('success.500'),
  },
  fg: {
    main: getColor('black'),
    dark: '#FFFFFF',
    black: getColor('black'),
  },
  linear: {
    main: '#F66D22',
  },
  breakpoints: {
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
};

export default resolvedColors;
