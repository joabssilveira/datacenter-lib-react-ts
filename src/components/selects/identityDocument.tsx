import axios, { AxiosResponse } from 'axios'
import { ApiRoutesNames, IIdentityDocument } from 'datacenter-lib-common-ts'
import { browserLang } from 'fwork-jsts-browser'
import { CommonUtils } from 'fwork-jsts-common'
import {
  AutocompleteClientComponentExt, AutocompleteClientExtOptionType,
} from 'fwork-react-mui-ext'
import { buildQueryParams, GQLGetResponse, GQLWhere } from 'goqlite-client'
import React, {
  FC,
} from 'react'
import { useCommonSettings } from '../../providers/commonSettingsProvider'
import { SelectPropsBaseExt } from './common'

export const SelectIdentityDocumentComponent: FC<SelectPropsBaseExt<IIdentityDocument>> = ({
  label,
  error,
  helperText,
  onGetNested,
  where: additionalWhere,
  ...props
}) => {
  const settings = useCommonSettings()

  const handleOnGetData = async (filter: string, key: boolean) => {
    let where: GQLWhere<IIdentityDocument> | undefined

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

    const response: AxiosResponse<GQLGetResponse<IIdentityDocument>> = await axios.get(
      `${settings.DC_APIURL}${ApiRoutesNames.identityDocuments}`,
      {
        params: buildQueryParams<IIdentityDocument>({
          where,
          nested: onGetNested?.(undefined),
          limit: 20
        })
      }
    )

    if (response.status == 200) {
      response.data.payload?.sort((a, b) => a.name.localeCompare(b.name, browserLang))
    }

    return response.data?.payload?.map(p => ({
      id: p.uuid,
      data: p,
      type: AutocompleteClientExtOptionType.item
    }))
  }

  return <AutocompleteClientComponentExt<IIdentityDocument>
    {...props}

    getAllOnOpen={props.getAllOnOpen != null ? props.getAllOnOpen : true}
    inputValueKeyName="data.name"
    onGetData={handleOnGetData}
    textFieldProps={{
      label: label ?? 'Tipo do Documento',
      error,
      helperText,
    }}
  />
}