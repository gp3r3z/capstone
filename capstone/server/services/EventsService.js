import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"


class EventsService {

    async createEvent(eventData) {
        logger.log('[Server: Creating Event for Group]', eventData)
        const event = dbContext.Event.create(eventData)
        return event
    }
    async getEventsByGroupId(groupId) {
        logger.log('[Server: Getting Event for GroupID]', groupId)
        const event = dbContext.Event.find({ groupId })
        return event
    }
    async removeEvent(eventId) {
        logger.log('[Server: Removing Event for Group]', eventId)
        const event = dbContext.Event.remove({ _id: eventId })
        return event
    }
    async editEvent(eventId, eventData) {
        const original = await dbContext.Event.findById(eventId)

        if (!original) throw new BadRequest('no Event at id:' + eventId)
        // @ts-ignore
        if (original.creatorId.toString() != eventData.creatorId) {
            throw new Forbidden('not your event to edit')
        }

        original.title = eventData.title ? eventData.title : original.title
        original.coverImg = eventData.coverImg ? eventData.coverImg : original.coverImg
        original.capacity = eventData.capacity != undefined ? eventData.capacity : original.capacity
        original.startTime = eventData.startTime ? eventData.gameTitle : original.startTime
        original.isCanceled = eventData.isCanceled ? eventData.isCanceled : original.isCanceled


        await original.save()
        return original
    }
    async joinEvent(eventId, groupMemberId) {
        const event = await dbContext.Event.findById(eventId)
        // @ts-ignore
        logger.log('Attempting to join ', event.title)
        // @ts-ignore
        event.eventGoers.push(groupMemberId)
        // @ts-ignore
        event.save()
        return event

    }
}

export const eventsService = new EventsService()