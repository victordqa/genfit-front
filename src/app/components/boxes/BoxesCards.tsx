"use client"
import { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/material/styles"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import { useGet } from "../../../hooks/useHttp"
import routes, { publicRoutes } from "../../../routes"
import CircularProgress from "@mui/material/CircularProgress"
import { Fab } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import ParametricModal from "../ParametricModal"
import CreateBoxForm from "./CreateBoxForm"
import { useRouter } from "next/navigation"

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
)

type Box = {
  id: number
  name: string
  coachId: number
  trainnings: {
    id: number
    created_at: string
    updated_at: string
    box_id: number
  }[]
}[]

export default function BoxesCards() {
  const [boxes, setBoxes] = useState<Box>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { push } = useRouter()

  const fetchAndSetStates = () => {
    setError("")
    useGet(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${routes.listBoxesApi}`
    ).then((res) => {
      const statusCode = res.status
      console.log(res)
      setLoading(false)
      if (statusCode === 200) {
        setBoxes(res.data.boxes)
      } else if (statusCode === 401) {
        push(routes.home)
      } else {
        console.log(res)
      }
    })
  }

  useEffect(() => {
    fetchAndSetStates()
  }, [])

  const card = (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )

  let content = (
    <Box
      sx={{
        flexGrow: 1,
        margin: 6,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  )

  if (!loading && boxes.length) {
    content = (
      <Box
        sx={{
          flexGrow: 1,
          margin: 6,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ParametricModal
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          buttonTxt="Criar"
          buttonSx={{ margin: 4, border: "2px solid white" }}
        >
          <CreateBoxForm fetchAndSetStates={fetchAndSetStates} />
        </ParametricModal>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 4, md: 6 }}
        >
          {boxes.map((box) => (
            <Grid item xs={2} sm={2} md={2} key={box.id}>
              {card}
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  } else if (!loading && !boxes.length) {
    content = (
      <Box
        sx={{
          flexGrow: 1,
          margin: 6,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ParametricModal
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          buttonTxt="Criar"
        >
          <CreateBoxForm fetchAndSetStates={fetchAndSetStates} />
        </ParametricModal>

        <Typography variant="h5" sx={{ color: "white" }}>
          Crie um box para comecar!
        </Typography>
      </Box>
    )
  }

  return <>{content}</>
}
