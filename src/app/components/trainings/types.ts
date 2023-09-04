export type Exercise = {
  id: number
  name: string
  reps: number
  load: number
  timePerRepInS: string
}
export type BlockDetails = {
  exercises: Exercise[]
  modifier: string
  durationInM: number
  blockId: number
  modifierId: number
}

export type Modifier = {
  id: number
  name: string
  min_candidates: number
  max_candidates: number
}

export interface ExercisesWithIds extends Exercise {
  blockId: number
  trainningId: number
}

export interface BlockDetailsWithIds extends BlockDetails {
  trainningId: number
  blockName: string
  exercises: ExercisesWithIds[]
}

export type BlockDetailsFromApi = {
  trainningWithBlockIds: {
    [blockName: string]: {
      exercises: Exercise[]
      modifier: string
      durationInM: number
      blockId: number
      modifierId: number
    }
  }
}

export type TrainningFromApi = {
  boxId: number
  trainningsWithIds: BlockDetailsFromApi[]
}

export type TrainningWithIds = {
  trainningId: number
  trainning: { [blockName: string]: BlockDetailsWithIds }
}