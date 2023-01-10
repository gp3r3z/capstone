import { Schema } from "mongoose";



export const GroupMemberSchema = new Schema({


    accountId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true },

    // TODO added isAccepted Bool

}, { timestamps: true, toJSON: { virtuals: true } })


GroupMemberSchema.virtual('profile', {
    localField: 'accountId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})