import PersonIcon from "@mui/icons-material/Person"
import { Avatar, IconButton } from "@mui/material"
import { IUser } from "datacenter-lib-common-ts"
import React, { useState } from "react"
import { UserDropdownMenu } from './userDropdownMenu'
import { useAuth } from "./authHook"

export interface IUserOptionsComponentProps {
  user: IUser,
  datacenterAuthBaseUrl: string,
  onLogOut?: () => void
}

export const UserOptionsComponent: React.FC<IUserOptionsComponentProps> = ({ user, datacenterAuthBaseUrl, onLogOut }) => {
  const [menuAnchor, setAnchorElemnt] = useState<Element | (() => Element) | null | undefined>(null)
  const openMenu = Boolean(menuAnchor)
  const auth = useAuth()

  return <>
    <UserDropdownMenu
      user={user}
      anchorEl={menuAnchor}
      open={openMenu}
      onClose={() => setAnchorElemnt(null)}
      onLogOut={() => {
        auth.logout()
        onLogOut?.()
        setAnchorElemnt(null)
      }}
      onProfile={() => {
        let authUrl = `${datacenterAuthBaseUrl}/profile`
        window.open(authUrl, '_blank')?.focus()
        setAnchorElemnt(null)
      }}
    />

    <IconButton
      onClick={e => setAnchorElemnt(e.currentTarget)}
    ><Avatar src={user.imageUrl}>
        <PersonIcon />
      </Avatar></IconButton>
  </>
}