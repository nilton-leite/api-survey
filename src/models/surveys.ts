import { IStatusSurvey } from '@src/utils/enum'
import { Document, Model, Schema, model, Types } from 'mongoose'

export interface ISurvey extends Document {
  title: String
  description?: String
  status?: IStatusSurvey
  initialDate: Date
  finalDate: Date
  initialPage: Types.ObjectId
}

interface ISurveyModels extends Model<ISurvey> {}

const schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    status: {
      type: String,
      enum: IStatusSurvey,
      required: false,
      default: IStatusSurvey.CLOSED,
    },
    initialDate: { type: Date, required: true },
    finalDate: { type: Date, required: true },
    initialPage: { type: Types.ObjectId, required: true, ref: 'pages' },
  },
  { collection: 'surveys', timestamps: { createdAt: 'createdAt' } }
)

const SurveyModel: ISurveyModels = model<ISurvey, ISurveyModels>(
  'surveys',
  schema
)
export default SurveyModel
