"use client"
import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

import AdbIcon from "@mui/icons-material/Adb"
import { ThemeProvider } from "@mui/material/styles"
import theme from "../config/theme"

import Link from "next/link"
import LoginButton from "./LoginButton"
import routes from "../../../routes"
import NavMenu from "./NavMenu"

function ResponsiveAppBar() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Box
          sx={{
            marginLeft: "5%",
            marginRight: "5%",
          }}
        >
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
              <AdbIcon />
              <Link href={routes.home}>GENFIT</Link>
            </Box>
            <NavMenu />
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              GENFIT
            </Typography>
            <LoginButton />
          </Toolbar>
        </Box>
      </AppBar>
    </ThemeProvider>
  )
}
export default ResponsiveAppBar
