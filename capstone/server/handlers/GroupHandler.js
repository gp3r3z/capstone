import { SocketHandler } from '../utils/SocketHandler'

export class GroupHandler extends SocketHandler {
    /**
     * @param {import("socket.io").Server} io
     * @param {import("socket.io").Socket} socket
     */
    constructor(io, socket) {
        super(io, socket, true)
        this
            .on('ENTER_GROUPCHAT', this.enterGroupChat)
            .on('LEAVE_GROUPCHAT', this.leaveGroupChat)
    }

    enterGroupChat(groupId) {
        this.socket.join(groupId)
    }

    leaveGroupChat(groupId) {
        this.socket.leave(groupId)
    }
}
