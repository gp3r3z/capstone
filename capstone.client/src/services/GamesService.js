import { AppState } from "../AppState"
import { Game } from "../models/Game"
import { logger } from "../utils/Logger.js"
import { rawgAPI } from "./AxiosService.js"


class GamesService {

    async getGames() {
        const res = await rawgAPI.get('games?page_size=50')
        logger.log('getting games', res.data)
        AppState.games = res.data.results.map(g => new Game(g))

    }
    async getGamesByGenres(query) {
        logger.log(query)
        const res = await rawgAPI.get(`games?genres=${query}&page_size=50`)
        logger.log('getting games by genre', res.data)
        AppState.games = res.data.results.map(g => new Game(g))

    }
    async getGameById(id) {
        logger.log("Passing the ID ", id)
        const res = await rawgAPI.get(`games/${id}`)
        logger.log('getting Game by id', res.data)
        AppState.activeGame = res.data.results
    }

    async getAllGenres() {
        const res = await rawgAPI.get('genres')
        logger.log('all genres', res.data)
    }


}

export const gamesService = new GamesService()