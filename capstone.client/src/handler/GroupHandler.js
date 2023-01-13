import { socketService } from "../services/SocketService.js"


export class GroupHandler {
    static EnterGroupChat(groupId) {
        socketService.emit('ENTER_GROUPCHAT', groupId)
    }

    static LeaveGroupChat(groupId) {
        socketService.emit('LEAVE_GROUPCHAT', groupId)
    }
}