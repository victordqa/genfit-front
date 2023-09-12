import React from "react"
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
import { Box } from "@mui/material"

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
      text: "Chart.js Bar Chart",
    },
  },
}

const labels = ["January", "February", "March", "April", "May", "June", "July"]

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => Math.random() * 1000),
      backgroundColor: "rgba(75, 122, 45, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => Math.random() * 1000),
      backgroundColor: "rgba(40, 92, 127, 0.5)",
    },
  ],
}

export function ReferenceChart() {
  return (
    <Box
      sx={{
        width: { xs: 300, md: 500, lg: 800 },
        height: { xs: 200, md: 250, lg: 300 },
      }}
    >
      <Bar options={options} data={data} className="height h-full" />
    </Box>
  )
}
