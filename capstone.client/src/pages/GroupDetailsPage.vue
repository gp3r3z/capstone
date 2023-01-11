<template>
    <section class="container-fluid">
        <!-- SECTION HERO IMG & EDIT GROUP BTN -->
        <section class="row justify-content-center ">
            <div class="col-9 hero-img rounded mt-3" :style="`background-image: url(${activeGroup.coverImg})`"></div>
            <div class="col-1 mt-3">
                <button v-if="activeGroup.creatorId === account.id" type="button" class="btn btn-light"
                    data-bs-toggle="modal" data-bs-target="#edit-group-modal">
                    <i class="mdi mdi-pencil fs-3 text-warning text-end fw-bold"></i>
                </button>
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
                <div v-if="account.id && !foundMe && activeGroup.capacity > 0">
                    <button @click="joinGroup" class="btn btn-primary">Join</button>
                </div>
                <div v-else-if="foundMe">
                    <button @click="leaveGroup(foundMe.id)" class="btn btn-danger ms-3">Leave</button>
                </div>
                <div v-else-if="!foundMe && activeGroup.capacity == 0">
                    <button class="btn btn-danger ms-3" disabled>Group is full</button>
                </div>
            </div>
        </section>
        <!-- SECTION group members -->
        <section class="row mx-4 p-2 rounded">
            <span class="d-flex justify-content-center align-items-center fst-italic fw-bold text-white fs-4">Group
                Members:</span>
            <div v-for="g in groupMembers">
                <div>
                    <img :src="g.profile.picture" alt="" :title="g.profile.name"
                        class="group-member-picture rounded-circle">
                </div>
            </div>
        </section>

        <!-- SECTION Group Chat -->
        <!-- TODO off canvas for group chat? -->


        <!-- SECTION Group Events Component -->
        <section class="row bg-white mt-5 mx-5">
            <div v-for="e in events" class="d-flex">
                <GroupEvent :event="e" />
            </div>
        </section>

    </section>

</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { groupsService } from '../services/GroupsService.js'
import GroupEvent from '../components/GroupEvent.vue'
// import { emit } from 'process';



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
        async function getGroupMembersByGroupId() {
            try {
                await groupsService.getGroupMembersByGroupId(route.params.id)
            } catch (error) {
                Pop.error(('[ERROR]'), error.message)
                logger.log(error)
            }
        }
        async function getEventsByGroupId() {
            try {
                await groupsService.getEventsByGroupId(route.params.id)
            } catch (error) {
                console.error(error)
                Pop.error(('[ERROR]'), error.message)
                logger.log(error)
            }
        }

        watchEffect(() => {
            getGroupById()
            getGroupMembersByGroupId()
            getEventsByGroupId()
            AppState.activeEvent
        })
        return {
            activeGroup: computed(() => AppState.activeGroup),
            foundMe: computed(() => AppState.groupMembers.find(g => g.accountId == AppState.account.id)),
            account: computed(() => AppState.account),
            groupMembers: computed(() => AppState.groupMembers),
            events: computed(() => AppState.events),



            async joinGroup() {
                try {
                    logger.log('Attempting to join group')
                    await groupsService.joinGroup(route.params.id)
                    Pop.success('Joined Group!')
                }
                catch (error) {
                    Pop.error(error);
                    logger.log(error);
                }

            },
            async leaveGroup(groupMemberId) {
                try {
                    logger.log('Attempting to leave group', groupMemberId)
                    if (await Pop.confirm('Are you sure you want to leave this group?')) {
                        await groupsService.leaveGroup(groupMemberId)
                    }
                }
                catch (error) {
                    Pop.error(error);
                    logger.log(error);
                }

            },

            async editGroup() {
                try {

                } catch (error) {
                    Pop.error(('[ERROR]'), error.message)
                    logger.log
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

.group-member-picture {
    height: 10vh;
    width: 10vh;
}
</style>