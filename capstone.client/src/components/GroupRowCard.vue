<template>
    <div class="row bg-danger p-3 rounded elevation-5 mt-3">
        <div class="col-3">
            <img class="img-fluid" :src="group.coverImg" />
        </div>
        <div class="col-6">
            <p>{{ group.description }}</p>
            <p>Capacity: {{ group.capacity }}</p>
            <p>SkillLevel: {{ group.skillLevel }}</p>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
    props: {
        group: { type: Object, required: true }
    },
    setup() {
        return {}
    }
};
</script>


<style lang="scss" scoped>

</style>