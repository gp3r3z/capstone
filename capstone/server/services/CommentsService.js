import { dbContext } from "../db/DbContext.js"
import { groupsService } from "./GroupsService.js"

class CommentsService {
    async createComment(body) {
        // const groupComment = await groupsService.getGroupById(body.groupId)

        const comment = await dbContext.GroupComment.create(body)

        return comment
    }

}

export const commentsService = new CommentsService()
