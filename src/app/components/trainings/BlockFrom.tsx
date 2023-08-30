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
import { Exercise, BlockDetailsWithIds, Modifier } from "./types"

const inputSyle = {
  margin: "0.1rem",
  width: { sx: 150, lg: 200 },
}

export default function BlockForm({
  blockProps,
}: {
  blockProps: { blockDetails: BlockDetailsWithIds; modifiers: Modifier[] }
}) {
  const { blockName, durationInM, modifier, trainningId, blockId } =
    blockProps.blockDetails
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
      <Typography variant="h6"> {blockName}</Typography>
      <Box sx={{ display: "flex" }} key={`${trainningId}${blockId}`}>
        <Autocomplete
          sx={{ ...inputSyle }}
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
              error={validationErrors.name !== undefined}
              onBlur={validate}
              id="mod-txt"
              label="Mod"
              name="mod"
              size="small"
            />
          )}
        />

        <TextField
          size="small"
          error={validationErrors.reps !== undefined}
          sx={{ inputSyle, width: 70 }}
          id={"time-per-rep-in-M" + trainningId + blockId}
          label="Duração (min)"
          type="number"
          name="durationInM"
          value={blockState.durationInM}
          onBlur={validate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)}
          autoComplete="duration"
        />
      </Box>
      <Box>{/* <ExerciseForm /> */}</Box>
    </>
  )
}
