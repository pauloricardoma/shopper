import { Rating } from "./rating.model"

export interface Driver {
  id: number
  name: string
  description: string
  car: string
  tax: number
  min_distance: number
  ratings: Rating[]
}
