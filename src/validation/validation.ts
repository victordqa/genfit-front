import Validator from "validatorjs"

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
} | null

type BlockFormInput = {
  modifier: string
  durationInM: number
}
export type ValidationsErrors = {
  [key: string]: string[] | undefined
}

export const useSingUpFormValidation = (input: SignUpFormInput) => {
  Validator.useLang("pt")
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

export const useCreateBoxFormValidation = (input: CreateBoxFormInput) => {
  Validator.useLang("pt")
  const rules = {
    name: "required|min:1|max:255",
  }

  let validation = new Validator(input, rules)
  validation.passes()
  return validation.errors.all()
}

export const useExerciseFormValidation = (input: ExerciseFormInput) => {
  Validator.useLang("pt")
  const rules = {
    name: "required|min:1|max:255",
    reps: "required|integer|min:1|max:9999",
    load: "required|numeric|min:0|max:1",
  }
  let validation = new Validator(input, rules)
  validation.passes()
  return validation.errors.all()
}

export const useBlockFormValidation = (input: BlockFormInput) => {
  Validator.useLang("pt")
  const rules = {
    modifier: "required|min:1|max:255",
    durationInM: "required|integer|min:0|max:9999",
  }
  let validation = new Validator(input, rules)
  validation.passes()
  return validation.errors.all()
}
