import Container from '../configs/ioc'
import QuestionsModel from '../models/questions'
import { ICreate, IFindOne, IUpdate } from '../utils/types/models/questions'
import { Types } from 'mongoose'

export interface IQuestionsRepository {
  create(params: ICreate): Promise<any>
  updateOne(params: IUpdate, id: Types.ObjectId): Promise<any>
  get(userId: Types.ObjectId): Promise<any>
}

export const QuestionsRepository = ({}: Container): IQuestionsRepository => {
  return {
    create: async (params: ICreate) => {
      const item = await QuestionsModel.create(params)
      return item
    },
    updateOne: async (params: IUpdate, id: Types.ObjectId) => {
      const item = await QuestionsModel.updateOne({ _id: id }, params)
      return item
    },
    get: async (userId: Types.ObjectId) => {
      const item = await QuestionsModel.findOne({ _id: userId })
      return item
    },
  }
}
