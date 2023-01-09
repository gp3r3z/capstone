import { dbContext } from "../db/DbContext.js"
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

        logger.log('[Found Group')

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

}

export const groupsService = new GroupsService()