import Container from '../configs/ioc'
import { Types } from 'mongoose'
import { IUpdate, ICreate } from '../utils/types/models/pages'

export interface IPagesService {
  create(params: { data: ICreate }): Promise<any>
  updateOne(params: { data: IUpdate }, id: Types.ObjectId): Promise<any>
}

export const PagesService = ({
  pagesRepository,
}: Container): IPagesService => {
  return {
    create: async (data) => {
      const saveData: any = await pagesRepository.create(data.data)
      return saveData
    },
    updateOne: async (data, id) => {
      const saveData: any = await pagesRepository.updateOne(data.data, id)
      return saveData
    },
  }
}
