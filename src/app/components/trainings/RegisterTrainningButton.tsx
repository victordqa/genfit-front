import { Alert, AlertTitle, Box, Button } from "@mui/material"
import React, { useContext, useState } from "react"
import routes from "../../../routes"
import { AlertType, TrainningWithIds } from "./types"
import { usePost } from "../../../hooks/useHttp"

export default function RegisterTrainningButton({
  trainnings,
  boxId,
}: {
  trainnings: TrainningWithIds[]
  boxId: number
}) {
  const parseToBackEnd = (trainnings: TrainningWithIds[]) => {
    const parsedTrainnings = trainnings.map((trainning) => {
      return { trainningWithBlockIds: trainning.trainning }
    })

    const req = { boxId, trainnings: parsedTrainnings }
    console.log(req)
    return req
  }

  const [isDisabled, setDisabled] = useState(false)
  const [alert, setAlert] = useState<AlertType>(undefined)

  const handleSend = async () => {
    setAlert(undefined)
    setDisabled(true)

    const res = await usePost(
      parseToBackEnd(trainnings),
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${routes.createTrainningApi}`
    )

    const statusCode = res.status
    if (statusCode === 201) {
      setAlert({
        title: "Sucesso",
        message: "Treino Registrado!",
        severity: "success",
      })
    } else if (statusCode === 400) {
      setAlert({
        title: "Erro",
        message: " Por favor, verifique os dados inseridos abaixo",
        severity: "error",
      })
    } else {
      setAlert({
        title: "Erro",
        message: "Ops, algo inesperado ocorreu. Por favor, tente mais tarde",
        severity: "error",
      })
    }
    setDisabled(false)
  }

  const layOutSx = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  }

  const buttonSx = {
    color: "#444ca3!important",
    border: "1px solid #797da9",
    backgroundColor: "white",
    margin: "0.5rem",
    ":hover": { border: "2px solid #444ca3", backgroundColor: "white" },
  }
  let content = (
    <Box sx={layOutSx}>
      <Button
        sx={buttonSx}
        variant="contained"
        onClick={() => {
          handleSend()
        }}
        disabled={isDisabled}
      >
        Registrar Treino
      </Button>
    </Box>
  )

  if (alert?.title === "Erro") {
    content = (
      <Box sx={layOutSx}>
        <Button
          sx={buttonSx}
          variant="contained"
          onClick={() => {
            handleSend()
          }}
          disabled={isDisabled}
        >
          Registrar Treino
        </Button>
        <Alert
          severity={alert.severity}
          sx={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          <AlertTitle>{alert.title}</AlertTitle>
          {alert.message}
        </Alert>
      </Box>
    )
  }

  if (alert?.title === "Sucesso") {
    content = (
      <Box sx={layOutSx}>
        <Alert
          severity={alert.severity}
          sx={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          <AlertTitle>{alert.title}</AlertTitle>
          {alert.message}
        </Alert>
      </Box>
    )
  }

  return content
}
