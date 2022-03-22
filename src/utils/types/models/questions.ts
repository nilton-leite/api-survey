import { IOptions } from '@src/models/questions'
import { TypeQuestion } from '@src/utils/enum'
import { Types } from 'mongoose'

export interface ICreate {
  description: String
  type: TypeQuestion
  options?: [IOptions]
  required: Boolean
  next?: Types.ObjectId
}

export interface IUpdate {
  description: String
  type: TypeQuestion
  options?: [IOptions]
  required: Boolean
  next?: Types.ObjectId
}
export interface IFindOne {
  _id: string
}

