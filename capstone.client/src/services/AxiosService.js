import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})


export const rawgAPI = Axios.create({
  baseURL: "https://api.rawg.io/api/",
  params: {
    key: '8d28abb14db24b138405fe932a75a1b1'
  }
})




