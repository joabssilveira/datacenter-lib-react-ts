import { Avatar, IconButton, Menu, MenuItem } from "@mui/material"
import { authenticationStateLogout } from 'datacenter-lib-react-ts'
import { IUser } from "datacenter-lib-common-ts"
import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import LogoutIcon from '@mui/icons-material/Logout';

export interface IUserOptionsComponentProps {
  user: IUser,
  datacenterAuthBaseUrl: string,
  onLogOut?: () => void
}

export const UserOptionsComponent: React.FC<IUserOptionsComponentProps> = ({ user, datacenterAuthBaseUrl, onLogOut }) => {
  const dispatch = useDispatch<any>()
  const [menuAnchor, setAnchorElemnt] = useState<Element | (() => Element) | null | undefined>(null)
  const openMenu = Boolean(menuAnchor)

  return <>
    <Menu
      id="basic-menu"
      anchorEl={menuAnchor}
      open={openMenu}
      onClose={() => setAnchorElemnt(null)}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}>
      <MenuItem
        style={{ display: 'flex', gap: 10 }}
        onClick={() => {
          let authUrl = `${datacenterAuthBaseUrl}/profile`
          window.open(authUrl, '_blank')?.focus()
          setAnchorElemnt(null)
        }}
      >
        {user.name}
      </MenuItem>
      <MenuItem
        style={{ display: 'flex', gap: 10 }}
        onClick={() => {
          dispatch(authenticationStateLogout())
          if (onLogOut) onLogOut()
          setAnchorElemnt(null)
        }}
      >
        <LogoutIcon /> Sair
      </MenuItem>
    </Menu>

    <IconButton
      onClick={e => setAnchorElemnt(e.currentTarget)}
    ><Avatar src={user.imageUrl} /></IconButton>
  </>
}