import { AppState } from "../AppState"
import { logger } from "../utils/Logger.js"
import { rawgAPI } from "./AxiosService.js"


class GamesService {

    async getGames() {
        const res = await rawgAPI.get('games')
        logger.log('getting games', res.data)

    }


}

export const gamesService = new GamesService()