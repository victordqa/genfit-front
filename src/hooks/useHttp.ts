import axios from "axios"

const errorhandler = (error: any) => {
  console.log(error)
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx

    return {
      data: error.response.data,
      status: error.response.status,
      headers: error.response.headers,
      message: error.message,
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return {
      message: "Sem resposta do servidor",
    }
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      message: error.message,
    }
  }
}

export const usePost = async (
  body: {
    [index: string]: string
  },
  url: string
) => {
  try {
    const res = await axios.post(url, body, { withCredentials: true })
    return {
      data: res.data,
      status: res.status,
      headers: res.headers,
      message: "",
    }
  } catch (error: any) {
    return errorhandler(error)
  }
}

export const useGet = async (url: string) => {
  try {
    const res = await axios.get(url, { withCredentials: true })

    return {
      data: res.data,
      status: res.status,
      headers: res.headers,
      message: "",
    }
  } catch (error: any) {
    return errorhandler(error)
  }
}
