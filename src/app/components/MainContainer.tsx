import { Box } from "@mui/material"

export default function MainContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box component={"main"} sx={{ marginLeft: 6, marginRight: 6 }}>
      {children}
    </Box>
  )
}
