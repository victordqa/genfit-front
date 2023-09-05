"use client"
import * as React from "react"
import { useState } from "react"
import Box from "@mui/material/Box"

import {
  AlertColor,
  Autocomplete,
  Button,
  Chip,
  TextField,
} from "@mui/material"

import { exerciseFormValidation } from "../../../validation/validation"
import { Exercise, ExerciseWithIds } from "./types"
import DeleteIcon from "@mui/icons-material/Delete"

const inputSyle = {
  margin: "0.1rem",
  width: { xs: 60, md: 70, lg: 100 },
}

type ExerciseOptions = Exercise[]

export default function ExerciseForm({
  exercise,
  exOptions,
  handleDeleteExercise,
  handleChangeExercise,
}: {
  exercise: ExerciseWithIds
  exOptions: ExerciseOptions
  handleDeleteExercise: (exercise: ExerciseWithIds) => void
  handleChangeExercise: (
    oldExercise: ExerciseWithIds,
    newExercise: Exercise
  ) => void
}) {
  const { name, reps, load, blockId, trainningId, id, time_per_rep_s } =
    exercise
  const [input, setInput] = useState<ExerciseWithIds | null>({
    id,
    name,
    reps,
    load,
    blockId,
    trainningId,
    time_per_rep_s,
  })

  const [showBin, setShowBin] = useState("none")

  type ValidationsErrors = {
    name: string[] | undefined
    reps: string[] | undefined
    load: string[] | undefined
  }

  type Alert =
    | { title: string; message: string; severity: AlertColor }
    | undefined

  const [validationErrors, setValidationErrors] = useState<ValidationsErrors>({
    name: undefined,
    reps: undefined,
    load: undefined,
  })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name
    const inputValue = e.target.value
    setInput((oldInput: any) => {
      return { ...oldInput, [inputName]: inputValue }
    })
  }
  const validate = () => {
    const errors = exerciseFormValidation(input)
    if (Object.entries(errors).length > 0) {
      setValidationErrors(errors as ValidationsErrors)
    }
  }

  return (
    <>
      {input && (
        <Box
          sx={{ display: "flex" }}
          key={exercise.id}
          onMouseEnter={() => setShowBin("block")}
          onMouseLeave={() => setShowBin("none")}
          onBlur={() => setShowBin("none")}
          onFocus={() => setShowBin("block")}
        >
          <Autocomplete
            disablePortal
            disableClearable
            id="name-combo"
            onChange={(_event: any, newValue: string | null) => {
              const oldEx = input
              const newExData = exOptions.filter(
                (ex) => ex.name === newValue
              )[0]

              handleChangeExercise(oldEx, newExData)
              setInput((oldInput: any) => {
                return {
                  ...oldInput,
                  name: newValue,
                  id: newExData.id,
                  time_per_rep_s: newExData.time_per_rep_s,
                }
              })
            }}
            value={input.name}
            options={exOptions.map((ex) => ex.name)}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option}>
                  {option}
                </li>
              )
            }}
            renderTags={(tagValue, getTagProps) => {
              return tagValue.map((option, index) => (
                <Chip {...getTagProps({ index })} key={option} label={option} />
              ))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ ...inputSyle, width: { xs: 170 } }}
                error={validationErrors.name !== undefined}
                onBlur={validate}
                id="name-txt"
                label="Exercicio"
                name="name"
                size="small"
              />
            )}
          />

          <TextField
            size="small"
            error={validationErrors.reps !== undefined}
            sx={inputSyle}
            id="reps"
            label="Reps"
            type="number"
            name="reps"
            value={input.reps}
            onBlur={validate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInput(e)
            }
            autoComplete="reps"
          />
          <TextField
            size="small"
            error={validationErrors.load !== undefined}
            sx={inputSyle}
            id="load"
            label="Carga"
            type="number"
            autoComplete="load"
            name="load"
            value={input.load}
            onBlur={validate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInput(e)
            }
          />

          <Button
            sx={{
              display: showBin,
              minWidth: 30,
              width: 30,
            }}
            type="button"
            onClick={() => {
              setInput(null)
              handleDeleteExercise(input)
            }}
          >
            <DeleteIcon sx={{ color: "rgb(79, 75, 64)" }} />
          </Button>
        </Box>
      )}
    </>
  )
}
