<template>
    <div class="col-3 d-flex justify-content-between">
        <i class="mdi mdi-dots-horizontal fs-3 text-light"></i>
        <img :src="event.coverImg" alt="" class="img-fluid">
    </div>
    <div class="col-7 text-white">
        {{ event.title }}
        {{ event.startTime }}
        {{ event.capacity }}
    </div>
</template>

<script>
import { computed } from '@vue/reactivity';
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
        async function getEventById() {
            try {
                await eventsService.getEventById(route.params.id)
            } catch (error) {
                logger.error(error)
                Pop.error(('[ERROR]'), error.message)
            }
        }

        watchEffect(() => {
            getEventById()
        })
        return {
            account: computed(() => AppState.account),


        };

    }
}
</script>

<style>

</style>