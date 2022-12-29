import { AppState } from "../AppState"
import { Game } from "../models/Game"
import { logger } from "../utils/Logger.js"
import { api, rawgAPI } from "./AxiosService.js"


class GamesService {

    async getGames() {
        const res = await rawgAPI.get('games?page_size=50')
        logger.log('getting games', res.data)
        AppState.games = res.data.results.map(g => new Game(g))

    }
    async getGamesByGenres(query) {
        const res = await rawgAPI.get(`games?genres=${query}&page_size=50`)
        logger.log('getting games by genre', res.data)
        AppState.games = res.data.results.map(g => new Game(g))

    }


    async getGameById(id) {
        logger.log("Passing the ID ", id)
        const res = await rawgAPI.get(`games/${id}`)

        this.getGameIdsScreenShots(res.data)

        AppState.activeGame = new Game(res.data)
    }
    async getGameIdsScreenShots(body) {
        logger.log("gettingScreenShots")

        const res = await rawgAPI.get(`games/${body.slug}/screenshots`)

        // logger.log('[screenshotsReceived]', res.data.results)

        AppState.activeGame.screenshots = res.data.results

    }

    async getAllGenres() {
        const res = await rawgAPI.get('genres')
        logger.log('all genres', res.data)
    }

    async getGroupsByGameId(gameId) {
        const res = await api.get(`api/groups/${gameId}/game`)

        logger.log('[Getting groups by GAMEID ]', gameId, ' \n ResponseData', res.data)

        AppState.groups = res.data
    }


}

export const gamesService = new GamesService()