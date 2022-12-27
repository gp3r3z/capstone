<template>
    <router-link :to="{ name: 'GroupDetails', params: { id: group.id } }" class="selectable">
        <div class="row bg-danger p-3 rounded elevation-5 mt-3">
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

</style>