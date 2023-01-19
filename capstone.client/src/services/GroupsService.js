import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class GroupsService {
    async getGroupById(id) {
        const res = await api.get(`api/groups/${id}`)
        // logger.log('Getting group by Id ', id, '\n Response ', res.data)
        AppState.activeGroup = res.data
        const activeGroupCreatorId = AppState.activeGroup.creatorId

        const resAccount = await api.get(`/account/${activeGroupCreatorId}`)
        logger.log('Here is the activeCreator for groups', resAccount.data)
        AppState.activeGroupCreator = resAccount.data


    }

    async getGroupMembersByGroupId(groupId) {
        const res = await api.get(`api/groups/${groupId}/groupmember`)
        logger.log('getting group members by group id', res.data)
        AppState.groupMembers = res.data
    }
    async getEventsByGroupId(groupId) {
        const res = await api.get(`api/events/${groupId}/group`)
        logger.log('getting events by group id', res.data)
        AppState.events = res.data

       
    }
    async joinGroup(body) {
        logger.log('Join group by groupId ', body)
        const res = await api.post(`api/groupmember/`, { groupId: body })
        // logger.log(res.data, 'res data')
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

    async createGroup(gameId, body) {
        const res = await api.post(`api/groups/${gameId}`, body)
        logger.log('[created group]', res.data)
        AppState.groups.push(res.data)
        return res.data
    }

    async editGroup(groupData, groupId) {
        logger.log('this is the group data', groupData)
        const res = await api.put(`api/groups/` + groupId, groupData)
        logger.log('edited group', res.data)
        AppState.activeGroup = res.data

    }
}

export const groupsService = new GroupsService()