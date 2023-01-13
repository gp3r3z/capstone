
import { Schema } from "mongoose";

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String, default: '' },
    bio: { type: String, default: '' },
    platform: { type: Object, default: '' },
    coverImg: { type: String, default: '' },

    // NOTE If you wish to add additional properties do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

