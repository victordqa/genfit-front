import "./globals.css"
import type { Metadata } from "next"
import ResponsiveAppBar from "./components/navbar/ResponsiveAppBar"

export const metadata: Metadata = {
  title: "Gen Fit",
  description: "Crie, analise e equilibre seus treinos de crossfit",
}

import { Roboto } from "next/font/google"
import AuthContext from "../context/AuthContext"

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={roboto.className}>
        <AuthContext>
          <ResponsiveAppBar />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
