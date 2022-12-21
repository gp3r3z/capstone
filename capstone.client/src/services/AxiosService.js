import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})


export const igdbAuth = Axios.create({
  baseURL: "https://id.twitch.tv/oauth2/token",
  params: { client_id: '0o7d26kvw9i88cbraxuoqrzmq5hubc', client_secret: 'w086cl0df3ck0w539483xwh0ipfpae', grant_type: 'client_credentials' },
  // headers: {
  //   'Accept': 'application/json',
  //   'Client-ID': '0o7d26kvw9i88cbraxuoqrzmq5hubc',
  //   'Authorization': 'Bearer 1l98kayosayitan0vfep8c1dzy8ib9',
  // },
  // 
})

export const igdbApi = Axios.create({
  baseURL: 'http://localhost:8080/https://api.igdb.com/v4/',
  headers: {
    'Accept': 'application/json',
    'Client-ID': '0o7d26kvw9i88cbraxuoqrzmq5hubc',
  },
  data: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;"
})



