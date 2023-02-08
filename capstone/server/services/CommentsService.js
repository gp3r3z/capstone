import { dbContext } from "../db/DbContext.js"
import { groupsService } from "./GroupsService.js"

class CommentsService {
    async createComment(body) {
        // const groupComment = await groupsService.getGroupById(body.groupId)

        const comment = await (await dbContext.GroupComment.create(body)).populate('profile')
        return comment
    }
    async getCommentsByGroupId(groupId) {
        const comments = await dbContext.GroupComment.find({ groupId }).populate('profile')
        return comments
    }

}

export const commentsService = new CommentsService()
