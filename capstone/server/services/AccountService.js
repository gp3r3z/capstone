import { dbContext } from '../db/DbContext'
import { logger } from '../utils/Logger.js'

// Private Methods

/**
 * Creates account if one does not exist
 * @param {any} account
 * @param {any} user
 */
async function createAccountIfNeeded(account, user) {
  if (!account) {
    user._id = user.id
    account = await dbContext.Account.create({
      ...user,
      subs: [user.sub]
    })
  }
  return account
}

/**
 * Adds sub to account if not already on account
 * @param {any} account
 * @param {any} user
 */
async function mergeSubsIfNeeded(account, user) {
  if (!account.subs.includes(user.sub)) {
    // @ts-ignore
    account.subs.push(user.sub)
    await account.save()
  }
}
/**
 * Restricts changes to the body of the account object
 * @param {any} body
 */
function sanitizeBody(body) {
  const writable = {
    name: body.name,
    picture: body.picture
  }
  return writable
}

class AccountService {
  /**
   * Returns a user account from the Auth0 user object
   *
   * Creates user if none exists
   *
   * Adds sub of Auth0 account to account if not currently on account
   * @param {any} user
   */
  async getAccount(user) {
    let account = await dbContext.Account.findOne({
      _id: user.id
    })
    account = await createAccountIfNeeded(account, user)
    await mergeSubsIfNeeded(account, user)
    return account
  }

  async getGroupCreator(user) {
    logger.log('[SERVER getting creator]', user)
    let account = await dbContext.Account.findOne({
      _id: user
    })
    return account
  }

  /**
   * Updates account with the request body, will only allow changes to editable fields
   *  @param {any} user Auth0 user object
   *  @param {any} body Updates to apply to user object
   */
  async updateAccount(user, body) {
    const update = sanitizeBody(body)
    const account = await dbContext.Account.findOneAndUpdate(
      { _id: user.id },
      { $set: update },
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    )
    return account
  }

  async editAccount(id, body) {
    logger.log('[EDITINGACCOUNT]', id, ' \n with body ', body)
    const originalAccount = await dbContext.Account.findById(id)
    //TODO why is this returning a bad doc vs our event edit service

    // @ts-ignore
    originalAccount.name = body.name ? body.name : originalAccount.name
    // @ts-ignore
    originalAccount.email = body.email != undefined ? body.email : originalAccount.email
    // @ts-ignore
    originalAccount.name = body.name ? body.name : originalAccount.name
    // @ts-ignore
    originalAccount.picture = body.picture ? body.picture : originalAccount.picture
    // @ts-ignore
    originalAccount.coverImg = body.coverImg ? body.coverImg : originalAccount.coverImg
    // @ts-ignore
    originalAccount.platform = body.platform ? body.platform : originalAccount.platform
    // @ts-ignore
    originalAccount.bio = body.bio ? body.bio : originalAccount.bio
    // @ts-ignore
    await originalAccount.save()
    return originalAccount
  }
}
export const accountService = new AccountService()
