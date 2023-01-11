<template>
    <router-link :to="{ name: 'GameDetails', params: { id: game.id } }" :title="game.name">
        <div class="text-white gameCardStyle">
            <img :src="game.bgImg" alt="" class="card-img p-4 img-fluid">
            <h3 class="text-center ">{{ game.name }}</h3>
            <h3 class="text-center "> Rating: {{ game.rating }} / 5</h3>
        </div>
    </router-link>
</template>

<script>
import { useRouter } from 'vue-router';
import { Game } from '../models/Game.js';

export default {

    props: {
        game: {
            type: Game,
            required: true
        }
    },
    setup() {
        const router = useRouter()
        return {};

    },

}
</script>

<style>
.card-img {
    height: 25vh;
    width: 40vh;
}

.gameCardStyle {
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
}
</style>