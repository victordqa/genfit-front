import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import React, { useContext } from "react"
import { AuthenticationContext } from "../../../context/AuthContext"
import routes from "../../../routes"
import Link from "next/link"

const pages = [
  { name: "Dashboard", path: routes.dashboard },
  { name: "Boxes", path: routes.boxesRoute },
]
export default function NavMenu() {
  const { coachData } = useContext(AuthenticationContext)
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "flex", md: "none" },
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {coachData &&
            pages.map((page) => (
              <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                <Link href={page.path}> {page.name}</Link>
              </MenuItem>
            ))}
        </Menu>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
          marginLeft: 3,
        }}
      >
        {coachData &&
          pages.map((page) => (
            <Box key={page.name} sx={{ mr: 2 }}>
              <Link href={page.path}>{page.name.toLocaleUpperCase()}</Link>
            </Box>
          ))}
      </Box>
    </>
  )
}
