import { Schema } from "mongoose";



export const GroupSchema = new Schema({

    gameId: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    description: { type: String, required: true },
    coverImg: { type: String, required: true },
    capacity: { type: Number, default: 3 },
    gameTitle: { type: String },
    genre: { type: String },
    skillLevel: { type: String, default: 'begginer', enum: ['beginner', 'casual', 'competitive'], lowercase: true },
    comsRequired: { type: Boolean, default: false },
    groupName: { type: String, required: true }


}, { timestamps: true, toJSON: { virtuals: true } })