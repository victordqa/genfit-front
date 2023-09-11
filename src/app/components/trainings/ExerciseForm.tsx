"use client"
import * as React from "react"
import { useEffect, useState } from "react"
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
  exIndex,
  handleDeleteExercise,
  handleChangeExercise,
  handleChangeReps,
}: {
  exercise: ExerciseWithIds
  exIndex: number
  exOptions: ExerciseOptions
  handleDeleteExercise: (exercise: ExerciseWithIds, exIndex: number) => void
  handleChangeExercise: (
    oldExercise: ExerciseWithIds,
    newExercise: Exercise
  ) => void
  handleChangeReps: (exercise: ExerciseWithIds | null) => void
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

  useEffect(() => {
    handleChangeReps(input)
  }, [input])

  return (
    <>
      {input && (
        <Box
          sx={{ display: "flex", justifyContent: "center" }}
          key={exercise.id + exIndex}
          onMouseEnter={() => setShowBin("block")}
          onMouseLeave={() => setShowBin("none")}
        >
          <Autocomplete
            disablePortal
            disableClearable
            id={"name-combo" + trainningId + blockId + exIndex}
            onChange={(_event: any, newValue: string | null) => {
              const oldEx = input
              const newExData = exOptions.filter(
                (ex) => ex.name === newValue
              )[0]

              handleChangeExercise(oldEx, newExData)
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
                sx={{ ...inputSyle, width: { xs: 170, md: 200, lg: 230 } }}
                error={validationErrors.name !== undefined}
                onBlur={validate}
                id={"name-txt" + trainningId + blockId + exIndex}
                label={exIndex === 0 ? "Exercicio" : ""}
                name="name"
                size="small"
              />
            )}
          />

          <TextField
            size="small"
            error={validationErrors.reps !== undefined}
            sx={inputSyle}
            id={"reps" + trainningId + blockId + exIndex}
            label={exIndex === 0 ? "Reps" : ""}
            type="number"
            name="reps"
            value={input.reps}
            onBlur={validate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleInput(e)
            }}
            autoComplete="reps"
          />
          <TextField
            size="small"
            error={validationErrors.load !== undefined}
            sx={inputSyle}
            id={"load" + trainningId + blockId + exIndex}
            label={exIndex === 0 ? "Carga" : ""}
            type="number"
            autoComplete="load"
            name="load"
            value={input.load}
            onBlur={validate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInput(e)
            }
          />

          <Box
            sx={{
              width: 30,
            }}
          >
            <Button
              sx={{
                display: showBin,
                minWidth: 30,
                width: 30,
              }}
              type="button"
              onClick={() => {
                handleDeleteExercise(input, exIndex)
              }}
            >
              <DeleteIcon sx={{ color: "rgb(79, 75, 64)" }} />
            </Button>
          </Box>
        </Box>
      )}
    </>
  )
}
