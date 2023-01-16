import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"


class EventsService {

    async getEventByEventId(eventId) {
        logger.log('[Server: Getting Event by id:', eventId)
        const event = await dbContext.Event.find({ _id: eventId })
        return event
    }

    async getEventsByGroupId(groupId) {
        logger.log('[Server: Getting Event for GroupID]', groupId)
        const event = await dbContext.Event.find({ groupId })
        return event
    }
    async createEvent(eventData) {
        logger.log('[Server: Creating Event for Group]', eventData)
        const event = await dbContext.Event.create(eventData)
        return event
    }
    async removeEvent(eventId) {
        logger.log('[Server: Removing Event for Group]', eventId)
        const event = await dbContext.Event.remove({ _id: eventId })
        event.isCanceled = !event.isCanceled
        await event.save()
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
        original.startTime = eventData.startTime ? eventData.startTime : original.startTime
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
        event.capacity--
        // @ts-ignore
        event.save()
        return event

    }

    async leaveEvent(eventId, id) {
        const event = await dbContext.Event.findById(eventId)
        if (!event) throw new BadRequest(`no event at id: ${eventId}`)
        // FIXME working on correcting leave event
        // @ts-ignore
        // if (event.creatorId.toString() != userId) throw new Forbidden('cannot leave an event you were never attending')

        // @ts-ignore

        await event.eventGoers.splice(id, 1)

        // @ts-ignore
        event.capacity++

        // @ts-ignore
        await event.save()

        logger.log('[SERVER: UPDATED]', event)

        return 'you left the event'

    }
    async getMyEventsByCreatorId(id) {
        const myEvent = await dbContext.Event.find({ id })
        logger.log('Attempting to getMyEventsByCreatorId', myEvent)
        return myEvent
    }
}

export const eventsService = new EventsService()