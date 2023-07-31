"use client"
import axios from "axios"

export const usePost = async (
  body: {
    [index: string]: string
  },
  url: string
) => {
  try {
    const res = await axios.post(url, body, { withCredentials: true })
    return { res }
  } catch (error: any) {
    console.log(error)

    return { error }
  }
}
