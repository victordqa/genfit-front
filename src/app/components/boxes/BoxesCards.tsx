"use client"
import { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import { getReq } from "../../../hooks/useHttp"
import routes, { publicRoutes } from "../../../routes"
import CircularProgress from "@mui/material/CircularProgress"
import ParametricModal from "../ParametricModal"
import CreateBoxForm from "./CreateBoxForm"
import { useRouter } from "next/navigation"

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
  const { push } = useRouter()

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleDetailsClick = (boxId: number) => {
    push(`${routes.boxPage}/${boxId}`)
  }

  const fetchAndSetStates = () => {
    setError("")
    getReq(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${routes.listBoxesApi}`
    ).then((res) => {
      const statusCode = res.status
      setLoading(false)
      if (statusCode === 200) {
        setBoxes(res.data.boxes)
      } else {
        console.log(res)
      }
    })
  }

  useEffect(() => {
    fetchAndSetStates()
  }, [])

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
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {box.name}
                  </Typography>

                  <Typography variant="body2">
                    {box.trainnings.length} treinos no histórico.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => handleDetailsClick(box.id)}
                    size="small"
                  >
                    DETALHES
                  </Button>
                </CardActions>
              </Card>
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
