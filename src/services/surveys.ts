import Container from '../configs/ioc'
import { Types } from 'mongoose'
import { IUpdate, ICreate } from '../utils/types/models/surveys'

export interface ISurveysService {
  create(params: { data: ICreate }): Promise<any>
  updateOne(params: { data: IUpdate }, id: Types.ObjectId): Promise<any>
  get(userId: Types.ObjectId): Promise<any>
}

export const SurveysService = ({
  surveysRepository,
}: Container): ISurveysService => {
  return {
    create: async (data) => {
      const saveData: any = await surveysRepository.create(data.data)
      return saveData
    },
    updateOne: async (data, id) => {
      const saveData: any = await surveysRepository.updateOne(data.data, id)
      return saveData
    },
    get: async (userId) => {
      const getData: any = await surveysRepository.get(userId)
      return getData
    },
  }
}
