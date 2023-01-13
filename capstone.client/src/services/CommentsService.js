import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";


class CommentsService {
    async getCommentsByGroupId(groupId) {
        const res = await api.get(`api/groups/${groupId}/comments`)
        // logger.log('getting comments by group id', res.data)
        AppState.comments = res.data
    }

    async postComment(commentData, groupId) {
        const res = await api.post(`api/comments/${groupId}`, commentData)
        logger.log('comment data', res.data)
        AppState.comments.push(res.data)
    }
}

export const commentsService = new CommentsService()