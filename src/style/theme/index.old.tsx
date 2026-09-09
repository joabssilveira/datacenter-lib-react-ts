import { alpha, CardProps, TableCellProps, Theme, ThemeOptions } from '@mui/material';
import { ColorUtils, StrictOmit } from 'fwork-jsts-common';
import { TableComponentProps } from 'fwork-react-mui-ext';
import { CSSProperties } from 'react';
import { themeInput } from './input';
// import { themeInputSmall } from './input';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
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
  }

  interface PaletteOptions {
    custom?: {
      primaryTextColor?: string
      bkgPaperTextColor?: string
      defaultRadius?: number
      card?: CardProps
      table?: StrictOmit<TableComponentProps<any>, 'bodyList' | 'bodyRowBuilder'>
      tableTitleCell?: TableCellProps
      rightDrawer?: {
        style: CSSProperties
      }
      background?: {
        default: {
          30: string
        },
        papper: {
          30: string
        }
      }
    }
  }
}

const themeLightBase: ThemeOptions = {
  components: {
    // ...themeInputSmall,
    ...themeInput({
      size: 'small'
    }),
    MuiCssBaseline: {
      styleOverrides: (theme: StrictOmit<Theme, "components">) => ({
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar-button': {
            display: 'none'
          }
        },
        a: {
          color: theme.palette.text?.primary,
          // textDecoration: 'none',
          '&:hover': {
            // textDecoration: 'underline',
            color: theme.palette.text.secondary,
          }
        },
      })
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text?.primary,
          // textDecoration: 'none',
          '&:hover': {
            // textDecoration: 'underline',
            color: theme.palette.text.secondary,
          }
        })
      }
    },
  },
  palette: {
    primary: {
      main: '#1976D2'
    },
    background: {
      default: '#F0F4F9',
      // default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    custom: {
      primaryTextColor: '#FFFFFF',
      bkgPaperTextColor: '#000000',
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
}

export const themeLight: ThemeOptions = {
  ...themeLightBase,
  palette: {
    ...themeLightBase.palette,

    custom: {
      ...themeLightBase.palette?.custom,

      table: {
        ...themeLightBase.palette?.custom?.table,

        tableScrollContainerProps: {
          ...themeLightBase.palette?.custom?.table?.tableScrollContainerProps,

          style: {
            ...themeLightBase.palette?.custom?.table?.tableScrollContainerProps?.style,

            borderRadius: themeLightBase.palette?.custom?.defaultRadius,
            clipPath: `inset(0 round ${themeLightBase.palette?.custom?.defaultRadius}px)`
          }
        },
        tableShadowContainerProps: {
          ...themeLightBase.palette?.custom?.table?.tableShadowContainerProps,

          style: {
            ...themeLightBase.palette?.custom?.table?.tableShadowContainerProps?.style,

            borderRadius: themeLightBase.palette?.custom?.defaultRadius
          }
        },
        bodyProps: {
          ...themeLightBase.palette?.custom?.table?.bodyProps,

          style: {
            ...themeLightBase.palette?.custom?.table?.bodyProps?.style,
            background: themeLightBase.palette?.background?.paper,
          }
        }
      },
      tableTitleCell: {
        ...themeLightBase.palette?.custom?.tableTitleCell,

        style: {
          ...themeLightBase.palette?.custom?.tableTitleCell?.style,
          background: themeLightBase.palette?.background?.default ? ColorUtils.incColor(themeLightBase.palette?.background?.default, -10) : undefined
        }
      },
      card: {
        ...themeLightBase.palette?.custom?.card,

        style: {
          ...themeLightBase.palette?.custom?.card?.style,

          borderRadius: themeLightBase.palette?.custom?.defaultRadius
        }
      },
      rightDrawer: {
        ...themeLightBase.palette?.custom?.rightDrawer,

        style: {
          ...themeLightBase.palette?.custom?.rightDrawer?.style,

          background: alpha(ColorUtils.incColor(themeLightBase.palette!.background!.paper!, 100), .8),
        }
      },
      background: {
        ...themeLightBase.palette?.custom?.background,

        default: {
          ...themeLightBase.palette?.custom?.background?.default,

          // mais claro
          "30": ColorUtils.incColor(themeLightBase.palette!.background!.default!, -30)
        },
        papper: {
          ...themeLightBase.palette?.custom?.background?.papper,

          // mais claro
          "30": ColorUtils.incColor(themeLightBase.palette!.background!.paper!, -30)
        }
      }
    }
  }
}

const themeDarkBase: ThemeOptions = {
  components: {
    // ...themeInputSmall,
    ...themeInput({
      size: 'small'
    }),
    MuiCssBaseline: {
      styleOverrides: (theme: StrictOmit<Theme, "components">) => ({
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar-button': {
            display: 'none'
          }
        },
        a: {
          color: theme.palette.text?.primary,
          // textDecoration: 'none',
          '&:hover': {
            // textDecoration: 'underline',
            color: theme.palette.text.secondary,
          }
        },
      })
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text?.primary,
          // textDecoration: 'none',
          '&:hover': {
            // textDecoration: 'underline',
            color: theme.palette.text.secondary,
          }
        })
      }
    },
  },
  palette: {
    primary: {
      main: '#5893df',
    },
    background: {
      default: '#192231',
      paper: '#24344d',
    },
    custom: {
      primaryTextColor: '#FFFFFF',
      bkgPaperTextColor: '#FFFFFF',
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
  }
}

