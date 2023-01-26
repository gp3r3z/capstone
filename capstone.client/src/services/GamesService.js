import { AppState } from "../AppState"
import { Game } from "../models/Game"
import { logger } from "../utils/Logger.js"
import { api, rawgAPI } from "./AxiosService.js"


class GamesService {

    async getGames() {
        const res = await rawgAPI.get('games?page_size=25')
        logger.log('getting games', res.data)
        AppState.games = res.data.results.map(g => new Game(g))
        AppState.nextPage = res.data.next
        AppState.prevPage = res.data.previous

    }
    async switchPage(url) {
        const res = await rawgAPI.get(url)
        logger.log(res.data)
        AppState.games = res.data.results.map(g => new Game(g))
        AppState.prevPage = res.data.previous
        AppState.nextPage = res.data.next
    }
    async getGamesByGenres(query) {
        const res = await rawgAPI.get(`games?genres=${query}&page_size=25`)
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

    async searchQuery(param) {
        logger.log('Here is the search param ', param)
        const res = await rawgAPI.get(`games?search=${param}`)
        logger.log('getting games by search', res.data)
        AppState.games = res.data.results.map(g => new Game(g))

    }


}

export const gamesService = new GamesService()