<template>
    <!-- SECTION HERO IMG -->
    <section class="row justify-content-center ">
        <div class="col-9 hero-img rounded mt-3" :style="`background-image: url(${activeGroup.coverImg})`">

        </div>
    </section>

    <!-- SECTION group info -->
    <section class="row justify-content-around mt-3">
        <div class="col-6 bg-dark p-3 rounded">
            <h2>Group: {{ activeGroup.groupName }}</h2>
            <p>Description: {{ activeGroup.description }}</p>
            <p>Capacity: {{ activeGroup.capacity }}</p>
            <p>SkillLevel: {{ activeGroup.skillLevel }}</p>
        </div>
        <div class="col-5 p-3  rounded">
            <div v-if="!foundMe">
                <button @click="joinGroup" class="btn btn-primary">Join</button>
            </div>
            <div v-else>
                <button @click="leaveGroup(foundMe.id)" class="btn btn-danger ms-3">Leave</button>
            </div>

        </div>
    </section>


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
            activeGroup: computed(() => AppState.activeGroup),
            foundMe: computed(() => AppState.groupMembers.find(g => g.accountId == AppState.account.id)),

            async joinGroup() {
                try {
                    logger.log('Attempting to join group')

                    await groupsService.joinGroup(route.params.id)
                }
                catch (error) {
                    Pop.error(error);
                    logger.log(error);
                }

            },
            async leaveGroup(groupMemberId) {
                try {
                    logger.log('Attempting to leave group', groupMemberId)

                    await groupsService.leaveGroup(groupMemberId)
                }
                catch (error) {
                    Pop.error(error);
                    logger.log(error);
                }

            }



        }
    }
};
</script>


<style lang="scss" scoped>
.hero-img {
    height: 55vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>