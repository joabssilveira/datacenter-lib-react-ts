import { Components, inputBaseClasses, Theme } from "@mui/material";
import { pickersInputBaseClasses } from "@mui/x-date-pickers";
import { StrictOmit } from "fwork-jsts-common";

// NAO ESTA SENDO USADO, MANTIDO APENAS PRA REFERENCIA

export const rightNumberFieldSx = {
  '& .MuiOutlinedInput-input': {
    textAlign: 'right',
  },
};

export const themeInputSmall: Components<StrictOmit<Theme, "components">> | undefined = {
  // INPUTS
  MuiInputBase: {
    defaultProps: {
      size: "small",
    },
    styleOverrides: {
      root: {
        fontSize: 14,

        // size="small"
        [`&.${inputBaseClasses.sizeSmall} > .${inputBaseClasses.input}`]: {
          padding: '6px 10px',
        },
        [`&.${pickersInputBaseClasses.inputSizeSmall} > .${pickersInputBaseClasses.inputSizeSmall}`]: {
          padding: '6px 10px',
        },

        // multiline
        [`&.${inputBaseClasses.multiline} > .${inputBaseClasses.input}`]: {
          padding: '8px 12px',
        },
      },

      input: {
        padding: '8px 12px',   // ← CONTROLA A ALTURA GLOBAL

        // somente inputs numéricos
          '&[type="number"]': {
            textAlign: 'right',
            // remove os spinners (mozilla)
            MozAppearance: 'textfield',
          },

          // remove os spinners (webkit)
          '&[type="number"]::-webkit-outer-spin-button, &[type="number"]::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0,
          },
      },

      // TODO-nao existe na versao 9 do material
      // inputSizeSmall: {
      //   padding: '6px 10px',
      // },

      // TODO-nao existe na versao 9 do material
      // inputMultiline: {
      //   padding: '8px 12px',
      // },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        padding: '8px 12px',
      },

      // root: {
      //   '& .MuiOutlinedInput-input': {
      //     padding: '8px 12px',
      //   },
      // },
    },
  },
  MuiSelect: {
    styleOverrides: {
      select: {
        padding: '8px 32px 8px 12px', // espaço da seta
        minHeight: 'unset', // remove altura artificial
      },
    },
  },
  MuiAutocomplete: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          padding: 0, // ← REMOVE O 9px fantasma

          '& .MuiAutocomplete-input': {
            padding: '8px 12px !important', // aplica seu padrão
          },
        },
      },

      inputRoot: {
        padding: '0 !important',
      },

      input: {
        padding: '8px 12px !important',
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        transform: 'translate(14px, 7px) scale(1)',
      },

      shrink: {
        transform: 'translate(14px, -10px) scale(0.75)',
      },
    },
  },

  // CHECKBOX
  MuiCheckbox: {
    styleOverrides: {
      root: {
        padding: 6,
      },
    },
  },
}