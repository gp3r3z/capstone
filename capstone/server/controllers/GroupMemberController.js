


import BaseController from "../utils/BaseController.js"
import { Auth0Provider } from '@bcwdev/auth0provider'
import { logger } from "../utils/Logger.js"
import { groupsService } from "../services/GroupsService.js"


export class GroupMemberController extends BaseController {
    constructor() {
        super('api/groupmember')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.joinGroup)
    }
    async joinGroup(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            const groups = await groupsService.joinGroup(req.body)
            return res.send(groups)

        } catch (error) {
            next(error)
        }
    }
}