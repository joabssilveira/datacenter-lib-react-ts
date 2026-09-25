import { AutocompleteOwnerState, AutocompleteRenderOptionState, Box, ListItemText } from '@mui/material'
import axios, { AxiosResponse } from 'axios'
import { ApiRoutesNames, IWorkgroupUnit, WorkgroupUnitUtils } from 'datacenter-lib-common-ts'
import { browserLang } from 'fwork-jsts-browser'
import { CommonUtils } from 'fwork-jsts-common'
import { AutocompleteClientComponent } from 'fwork-react-mui-ext'
import { buildQueryParams, GQLGetResponse, GQLWhere, Nested } from 'goqlite-client'
import React, { FC } from 'react'
import { useCommonSettings } from '../../providers/commonSettingsProvider'
import { SelectPropsBase } from './common'

export const SelectWorkgroupUnitComponent: FC<SelectPropsBase<IWorkgroupUnit>> = ({
  label,
  error,
  helperText,
  onGetNested,
  where: additionalWhere,
  ...props
}) => {
  const settings = useCommonSettings()

  const handleOnGetData = async (filter: string, key: boolean) => {
    let where: GQLWhere<IWorkgroupUnit> | undefined

    if (!CommonUtils.isNullOrEmpty(filter)) {
      where = key ? {
        legalPersonUuid: filter
      } : WorkgroupUnitUtils.getFullTextSearchWhere(filter)
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

    const _defaultNested: Nested<IWorkgroupUnit> = {
      workgroup: true,
      legalPerson: {
        nested: {
          workgroup: true
        }
      }
    }

    const response: AxiosResponse<GQLGetResponse<IWorkgroupUnit>> = await axios.get(
      `${settings.DC_APIURL}${ApiRoutesNames.workgroupUnits}`,
      {
        params: buildQueryParams<IWorkgroupUnit>({
          where,
          nested: onGetNested?.(_defaultNested) ?? _defaultNested,
          limit: 20
        })
      }
    )

    if (response.status == 200) {
      response.data.payload?.sort((a, b) => a.legalPerson?.name.localeCompare(b.legalPerson?.name ?? '', browserLang) ?? 0)
    }

    return response.data?.payload
  }

  return <AutocompleteClientComponent<IWorkgroupUnit>
    {...props}

    getAllOnOpen={props.getAllOnOpen != null ? props.getAllOnOpen : true}
    inputValueKeyName="legalPerson.name"
    onGetData={handleOnGetData}
    textFieldProps={{
      label: label ?? 'Unidade',
      error,
      helperText,
    }}
    renderOption={(props: React.HTMLAttributes<HTMLLIElement> & {
      key: React.Key;
    }, option: IWorkgroupUnit, _state: AutocompleteRenderOptionState, _ownerState: AutocompleteOwnerState<IWorkgroupUnit, any, any, any, any>) => {
      const { key, ...optionProps } = props;

      return <Box
        key={key}
        component="li"
        {...optionProps}
      >
        <ListItemText
          primary={option.legalPerson?.name}
          secondary={`Em ${option.legalPerson?.workgroup?.name}`}
        />
      </Box>
    }}
  />
}