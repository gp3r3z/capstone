<template>
    <h3>{{ eventGoer.name }}</h3>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
    props: {
        eventGoer: { type: Object, required: true }
    },
    setup() {
        return {}
    }
};
</script>


<style lang="scss" scoped>

</style>