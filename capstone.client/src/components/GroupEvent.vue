<template>
    <div @click="getEventById(event._id)">
        <div class="col-3 d-flex justify-content-between">
            <button v-if="foundMe" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#edit-event-modal">
                <i class="mdi mdi-dots-horizontal fs-3 text-warning"></i>
            </button>
            <img :src="event.coverImg" alt="" class="img-fluid">
        </div>
        <div class="ms-5 col-7 text-black">
            {{ event.title }}
            {{ event.startTime }}
            {{ event.capacity }}
            {{ event._id }}

        </div>
    </div>
    <div>
        <div v-if="event.creatorId == account.id">
            <!-- NOTE cancel event goes here -->
        </div>
        <button v-else-if="!findMe" class="btn btn-success" @click="joinEvent(event._id, account.id)">
            <i class="mdi mdi-check">join event</i>

        </button>
        <button v-else="findMe" class="btn btn-success">
            leave event
        </button>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { watchEffect } from 'vue';
// import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService.js'
import { useRoute } from 'vue-router';



export default {
    // TODO add this prop back once events can be created
    props: {
        event: {
            type: Object,
            required: true
        }
    },



    setup() {
        const route = useRoute()
        async function getEventById(eventId) {
            try {
                await eventsService.getEventById(eventId)
            } catch (error) {
                logger.error(error)
                Pop.error(('[ERROR]'), error.message)
            }
        }


        return {
            account: computed(() => AppState.account),
            foundMe: computed(() => AppState.events.find(e => e.creatorId == AppState.account.id)),
            findMe: computed(() => AppState.events.find(e => e.eventGoers.groupMemberId == AppState.account.id)),
            getEventById,
            activeEvent: computed(() => AppState.activeEvent),
            // groupMember: computed(() => AppState.groupMembers),

            async joinEvent(eventId, accountId) {
                try {
                    await eventsService.joinEvent(eventId, accountId)
                    Pop.toast('Event joined!', 'success')
                } catch (error) {
                    logger.error(error)
                    Pop.error(('[ERROR]'), error.message)
                }
            }



        };

    }
}
</script>

<style>

</style>