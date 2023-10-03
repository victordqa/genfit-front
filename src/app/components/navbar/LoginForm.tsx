"use client"
import { useContext, useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Alert, AlertTitle, TextField } from "@mui/material"
import { postReq } from "../../../hooks/useHttp"
import { useRouter } from "next/navigation"
import routes from "../../../routes"
import SignUpForm from "../SingUpForm"
import ParametricModal from "../ParametricModal"
import { AuthenticationContext } from "../../../context/AuthContext"

const inputSyle = {
  margin: "0.5rem",
}

export default function LoginForm({
  handleClose,
}: {
  handleClose: () => void
}) {
  const [input, setInput] = useState({ email: "", password: "" })
  const [isDisabled, setDisabled] = useState(false)
  const [error, setError] = useState("")
  const { push } = useRouter()
  const { setAuth } = useContext(AuthenticationContext)

  const [openSignUp, setSignUpOpen] = useState(false)
  const handleSignUpOpen = () => setSignUpOpen(true)
  const handleSignUpClose = () => setSignUpOpen(false)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name
    const inputValue = e.target.value
    setInput((oldInput) => {
      return { ...oldInput, [inputName]: inputValue }
    })
  }

  const useHandleSend = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setError("")
    setDisabled(true)
    const res = await postReq(
      input,
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${routes.login}`
    )
    setDisabled(false)

    const statusCode = res.status
    if (statusCode === 201) {
      //update coach golbalData state here
      const { coach } = res.data
      setAuth({ coachData: coach })
      push(routes.boxesRoute)
      //save token to local storage
      localStorage.setItem("genFitAccessToken", res.data.accessToken)
      handleClose()
    } else if (statusCode === 401) {
      setError("Email ou senha invalidos")
    } else {
      setError("Ops, algo inesperado ocorreu")
    }
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
          Entre com suas credenciais
        </Typography>
        <form>
          <TextField
            error={false}
            sx={inputSyle}
            id="login-email"
            label="email"
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
            id="login-pwd"
            label="Password"
            type="password"
            autoComplete="current-password"
            name="password"
            value={input.password}
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
            variant="contained"
            color="secondary"
            sx={{ backgroundColor: "#444ca3!important", margin: "0.5rem" }}
            onClick={useHandleSend}
            disabled={isDisabled}
            type="submit"
          >
            Entrar
          </Button>
        </form>

        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ margin: "1rem" }}
        >
          Ainda não possui uma conta?
        </Typography>
        <ParametricModal
          open={openSignUp}
          handleOpen={handleSignUpOpen}
          handleClose={handleSignUpClose}
          buttonSx={{
            color: "#444ca3!important",
            border: "2px solid transparent",
            backgroundColor: "white",
            margin: "0.5rem",
            ":hover": { border: "2px solid #444ca3", backgroundColor: "white" },
          }}
          buttonTxt="Registrar"
        >
          <SignUpForm />
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
              width: "6rem",
            }}
            onClick={handleSignUpClose}
          >
            Fechar
          </Button>
        </ParametricModal>
      </Box>
    </div>
  )
}
