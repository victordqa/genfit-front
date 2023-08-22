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
