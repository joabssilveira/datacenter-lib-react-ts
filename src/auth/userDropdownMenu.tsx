import { Divider, ListItemText, Menu, MenuItem, PopoverVirtualElement } from "@mui/material"
import { IUser } from "datacenter-lib-common-ts"
import React from "react"
import { MdLogout } from "react-icons/md"

interface Props {
  user: IUser,
  anchorEl?: Element | PopoverVirtualElement | (() => Element) | (() => PopoverVirtualElement) | null | undefined
  open: boolean
  onClose?: () => void
  onLogOut?: () => void
  onProfile?: () => void
}

export const UserDropdownMenu = ({
  user,
  anchorEl,
  open,
  onClose,
  onLogOut,
  onProfile,
}: Props) => {
  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            marginTop: .5,
            minWidth: 260,
            borderRadius: 2,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            overflow: "hidden",
          },
        }}
        MenuListProps={{ sx: { p: 0 } }}
      >
        <MenuItem
          onClick={onProfile}
          sx={{
            gap: 1,
            p: 2,
            // py: 1.2,
            fontWeight: 500,
          }}
        >
          <ListItemText 
            primary={user.name}
            secondary={user.email}
          />
        </MenuItem>

        <Divider style={{margin: 0}}/>

        {/* Logout */}
        <MenuItem
          onClick={onLogOut}
          sx={{
            gap: 1,
            py: 1.2,
            fontWeight: 500,
            color: "error.main",
            "&:hover": {
              backgroundColor: "rgba(211, 47, 47, 0.08)",
            },
          }}
        >
          <MdLogout size={20} />
          Sair
        </MenuItem>
      </Menu>
    </>
  )
}
