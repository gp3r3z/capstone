
import { Schema } from "mongoose";

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    bio: { type: String },
    gamerTags: { type: Schema.Types.Array },
    platform: { type: String, enum: ['PLAYSTATION', 'XBOX', 'PC', 'NINTENDO'], lowercase: true },
    coverImage: { type: String },

    // NOTE If you wish to add additional properties do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

