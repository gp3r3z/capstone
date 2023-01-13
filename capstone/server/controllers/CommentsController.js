import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";
import { socketProvider } from "../SocketProvider.js";


export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('/:groupId', this.createComment)

    }

    async createComment(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            req.body.groupId = req.params.groupId

            const comment = await commentsService.createComment(req.body)

            socketProvider.messageRoom(req.params.groupId, 'MESSAGE_ADDED', comment)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }
}