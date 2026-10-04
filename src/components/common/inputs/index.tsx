import { alpha, Menu, MenuItem, Modal, useTheme } from '@mui/material';
import { StrictOmit } from 'fwork-jsts-common';
import { ModalBoxStyledComponent } from 'fwork-react-mui-ext';
import React, { ChangeEvent, FC, MutableRefObject, ReactNode, useEffect, useState } from 'react';
import Measure from 'react-measure';
import styles from './style.module.scss';

export type OutlinedInputPropsBase = {
  label?: string | undefined | null,
  labelProps?: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
  error?: boolean | undefined | null,
  helperText?: ReactNode,
  wrapperProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> | undefined | null
}

export type OutlinedInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & OutlinedInputPropsBase

export const OutlinedInput = React.forwardRef<HTMLInputElement, OutlinedInputProps>(
  (
    {
      label,
      labelProps,
      error,
      helperText,
      wrapperProps,
      ...props
    },
    ref
  ) => {
    const theme = useTheme()

    return (
      <span {...wrapperProps} className={styles['wrapper']}>
        {label != null && (
          <label
            {...labelProps}
            className={`${styles['label']} ${error ? styles['error'] : ''} ${labelProps?.className}`}
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          className={`${styles['outlined-field']} ${error ? styles['error'] : ''} ${styles[theme.palette.mode]}`}
          {...props}
        />

        {helperText != null && (
          <span
            {...labelProps}
            className={`${styles['label']} ${error ? styles['error'] : ''} ${labelProps?.className}`}
          >
            {helperText}
          </span>
        )}
      </span>
    )
  }
)

export const OutlinedSelect: FC<Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'> & {
  value?: any
  onChange?: (value: any) => void
  label?: string | undefined | null,
  labelProps?: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
  error?: boolean | undefined | null,
  helperText?: string | undefined | null,
  wrapperProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> | undefined | null,
  options?: {
    label: string,
    secondaryLabel?: string
    value: any,
  }[],
  addOption?: {
    el?: ReactNode,
    closeRef?: MutableRefObject<(() => void) | null | undefined>
  }
}> = ({
  value,
  onChange,

  label,
  labelProps,
  error,
  helperText,
  wrapperProps,
  options,
  addOption,
  ...props
}) => {
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openPreviewModal, setOpenPreviewModal] = useState(false);
    const open = Boolean(anchorEl);

    // EXPORTED METHOD...  
    useEffect(() => {
      if (addOption?.closeRef)
        addOption.closeRef.current = _closeDialog
    }, [])
    const _closeDialog = () => {
      setOpenPreviewModal(false)
      setAnchorEl(null)
    }
    // ...EXPORTED METHOD

    return <span {...wrapperProps} className={styles['wrapper']}>
      <Modal
        open={openPreviewModal}
        onClose={() => {
          setOpenPreviewModal(false)
          setAnchorEl(null)
        }}
        style={{ padding: 20 }}
      >
        <ModalBoxStyledComponent style={{ maxWidth: '80%', background: theme.palette.background.default }}>
          {addOption?.el}
        </ModalBoxStyledComponent>
      </Modal>

      {label != null && <label {...labelProps} className={`${styles['label']} ${error ? styles['error'] : ''} ${labelProps?.className}`}>{label}</label>}
      <Measure client>
        {({ measureRef, contentRect }) => {
          return <>
            <Menu
              style={{
                width: '100%'
              }}
              id="demo-positioned-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => {
                setAnchorEl(null);
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              {addOption?.el != null && <>
                <MenuItem
                  style={{ minWidth: contentRect.client?.width, }}
                  onClick={() => {
                    setAnchorEl(null)
                    setOpenPreviewModal(true)
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      gap: 10,
                    }}
                  >
                    <span>{'<Novo...>'}</span>
                  </span>
                </MenuItem>
              </>}
              {options?.map(o => <MenuItem
                key={o.label}
                style={{ minWidth: contentRect.client?.width, background: value == o.value ? alpha(theme.palette.background.default, .5) : undefined }}
                onClick={() => {
                  setAnchorEl(null);
                  onChange?.(o.value)
                }}
              >

                <span
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    gap: 10,
                  }}
                >
                  <span>{o.label}</span>

                  {o.secondaryLabel && (
                    <span
                      style={{
                        fontSize: 13,
                        color: theme.palette.text.secondary,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {o.secondaryLabel}
                    </span>
                  )}
                </span>
              </MenuItem>)}
            </Menu>
            <div className={styles["select-wrapper"]}>
              <OutlinedInput
                id={`OutlinedSelect-input-${value}`}
                {...props}
                value={options?.find(o => o.value == value)?.label ?? ''}
                ref={measureRef}
                readOnly
                className={`${styles['outlined-field']} ${styles['outlined-select']} ${error ? styles['error'] : ''} ${styles[theme.palette.mode]}`}
                onClick={(event) => {
                  setAnchorEl(event.currentTarget);
                }}
                style={{
                  paddingRight: 30,
                  ...props.style,
                }}
              />
              <span
                className={`${styles["arrow"]} ${open ? styles["open"] : ""}`}
                style={{
                  color: theme.palette.text.secondary,
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7 10l5 5 5-5z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </div>
          </>
        }}
      </Measure>
      {helperText != null && <span className={`${styles['label']} ${error ? styles['error'] : ''} ${labelProps?.className}`}>{helperText}</span>}
    </span>;
  }

export const OutlinedTextarea: FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string | undefined | null,
  labelProps?: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
  error?: boolean | undefined | null,
  helperText?: string | undefined | null,
  wrapperProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> | undefined | null
}> = ({
  label,
  labelProps,
  error,
  helperText,
  wrapperProps,
  ...props
}) => {
    const theme = useTheme()
    return <span {...wrapperProps} className={styles['wrapper']}>
      {label != null && <label className={`${styles['label']} ${error ? styles['error'] : ''} ${labelProps?.className}`}>{label}</label>}
      <textarea
        className={`${styles['outlined-field']} ${styles['outlined-textarea']}  ${error ? styles['error'] : ''} ${styles[theme.palette.mode]}`}
        {...props}
      />
      {helperText != null && <span className={`${styles['label']} ${error ? styles['error'] : ''} ${labelProps?.className}`}>{helperText}</span>}
    </span>;
  }

export type OutlinedObjectInputProps<T extends object> = {
  value: T
  onChange: (value: T) => void
} & StrictOmit<OutlinedInputProps, 'value' | 'onChange'>

export function OutlinedObjectInput<T extends object>({
  value,
  onChange,
  ...props
}: OutlinedObjectInputProps<T>) {
  const [text, setText] = useState(() => JSON.stringify(value))

  useEffect(() => {
    setText(JSON.stringify(value))
  }, [value])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value

    setText(newText)

    try {
      const parsed = JSON.parse(newText)

      if (parsed !== null && typeof parsed === 'object') {
        onChange(parsed)
      }
    } catch {
      // JSON ainda inválido enquanto o usuário está digitando.
      // Não chama onChange.
    }
  }

  return (
    <OutlinedInput
      {...props}
      value={text}
      onChange={handleChange}
    />
  )
}