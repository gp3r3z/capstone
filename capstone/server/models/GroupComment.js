import { Schema } from "mongoose";


export const GroupCommentSchema = new Schema({
    groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    description: { type: String, required: true },

})