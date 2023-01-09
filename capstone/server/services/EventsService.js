import { dbContext } from "../db/DbContext.js"
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
}

export const eventsService = new EventsService()