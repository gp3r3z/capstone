<template>
    <router-link :to="{ name: 'GameDetails', params: { id: game.id } }" :title="game.name">
        <!-- <div class="text-white gameCardStyle">
            <img :src="game.bgImg" alt="" class="card-img p-4 img-fluid">
            <h3 class="text-center ">{{ game.name }}</h3>
            <h3 class="text-center "> Rating: {{ game.rating }} / 5</h3>
        </div> -->
        <div class="b-game-card">
            <div class="b-game-card__cover rounded" :style="`background-image: url(${game.bgImg})`">
            </div>
        </div>
        <h5 class="text-white text-center blur mt-3 p-2 rounded elevation-4">{{ game.name }}</h5>
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
/* .card-img {
    height: 25vh;
    width: 40vh;
}

.gameCardStyle {
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
} */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.l-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px;
    width: 100%;
    padding: 30px;
}

@media screen and (max-width: 760px) {
    .l-container {
        grid-template-columns: repeat(2, 1fr);
    }
}

.blur {
    backdrop-filter: blur(5px);
    background-color: #e6b6e63c;
}

.b-game-card {
    position: relative;
    z-index: 1;
    width: 100%;
    padding-bottom: 150%;
    perspective: 1000px;
}

.b-game-card__cover {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
    background-size: cover;
    background-position: center;
    perspective-origin: 50% 50%;
    transform-style: preserve-3d;
    transform-origin: top center;
    will-change: transform;
    transform: skewX(0.001deg);
    transition: transform 0.35s ease-in-out;
}

.b-game-card__cover::after {
    display: block;
    content: "";
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 120%;
    background: linear-gradient(226deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.4) 35%, rgba(255, 255, 255, 0.2) 42%, rgba(255, 255, 255, 0) 60%);
    transform: translateY(-20%);
    will-change: transform;
    transition: transform 0.65s cubic-bezier(0.18, 0.9, 0.58, 1);
}

.b-game-card:hover .b-game-card__cover {
    transform: rotateX(7deg) translateY(-6px);
}

.b-game-card:hover .b-game-card__cover::after {
    transform: translateY(0%);
}

.b-game-card::before {
    display: block;
    content: "";
    position: absolute;
    top: 5%;
    left: 5%;
    width: 90%;
    height: 90%;
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0 6px 12px 12px rgba(0, 0, 0, 0.4);
    will-change: opacity;
    transform-origin: top center;
    transform: skewX(0.001deg);
    transition: transform 0.35s ease-in-out, opacity 0.5s ease-in-out;
}

.b-game-card:hover::before {
    opacity: 0.6;
    transform: rotateX(7deg) translateY(-6px) scale(1.05);
}
</style>