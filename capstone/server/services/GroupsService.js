import { dbContext } from "../db/DbContext.js"
import { logger } from "../utils/Logger.js"

class GroupsService {
    async getGroups() {
        logger.log('[Server: Getting Groups]')
        const groups = await dbContext.Group.find()
        return groups
    }
    async createGroupForGame(body) {
        logger.log('[Server: Creating Groups for Game]', body)

        const groups = await dbContext.Group.create(body)
        return groups
    }
}

export const groupsService = new GroupsService()