export const themeDark: ThemeOptions = {
  ...themeDarkBase,

  palette: {
    ...themeDarkBase.palette,

    custom: {
      ...themeDarkBase.palette?.custom,

      table: {
        ...themeDarkBase.palette?.custom?.table,

        tableScrollContainerProps: {
          ...themeDarkBase.palette?.custom?.table?.tableScrollContainerProps,

          style: {
            ...themeDarkBase.palette?.custom?.table?.tableScrollContainerProps?.style,

            borderRadius: themeDarkBase.palette?.custom?.defaultRadius,
            clipPath: `inset(0 round ${themeDarkBase.palette?.custom?.defaultRadius}px)`
          }
        },
        tableShadowContainerProps: {
          ...themeDarkBase.palette?.custom?.table?.tableShadowContainerProps,

          style: {
            ...themeDarkBase.palette?.custom?.table?.tableShadowContainerProps?.style,

            borderRadius: themeDarkBase.palette?.custom?.defaultRadius
          }
        },
        bodyProps: {
          ...themeDarkBase.palette?.custom?.table?.bodyProps,

          style: {
            ...themeDarkBase.palette?.custom?.table?.bodyProps?.style,
            background: themeDarkBase.palette?.background?.paper,
          }
        }
      },
      tableTitleCell: {
        ...themeDarkBase.palette?.custom?.tableTitleCell,

        style: {
          ...themeDarkBase.palette?.custom?.tableTitleCell?.style,
          background: themeDarkBase.palette?.background?.default ? ColorUtils.incColor(themeDarkBase.palette?.background?.default, 10) : undefined
        }
      },
      card: {
        ...themeDarkBase.palette?.custom?.card,

        style: {
          ...themeDarkBase.palette?.custom?.card?.style,

          borderRadius: themeDarkBase.palette?.custom?.defaultRadius
        }
      },
      rightDrawer: {
        ...themeDarkBase.palette?.custom?.rightDrawer,

        style: {
          ...themeDarkBase.palette?.custom?.rightDrawer?.style,

          background: alpha(ColorUtils.incColor(themeDarkBase.palette!.background!.paper! ?? '', 30), .8),
        }
      },
      background: {
        ...themeDarkBase.palette?.custom?.background,

        default: {
          ...themeDarkBase.palette?.custom?.background?.default,

          // mais escuro
          "30": ColorUtils.incColor(themeDarkBase.palette!.background!.default!, 30)
        },
        papper: {
          ...themeDarkBase.palette?.custom?.background?.papper,

          // mais escuro
          "30": ColorUtils.incColor(themeDarkBase.palette!.background!.paper!, 30)
        }
      }
    }
  }
}