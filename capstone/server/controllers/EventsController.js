import { eventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";
import { logger } from "../utils/Logger.js";
import { Auth0Provider } from '@bcwdev/auth0provider'


export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('/:groupId', this.getEventsByGroupId)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
    }

    async createEvent(req, res, next) {
        try {

            req.body.creatorId = req.userInfo.id
            req.body.groupId = req.body.groupId

            const events = await eventsService.createEvent(req.body)
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }
    async getEventsByGroupId(req, res, next) {
        try {
            const events = await eventsService.getEventsByGroupId(req.params.groupId)
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }
}