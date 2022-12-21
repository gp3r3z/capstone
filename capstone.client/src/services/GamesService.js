import { AppState } from "../AppState"
import { logger } from "../utils/Logger.js"
import { igdbAuth, igdbApi } from "./AxiosService.js"


class GamesService {

    async getGames() {
        const res = await igdbApi.post('games', { data: "fields *; limit 10; " })
        logger.log('getting games', res.data)

    }

    async getGameAuth() {
        const res = await igdbAuth.post()
        logger.log('getting games', res.data)
        igdbApi.defaults.headers.Authorization = `Bearer ${res.data.access_token}`
        AppState.gameToken = res.data.access_token

    }
}

export const gamesService = new GamesService()