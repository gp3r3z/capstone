import { AppState } from "../AppState"
import { Game } from "../models/Game"
import { logger } from "../utils/Logger.js"
import { rawgAPI } from "./AxiosService.js"


class GamesService {

    async getGames() {
        const res = await rawgAPI.get('games')
        logger.log('getting games', res.data)
        AppState.games = res.data.results.map(g => new Game(g))

    }


}

export const gamesService = new GamesService()