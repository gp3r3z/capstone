import { AppState } from '../AppState.js'
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on('MESSAGE_ADDED', this.addMessage)
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }
  addMessage(message) {
    addOrSkip(AppState.comments, message)
  }

}
function addOrSkip(arr, item) {

  arr.push(item)
}

export const socketService = new SocketService()
