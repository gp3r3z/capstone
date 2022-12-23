import { dbContext } from "../db/DbContext.js"

class GroupsService {
    async getGroups() {
        const groups = await dbContext.Group.find()
        return groups
    }
}

export const groupsService = new GroupsService()