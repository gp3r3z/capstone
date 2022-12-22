<template>

    <img :src="game.bgImg" alt="" class="img-fluid">
</template>

<script>

export default {

    props: {
        game: {
            type: Object,
            required: true
        }
    },

    setup() {

        return {};

    }
}
</script>

<style>

</style>