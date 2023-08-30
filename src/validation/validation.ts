import Validator from "validatorjs"

Validator.useLang("pt")

type SignUpFormInput = {
  email: string
  password: string
  name: string
  password_confirmation: string
}

type CreateBoxFormInput = {
  name: string
}

type ExerciseFormInput = {
  name: string
  reps: number
  load: number
}

type BlockFormInput = {
  modifier: string
  durationInM: number
}
export type ValidationsErrors = {
  [key: string]: string[] | undefined
}

export const singUpFormValidation = (input: SignUpFormInput) => {
  const rules = {
    name: "required|min:1|max:255",
    email: "required|email",
    password: "required|min:6|max:15|confirmed",
    password_confirmation: "required|min:6|max:15",
  }

  let validation = new Validator(input, rules)
  validation.passes()
  return validation.errors.all()
}

export const createBoxFormValidation = (input: CreateBoxFormInput) => {
  const rules = {
    name: "required|min:1|max:255",
  }

  let validation = new Validator(input, rules)
  validation.passes()
  return validation.errors.all()
}

export const exerciseFormValidation = (input: ExerciseFormInput) => {
  const rules = {
    name: "required|min:1|max:255",
    reps: "required|integer|min:1|max:9999",
    load: "required|numeric|min:0|max:1",
  }
  let validation = new Validator(input, rules)
  validation.passes()
  return validation.errors.all()
}

export const blockFormValidation = (input: BlockFormInput) => {
  const rules = {
    modifier: "required|min:1|max:255",
    durationInM: "required|integer|min:1|max:9999",
  }
  let validation = new Validator(input, rules)
  validation.passes()
  return validation.errors.all()
}
