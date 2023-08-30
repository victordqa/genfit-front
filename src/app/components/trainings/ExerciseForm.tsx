"use client"
import * as React from "react"
import { useState } from "react"
import Box from "@mui/material/Box"

import { AlertColor, Autocomplete, Chip, TextField } from "@mui/material"

import { exerciseFormValidation } from "../../../validation/validation"

const inputSyle = {
  margin: "0.1rem",
  width: { sm: 70, lg: 100 },
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
  const { name, reps, load } = exercise
  const [input, setInput] = useState({
    name: name,
    reps: reps,
    load: load,
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
    console.log(exercise.id)
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

  const prepareHelperText = (errors: string[] | undefined) => {
    if (errors) {
      return errors.reduce((acc, err) => {
        return acc + " " + err
      }, "")
    } else {
      return ""
    }
  }
  return (
    <>
      <Box sx={{ display: "flex" }} key={exercise.id}>
        <Autocomplete
          sx={{ ...inputSyle, width: "150px" }}
          disablePortal
          id="name-combo"
          onChange={(_event: any, newValue: string | null) => {
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
