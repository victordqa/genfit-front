type BlockNameMapping = {
  [key: string]: string
}
const blockNameMapping = {
  warmUp: "Warm Up",
  skill: "Skill",
  wod: "WOD",
} as BlockNameMapping

export const prepareHelperText = (errors: string[] | undefined) => {
  if (errors) {
    return errors.reduce((acc, err) => {
      return acc + " " + err
    }, "")
  } else {
    return ""
  }
}
