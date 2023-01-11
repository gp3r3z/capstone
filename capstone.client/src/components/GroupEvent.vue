<template>
    <div class="col-3 d-flex justify-content-between">
        <button v-if="foundMe" class="btn btn-light">
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
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService.js'



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
        const editMode = ref(false)
        // async function getEventById() {
        //     try {
        //         await eventsService.getEventById(route.params.id)
        //     } catch (error) {
        //         logger.error(error)
        //         Pop.error(('[ERROR]'), error.message)
        //     }
        // }

        watchEffect(() => {
            // getEventById()
        })
        return {
            account: computed(() => AppState.account),
            foundMe: computed(() => AppState.events.find(e => e.creatorId == AppState.account.id)),
            editMode


        };

    }
}
</script>

<style>

</style>