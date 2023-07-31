"use client"

import { Box, Button, Modal } from "@mui/material"
import React from "react"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}

export default function ParametricModal({
  open,
  handleOpen,
  handleClose,
  children,
}: {
  open: boolean
  handleOpen: () => void
  handleClose: () => void
  children: React.ReactNode
}) {
  return (
    <div>
      <Button
        variant="contained"
        sx={{ border: "2px solid white" }}
        onClick={handleOpen}
      >
        Entrar
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  )
}
