<template>
    <div class="container-fluid bg-img" :style="`background-image: url(${activeGame.bgImgAdditional})`">
        <!-- SECTION Game Details Row  -->
        <section class="row justify-content-center">
            <div class="col-12 ">
                <img class="game-img m-4 rounded elevation-5" :src="activeGame.bgImg" />
            </div>
        </section>
        <!-- SECTION screen highlights Details Row  -->
        <section class="row"></section>
        <!-- SECTION GameGroups Details Row Header  -->

        <section class="row"></section>
        <!-- SECTION GameGroups Details Row body  -->

        <section class="row"></section>
    </div>


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
.game-img {
    height: 40vh;
    width: 50vh;
}

.bg-img {
    height: 100vh;
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>