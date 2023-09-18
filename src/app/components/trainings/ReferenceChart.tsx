"use client"

import React, { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { Box, CircularProgress } from "@mui/material"
import { usePathname } from "next/navigation"
import { useGet } from "../../../hooks/useHttp"
import routes from "../../../routes"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Referência vs Últimos 2 treinos",
    },
    scales: {
      y: false,
    },
  },
}

type Labels = {
  name: string
  refWeekLoad: number
  accWeekLoad: number
}[]

export function ReferenceChart({ reloadChart }: { reloadChart: boolean }) {
  const [loading, setLoading] = useState(false)
  const [labels, setLabels] = useState<Labels>([])
  const [error, setError] = useState("")
  const path = usePathname()
  const boxId = parseInt(path.split("/")[2])

  const data = {
    labels: labels.map((label) => label.name),
    datasets: [
      {
        label: "Referência",
        data: labels.map((label) => label.refWeekLoad),
        backgroundColor: "rgba(75, 122, 45, 0.5)",
      },
      {
        label: "Últimos 2 treinos",
        data: labels.map((label) => label.accWeekLoad),
        backgroundColor: "rgba(40, 92, 127, 0.5)",
      },
    ],
  }
  useEffect(() => {
    setError("")
    setLoading(true)

    useGet(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${routes.calcTrainningLoadsApi}?boxId=${boxId}`
    ).then((res) => {
      const statusCode = res.status
      setLoading(false)
      if (statusCode === 200) {
        setLabels(res.data)
      } else {
        setError("Ops... Nao foi possivel carregar, tente mais tarde")
        console.log(res)
      }
    })
  }, [reloadChart])

  let content = <CircularProgress />

  if (!loading && !error)
    content = <Bar options={options} data={data} className="height h-full" />

  if (error) content = <p>{error}</p>

  return (
    <Box
      sx={{
        width: { xs: 350, md: 500, lg: 800 },
        height: { xs: 250, md: 250, lg: 300 },
      }}
    >
      {content}
    </Box>
  )
}
