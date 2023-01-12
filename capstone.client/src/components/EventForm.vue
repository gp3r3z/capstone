<template>
    <div class="modal-header">
        <h1 class="modal-title fs-5" id="create-event-modal">Create Group</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <form @submit.prevent="createEvent()">
        <div class="modal-body">
            <div class="form-floating mb-3 elevation-5">
                <input v-model="editable.title" type="text" required class="form-control" id="title"
                    placeholder="Title">
                <label for="name">Event Title</label>
            </div>
            <div class="form-floating mb-3 elevation-5">
                <input v-model="editable.capacity" type="number" required class="form-control" id="title"
                    placeholder="Event Title">
                <label for="location">Event Capacity</label>
            </div>
            <div class="form-floating mb-3 elevation-5">
                <input v-model="editable.coverImg" type="url" required class="form-control" id="coverImg"
                    placeholder="Event Image">
                <label for="coverImg">Cover Image</label>
            </div>
            <div class="form-floating mb-3 elevation-5">
                <input v-model="editable.startTime" type="date" required class="form-control" id="startTime"
                    placeholder="Event Time">
                <label for="startTime">Event Time</label>
            </div>

        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Create Group</button>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue';
import { commentsService } from '../services/CommentsService';
import { eventsService } from '../services/EventsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { Modal } from 'bootstrap';
import { useRoute } from 'vue-router';




export default {



    setup() {
        const editable = ref({})
        const route = useRoute()
        return {
            editable,
            async createEvent() {
                try {
                    await eventsService.createEvent(editable.value, route.params.id)
                    Modal.getOrCreateInstance('#create-event-modal').hide()

                } catch (error) {
                    logger.log(error)
                    Pop.error(('[ERROR]'), error.message)
                }
            }
        };

    }
}
</script>

<style>

</style>