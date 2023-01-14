import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class EventsService {

    async getEventById(eventId) {
        const res = await api.get(`api/events/${eventId}`)
        logger.log('getting event by its id', res.data)
        AppState.activeEvent = res.data

    }

    async editEvent(eventData, eventId) {
        logger.log('Here is the  ', eventId)
        const res = await api.put('api/events/' + eventId, eventData)
        logger.log('edited event', res.data)
        AppState.activeEvent = res.data
    }

    async createEvent(eventData, groupId) {
        const res = await api.post(`api/events/${groupId}`, eventData)
        logger.log('created event', res.data)
        AppState.events.push(res.data)

    }

    async joinEvent(eventId, accountId) {
        const res = await api.post(`api/events/${eventId}/events`, accountId)
        logger.log('joined event', res.data)


    }

}

export const eventsService = new EventsService()