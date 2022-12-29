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

}

export const groupsService = new GroupsService()