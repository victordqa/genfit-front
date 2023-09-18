import { Box, Button, Container } from "@mui/material"
import Typography from "@mui/material/Typography"
import TrainningForm from "../../components/trainings/TrainningForm"
import BoxName from "../../components/boxes/BoxName"

export default function BoxDy() {
  return (
    <Box
      sx={{
        mt: 3,
        pl: { xs: 0, md: 10 },
        pr: { xs: 0, md: 10 },
      }}
    >
      <Box
        sx={{
          borderBottom: "1px solid white",
          padding: 0.5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <BoxName />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: { xs: 0, md: 5 },
          marginTop: 5,
          padding: 1,
          width: "100%",
          minHeight: 300,
        }}
      >
        <TrainningForm />
      </Box>
    </Box>
  )
}
