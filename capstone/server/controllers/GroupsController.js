import { groupsService } from "../services/GroupsService.js"
import BaseController from "../utils/BaseController.js"


export class GroupsController extends BaseController {
    constructor() {
        super('api/groups')
        this.router
            .get('', this.getGroups)
    }

    async getGroups(req, res, next) {
        try {
            const groups = await groupsService.getGroups()
            return res.send(groups)

        } catch (error) {
            next(error)
        }
    }
}