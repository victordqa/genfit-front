import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ResponsiveAppBar from "./components/ResponsiveAppBar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gen Fit",
  description: "Crie, analise e equilibre seus treinos de crossfit",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <ResponsiveAppBar />
        {children}
      </body>
    </html>
  )
}
