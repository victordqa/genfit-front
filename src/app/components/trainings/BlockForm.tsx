"use client"
import * as React from "react"
import { useState } from "react"
import Box from "@mui/material/Box"

import {
  AlertColor,
  Autocomplete,
  Chip,
  TextField,
  Typography,
} from "@mui/material"

import {
  blockFormValidation,
  ValidationsErrors,
} from "../../../validation/validation"
import ExerciseForm from "./ExerciseForm"
import {
  Exercise,
  BlockDetailsWithIds,
  Modifier,
  ExercisesWithIds,
} from "./types"

type BlockNameMapping = {
  [key: string]: string
}
const blockNameMapping = {
  warmUp: "Warm Up",
  skill: "Skill",
  wod: "WOD",
} as BlockNameMapping

const inputSyle = {
  margin: "0.1rem",
  width: { sx: 250, lg: 250 },
}

export default function BlockForm({
  blockProps,
  exerciseProps,
}: {
  blockProps: { blockDetails: BlockDetailsWithIds; modifiers: Modifier[] }
  exerciseProps: {
    exercises: Exercise[]
    handleChangeExercise: (
      oldExercise: ExercisesWithIds,
      newExercise: Exercise
    ) => void
  }
}) {
  const { blockName, durationInM, modifier, trainningId, blockId, exercises } =
    blockProps.blockDetails
  const { handleChangeExercise } = exerciseProps
  const exerciseOptions = exerciseProps.exercises
  const modifiers = blockProps.modifiers
  const [blockState, setBlockState] = useState({
    durationInM,
    modifier,
  })

  type Alert =
    | { title: string; message: string; severity: AlertColor }
    | undefined

  const [validationErrors, setValidationErrors] = useState<ValidationsErrors>({
    modifier: undefined,
    durationInM: undefined,
  })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name
    const inputValue = e.target.value
    setBlockState((oldInput) => {
      return { ...oldInput, [inputName]: inputValue }
    })
  }
  const validate = () => {
    const errors = blockFormValidation(blockState)
    if (Object.entries(errors).length > 0) {
      setValidationErrors(errors as ValidationsErrors)
      console.log(validationErrors)
    }
  }

  //TODO get mods from db

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
      <Box sx={{ display: "flex", mt: 2 }} key={`${trainningId}${blockId}`}>
        <Typography sx={{ mr: 1, width: 90, textAlign: "center" }} variant="h6">
          {blockNameMapping[blockName]}
        </Typography>
        <TextField
          size="small"
          error={validationErrors.reps !== undefined}
          sx={{ ...inputSyle, width: { xs: 70, md: 110, lg: 150 } }}
          id={"durationInM" + trainningId + blockId}
          label="Duração (min)"
          type="number"
          name="durationInM"
          value={blockState.durationInM}
          onBlur={validate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)}
          autoComplete="duration"
        />
        <Autocomplete
          disablePortal
          id={"mod-combo" + trainningId + blockId}
          onChange={(_event: any, newValue: string | null) => {
            setBlockState((oldInput: any) => {
              return { ...oldInput, modifier: newValue }
            })
          }}
          value={blockState.modifier}
          options={modifiers.map((mod) => mod.name)}
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
              sx={{ ...inputSyle, width: { xs: 160, md: 180, lg: 200 } }}
              error={validationErrors.name !== undefined}
              onBlur={validate}
              id="mod-txt"
              label="Mod"
              name="mod"
              size="small"
            />
          )}
        />
      </Box>
      <Box>
        {exercises.map((ex) => {
          return (
            <ExerciseForm
              key={ex.id + ex.blockId + ex.trainningId}
              exercise={ex}
              exOptions={exerciseOptions}
              onDeleteExercise={() => {
                console.log("deleted")
              }}
              handleChangeExercise={handleChangeExercise}
            />
          )
        })}
      </Box>
    </>
  )
}
