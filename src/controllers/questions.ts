import { Request, Response } from 'express'
import status from 'http-status'
import Container from '../configs/ioc'
import { Logger } from 'winston'
import dotenv from 'dotenv'
import jsonwebtoken from 'jsonwebtoken'
import { parse } from 'date-fns'
import { IQuestionsService } from '../services/questions'
import {
  ICreate,
  IFindOne,
  IUpdate,
} from '../utils/types/models/questions'
import { Types } from 'mongoose'

const envFound = dotenv.config()
if (!envFound) {
  throw new Error('.env file not found')
}

export class QuestionsController {
  private logger: Logger
  private questionsService: IQuestionsService

  constructor({ logger, questionsService }: Container) {
    this.logger = logger
    this.questionsService = questionsService
  }

  public async create(req: Request, res: Response) {
    const {
      description,
      type,
      options,
      required,
      next
    } = req.body

    const refereceDate = new Date()
    refereceDate.setHours(23, 59, 59, 999)

    let parameters: ICreate = {
      description,
      type,
      options,
      required,
      next
    }

    const retorno = await this.questionsService.create({ data: parameters })
    return res.status(status.OK).send({
      _id: retorno._id,
      description: retorno.description,
      type: retorno.type,
      options: retorno.options,
      required: retorno.required,
      next: retorno.next,
    })
  }

  public async update(req: Request, res: Response) {
    const { 
      description,
      type,
      options,
      required,
      next,
      id 
    } = req.body

    let parameters: IUpdate = {
      description,
      type,
      options,
      required,
      next,
    }

    await this.questionsService.updateOne({ data: parameters }, Types.ObjectId(id))
    const retorno = await this.questionsService.get(Types.ObjectId(id))
    return res.status(status.OK).send(retorno)
  }
 
  async get(req: Request, res: Response) {
    const { id } = req.body

    try {
      if (id) {
        const retorno = await this.questionsService.get(Types.ObjectId(id))

        return res.json([retorno])
      }

      return res.json([])
    } catch (error: any) {
      return res.status(400).send(error.message)
    }
  }
}
