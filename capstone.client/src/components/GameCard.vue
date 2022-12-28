<template>
    <router-link :to="{ name: 'GameDetails', params: { id: game.id } }" :title="game.name">
        <img :src="game.bgImg" alt="" class="card-img p-4">
        <h3 class="text-center text-dark">{{ game.name }}</h3>
        <h3 class="text-center text-dark"> Rating: {{ game.rating }} / 5</h3>
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
</style>