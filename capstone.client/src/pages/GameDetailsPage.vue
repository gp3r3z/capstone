<template>
    <!-- SECTION Game Details Row  -->
    <section class="row">
        <img  />
    </section>
    <!-- SECTION screen highlights Details Row  -->
    <section class="row"></section>
    <!-- SECTION GameGroups Details Row Header  -->

    <section class="row"></section>
    <!-- SECTION GameGroups Details Row body  -->

    <section class="row"></section>
</template>

<script>
import { useRoute } from 'vue-router';
import { gamesService } from '../services/GamesService.js';
import { AppState } from '../AppState.js';
import { onMounted, computed } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';

export default {
    setup() {
        const route = useRoute();
        async function getGameById() {
            try {
                await gamesService.getGameById(route.params.id);
            }
            catch (error) {
                Pop.error(error);
                logger.log(error);
            }
        }
        onMounted(() => {
            getGameById()
        })
        return {
            activeGame: computed(() => AppState.activeGame)
        };

    }
}
</script>

<style>

</style>