import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { eventsService } from '../services/EventsService.js'
import { logger } from '../utils/Logger.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/getMyEvents', this.getMyEventsByCreatorId)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
  async getMyEventsByCreatorId(req, res, next) {
    try {

      const account = await eventsService.getMyEventsByCreatorId(req.userInfo.id)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
}
