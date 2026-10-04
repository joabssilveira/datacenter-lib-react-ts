import {
  AuthCheckComponent as AuthCheckComponentV2,
  IAuthCheckComponentProps as IAuthCheckComponentPropsV2
} from './authv2/authCheck'
import {
  AuthContextType as AuthContextTypeV2,
  AuthContext as AuthContextV2,
} from './authv2/authContext'
import {
  useAuth as useAuthV2,
} from './authv2/authHook'
import {
  AuthProvider as AuthProviderV2,
  IAuthenticationExt as IAuthenticationExtV2
} from './authv2/authProvider'
import {
  AuthRequiredComponent as AuthRequiredComponentV2,
  IAuthRequiredComponentProps as IAuthRequiredComponentPropsV2
} from './authv2/authRequired'
import {
  UserDropdownMenu as UserDropdownMenuV2,
} from './authv2/userDropdownMenu'
import {
  IUserOptionsComponentProps as IUserOptionsComponentPropsV2,
  UserOptionsComponent as UserOptionsComponentV2,
} from './authv2/userOptions'

// auth common
import {
  AuthUtils,
  authCookieName,
} from './common'

// components
import {
  FlexGrowComponent,
} from './components/common/flexGrow'
import {
  OutlinedInput,
  OutlinedInputProps,
  OutlinedInputPropsBase,
  OutlinedSelect,
  OutlinedTextarea,
  OutlinedObjectInput,
  OutlinedObjectInputProps,
} from './components/common/inputs'
import {
  OutlinedDatePickerComponent,
  OutlinedDatePickerComponentProps,
} from './components/common/inputs/dates'
import {
  getInputValidation,
} from './components/common/inputs/error'
import {
  InputMask,
  InputMaskProps,
  OutlinedInputMask,
  OutlinedInputMaskProps,
} from './components/common/inputs/mask'
import {
  DetailsComponent,
  DetailsGridComponent,
  DetailsGridComponentItem,
  DetailsGridComponentProps,
  IDetailsComponentProps,
} from './components/details/'
import {
  StepContentStyled,
  StepInputStyled,
  StepTitleStyled,
} from './components/details/common'
import {
  HeaderComponent,
  IHeaderComponentActions,
  IHeaderComponentProps,
} from './components/header/'
import {
  SearchInputComponent,
} from './components/searchInput'
import {
  SelectPropsBase,
  SelectPropsBaseExt,
} from './components/selects/common'
import {
  SelectIdentityDocumentComponent,
} from './components/selects/identityDocument'
import {
  SelectWorkgroupComponent,
} from './components/selects/workgroup'
import {
  SelectWorkgroupUnitComponent,
} from './components/selects/workgroupUnit'
import {
  StepperFinishConfirmComponent,
} from './components/stepper/finishConfirm'

// providers
import {
  CommonSettingsProvider,
  ICommonSettings,
  useCommonSettings,
} from './providers/commonSettingsProvider'

// style
import {
  themeDark,
  themeLight,
} from './style/theme/'

import {
  themeInput,
} from './style/theme/input'

// types
import {
  CrudModelStatus,
  CrudModelStatusType,
  CrudOp,
  DetailsStatus,
  ExtendedDescription,
  Selectable,
} from './types'
import {
  EditController,
  EditWizardController,
  NewController,
  NewWizardController,
} from './types/controller'

// auth v2
export {
  AuthCheckComponentV2,
  AuthContextTypeV2,
  AuthContextV2,
  AuthProviderV2,
  AuthRequiredComponentV2,
  IAuthCheckComponentPropsV2,
  IAuthRequiredComponentPropsV2,
  IAuthenticationExtV2,
  IUserOptionsComponentPropsV2,
  NewWizardController,
  UserDropdownMenuV2,
  UserOptionsComponentV2,
  useAuthV2
}

// auth common
export {
  AuthUtils,
  authCookieName
}

export {
  OutlinedObjectInput,
  OutlinedObjectInputProps,
  CommonSettingsProvider,
  CrudModelStatus,
  CrudModelStatusType,
  CrudOp,
  DetailsComponent,
  DetailsGridComponent,
  DetailsGridComponentItem,
  DetailsGridComponentProps,
  DetailsStatus,
  EditController,
  EditWizardController,
  ExtendedDescription,
  FlexGrowComponent,
  HeaderComponent,
  ICommonSettings,
  IDetailsComponentProps,
  IHeaderComponentActions,
  IHeaderComponentProps,
  InputMask,
  InputMaskProps,
  NewController,
  OutlinedDatePickerComponent,
  OutlinedDatePickerComponentProps,
  OutlinedInput,
  OutlinedInputMask,
  OutlinedInputMaskProps,
  OutlinedInputProps,
  OutlinedInputPropsBase,
  OutlinedSelect,
  OutlinedTextarea,
  SearchInputComponent,
  SelectIdentityDocumentComponent,
  SelectPropsBase,
  SelectPropsBaseExt,
  SelectWorkgroupComponent,
  SelectWorkgroupUnitComponent,
  Selectable,
  StepContentStyled,
  StepInputStyled,
  StepTitleStyled,
  StepperFinishConfirmComponent,
  getInputValidation,
  themeDark,
  themeInput,
  themeLight,
  useCommonSettings
}

