import { CrudOp, DetailsStatus } from "datacenter-lib-react-ts"
import { StrictOmit } from "fwork-jsts-common";

export type NewController<T> = {
  getInitData: () => T,
  data: Partial<T>,
  setData: React.Dispatch<React.SetStateAction<Partial<T>>>,
  validate: () => boolean,
  save: () => Promise<void>,
  showErrors: boolean | undefined,
  setShowErrors: React.Dispatch<React.SetStateAction<boolean | undefined>>,
}

export type NewWizardController<T> = {
  status: DetailsStatus,
  setStatus: React.Dispatch<React.SetStateAction<DetailsStatus>>,
  wizardFinished: boolean,
  setWizardFinished: React.Dispatch<React.SetStateAction<boolean>>,
  reset: () => void,
} & NewController<T>

export type EditController<T> = {
  getData: (args: {
    uuid: string;
    onSuccess?: ((data: T | undefined) => void) | undefined;
  }) => Promise<void>,
  op: CrudOp,
  setOp: React.Dispatch<React.SetStateAction<CrudOp>>,
  // TODO: substituir por status: DetailsStatus
  saving: boolean,
} & NewController<T>

export type EditWizardController<T> = NewWizardController<T> & StrictOmit<EditController<T>, 'saving'>