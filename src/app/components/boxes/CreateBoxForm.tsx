"use client"
import * as React from "react"
import { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Alert, AlertColor, AlertTitle, TextField } from "@mui/material"
import { usePost } from "../../../hooks/useHttp"
import routes from "../../../routes"
import { createBoxFormValidation } from "../../../validation/validation"
import { useRouter } from "next/navigation"

const inputSyle = {
  margin: "0.5rem",
}

export default function CreateBoxForm({
  fetchAndSetStates,
}: {
  fetchAndSetStates: () => void
}) {
  const [input, setInput] = useState({
    name: "",
  })

  type ValidationsErrors = {
    name: string[] | undefined
  }

  type Alert =
    | { title: string; message: string; severity: AlertColor }
    | undefined

  const [validationErrors, setValidationErrors] = useState<ValidationsErrors>({
    name: undefined,
  })

  const [isDisabled, setDisabled] = useState(false)
  const [alert, setAlert] = useState<Alert>(undefined)
  const { push } = useRouter()

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name
    const inputValue = e.target.value

    setInput((oldInput) => {
      return { ...oldInput, [inputName]: inputValue }
    })
  }

  const prepareHelperText = (errors: string[] | undefined) => {
    if (errors) {
      return errors.reduce((acc, err) => {
        return acc + " " + err
      }, "")
    } else {
      return ""
    }
  }

  const handleSend = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setAlert(undefined)
    setValidationErrors({
      name: undefined,
    })
    setDisabled(true)
    const errors = createBoxFormValidation(input)
    if (Object.entries(errors).length > 0) {
      setValidationErrors(errors as ValidationsErrors)
    } else {
      const res = await usePost(
        input,
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${routes.createBoxesApi}`
      )

      const statusCode = res.status
      if (statusCode === 201) {
        setAlert({
          title: "Sucesso",
          message: "Box Criado!",
          severity: "success",
        })
        fetchAndSetStates()
      } else if (statusCode === 401) {
        push(routes.home)
      } else {
        setAlert({
          title: "Erro",
          message: "Ops, algo inesperado ocorreu",
          severity: "error",
        })
      }
    }

    setDisabled(false)
  }
  return (
    <div>
      <Box sx={{ minHeight: "40vh" }}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ margin: "1rem" }}
        >
          Entre com o nome do box
        </Typography>
        <form>
          <TextField
            error={validationErrors.name !== undefined}
            helperText={prepareHelperText(validationErrors.name)}
            sx={inputSyle}
            id="name"
            label="Nome"
            type="text"
            autoComplete="name"
            name="name"
            value={input.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInput(e)
            }
          />

          <Button
            variant="outlined"
            color="secondary"
            type="submit"
            sx={{
              backgroundColor: "#444ca3!important",
              margin: "0.5rem",
              color: "white",
              display: "block",
            }}
            onClick={handleSend}
            disabled={isDisabled}
          >
            Criar
          </Button>
          {alert && (
            <Alert
              severity={alert.severity}
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              <AlertTitle>{alert.title}</AlertTitle>
              {alert.message}
            </Alert>
          )}
        </form>
      </Box>
    </div>
  )
}
