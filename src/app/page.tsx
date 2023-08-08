import { Box, Typography } from "@mui/material"
import MainContainer from "./components/MarginContainer"
import IntroCard from "./components/home/IntroCard"

export default function Home() {
  return (
    <Box component={"section"}>
      <IntroCard
        post={{
          description:
            "Receba sugestões de exercícios, analise sua carga histórica e equilibre seu treino.",
          image: "john-arano-h4i9G-de7Po-unsplash.jpg",
          imageText: "Mulher levantando uma barra",
          linkText: "",
          title: "Treine com inteligência",
        }}
      ></IntroCard>
    </Box>
  )
}
