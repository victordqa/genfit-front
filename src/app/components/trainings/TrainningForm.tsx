"use client"
import * as React from "react"
import { useEffect, useState, useReducer } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Alert, AlertColor, AlertTitle, Card, TextField } from "@mui/material"
import { useGet, usePost, UseHttpResponse } from "../../../hooks/useHttp"
//import { singUpFormValidation } from "../../validation/validation"
import routes from "../../../routes"
import BlockForm from "./BlockForm"
import {
  BlockDetailsFromApi,
  BlockDetailsWithIds,
  TrainningFromApi,
  TrainningWithIds,
  Modifier,
  ExercisesWithIds,
} from "./types"
import trainningReducer from "./trainningReducer"
import { usePathname } from "next/navigation"
import CircularProgress from "@mui/material/CircularProgress"

const inputSyle = {
  margin: "0.5rem",
}

const addIdsToChildren = (trainningsFromApi: TrainningFromApi) => {
  return trainningsFromApi.trainningsWithIds.map((trainningObj, id) => {
    const trainning = trainningObj.trainningWithBlockIds

    Object.keys(trainning).forEach((blockName) => {
      const exercisesWithIds = trainning[blockName].exercises.map((ex) => ({
        ...ex,
        trainningId: id,
        blockId: trainning[blockName].blockId,
      }))

      trainning[blockName] = {
        ...trainning[blockName],
        exercises: exercisesWithIds,
        blockName: blockName,
        trainningId: id,
      } as BlockDetailsWithIds
    })
    return { trainning, trainningId: id } as TrainningWithIds
  })
}

const initialState: TrainningWithIds[] | [] = []

export default function TrainningForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [trainnings, dispatch] = useReducer(trainningReducer, initialState)
  const [exercises, setExercises] = useState([])
  const [modifiers, setModifiers] = useState<Modifier[]>([
    { id: 0, name: "", max_candidates: 0, min_candidates: 0 },
  ])

  const path = usePathname()

  const handleLoadTrainnings = (trainnings: TrainningWithIds[]) => {
    dispatch({
      type: "load_trainnings",
      trainnings,
    })
  }

  const handleChangeExercise = (
    oldExercise: ExercisesWithIds,
    newExercise: ExercisesWithIds
  ) => {
    dispatch({
      type: "change_exercise",
      oldExercise,
      newExercise,
    })
  }

  const handleApiCalls = async (apiCalls: Promise<UseHttpResponse>[]) => {
    const responses = await Promise.all(apiCalls)
    const haveAllPassed = responses.every((res) => res.status === 200)
    setLoading(false)
    if (haveAllPassed) {
      handleLoadTrainnings(addIdsToChildren(responses[0].data))
      setExercises(responses[1].data)
      setModifiers(responses[2].data)
    } else {
      console.log(responses)
      setError("Ops, algo inesperado ocorreu, por favor, tente mais tarde")
    }
  }

  useEffect(() => {
    setLoading(true)
    const apiCalls = [
      useGet(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${
          routes.suggestTrainningApi
        }?quantity=2&boxId=${path.split("/")[2]}`
      ),
      useGet(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${routes.listCoachExsApi}`
      ),
      useGet(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${routes.listCoachModsApi}`
      ),
    ]

    handleApiCalls(apiCalls)
  }, [])

  let content = loading ? (
    <CircularProgress />
  ) : (
    <form>
      {trainnings.map((trainning: TrainningWithIds) => {
        return (
          <Box
            key={trainning.trainningId}
            sx={{
              borderTop: "3px solid #121858",
              borderBottom: "3px solid #121858",
              width: { xs: "100%", md: 500, lg: 800 },
              padding: 1,
              pt: 2,
              marginTop: { xs: 3, md: 5 },
            }}
          >
            <Typography
              sx={{
                display: "inline",
                backgroundColor: "#121858",
                color: "white",
                borderRadius: 10,
                padding: 1.5,
              }}
              variant="h5"
            >{`Dia ${trainning.trainningId + 1}`}</Typography>

            {Object.entries(trainning.trainning).map(
              ([blockName, blockDetails]) => {
                return (
                  <BlockForm
                    key={blockName + trainning.trainningId}
                    exerciseProps={{ exercises }}
                    blockProps={{ blockDetails, modifiers }}
                  />
                )
              }
            )}
          </Box>
        )
      })}
    </form>
  )

  if (error)
    content = (
      <Alert severity="error" sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <AlertTitle>Erro</AlertTitle>
        {error}
      </Alert>
    )

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {content}
      </Box>
    </div>
  )
}