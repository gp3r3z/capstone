import { dbContext } from "../db/DbContext.js"
import { logger } from "../utils/Logger.js"


class GamesService {
    async getGroupsByGameId(gameId) {
        logger.log('Server gettingGroupsBy GameID: ', gameId)
        let groups = await dbContext.Group.find({ gameId })
        return groups
    }
    async createGroupForGame(body) {
        logger.log('[Server: Creating Groups for Game]', body)

        const groups = await dbContext.Group.create(body)
        return groups
    }
}


export const gamesService = new GamesService()