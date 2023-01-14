<template>
    <div @click="getEventById(event._id)">
        <div class="col-3 d-flex justify-content-between">
            <button v-if="creator" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#edit-event-modal">
                <i class="mdi mdi-dots-horizontal fs-3 text-warning"></i>
            </button>
            <img :src="event.coverImg" alt="" class="img-fluid">
        </div>
        <div class="ms-5 col-7 text-black">
            {{ event.title }}
            {{ event.startTime }}
            {{ event.capacity }}
            {{ event._id }}
            <h5>Checking to see if i'm a group member {{ groupMembers.some(gm => gm.accountId === account.id) }}</h5>

            This is the event creator {{ event.creatorId }}
            Current account {{ account.id }}
            Current event members {{ event.eventGoers }}


        </div>
    </div>
    <div v-if="account.id">
        <div v-if="creator">
            <!-- NOTE cancel event goes here -->
            cancel event
        </div>
        <div v-if="groupMembers.some(gm => gm.accountId === account.id)">
            <!-- if this is true then set to false  -->
            <button v-if="!event.eventGoers.some(eg => eg.groupMemberId == account.id)" class="btn btn-success"
                @click="joinEvent(event._id, account.id)">
                <i class="mdi mdi-check">join event</i>

            </button>
            <button v-else class="btn btn-success" @click="leaveEvent(event._id, account.id)">
                <i class="mdi mdi-cancel">
                    leave event

                </i>
            </button>
        </div>
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
            groupMembers: computed(() => AppState.groupMembers),
            creator: computed(() => AppState.events.find(e => e.creatorId == AppState.account.id)),
            getEventById,
            activeEvent: computed(() => AppState.activeEvent),
            activeGroup: computed(() => AppState.activeGroup),


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