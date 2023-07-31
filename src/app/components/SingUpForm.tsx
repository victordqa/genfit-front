"use client"
import * as React from "react"
import { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Alert, AlertTitle, TextField } from "@mui/material"
import { usePost } from "../../hooks/useHttp"
import { useRouter } from "next/navigation"
import routes from "../../routes"

const inputSyle = {
  margin: "0.5rem",
}

export default function SignUpForm({
  handleClose,
}: {
  handleClose: () => void
}) {
  const [input, setInput] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  })

  const [isDisabled, setDisabled] = useState(false)
  const [error, setError] = useState("")
  const { push } = useRouter()

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name
    const inputValue = e.target.value
    console.log(inputValue)
    setInput((oldInput) => {
      return { ...oldInput, [inputName]: inputValue }
    })
  }

  const handleSend = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setError("")
    setDisabled(true)
    //VALIDATE (INPUT)

    // const res = await usePost(
    //   input,
    //   `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${process.env.NEXT_PUBLIC_LOGIN_PATH}`
    // )
    setDisabled(false)

    // const statusCode = res.error?.response?.data?.statusCode || res.res?.status
    // if (statusCode === 201) {
    //   push(routes.boxesRoute)
    //   handleClose()
    // } else if (statusCode === 401) {
    //   setError("Email ou senha invalidos")
    // } else {
    //   setError("Ops, algo inesperado ocorreu")
    // }
  }
  return (
    <div>
      <Box>
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
            error={false}
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
            sx={inputSyle}
            id="signup-confirm-pwd"
            label="Confirmar Senha"
            type="password"
            autoComplete="current-password"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInput(e)
            }
          />

          {error.length > 0 && (
            <Alert
              severity="error"
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              <AlertTitle>Erro</AlertTitle>
              {error}
            </Alert>
          )}

          <Button
            variant="outlined"
            color="secondary"
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
        </form>
      </Box>
    </div>
  )
}
