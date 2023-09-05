import { TrainningWithIds } from "./types"

export default function trainningReducer(
  trainnings: TrainningWithIds[],
  action: any
) {
  switch (action.type) {
    case "load_trainnings": {
      return action.trainnings
    }

    case "change_exercise": {
      const { oldExercise, newExercise } = action
      const trainningId = oldExercise.trainningId as number
      const trainning = trainnings[trainningId]

      const block = Object.entries(trainning.trainning).filter(
        ([_blockName, blockDetails]) =>
          blockDetails.blockId === oldExercise.blockId
      )[0]
      const blockDetails = block[1]
      blockDetails.exercises.forEach((ex) => {
        if (ex.id === oldExercise.id) {
          ex.id = newExercise.id
          ex.name = newExercise.name
          ex.time_per_rep_s = newExercise.time_per_rep_s
        }
      })
      return trainnings
    }

    case "delete_exercise": {
      const { exercise } = action
      const trainningId = exercise.trainningId
      const trainning = trainnings[trainningId]

      const block = Object.entries(trainning.trainning).filter(
        ([_blockName, blockDetails]) =>
          blockDetails.blockId === exercise.blockId
      )[0]
      const blockDetails = block[1]
      const filteredExs = blockDetails.exercises.filter(
        (ex) => ex.id !== exercise.id
      )
      blockDetails.exercises = filteredExs

      return trainnings
    }

    default: {
      throw Error("Unknown action: " + action.type)
    }
  }
}
