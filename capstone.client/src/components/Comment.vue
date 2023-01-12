<template>
    <h1>{{ comment.description }}</h1>
</template>

<script>

export default {
    props: {
        comment: {
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