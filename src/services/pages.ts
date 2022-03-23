import Container from '../configs/ioc'
import { Types } from 'mongoose'
import { IUpdate, ICreate, IGetPage } from '../utils/types/models/pages'

export interface IPagesService {
  create(params: { data: ICreate }): Promise<any>
  updateOne(params: { data: IUpdate }, id: Types.ObjectId): Promise<any>
  getPage(params: { data: IGetPage }): Promise<any>
}

export const PagesService = ({ pagesRepository }: Container): IPagesService => {
  return {
    getPage: async (data) => {
      const saveData: any = await pagesRepository.getPage(data.data)
      return saveData
    },
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
