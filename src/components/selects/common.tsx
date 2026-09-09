import { StrictOmit } from "fwork-jsts-common"
import { AutocompleteClientComponentExtProps, IAutocompleteClientComponentProps } from "fwork-react-mui-ext"
import { Nested, GQLWhere } from "goqlite-client"
import { ReactNode } from "react"

export type SelectPropsBase<T extends {}> = {
  label?: ReactNode
  error?: boolean | undefined
  helperText?: React.ReactNode
  onGetNested?: (defaultNested: Nested<T> | undefined) => Nested<T> | undefined
  where?: GQLWhere<T> | undefined
} & StrictOmit<IAutocompleteClientComponentProps<T>, 'inputValueKeyName' | 'onGetData'>

export type SelectPropsBaseExt<T extends {}> = {
  label?: ReactNode
  error?: boolean | undefined
  helperText?: React.ReactNode
  onGetNested?: (defaultNested: Nested<T> | undefined) => Nested<T> | undefined
  where?: GQLWhere<T> | undefined
} & StrictOmit<AutocompleteClientComponentExtProps<T>, 'inputValueKeyName' | 'onGetData' | 'addOption'>