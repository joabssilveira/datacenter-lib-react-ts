import { alpha, CardProps, TableCellProps, Theme, ThemeOptions } from '@mui/material';
import { ColorUtils, StrictOmit } from 'fwork-jsts-common';
import { TableComponentProps } from 'fwork-react-mui-ext';
import { CSSProperties } from 'react';
import { themeInput } from './input';

interface ThemeCustomSettings {
  primaryTextColor: string
  bkgPaperTextColor: string
  defaultRadius: number,
  card: CardProps
  table: StrictOmit<TableComponentProps<any>, 'bodyList' | 'bodyRowBuilder'>
  tableTitleCell: TableCellProps
  rightDrawer: {
    style: CSSProperties
  }
  background: {
    default: {
      30: string
    },
    papper: {
      30: string
    }
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    custom: ThemeCustomSettings
  }

  interface PaletteOptions {
    custom?: Partial<ThemeCustomSettings>
  }
}

type BaseThemeConfig = {
  primaryColor: string;
  backgroundDefault: string;
  backgroundPaper: string;
  primaryTextColor: string;
  bkgPaperTextColor: string;
  // sinal usado nos incColor: light "clareia" com negativo, dark "escurece" com positivo
  shadeSign: 1 | -1;
};

function buildThemeBase(config: BaseThemeConfig): ThemeOptions {
  return {
    components: {
      ...themeInput({ size: 'small' }),
      MuiCssBaseline: {
        styleOverrides: (theme: StrictOmit<Theme, "components">) => ({
          body: {
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar-button': { display: 'none' }
          },
          a: {
            color: theme.palette.text?.primary,
            '&:hover': { color: theme.palette.text.secondary }
          },
        })
      },
      MuiLink: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.text?.primary,
            '&:hover': { color: theme.palette.text.secondary }
          })
        }
      },
    },
    palette: {
      primary: { main: config.primaryColor },
      background: {
        default: config.backgroundDefault,
        paper: config.backgroundPaper,
      },
      custom: {
        primaryTextColor: config.primaryTextColor,
        bkgPaperTextColor: config.bkgPaperTextColor,
        defaultRadius: 15,
        card: {
          style: {
            overflow: 'visible',
            boxShadow: 'rgba(0, 0, 0, 0.16) 1px 1px 3px',
            padding: 20
          }
        },
        rightDrawer: {
          style: {
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }
        }
      }
    },
  };
}

function buildTheme(config: BaseThemeConfig): ThemeOptions {
  const base = buildThemeBase(config);
  const { shadeSign } = config;
  const radius = base.palette!.custom!.defaultRadius;
  const bgDefault = base.palette!.background!.default!;
  const bgPaper = base.palette!.background!.paper!;

  return {
    ...base,
    palette: {
      ...base.palette,
      custom: {
        ...base.palette!.custom,

        table: {
          ...base.palette!.custom!.table,

          tableScrollContainerProps: {
            style: {
              borderRadius: radius,
              clipPath: `inset(0 round ${radius}px)`
            }
          },
          tableShadowContainerProps: {
            style: { borderRadius: radius }
          },
          bodyProps: {
            style: { background: bgPaper }
          }
        },
        tableTitleCell: {
          style: {
            background: ColorUtils.incColor(bgDefault, shadeSign * 10)
          }
        },
        card: {
          ...base.palette!.custom!.card,
          style: {
            ...base.palette!.custom!.card!.style,
            borderRadius: radius
          }
        },
        rightDrawer: {
          ...base.palette!.custom!.rightDrawer,
          style: {
            ...base.palette!.custom!.rightDrawer!.style,
            background: alpha(ColorUtils.incColor(bgPaper, shadeSign === -1 ? 100 : 30), .8),
          }
        },
        background: {
          default: { "30": ColorUtils.incColor(bgDefault, shadeSign * 30) },
          papper: { "30": ColorUtils.incColor(bgPaper, shadeSign * 30) }
        }
      }
    }
  };
}

export const themeLight = buildTheme({
  primaryColor: '#1976D2',
  backgroundDefault: '#F0F4F9',
  backgroundPaper: '#FFFFFF',
  primaryTextColor: '#FFFFFF',
  bkgPaperTextColor: '#000000',
  shadeSign: -1, // clarear
});

export const themeDark = buildTheme({
  primaryColor: '#5893df',
  backgroundDefault: '#192231',
  backgroundPaper: '#24344d',
  primaryTextColor: '#FFFFFF',
  bkgPaperTextColor: '#FFFFFF',
  shadeSign: 1, // escurecer
});