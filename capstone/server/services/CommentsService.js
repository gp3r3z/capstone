import { dbContext } from "../db/DbContext.js"
import { groupsService } from "./GroupsService.js"

class CommentsService {
    async createComment(body) {
        // const groupComment = await groupsService.getGroupById(body.groupId)

        const comment = await (await dbContext.GroupComment.create(body)).populate('creator')
        return comment
    }
    async getCommentsByGroupId(groupId) {
        const comments = await dbContext.GroupComment.find({ groupId }).populate('creator')
        return comments
    }

}

export const commentsService = new CommentsService()
