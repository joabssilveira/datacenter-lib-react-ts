import { IconButton } from "@mui/material";
import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import moment, { Moment } from "moment";

import React, { FC } from "react";

import { MdCancel } from "react-icons/md";
import { OutlinedInputPropsBase } from ".";
import styles from './style.module.scss';

export type OutlinedDatePickerComponentProps = {
  onChange?: (value?: string) => void
} & Omit<DatePickerProps, 'onChange'> & OutlinedInputPropsBase

// TODO-ESSE COMPONENTE NAO TEM GANHO DE PERFORMANCE, DEVE SER SUBSTITUIDO POR UM SELECT COM BUSCA MAS SEM O MATERIAL
export const OutlinedDatePickerComponent: FC<
  OutlinedDatePickerComponentProps
> = ({
  label, // override
  labelProps,
  error,
  helperText,
  wrapperProps,
  value, // override
  onChange, // omit
  ...props
}) => {
    const parsedValue =
      value && moment(value, moment.ISO_8601, true).isValid()
        ? moment(value)
        : null

    return <span {...wrapperProps} className={styles['wrapper']}>
      {label != null && <label {...labelProps} className={`${styles['label']} ${error ? styles['error'] : ''} ${labelProps?.className}`}>{label}</label>}

      <span style={{ position: 'relative', width: '100%' }}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            value={parsedValue}
            onChange={(value: Moment | null) => {
              onChange?.(
                value?.isValid()
                  ? value.toISOString()
                  : undefined
              )
            }}
            {...props}
          />
        </LocalizationProvider>
        {parsedValue != null && <IconButton
          disabled={props.disabled}
          style={{ position: 'absolute', right: 30, top: -3 }}
          onClick={() => onChange?.(undefined)}>
          <MdCancel />
        </IconButton>}
      </span>

      {helperText != null && <span {...labelProps} className={`${styles['label']} ${error ? styles['error'] : ''} ${labelProps?.className}`}>{helperText}</span>}
    </span>
  }

// export const DatePickerComponent: FC<DatePickerProps> = ({
//   ...props
// }) => {
//   return <span style={{ position: 'relative', width: '100%' }}>
//     <LocalizationProvider dateAdapter={AdapterMoment}>
//       <DatePicker
//         {...props}
//       />
//     </LocalizationProvider>
//     {props.value != null && <IconButton
//       disabled={props.disabled}
//       style={{ position: 'absolute', right: 30, top: -3 }}
//       onClick={() => props.onChange?.(null, {} as any)}>
//       <MdCancel />
//     </IconButton>}
//   </span>
// }