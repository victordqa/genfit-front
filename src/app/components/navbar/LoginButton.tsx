"use client"
import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Button,
} from "@mui/material"
import ParametricModal from "../ParametricModal"
import LoginForm from "./LoginForm"
import { useContext, useState } from "react"
import { AuthenticationContext } from "../../../context/AuthContext"
import { getReq } from "../../../hooks/useHttp"
import routes from "../../../routes"
import { useRouter } from "next/navigation"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

export default function LoginButton() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const { coachData, setAuth } = useContext(AuthenticationContext)

  const { push } = useRouter()

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleLogout = () => {
    getReq(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${routes.logout}`)
    localStorage.removeItem("genFitAccessToken")
    setAuth({ coachData: null })
    push(routes.home)
  }

  return (
    <>
      {coachData ? (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <AccountCircleIcon sx={{ color: "white" }} fontSize="large" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography onClick={handleLogout} textAlign="center">
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        <ParametricModal
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        >
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              sx={{
                color: "#444ca3!important",
                border: "2px solid transparent",
                backgroundColor: "white",
                margin: "0.5rem",
                ":hover": {
                  border: "2px solid #444ca3",
                  backgroundColor: "white",
                },
                width: "3rem",
              }}
              onClick={handleClose}
            >
              X
            </Button>
          </Box>
          <LoginForm handleClose={handleClose} />
        </ParametricModal>
      )}
    </>
  )
}
