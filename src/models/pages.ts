import { TypePage } from '@src/utils/enum'
import { Document, Model, Schema, model, Types } from 'mongoose'

export interface IButton extends Document {
  label: String
  next?: Types.ObjectId
}
export interface IQuestion extends Document {
  questionId: Types.ObjectId
}
export interface IRules extends Document {
  questionId: Types.ObjectId
  valueRedirect: String
  pageRedirect: Types.ObjectId
}
export interface IPages extends Document {
  type: TypePage
  message?: String
  button: IButton
  questions: [IQuestion]
  rules?: IRules
}

interface RulesPageDocument extends Document, IRules {}

const rulesPageSchema = new Schema<RulesPageDocument, Model<RulesPageDocument>>(
  {
    questionId: {
      type: String,
      required: true,
    },
    valueRedirect: {
      type: String,
      required: true,
    },
    pageRedirect: {
      type: Types.ObjectId,
      required: true,
    },
  }
)

interface ButtonPageDocument extends Document, IButton {}

const buttonPageSchema = new Schema<
  ButtonPageDocument,
  Model<ButtonPageDocument>
>({
  label: {
    type: String,
    required: true,
  },
  next: {
    type: Types.ObjectId,
    required: false,
  },
})

interface QuestionPageDocument extends Document, IQuestion {}

const questionPageSchema = new Schema<
  QuestionPageDocument,
  Model<QuestionPageDocument>
>({
  questionId: {
    type: Types.ObjectId,
    required: true,
    /// <reference path="" />
    ref: 'questions',
  },
})

interface IPagesModels extends Model<IPages> {}

const schema = new Schema(
  {
    type: { type: String, enum: TypePage, required: true },
    message: { type: String, required: false },
    button: { type: buttonPageSchema, required: true },
    questions: { type: [questionPageSchema], required: true },
    rules: { type: rulesPageSchema, required: false },
  },
  { collection: 'pages', timestamps: { createdAt: 'createdAt' } }
)

const PagesModel: IPagesModels = model<IPages, IPagesModels>('pages', schema)
export default PagesModel
