import { Box, Typography } from "@mui/material"
import MainContainer from "./components/MainContainer"

export default function Home() {
  return (
    <MainContainer>
      <Box component={"section"}>
        <Typography variant="h1">Treinador</Typography>
      </Box>
    </MainContainer>
  )
}
