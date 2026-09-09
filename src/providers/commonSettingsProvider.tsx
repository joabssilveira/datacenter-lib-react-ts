import React, { createContext, useContext } from 'react';

export interface ICommonSettings {
  DC_APIURL: string,
}

const CommonSettingsContext = createContext<ICommonSettings | null>(null)

export const useCommonSettings = () => {
  const ctx = useContext(CommonSettingsContext)
  if (!ctx) throw new Error('useCommonSettings must be used inside CommonSettingsProvider')
  return ctx
}

export const CommonSettingsProvider: React.FC<{ settings: ICommonSettings, children: React.ReactNode }> = ({ settings, children }) => {
  return (
    <CommonSettingsContext.Provider value={settings}>
      {children}
    </CommonSettingsContext.Provider>
  )
}
