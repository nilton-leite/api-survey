import { IStatusSurvey } from '@src/utils/enum'
import { Types } from 'mongoose'

export interface ICreate {
  title: String
  description?: String
  status?: IStatusSurvey
  initialDate: Date
  finalDate: Date
  initialPage: Types.ObjectId
}
export interface IUpdate {
  title: String
  description?: String
  status?: IStatusSurvey
  initialDate: Date
  finalDate: Date
  initialPage: Types.ObjectId
}
export interface IFindById {
  _id: Types.ObjectId
}
