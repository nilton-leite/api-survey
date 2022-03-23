import Container from '../configs/ioc'
import SurveysModel from '../models/surveys'
import { ICreate, IUpdate } from '../utils/types/models/surveys'
import { Types } from 'mongoose'
import QuestionsModel from '@src/models/questions'
import async from 'async'

export interface ISurveysRepository {
  create(params: ICreate): Promise<any>
  updateOne(params: IUpdate, id: Types.ObjectId): Promise<any>
  get(userId: Types.ObjectId): Promise<any>
}

export const SurveysRepository = ({}: Container): ISurveysRepository => {
  return {
    create: async (params: ICreate) => {
      const item = await SurveysModel.create(params)
      return item
    },
    updateOne: async (params: IUpdate, id: Types.ObjectId) => {
      const item = await SurveysModel.updateOne({ _id: id }, params)
      return item
    },
    get: async (userId: Types.ObjectId) => {
      // const item = await SurveysModel.findOne({ _id: userId })
      const item = await SurveysModel.find().populate({
        path: 'initialPage',
        populate: {
          path: 'questions.questionId',
          model: 'questions',
        },
      })
      return item
    },
  }
}
