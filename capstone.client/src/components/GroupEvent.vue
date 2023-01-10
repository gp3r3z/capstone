<template>
    <div class="col-3">
        <img :src="event.coverImg" alt="" class="img-fluid">
    </div>
    <div class="col-7 text-white">
        {{ event.title }}
        {{ event.startTime }}
        {{ event.capacity }}
    </div>
</template>

<script>

export default {
    // TODO add this prop back once events can be created
    props: {
        event: {
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