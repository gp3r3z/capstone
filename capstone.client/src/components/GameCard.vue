<template>
    <router-link :to="{ name: 'GameDetails', params: { id: game.id } }" class="selectable">

        <img :src="game.bgImg" alt="" class="img-fluid">
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

</style>