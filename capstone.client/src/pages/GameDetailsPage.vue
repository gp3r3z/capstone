<template>
    <div class="container-fluid bg-img" :style="`background-image: url(${activeGame.bgImgAdditional})`">
        <!-- SECTION Game Details   -->
        <section class="row justify-content-around align-items-center">
            <div class="col-6">
                <div class="row justify-content-center mt-3">
                    <h2 class="col-10 p-2 gamecard-style text-center rounded">{{ activeGame.name }}</h2>
                </div>
                <img class="game-img mt-3 rounded elevation-5" :src="activeGame.bgImg" />
            </div>
            <div class="col-5  elevation-5 rounded  gamecard-style mt-3">
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

        <!-- SECTION GROUPS FOR GAME -->
        <!-- <section class="row justify-content-center">
            <div class="col-8 bg-light rounded elevation-5 mt-4">
                <h2 class="text-center">Groups</h2>
            </div>
            <div class="row mt-3 justify-content-center">
                <div v-for="g in groups" class="col-8">
                    <GroupCard :group="g" />
                </div>
            </div>
        </section> -->
        <section>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-8 bg-light rounded elevation-5 mt-4">
                        <h2 class="text-center">Groups</h2>
                    </div>
                </div>
                <section class="row justify-content-around">
                    <div class="col-4 mt-3" v-for="g in groups">
                        <GroupCard :group="g" />
                    </div>
                </section>

            </div>
        </section>
        <!-- SECTION create group  -->
        <section class="row">
            <button href="#"
                class="float-right btn rounded-circle bg-dark d-flex justify-content-center align-items-center"
                data-bs-toggle="modal" data-bs-target="#exampleModal" title="Create Group">
                <i class="mdi mdi-gamepad-variant fs-1"></i>
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
            getGameById();
            getGroupsByGameId();
        });
        return {
            activeGame: computed(() => AppState.activeGame),
            groups: computed(() => AppState.groups),
        };
    },

}
</script>

<style scoped>
.game-img {
    height: 55vh;
    width: 87vh;
}

.bg-img {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
}

.gamecard-style {
    background-color: rgba(255, 255, 255, 0.432);
    backdrop-filter: blur(10px);
}

.float-right {
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

.float-left {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 40px;
    margin-left: 20px;
    background-color: #0C9;
    color: #AECBCF;
    border-radius: 50px;
    text-align: center;
    box-shadow: 2px 2px 3px #AECBCF;
}

.my-float {
    margin-top: 22px;
}

* {
    font-family: 'Poppins', sans-serif;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #131313;
}

.container {
    position: relative;
}
</style>