<template>
    <div class="container-fluid bg-img" :style="`background-image: url(${activeGame.bgImgAdditional})`">
        <!-- SECTION Game Details   -->
        <section class="row justify-content-around align-items-center">
            <div class="col-5 ">
                <img class="game-img mt-3 rounded elevation-5" :src="activeGame.bgImg" />
            </div>
            <div class="col-6  elevation-5 rounded  gamecard-style mt-3">
                <p class="p-3 ">{{ activeGame.description_R }}</p>
                <p>Released {{ activeGame.released }} Genre:{{ activeGame.genre }} </p>
                <p>
                    Rating:{{ activeGame.rating }}
                </p>
            </div>
        </section>
        <!-- SECTION Game Details screenshot highlights   -->
        <section class="row gamecard-style mt-3 p-3">
            <div v-for="s in activeGame.screenshots" class="col-4 rounded-3">
                <div>
                    <img :src="s.image" class="img-fluid mt-3 elevation-3 img-thumbnail" />
                </div>

            </div>

        </section>
        <!-- SECTION GameGroups Details Row Header  -->

        <section class="row justify-content-center">
            <div class="col-8 bg-light rounded elevation-5">
                <h2 class="text-center">Groups</h2>
            </div>
            <div class="row mt-3 justify-content-center">
                <!-- SECTION GROUPS FOR GAME -->
                <div v-for="g in groups" class="col-8">
                    <GroupRowCard :group="g" />
                </div>
            </div>


        </section>
        <section class="row">
            <button href="#" class="float btn rounded-circle bg-dark d-flex justify-content-center align-items-center"
                data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i class="mdi mdi-plus fs-1"></i>
            </button>
        </section>

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
        async function getGroupsByGameId() {
            try {
                await gamesService.getGroupsByGameId(route.params.id);
            }
            catch (error) {
                Pop.error(error);
                logger.log(error);
            }
        }
        onMounted(() => {
            getGameById()
            getGroupsByGameId()
        })
        return {
            activeGame: computed(() => AppState.activeGame),
            groups: computed(() => AppState.groups)


        }
    }
}
</script>

<style>
.game-img {
    height: 50vh;
    width: 65vh;
}

.bg-img {
    height: 100vh;
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.gamecard-style {
    background-color: rgba(255, 255, 255, 0.432);
    backdrop-filter: blur(10px);
}

* {
    padding: 0;
    margin: 0;
}



.float {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 40px;
    right: 40px;
    background-color: #0C9;
    color: #AECBCF;
    border-radius: 50px;
    text-align: center;
    box-shadow: 2px 2px 3px #AECBCF;
}

.my-float {
    margin-top: 22px;
}
</style>