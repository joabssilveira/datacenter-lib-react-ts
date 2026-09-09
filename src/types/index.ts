

export type CrudOp = 'create' | 'update'

export type Selectable<T> = T & {
  _selected: boolean,
}

export type ExtendedDescription<T> = T & {
  _extendedDescription: string,
}

export enum CrudModelStatusType {
  created,
  updated,
  deleted,
}

export type CrudModelStatus<T> = T & {
  _status?: CrudModelStatusType
}

export enum DetailsStatus {
  undefined,
  saving,
  success,
  error,
}