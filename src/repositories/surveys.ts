import Container from '../configs/ioc'
import SurveysModel from '../models/surveys'
import { ICreate, IUpdate } from '../utils/types/models/surveys'
import { Types } from 'mongoose'
import QuestionsModel from '@src/models/questions'
import async from 'async'

export interface ISurveysRepository {
  create(params: ICreate): Promise<any>
  updateOne(params: IUpdate, id: Types.ObjectId): Promise<any>
  get(userId: Types.ObjectId): Promise<any>
}

export const SurveysRepository = ({}: Container): ISurveysRepository => {
  return {
    create: async (params: ICreate) => {
      const item = await SurveysModel.create(params)
      return item
    },
    updateOne: async (params: IUpdate, id: Types.ObjectId) => {
      const item = await SurveysModel.updateOne({ _id: id }, params)
      return item
    },
    get: async (userId: Types.ObjectId) => {
      // const item = await SurveysModel.findOne({ _id: userId })
      const item = await SurveysModel.find().populate({
        path: 'initialPage',
        populate: {
          path: 'questions.questionId',
          model: 'questions',
        },
      })
      console.log('item')
      console.log(item)
      // const item = await SurveysModel.aggregate([
      //   // { $unwind: '$pages' },
      //   // {
      //   //   $lookup: {
      //   //     from: { db: "questions", coll: "catalog" },
      //   //     // localField: 'pages.questions.questionId',
      //   //     // foreignField: '_id',
      //   //     let: { questionId: "$questions.questionId" },
      //   //     pipeline: [
      //   //       { $match:
      //   //         { $expr:
      //   //             { $in: ["$$questions.questionId", "$questionId"] }
      //   //         }
      //   //     }
      //   //     ],
      //   //     as: "qu"
      //   //   },
      //   // },
      //   // { $unwind: '$qu' },
      //   // {
      //   //   $lookup: {
      //   //     from: 'questions',
      //   //     localField: 'pages.questions.$.questionId',
      //   //     foreignField: '_id',
      //   //     as: 'questions',
      //   //   },
      //   // },
      //   // { $unwind: '$questions' },
      //   {
      //     $project: {
      //       _id: 1,
      //       title: 1,
      //       description: 1,
      //       status: 1,
      //       initialDate: 1,
      //       finalDate: 1,
      //       'pages._id': 1,
      //       'pages.type': 1,
      //       'pages.message': 1,
      //       'pages.questions': 1,
      //       'pages.button': 1,
      //       'pages.rules': 1,
      //       'qu': 1,
      //       // 'questions.description': 1,
      //       // 'questions.type': 1,
      //       // 'questions.options': 1,
      //       // 'questions.required': 1,
      //       // 'questions.next': 1,
      //     },
      //   },
      // ])
      return item
    },
  }
}
