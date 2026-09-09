import { StringUtils } from "fwork-jsts-common"
import { ReactNode } from "react"

export const getInputValidation = (args: {
  value?: string,
  requiredSettings?: {
    helperText: ReactNode,
    active?: boolean
  },
  invalidSettings?: {
    helperText: ReactNode,
    active?: boolean,
    regexPattern: string,
  }
}) => {
  const { value, requiredSettings, invalidSettings, } = args

  const result: {
    error?: boolean | undefined,
    helperText?: React.ReactNode
  } = {
    error: (requiredSettings?.active && !value) || (invalidSettings?.active && !!value && !StringUtils.regExpCheck(value, invalidSettings.regexPattern)),
    helperText: (requiredSettings?.active && !value ? requiredSettings.helperText : undefined) ?? (invalidSettings?.active && !!value && !StringUtils.regExpCheck(value, invalidSettings.regexPattern) ? invalidSettings.helperText : undefined)
  }

  return result
}