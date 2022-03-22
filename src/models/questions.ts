import { Document, Model, Schema, model, Types } from 'mongoose'
import { TypeQuestion } from '@src/utils/enum'

export interface IOptions extends Document {
  label: String
  value: String
  next?: Types.ObjectId
}

export interface IQuestions extends Document {
  description: String
  type: TypeQuestion
  options?: [IOptions]
  required: Boolean
  next?: Types.ObjectId
}

interface OptionsQuestionDocument extends Document, IOptions {}

const optionsSchema = new Schema<OptionsQuestionDocument, Model<OptionsQuestionDocument>>({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  next: {
    type: Types.ObjectId,
    required: false,
  },
})

interface IQuestionsModels extends Model<IQuestions> {}

const schema = new Schema(
  {
    description: { type: String, required: true },
    type: { type: String, enum: TypeQuestion, required: true },
    options: { 
      type: [optionsSchema], 
      required: function (this: IQuestions) {
        return this.type === TypeQuestion.MULTIPLE || this.type === TypeQuestion.SINGLE
      }, 
    },
    required: { type: Boolean, required: true },
    next: { type: Types.ObjectId, required: false },
  },
  { collection: 'questions', timestamps: { createdAt: 'createdAt' } }
)

const QuestionsModel: IQuestionsModels = model<IQuestions, IQuestionsModels>('questions', schema)
export default QuestionsModel
