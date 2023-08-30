import { Box, Container } from "@mui/material"
import Typography from "@mui/material/Typography"
import TrainningForm from "../../components/trainings/TrainningForm"

export default function BoxDy() {
  return (
    <main>
      <Container
        sx={{
          mt: 3,
          width: { xs: 300, md: 800 },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ borderBottom: "1px solid white", padding: 0.5 }}>
            <Typography variant="h3" sx={{ color: "white" }}>
              Box
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              borderRadius: 5,
              marginTop: 5,
              padding: 1,
              width: "100%",
            }}
          >
            <TrainningForm />
          </Box>
        </Box>
      </Container>
    </main>
  )
}
