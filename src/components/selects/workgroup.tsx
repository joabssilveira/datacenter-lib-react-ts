import axios, { AxiosResponse } from 'axios'
import { ApiRoutesNames, IWorkgroup } from 'datacenter-lib-common-ts'
import { browserLang } from 'fwork-jsts-browser'
import { CommonUtils } from 'fwork-jsts-common'
import { AutocompleteClientComponent } from 'fwork-react-mui-ext'
import { buildQueryParams, GQLGetResponse, GQLWhere } from 'goqlite-client'
import React, { FC } from 'react'
import { useCommonSettings } from '../../providers/commonSettingsProvider'
import { SelectPropsBase } from './common'

export const SelectWorkgroupComponent: FC<SelectPropsBase<IWorkgroup>> = ({
  label,
  error,
  helperText,
  onGetNested,
  where: additionalWhere,
  ...props
}) => {
  const settings = useCommonSettings()

  const handleOnGetData = async (filter: string, key: boolean) => {
    let where: GQLWhere<IWorkgroup> | undefined

    if (!CommonUtils.isNullOrEmpty(filter)) {
      where = key ? {
        uuid: filter
      } : {
        name: { $ilike: filter }
      }
    }
    if (additionalWhere)
      where = {
        $and: [
          additionalWhere,
          {
            ...where
          }
        ]
      }

    const response: AxiosResponse<GQLGetResponse<IWorkgroup>> = await axios.get(
      `${settings.DC_APIURL}${ApiRoutesNames.workgroups}`,
      {
        params: buildQueryParams<IWorkgroup>({
          where,
          nested: onGetNested?.(undefined),
          limit: 20
        })
      }
    )

    if (response.status == 200) {
      response.data.payload?.sort((a, b) => a.name.localeCompare(b.name, browserLang))
    }

    return response.data?.payload
  }

  return <AutocompleteClientComponent<IWorkgroup>
    {...props}

    getAllOnOpen={props.getAllOnOpen != null ? props.getAllOnOpen : true}
    inputValueKeyName="name"
    onGetData={handleOnGetData}
    textFieldProps={{
      label: label ?? 'Grupo de Trabalho',
      error,
      helperText,
    }}
  />
}