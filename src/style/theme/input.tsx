import { Components, Theme } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import { StrictOmit } from "fwork-jsts-common";

// https://claude.ai/share/22f845e9-c33a-49d4-ba3e-66efe06f0fa1
export const themeInput = (args: {
  size: OverridableStringUnion<'small' | 'medium', {}>;
}) => {
  const { size } = args

  const result: Components<StrictOmit<Theme, "components">> | undefined = {
    MuiFormControl: {
      defaultProps: {
        size,
      }
    },
    // inputs
    MuiInputBase: {
      defaultProps: {
        size,
        onWheel: (e) => (e.target as HTMLInputElement).blur(),
      },
      styleOverrides: {
        input: {
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
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        size,
      }
    },
    MuiSelect: {
      defaultProps: {
        size,
      }
    },
    MuiOutlinedInput: {
      defaultProps: {
        size,
      }
    },
    MuiFilledInput: {
      defaultProps: {
        size,
      }
    },
    MuiInput: {
      defaultProps: {
        size,
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        size,
      }
    },
    // buttons
    MuiButton: {
      defaultProps: {
        size,
      }
    },
    MuiIconButton: {
      defaultProps: {
        size,
      }
    },
    MuiFab: {
      defaultProps: {
        size,
      }
    },
    MuiToggleButton: {
      defaultProps: {
        size,
      }
    },
    // switches
    MuiCheckbox: {
      defaultProps: {
        size,
      }
    },
    MuiRadio: {
      defaultProps: {
        size,
      }
    },
    MuiSwitch: {
      defaultProps: {
        size,
      }
    },
    // miscelaneous
    MuiChip: {
      defaultProps: {
        size,
      }
    },

    // pickerComponents
    ['MuiPickersTextField' as any]: {
      defaultProps: {
        size,
      }
    },
    ['MuiPickersInputBase' as any]: {
      defaultProps: {
        size,
      }
    },
    ['MuiPickersOutlinedInput' as any]: {
      defaultProps: {
        size,
      }
    },
    ['MuiPickersFilledInput' as any]: {
      defaultProps: {
        size,
      }
    },
    ['MuiPickersInput' as any]: {
      defaultProps: {
        size,
      }
    },
  }

  return result
}