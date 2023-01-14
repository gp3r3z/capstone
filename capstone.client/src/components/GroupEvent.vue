<template>
    <div @click="getEventById(event._id)" class="row bg-light rounded ms-3">
        <div :style="`background-image: url(${event.coverImg})`" class=" event-card col-5">


        </div>
        <div class="col-7  text-black">
            <div class="row justify-content-end">
                <button v-if="creator" class="btn btn-circle bg-light col-4" data-bs-toggle="modal"
                    data-bs-target="#edit-event-modal">
                    <i class="mdi mdi-pencil fs-3 text-warning"></i>
                </button>
                <div class="col-12">
                    <h3>Title: {{ event.title }}</h3>
                    <h5>StartTime: {{ event.startTime }}</h5>
                    <h5>Capacity: {{ event.capacity }}</h5>
                    <!-- <h5>Checking to see if i'm a group member {{ groupMembers.some(gm => gm.accountId === account.id) }}
                    </h5> -->

                </div>
            </div>
        </div>
        <div class="row justify-content-center p-3" v-if="account.id">
            <div class="col-3" v-if="event.creatorId == account.id">
                <!-- NOTE cancel event goes here -->
                <button class="btn btn-danger">CancelEvent</button>

            </div>
            <!-- TODO if i'm the creator i shouldn't see the join event -->
            <div class="col-4"
                v-if="groupMembers.some(gm => gm.accountId === account.id) && event.creatorId != account.id">
                <!-- if this is true then set to false  -->
                <button v-if="!event.eventGoers.some(eg => eg.groupMemberId == account.id)" class="btn btn-success"
                    @click="joinEvent(event._id, account)">
                    <i class="mdi mdi-check">join event</i>

                </button>
                <button v-else class="btn btn-danger" @click="leaveEvent(event._id, account)">
                    <i class="mdi mdi-cancel">
                        leave event

                    </i>
                </button>
            </div>
        </div>
        <div class="row bg-dark">
            <div class="col-12" v-for="e in event.eventGoer">
                <EventGoerCard :eventGoer="e" />

            </div>
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
.event-card {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.btn-circle {
    width: 50px;
    height: 50px;
    border-radius: 60px;

}
</style>