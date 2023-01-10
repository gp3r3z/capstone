import { gamesService } from "../services/GamesService.js"
import { groupsService } from "../services/GroupsService.js"
import BaseController from "../utils/BaseController.js"
import { Auth0Provider } from '@bcwdev/auth0provider'
import { logger } from "../utils/Logger.js"


export class GroupsController extends BaseController {
    constructor() {
        super('api/groups')
        this.router
            .get('', this.getGroups)
            .get('/:id', this.getGroupById)
            .get('/:gameId/game', this.getGroupsByGameId)
            .get('/:groupId/groupmember', this.getGroupMembersByGroupId)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('/:id', this.createGroupForGame)
            .delete('/:id', this.removeGroup)

    }

    async getGroups(req, res, next) {
        try {
            const groups = await groupsService.getGroups()
            return res.send(groups)

        } catch (error) {
            next(error)
        }
    }
    async getGroupById(req, res, next) {
        try {
            const groups = await groupsService.getGroupById(req.params.id)
            return res.send(groups)

        } catch (error) {
            next(error)
        }
    }

    async getGroupMembersByGroupId(req, res, next) {
        try {
            const groupMembers = await groupsService.getGroupMembersByGroupId(req.params.groupId)
            return res.send(groupMembers)
        } catch (error) {
            next(error)
        }
    }

    async getGroupsByGameId(req, res, next) {
        try {
            const groups = await gamesService.getGroupsByGameId(req.params.gameId)
            return res.send(groups)

        } catch (error) {
            next(error)
        }
    }
    async createGroupForGame(req, res, next) {
        try {
            logger.log("Attempting to create group for game at ID: ", req.params.id)
            req.body.creatorId = req.userInfo.id
            req.body.gameId = req.params.id

            logger.log("Body updated with needed params ", req.body)
            const groups = await gamesService.createGroupForGame(req.body)
            return res.send(groups)

        } catch (error) {
            next(error)
        }
    }
    async removeGroup(req, res, next) {
        try {
            const groups = await groupsService.removeGroup(req.params.id)
            return res.send(groups)

        } catch (error) {
            next(error)
        }
    }




}