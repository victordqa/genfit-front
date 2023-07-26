"use client"
import axios from "axios"

export const usePost = async (
  body: {
    [index: string]: string
  },
  url: string
) => {
  try {
    const res = await axios.post(url, body)
    return { res }
  } catch (error: any) {
    console.log(error)

    if (error.response && error.response.data.statusCode === 401)
      return { error, message: "Senha ou email invalidos" }
    return { error, message: error.message }
  }
}
