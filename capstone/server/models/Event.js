import { Schema } from "mongoose";



export const EventSchema = new Schema({
    title: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    coverImg: { type: String, required: true },
    capacity: { type: Number, default: 3 },
    startTime: { type: Date, required: true, default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000) },
    // TODO add array of objects for those attending 
    isCanceled: { type: Boolean, required: true, default: false },
    eventGoers: { type: Schema.Types.Array }
})