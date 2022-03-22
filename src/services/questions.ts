import Container from '../configs/ioc'
import {
  ICreate,
  IFindOne,
  IUpdate,
} from '../utils/types/models/questions'
import { Types } from 'mongoose'

export interface IQuestionsService {
  create(params: { data: ICreate }): Promise<any>
  updateOne(params: { data: IUpdate }, id: Types.ObjectId): Promise<any>
  get(userId: Types.ObjectId): Promise<any>
}

export const QuestionsService = ({ questionsRepository }: Container): IQuestionsService => {
  return {
    create: async (data) => {
      const saveData: any = await questionsRepository.create(data.data)
      return saveData
    },
    updateOne: async (data, id) => {
      const saveData: any = await questionsRepository.updateOne(data.data, id)
      return saveData
    },
    get: async (userId) => {
      const getData: any = await questionsRepository.get(userId)
      return getData
    },
  }
}
