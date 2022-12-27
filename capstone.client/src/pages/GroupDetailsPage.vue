<template>
    <div class="component">
        <h1>{{ activeGroup.groupName }}</h1>
        <p>{{ activeGroup.description }}</p>

    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { groupsService } from '../services/GroupsService.js'


export default {
    setup() {
        const route = useRoute();
        async function getGroupById() {
            try {
                await groupsService.getGroupById(route.params.id);
            }
            catch (error) {
                Pop.error(error);
                logger.log(error);
            }
        }
        onMounted(() => {
            getGroupById()

        })
        return {
            activeGroup: computed(() => AppState.activeGroup)

        }
    }
};
</script>


<style lang="scss" scoped>

</style>