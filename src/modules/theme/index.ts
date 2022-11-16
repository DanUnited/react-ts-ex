import { colorPalette } from './colorPalettes';
import { SMALL_VIEWPORT, MEDIUM_VIEWPORT, LARGE_VIEWPORT, MOBILE_VIEWPORT, fonts } from './config';
import { dimensions } from './dimensions';

import type { IThemeColors } from './colorPalettes';
import type { IThemeDimensions } from './dimensions';

export interface ITheme {
  name: string;
  colors: IThemeColors;
  dimension: IThemeDimensions;
  size: string;
  breakpoints: string[];
  fonts: {
    faFontsPath: string;
    fontFamily: string;
  };
  typography: {
    bodyBackground: string;
    bodyFontColor: string;
    bodyFontFamily: string;

    globalFontSize: string;
    globalWeightNormal: number;
    globalLineHeight: number;

    headersFontColor: string;
    headersFontFamily: string;
    headersFontWeight: number;
  };
  transitions: { cb: string };
  shadows: {
    base: string;
    accent: string;
  };
}

export const mainTheme: ITheme = {
  name: 'main-theme',
  colors: colorPalette,
  dimension: dimensions,
  size: 'default',
  breakpoints: [`${MOBILE_VIEWPORT}px`, `${SMALL_VIEWPORT}px`, `${MEDIUM_VIEWPORT}px`, `${LARGE_VIEWPORT}px`],
  fonts,
  typography: {
    bodyBackground: colorPalette.white,
    bodyFontColor: colorPalette.white,
    bodyFontFamily: fonts.fontFamily,

    globalFontSize: '1.6rem',
    globalWeightNormal: 400,
    globalLineHeight: 1.5,

    headersFontColor: colorPalette.white,
    headersFontFamily: fonts.fontFamily,
    headersFontWeight: 700,
  },
  transitions: {
    cb: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  },
  shadows: {
    base: '-2px 2px 2px rgba(209, 219, 231, 0.6)',
    accent: '-2px 2px 2px rgba(209, 219, 231, 0.2)',
  },
};

export default mainTheme;
