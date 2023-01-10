import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class GroupsService {
    async getGroupById(id) {
        const res = await api.get(`api/groups/${id}`)
        logger.log('Getting group by Id ', id, '\n Response ', res.data)

        AppState.activeGroup = res.data

    }

    async createGroup(body) {
        const res = await api.post('api/groups', body)
        logger.log('[create group]', res.data)
        AppState.groups.push(res.data)
        return res.data
    }
}

export const groupsService = new GroupsService()