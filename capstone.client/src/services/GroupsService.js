import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class GroupsService {
    async getGroupById(id) {
        const res = await api.get(`api/groups/${id}`)
        logger.log('Getting group by Id ', id, '\n Response ', res.data)

        AppState.activeGroup = res.data

    }
    async joinGroup(body) {
        logger.log('Join group by groupId ', body)
        const res = await api.post(`api/groupmember/`, { groupId: body })

        AppState.groupMembers.push(res.data)
        AppState.activeGroup.capacity--

        logger.log('This is the current group members', AppState.groupMembers)
    }
    async leaveGroup(id) {
        logger.log('Leaving group by groupmemberId ', id)
        const res = await api.delete(`api/groupmember/${id}`)
        logger.log('Leaving group res ', res.data)
        AppState.groupMembers = AppState.groupMembers.filter(g => g.id !== id)
        logger.log('This is the current group members', AppState.groupMembers)

        AppState.activeGroup.capacity++

    }
}

export const groupsService = new GroupsService()