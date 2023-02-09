import { Schema } from "mongoose";


export const GroupCommentSchema = new Schema({
    groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    description: { type: String, required: true },

}, { timestamps: true, toJSON: { virtuals: true } })

GroupCommentSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})