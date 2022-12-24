import { dbContext } from "../db/DbContext.js"
import { logger } from "../utils/Logger.js"

class GroupsService {
    async getGroups() {
        logger.log('[Server: Getting Groups]')
        const groups = await dbContext.Group.find()
        return groups
    }

}

export const groupsService = new GroupsService()