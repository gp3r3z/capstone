<template>
    <div class="modal fade" id="edit-event-modal" tabindex="-1" aria-labelledby="editEventModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-light">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="editEventLabel">Edit Event</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="editEvent(activeEvent[0])">
                    <div class="modal-body">
                        <div class="modal-body">
                            <div class="form-floating mb-3 elevation-5 user-box">
                                <input v-model="editable.capacity" type="number" required class="form-control"
                                    id="number" placeholder="Event Capacity">
                                <label for="name">Event Capacity</label>
                            </div>
                            <div class="form-floating mb-3 elevation-5 user-box">
                                <input v-model="editable.coverImg" type="url" required class="form-control"
                                    id="coverImg" placeholder="Event Cover Image">
                                <label for="coverImg">Event Cover Image</label>
                            </div>
                            <div class="form-floating mb-3 elevation-5 user-box">
                                <input v-model="editable.title" type="text" required class="form-control" id="title"
                                    placeholder="Event Title">
                                <label for="title">Event Title</label>
                            </div>
                            <!-- TODO possibly add auto add for start time  -->
                            <div class="form-floating mb-3 elevation-5">
                                <input v-model="editable.startTime" type="date" class="form-control time-input"
                                    id="startTime" placeholder="Event Start Date">

                                <label for="startTime">Current StartTime {{ editable.startTime }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Edit Event</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { eventsService } from '../services/EventsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { Modal } from 'bootstrap'


export default {
    props: {
        eventData: {
            type: Object,
            default: {}
        }
    },


    setup() {
        const editable = ref({})

        watchEffect(() => {
            if (AppState.activeEvent) {
                logger.log('here is the active event in the watch effect', AppState.activeEvent[0])
                editable.value = { ...AppState.activeEvent[0] }
            }

        });
        async function editEvent(activeEvent) {
            try {

                logger.log('this is the active event', activeEvent._id)
                await eventsService.editEvent(editable.value, activeEvent._id)
                Pop.toast('Event Edited!', 'success')
                Modal.getOrCreateInstance('#edit-event-modal').hide()
            } catch (error) {
                Pop.error(('[ERROR]'), error.message)
            }
        }
        return {
            editable,
            editEvent,
            activeEvent: computed(() => AppState.activeEvent)
        };

    }
}
</script>

<style>

</style>