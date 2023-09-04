"use client"
import * as React from "react"
import { useState } from "react"
import Box from "@mui/material/Box"

import { AlertColor, Autocomplete, Chip, TextField } from "@mui/material"

import { exerciseFormValidation } from "../../../validation/validation"

const inputSyle = {
  margin: "0.1rem",
  width: { xs: 60, md: 70, lg: 100 },
}

type Exercise = {
  id: number
  name: string
  reps: number
  load: number
  trainningId: number
  blockId: number
}
type ExerciseOptions = {
  id: number
  name: string
  reps: number
  load: number
}[]

export default function ExerciseForm({
  exercise,
  exOptions,
  onDeleteExercise,
}: {
  exercise: Exercise
  exOptions: ExerciseOptions
  onDeleteExercise: () => void
}) {
  const { name, reps, load, blockId, trainningId } = exercise
  const [input, setInput] = useState({
    name,
    reps,
    load,
    blockId,
    trainningId,
  })

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
    setInput((oldInput) => {
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
      <Box sx={{ display: "flex" }} key={exercise.id}>
        <Autocomplete
          disablePortal
          id="name-combo"
          onChange={(_event: any, newValue: string | null) => {
            //get old exercise blockId TrainningId and id
            const oldEx = input
            const newExData = exOptions.filter((ex) => ex.name === newValue)[0]

            //dispatch a change in ex giving old ex and new exercise
            //
            setInput((oldInput: any) => {
              return { ...oldInput, name: newValue }
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)}
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)}
        />
      </Box>
    </>
  )
}
