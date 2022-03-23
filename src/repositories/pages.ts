import Container from '../configs/ioc'
import PagesModel from '../models/pages'
import { ICreate, IGetPage, IUpdate } from '../utils/types/models/pages'
import { Types } from 'mongoose'

export interface IPagesRepository {
  create(params: ICreate): Promise<any>
  getPage(params: IGetPage): Promise<any>
  updateOne(params: IUpdate, id: Types.ObjectId): Promise<any>
}

export const PagesRepository = ({}: Container): IPagesRepository => {
  return {
    getPage: async (params: IGetPage) => {
      const item = await PagesModel.find({ _id: params.nextPage }).populate({
        path: 'questions.questionId',
        model: 'questions',
      })
      return item
    },
    create: async (params: ICreate) => {
      const item = await PagesModel.create(params)
      return item
    },
    updateOne: async (params: IUpdate, id: Types.ObjectId) => {
      const item = await PagesModel.updateOne({ _id: id }, params)
      return item
    },
  }
}
