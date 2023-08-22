import { Box, Container } from "@mui/material"
import Typography from "@mui/material/Typography"
import BoxesCards from "../components/boxes/BoxesCards"

export default function Boxes() {
  return (
    <main>
      <Container
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "center",
          width: "auto",
        }}
      >
        <Box sx={{ borderBottom: "1px solid white", padding: 0.5 }}>
          <Typography variant="h3" sx={{ color: "white" }}>
            Boxes
          </Typography>
        </Box>
      </Container>
      <BoxesCards />
    </main>
  )
}
