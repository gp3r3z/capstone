import mongoose, { SchemaType } from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    bio: { type: String },
    gamerTags: { type: Schema.Types.Array },
    skillLevel: { type: String, default: 'begginer', enum: ['beginner', 'casual', 'competitive'], lowercase: true },
    coverImage: { type: String },

    // NOTE If you wish to add additional properties do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

