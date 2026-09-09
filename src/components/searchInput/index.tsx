import { IconButton, TextField, TextFieldProps } from '@mui/material'
import * as React from 'react'
import { FaSearch } from "react-icons/fa"

type SearchInputPropsBase = {
  onIconClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}
type SearchInputProps = SearchInputPropsBase & TextFieldProps

export const SearchInputComponent = (props: SearchInputProps) => {
  const { onIconClick, ...rest } = props
  return <TextField
    // nao usar props diretamente no TextFields, ele tem propriedades que o TextField nao reconhece causando o erro abaixo
    // Warning: Invalid value for prop `iconclick` on <div> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior
    // essa doc explica o problema: https://legacy.reactjs.org/warnings/unknown-prop.html
    {...rest}

    style={{
      ...rest.style,
      boxSizing: rest.style?.boxSizing ?? 'border-box',
    }}

    slotProps={{
      inputLabel: {
        ...rest.slotProps?.inputLabel,
        style: {
          ...(rest.slotProps?.inputLabel as any)?.style,
          paddingInline: (rest.slotProps?.inputLabel as any)?.style.paddingInline ?? rest.style?.paddingInline,
          boxSizing: (rest.slotProps?.inputLabel as any)?.style.boxSizing ?? 'border-box',
        }
      },
      input: {
        ...rest.slotProps?.input,
        endAdornment: (rest.slotProps?.input as any)?.endAdornment || <IconButton
          onClick={onIconClick}
        >
          <FaSearch size={20} style={{
            color: 'silver',
          }} />
        </IconButton>
      }
    }}

    label={rest?.label || 'Pesquisar'}
    placeholder={rest.placeholder || 'Digite sua pesquisa aqui'}

  />
}