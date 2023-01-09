import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"

class GroupsService {
    async getGroups() {
        logger.log('[Server: Getting Groups] ')
        const groups = await dbContext.Group.find()
        return groups
    }
    async getGroupById(id) {
        logger.log('[Server: Getting GroupBYID] ', id)
        const groups = await dbContext.Group.findById({ '_id': id })
        return groups
    }
    async removeGroup(id) {
        logger.log('[Server: Removing GroupBYGroupID] ', id)
        const groups = await dbContext.Group.remove({ '_id': id })
        return groups
    }
    async joinGroup(body) {
        logger.log('[Server: Joining GroupById] ', body)
        const group = await dbContext.Group.findById(body.groupId)

        logger.log('[Found Group]')

        // @ts-ignore
        if (group.capacity <= 0) throw new BadRequest('max capacity reached')


        const groupmember = await dbContext.GroupMember.create(body)

        // @ts-ignore
        group.capacity--

        await groupmember.populate('profile')
        // @ts-ignore
        await group.save()
        return groupmember
    }
    async leaveGroup(groupMemberId, userId) {
        const groupMember = await dbContext.GroupMember.findById(groupMemberId).populate('profile')

        if (!groupMember) throw new BadRequest(`No groupmember at id ${groupMemberId}`)
        // @ts-ignore
        if (groupMember.accountId.toString() != userId) throw new Forbidden("No group member at accountId")

        await groupMember.remove()

        const group = await this.getGroupById(groupMember.groupId)

        // @ts-ignore
        group.capacity += 1
        // @ts-ignore
        await group.save()
        return 'Left group'


    }
    async getGroupMembers() {
        const getGroupMembers = await dbContext.GroupMember.find()

        logger.log(getGroupMembers)
        return getGroupMembers
    }

}

export const groupsService = new GroupsService()