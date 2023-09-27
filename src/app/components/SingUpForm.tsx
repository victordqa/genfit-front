"use client"
import * as React from "react"
import { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Alert, AlertColor, AlertTitle, TextField } from "@mui/material"
import { postReq } from "../../hooks/useHttp"
import routes from "../../routes"
import { singUpFormValidation } from "../../validation/validation"
import { AlertType } from "./trainings/types"

const inputSyle = {
  margin: "0.5rem",
}

export default function SignUpForm() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    name: "",
    password_confirmation: "",
  })

  type ValidationsErrors = {
    name: string[] | undefined
    email: string[] | undefined
    password: string[] | undefined
    password_confirmation: string[] | undefined
  }

  const [validationErrors, setValidationErrors] = useState<ValidationsErrors>({
    name: undefined,
    email: undefined,
    password: undefined,
    password_confirmation: undefined,
  })

  const [isDisabled, setDisabled] = useState(false)
  const [alert, setAlert] = useState<AlertType>(undefined)

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
      email: undefined,
      password: undefined,
      password_confirmation: undefined,
    })
    setDisabled(true)
    const errors = singUpFormValidation(input)
    if (Object.entries(errors).length > 0) {
      setValidationErrors(errors as ValidationsErrors)
    } else {
      const res = await postReq(
        { ...input, confirmPassword: input.password_confirmation },
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${routes.signup}`
      )

      const statusCode = res.status
      if (statusCode === 201) {
        setAlert({
          title: "Sucesso",
          message: "Conta criada! Realize o login",
          severity: "success",
        })
      } else if (statusCode === 422) {
        setAlert({
          title: "Erro",
          message: "Este email ja foi utilizado",
          severity: "error",
        })
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
      <Box sx={{ minHeight: "70vh" }}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ margin: "1rem" }}
        >
          Entre com suas informações
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
          <TextField
            error={validationErrors.email !== undefined}
            helperText={prepareHelperText(validationErrors.email)}
            sx={inputSyle}
            id="signup-email"
            label="Email"
            type="email"
            name="email"
            value={input.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInput(e)
            }
            autoComplete="current-email"
          />
          <TextField
            error={validationErrors.password !== undefined}
            helperText={prepareHelperText(validationErrors.password)}
            sx={inputSyle}
            id="signup-pwd"
            label="Senha"
            type="password"
            autoComplete="current-password"
            name="password"
            value={input.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInput(e)
            }
          />

          <TextField
            error={validationErrors.password_confirmation !== undefined}
            helperText={prepareHelperText(
              validationErrors.password_confirmation
            )}
            sx={inputSyle}
            id="signup-confirm-pwd"
            label="Confirmar Senha"
            type="password"
            autoComplete="current-password"
            name="password_confirmation"
            value={input.password_confirmation}
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
            }}
            onClick={handleSend}
            disabled={isDisabled}
          >
            Registrar
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
