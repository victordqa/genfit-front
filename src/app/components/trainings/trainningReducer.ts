import { TrainningWithIds, BlockDetailsWithIds } from "./types"

export default function trainningReducer(
  trainnings: TrainningWithIds[],
  action: any
) {
  switch (action.type) {
    case "load_trainnings": {
      return action.trainnings
    }

    case "change_reps_and_load": {
      const { exercise } = action
      const reps = exercise.reps
      const load = exercise.load
      const trainningId = exercise.trainningId as number
      const trainningsClone = JSON.parse(JSON.stringify(trainnings))
      const trainning = trainningsClone[trainningId]

      const block = Object.entries(trainning.trainning).filter(
        ([_blockName, blockDetails]: any) =>
          blockDetails.blockId === exercise.blockId
      )[0]
      const blockDetails = block[1] as BlockDetailsWithIds
      const newExercises = blockDetails.exercises.map((ex) => {
        if (ex.id === exercise.id) {
          return { ...ex, reps: parseInt(reps), load: parseFloat(load) }
        } else {
          return ex
        }
      })
      blockDetails.exercises = newExercises
      return trainningsClone
    }

    case "change_exercise": {
      const { oldExercise, newExercise, exIndex } = action
      const trainningId = oldExercise.trainningId as number
      const trainningsClone = JSON.parse(JSON.stringify(trainnings))
      const trainning = trainningsClone[trainningId]

      const block = Object.entries(trainning.trainning).filter(
        ([_blockName, blockDetails]: any) =>
          blockDetails.blockId === oldExercise.blockId
      )[0]
      const blockDetails = block[1] as BlockDetailsWithIds

      blockDetails.exercises[exIndex] = {
        ...blockDetails.exercises[exIndex],
        id: newExercise.id,
        name: newExercise.name,
        time_per_rep_s: newExercise.time_per_rep_s,
      }

      return trainningsClone
    }

    case "change_mod": {
      const { trainningId, blockId, modifier, modifierId } = action

      const trainningsClone = JSON.parse(JSON.stringify(trainnings))
      const trainning = trainningsClone[trainningId]

      const block = Object.entries(trainning.trainning).filter(
        ([_blockName, blockDetails]: any) => blockDetails.blockId === blockId
      )[0]
      const blockDetails = block[1] as BlockDetailsWithIds

      blockDetails.modifier = modifier
      blockDetails.modifierId = modifierId

      return trainningsClone
    }

    case "delete_exercise": {
      const { exercise, exIndex } = action
      const trainningId = exercise.trainningId
      const trainningsClone = JSON.parse(JSON.stringify(trainnings))
      const trainning = trainningsClone[trainningId]

      const block = Object.entries(trainning.trainning).filter(
        ([_blockName, blockDetails]: any) =>
          blockDetails.blockId === exercise.blockId
      )[0]
      const blockDetails = block[1] as BlockDetailsWithIds
      blockDetails.exercises.splice(exIndex, 1)

      return trainningsClone
    }

    case "add_exercise": {
      const { trainningId, blockId, exOptions } = action
      const trainningsClone = JSON.parse(JSON.stringify(trainnings))
      const trainning = trainningsClone[trainningId]

      const block = Object.entries(trainning.trainning).filter(
        ([_blockName, blockDetails]: any) => blockDetails.blockId === blockId
      )[0]
      const blockDetails = block[1] as BlockDetailsWithIds

      //get from user exercises list
      const exOption = exOptions[0]

      blockDetails.exercises.push({
        ...exOption,
        blockId,
        trainningId,
        reps: 10,
        load: 0.5,
      })

      return trainningsClone
    }

    default: {
      throw Error("Unknown action: " + action.type)
    }
  }
}
