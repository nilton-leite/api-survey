import { IButton, IQuestion, IRules } from '@src/models/pages'
import { TypePage } from '@src/utils/enum'
import { Types } from 'mongoose'

export enum IStatus {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
  RESERVED = 'RESERVED',
}

export interface ICreate {
  type: TypePage
  message?: String
  button: IButton
  questions: [IQuestion]
  rules?: IRules
}
export interface IGetPage {
  nextPage: Types.ObjectId
}
export interface IUpdate {
  type: TypePage
  message?: String
  button: IButton
  questions: [IQuestion]
  rules?: IRules
}
export interface IFindById {
  _id: Types.ObjectId
}
