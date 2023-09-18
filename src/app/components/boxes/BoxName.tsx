"use client"
import { useState, useEffect } from "react"
import Typography from "@mui/material/Typography"
import { useGet } from "../../../hooks/useHttp"
import routes from "../../../routes"

import { usePathname } from "next/navigation"

export default function BoxName() {
  const [boxName, setBoxName] = useState("")
  const [loading, setLoading] = useState(true)
  const path = usePathname()
  const boxId = parseInt(path.split("/")[2])

  const fetchAndSetStates = () => {
    useGet(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${routes.getBoxApi}/${boxId}`
    ).then((res) => {
      const statusCode = res.status
      setLoading(false)
      if (statusCode === 200) {
        setBoxName(res.data.box.name)
      } else {
        setBoxName("Box")
        console.log(res)
      }
    })
  }

  useEffect(() => {
    fetchAndSetStates()
  }, [])

  return (
    <Typography variant="h3" sx={{ color: "white" }}>
      {boxName}
    </Typography>
  )
}
