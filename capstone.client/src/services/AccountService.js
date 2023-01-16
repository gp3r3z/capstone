import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data

      logger.log('HERE is the account', res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
  async getMyGroups() {
    try {
      const res = await api.get('/account/getMyGroups')
      AppState.myGroups = res.data
      logger.log('Getting MyGroups ', res.data)
    } catch (err) {
      logger.error('Error Getting MyGroups', err)
    }
  }
  async getMyEvents() {
    try {
      const res = await api.get('/account/getMyEvents')
      AppState.myEvents = res.data
      logger.log('Getting myEvents ', res.data)
    } catch (err) {
      logger.error('Error Getting myEvents', err)
    }
  }

  async editAccount(body) {
    const res = await api.put('/account', body)
    logger.log('edited your acount', res.data)
    AppState.account = res.data
  }
}



export const accountService = new AccountService()
