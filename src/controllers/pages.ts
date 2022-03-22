import { Request, Response } from 'express'
import status from 'http-status'
import Container from '../configs/ioc'
import { Logger } from 'winston'
import dotenv from 'dotenv'
import { Types } from 'mongoose'
import { ICreate, IUpdate } from '../utils/types/models/pages'
import { PagesService, IPagesService } from '../services/pages'

const envFound = dotenv.config()
if (!envFound) {
  throw new Error('.env file not found')
}

export class PagesController {
  private logger: Logger
  private pagesService: IPagesService

  constructor({ logger, pagesService }: Container) {
    this.logger = logger
    this.pagesService = pagesService
  }

  public async create(req: Request, res: Response) {
    const {
      type,
      message,
      button,
      questions,
      rules,
     } =
      req.body

    let parameters: ICreate = {
      type,
      message,
      button,
      questions,
      rules,
    }

    const retorno = await this.pagesService.create({ data: parameters })
    return res.status(status.OK).send({
      _id: retorno._id,
      type: retorno.type,
      message: retorno.message,
      button: retorno.button,
      questions: retorno.questions,
      rules: retorno.rules,
    })
  }

  public async update(req: Request, res: Response) {
    const { 
      type,
      message,
      button,
      questions,
      rules,
      id 
    } = req.body

    let parameters: IUpdate = {
      type,
      message,
      button,
      questions,
      rules,
    }

    const retorno = await this.pagesService.updateOne({ data: parameters }, Types.ObjectId(id))
    return res.status(status.OK).send(retorno)
  }

}
