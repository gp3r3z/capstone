<template>
    <router-link :to="{ name: 'GroupDetails', params: { id: group.id } }" class="selectable">
        <div class="row bg-light p-3 rounded elevation-5 mt-3">
            <div class="col-3">
                <img class="img-fluid" :src="group.coverImg" />
            </div>
            <div class="col-6">
                <h2>{{ group.groupName }}</h2>
                <p>{{ group.description }}</p>
                <p>Capacity: {{ group.capacity }}</p>
                <p>SkillLevel: {{ group.skillLevel }}</p>
            </div>
        </div>
    </router-link>


    <!-- FIXME different set of cards below https://codepen.io/seyedi/pen/zYoeLEv -->

    <!-- <ul class="cards">
        <li>
            <a href="" class="card">
                <img :src="group.coverImg" class="card__image" alt="" />
                <div class="card__overlay">
                    <div class="card__header">
                        <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                            <path />
                        </svg>
                        <img class="card__thumb" src="https://i.imgur.com/7D7I6dI.png" alt="" />
                        <div class="card__header-text">
                            <h2>{{ group.groupName }}</h2>
                            <span class="card__status">
                                Skill Level: {{ group.skillLevel }}
                            </span>
                        </div>
                    </div>
                    <p class="card__description">{{ group.description }}</p>
                </div>
            </a>
        </li>

    </ul> -->

</template>


<script>
import { useRouter } from 'vue-router';

export default {
    props: {
        group: { type: Object, required: true }
    },
    setup() {
        const router = useRouter()
        return {}
    }
};
</script>


<style lang="scss" scoped>
:root {
    --surface-color: #fff;
    --curve: 40;
}

* {
    box-sizing: border-box;
}

body {
    font-family: 'Noto Sans JP', sans-serif;
    background-color: #fef8f8;
}

.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin: 4rem 5vw;
    padding: 0;
    list-style-type: none;
}

.card {
    position: relative;
    display: block;
    height: 100%;
    border-radius: calc(var(--curve) * 1px);
    overflow: hidden;
    text-decoration: none;
}

.card__image {
    width: 100%;
    height: auto;
}

.card__overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    border-radius: calc(var(--curve) * 1px);
    background-color: var(--surface-color);
    transform: translateY(100%);
    transition: .2s ease-in-out;
}

.card:hover .card__overlay {
    transform: translateY(0);
}

.card__header {
    position: relative;
    display: flex;
    align-items: center;
    gap: 2em;
    padding: 2em;
    border-radius: calc(var(--curve) * 1px) 0 0 0;
    background-color: var(--surface-color);
    transform: translateY(-100%);
    transition: .2s ease-in-out;
}

.card__arc {
    width: 80px;
    height: 80px;
    position: absolute;
    bottom: 100%;
    right: 0;
    z-index: 1;
}

.card__arc path {
    fill: var(--surface-color);
    d: path("M 40 80 c 22 0 40 -22 40 -40 v 40 Z");
}

.card:hover .card__header {
    transform: translateY(0);
}

.card__thumb {
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.card__title {
    font-size: 1em;
    margin: 0 0 .3em;
    color: #6A515E;
}

.card__tagline {
    display: block;
    margin: 1em 0;
    font-family: "MockFlowFont";
    font-size: .8em;
    color: #D7BDCA;
}

.card__status {
    font-size: .8em;
    color: #D7BDCA;
}

.card__description {
    padding: 0 2em 2em;
    margin: 0;
    color: #D7BDCA;
    font-family: "MockFlowFont";
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
</style>