import { parse } from 'date-fns';
import { Request, Response } from 'express'
import status from 'http-status'
import Container from '../configs/ioc'
import { Logger } from 'winston'
import dotenv from 'dotenv'
import { Types } from 'mongoose'
import { ICreate, IUpdate } from '../utils/types/models/surveys'
import { SurveysService, ISurveysService } from '../services/surveys'

const envFound = dotenv.config()
if (!envFound) {
  throw new Error('.env file not found')
}

export class SurveysController {
  private logger: Logger
  private surveysService: ISurveysService

  constructor({ logger, surveysService }: Container) {
    this.logger = logger
    this.surveysService = surveysService
  }

  public async create(req: Request, res: Response) {
    const {
      title,
      description,
      status,
      initialDate,
      finalDate,
      initialPage,
    } = req.body

    const refereceDate = new Date()
    refereceDate.setHours(23, 59, 59, 999)

    let parameters: ICreate = {
      title,
      description,
      status,
      initialDate: parse(initialDate, 'yyyy-MM-dd', refereceDate),
      finalDate: parse(finalDate, 'yyyy-MM-dd', refereceDate),
      initialPage,
    }

    const retorno = await this.surveysService.create({ data: parameters })
    return res.status(status.OK).send({
      _id: retorno._id,
      title: retorno.title,
      description: retorno.description,
      status: retorno.status,
      initialDate: retorno.initialDate,
      finalDate: retorno.finalDate,
      initialPage: retorno.initialPage,
    })
  }

  public async update(req: Request, res: Response) {
    const {
      title,
      description,
      status,
      initialDate,
      finalDate,
      initialPage,
      id,
    } = req.body

    const refereceDate = new Date()
    refereceDate.setHours(23, 59, 59, 999)

    let parameters: IUpdate = {
      title,
      description,
      status,
      initialDate: parse(initialDate, 'yyyy-MM-dd', refereceDate),
      finalDate: parse(finalDate, 'yyyy-MM-dd', refereceDate),
      initialPage,
    }

    await this.surveysService.updateOne(
      { data: parameters },
      Types.ObjectId(id)
    )
    const retorno = await this.surveysService.get(Types.ObjectId(id))
    return res.status(status.OK).send(retorno)
  }

  async get(req: Request, res: Response) {
    const { id } = req.body

    try {
      if (id) {
        const retorno = await this.surveysService.get(Types.ObjectId(id))

        return res.json([retorno])
      }

      return res.json([])
    } catch (error: any) {
      return res.status(400).send(error.message)
    }
  }
}
