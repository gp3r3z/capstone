import { eventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";
import { logger } from "../utils/Logger.js";
import { Auth0Provider } from '@bcwdev/auth0provider'


export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('/:groupId/group', this.getEventsByGroupId)
            .get('/:eventId', this.getEventByEventId)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('/:groupId', this.createEvent)
            .delete('/:eventId', this.removeEvent)
            .delete('/:eventId/leave', this.leaveEvent)
            .put('/:eventId', this.editEvent)
            .post('/:eventId/events', this.joinEvent)
    }

    async getEventByEventId(req, res, next) {
        try {
            const events = await eventsService.getEventByEventId(req.params.eventId)
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
    async createEvent(req, res, next) {
        try {

            req.body.creatorId = req.userInfo.id
            req.body.groupId = req.params.groupId

            const events = await eventsService.createEvent(req.body)
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }
    async removeEvent(req, res, next) {
        try {
            const events = await eventsService.removeEvent(req.params.eventId)
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }

    async leaveEvent(req, res, next) {
        try {
            const events = await eventsService.leaveEvent(req.params.eventId, req.userInfo.id)
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }
    async editEvent(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const events = await eventsService.editEvent(req.params.eventId, req.body)
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }
    async joinEvent(req, res, next) {
        try {
            const events = await eventsService.joinEvent(req.params.eventId, req.body)
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }
}