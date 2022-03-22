import { Express, Router, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { Logger } from 'winston'
import routes from './routes'
import Container from './configs/ioc'
import AuthenticationMiddleware from './middlewares/authentication'
import cors from 'cors'

import { QuestionsController } from './controllers/questions'
import { PagesController } from './controllers/pages'
import { SurveysController } from './controllers/surveys'

export class Server {
  private app: Express
  private port: number
  private logType: string
  private logger: Logger
  private questionsController: QuestionsController
  private pagesController: PagesController
  private surveysController: SurveysController

  constructor({
    app,
    port,
    nodeEnv,
    logger,
    questionsController,
    pagesController,
    surveysController,
  }: Container) {
    this.app = app
    this.port = port
    this.logType =
      nodeEnv === 'dev' ? 'dev' : ':method :url :status :response-time'
    this.logger = logger
    this.questionsController = questionsController
    this.pagesController = pagesController
    this.surveysController = surveysController
  }

  private async init(): Promise<void> {
    this.setupExpress()
    await this.setupRoutes()
  }

  private setupExpress(): void {
    this.app.use(
      morgan(this.logType, {
        stream: {
          write: (message: any) => {
            this.logger.info(message)
          },
        },
      })
    )
    this.app.use(bodyParser.json({ type: '*/*', limit: '50mb' }))
    this.app.use(bodyParser.urlencoded({ extended: false }))
    // this.app.use(AuthenticationMiddleware(this.logType))
    if (this.logType === 'dev') this.app.use(cors())
  }

  private async setupRoutes(): Promise<void> {
    const router = await routes({
      questionsController: this.questionsController,
      pagesController: this.pagesController,
      surveysController: this.surveysController,
    })

    this.app.use(router)

    this.app.use(function (
      err: Error,
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      console.error(err.stack)
      res.status(500).send('Internal server error.')
    })
  }

  public getApp(): Express {
    return this.app
  }

  public start() {
    this.init()
    this.app.listen(this.port, () => {
      this.logger.info({
        message: `Server listening on port ${this.port}.`,
        path: __filename,
      })
    })
  }
}
