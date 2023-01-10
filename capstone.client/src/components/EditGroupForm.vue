<template>
    <div class="modal fade" id="edit-group-modal" tabindex="-1" aria-labelledby="editGroupModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="editGroupLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="editGroup()">
                    <div class="modal-body">
                        <div class="modal-body">
                            <div class="form-floating mb-3 elevation-5 user-box">
                                <input v-model="editable.groupName" type="text" required class="form-control" id="name"
                                    placeholder="Event Name">
                                <label for="name">Group Name</label>
                            </div>
                            <div class="form-floating mb-3 elevation-5 user-box">
                                <input v-model="editable.location" type="text" required class="form-control"
                                    id="location" placeholder="Event Location">
                                <label for="location">Group Location</label>
                            </div>
                            <div class="form-floating mb-3 elevation-5 user-box">
                                <input v-model="editable.description" type="text" required class="form-control"
                                    id="description" placeholder="Event Description">
                                <label for="description">Group Description</label>
                            </div>
                            <div class="form-floating mb-3 elevation-5">
                                <input v-model="editable.capacity" type="number" required class="form-control"
                                    id="capacity" placeholder="Event Capacity">
                                <label for="capacity">Group Capacity</label>
                            </div>
                            <div class="form-floating mb-3 elevation-5">
                                <input v-model="editable.coverImg" type="url" required class="form-control"
                                    id="coverImg" placeholder="Cover Image">
                                <label for="coverImg">Cover Image</label>
                            </div>
                            <div class="form-floating mb-3 elevation-5">
                                <select v-model="editable.skillLevel" class="form-select" id="floatingSelect"
                                    aria-label="Floating label select example">
                                    <option value="beginner">Beginner</option>
                                    <option value="casual">Casual</option>
                                    <option value="competitive">Competitive</option>
                                </select>
                                <label for="floatingSelect">Level of Play</label>
                            </div>
                            <div class="form-floating mb-3 elevation-5">
                                <input v-model="editable.startDate" type="date" required class="form-control"
                                    id="startDate">
                                <label for="startDate">Start Date</label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Create Group</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { propsToAttrMap } from '@vue/shared';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { groupsService } from '../services/GroupsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { Modal } from 'bootstrap'


export default {
    props: {
        groupData: { type: Object, default: {} }
    },


    setup() {
        const editable = ref({})
        const route = useRoute()
        async function editGroup() {
            try {
                await groupsService.editGroup(editable.value, route.params.id)
                Pop.toast('Group Edited!', 'success')
                Modal.getOrCreateInstance('#edit-group-modal').hide()
            } catch (error) {
                Pop.error(('[ERROR]'), error.message)
                logger.error(error)
            }
        }

        return {
            editable,
            editGroup
        };
    }
}
</script>

<style>

</style>