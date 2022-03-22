import * as awilix from 'awilix'
import express from 'express'
import dotenv from 'dotenv'
import Container from './container'
import { Server } from '@src/server'

import logger from '@src/configs/logs/winston'
import { MongoDB } from '@src/configs/databases/mongo'

import { QuestionsController } from '@src/controllers/questions'
import { PagesController } from '@src/controllers/pages'
import { SurveysController } from '@src/controllers/surveys'


import { QuestionsService } from '@src/services/questions'
import { PagesService } from '@src/services/pages'
import { SurveysService } from '@src/services/surveys'

import { QuestionsRepository } from '@src/repositories/questions'
import { PagesRepository } from '@src/repositories/pages'
import { SurveysRepository } from '@src/repositories/surveys'

export async function createContainer(): Promise<awilix.AwilixContainer<any>> {
  const container = awilix.createContainer()

  // CONFIGS ------------------------------------------------------------------------

  const envFound = dotenv.config()
  if (!envFound) {
    throw new Error('.env file not found')
  }

  const configs: awilix.NameAndRegistrationPair<Container> = {
    version: awilix.asValue(`${process.env.VERSION}`),
    port: awilix.asValue(
      process.env.PORT ? parseInt(process.env.PORT, 10) : 3001
    ),
    nodeEnv: awilix.asValue(`${process.env.ENV}`),
    mongoDBConnectionString: awilix.asValue(
      `${process.env.MONGODB_CONNECTION_STRING}`
    ),

    // APP ---------------------------------------------------------------------------
    app: awilix.asValue(express()),
    logger: awilix.asFunction(logger),
    mongoDB: awilix.asClass(MongoDB),
    server: awilix.asClass(Server),

    // CONTROLLERS -------------------------------------------------------------------
    questionsController: awilix.asClass(QuestionsController),
    pagesController: awilix.asClass(PagesController),
    surveysController: awilix.asClass(SurveysController),

    // SERVICES ----------------------------------------------------------------------
    questionsService: awilix.asFunction(QuestionsService),
    pagesService: awilix.asFunction(PagesService),
    surveysService: awilix.asFunction(SurveysService),

    // REPOSITORIES ------------------------------------------------------------------
    questionsRepository: awilix.asFunction(QuestionsRepository),
    pagesRepository: awilix.asFunction(PagesRepository),
    surveysRepository: awilix.asFunction(SurveysRepository),
  }

  container.register(configs)

  // ASYNC CONFIGS -------------------------------------------------------------------

  const mongoDB = container.resolve('mongoDB') as MongoDB
  await mongoDB.connect()

  return container
}

export default Container
