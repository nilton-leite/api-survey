import { Router } from 'express'

// Controllers
import { QuestionsController } from './controllers/questions'
import { PagesController } from './controllers/pages'
import { SurveysController } from './controllers/surveys'

interface Controllers {
  questionsController: QuestionsController
  pagesController: PagesController
  surveysController: SurveysController
}

export default async ({
  questionsController,
  pagesController,
  surveysController,
}: Controllers) => {
  const router = Router()

  // Questions routes
  router.post(
    '/questions',
    questionsController.create.bind(questionsController)
  )

  // Pages routes
  router.post('/pages', pagesController.create.bind(pagesController))
  router.get('/pages/:nextPage', pagesController.getPage.bind(pagesController))

  // Request routes
  router.post('/surveys', surveysController.create.bind(surveysController))
  router.get('/surveys', surveysController.get.bind(surveysController))
  return router
}
