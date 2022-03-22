import { Express } from 'express'
import winston from 'winston'
import { Server } from '@src/server'
import { Knex } from 'knex'
import { MongoDB } from '@src/configs/databases/mongo'

import { QuestionsController } from '@src/controllers/questions'
import { PagesController } from '@src/controllers/pages'
import { SurveysController } from '@src/controllers/surveys'


import { IQuestionsService } from '@src/services/questions'
import { IPagesService } from '@src/services/pages'
import { ISurveysService } from '@src/services/surveys'

import { IQuestionsRepository } from '@src/repositories/questions'
import { IPagesRepository } from '@src/repositories/pages'
import { ISurveysRepository } from '@src/repositories/surveys'

interface Container {
  // CONFIGS --------------------------------------------
  /** API version */
  version: string
  /** Server port */
  port: number
  /** Enviornment */
  nodeEnv: string
  /** MongoDB connection string */
  mongoDBConnectionString: string

  // APP ------------------------------------------------
  app: Express
  logger: winston.Logger
  mongoDB: MongoDB
  server: Server

  // CONTROLLERS ----------------------------------------
  questionsController: QuestionsController
  pagesController: PagesController
  surveysController: SurveysController

  // SERVICES -------------------------------------------
  questionsService: IQuestionsService
  pagesService: IPagesService
  surveysService: ISurveysService

  // REPOSITORIES ---------------------------------------
  questionsRepository: IQuestionsRepository
  pagesRepository: IPagesRepository
  surveysRepository: ISurveysRepository
}

export default Container
