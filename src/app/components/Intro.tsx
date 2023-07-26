import { Box } from "@mui/material"

export default function Intro() {
  return (
    <Box
      component={"section"}
      sx={{
        width: 300,
        height: "80vh",
        backgroundColor: "primary.dark",
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    ></Box>
  )
}
