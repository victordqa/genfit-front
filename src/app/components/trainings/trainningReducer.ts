import { TrainningWithIds } from "./types"
export default function trainningReducer(
  trainnings: TrainningWithIds,
  action: any
) {
  switch (action.type) {
    case "load_trainnings": {
      return action.trainnings
    }

    default: {
      throw Error("Unknown action: " + action.type)
    }
  }
}
