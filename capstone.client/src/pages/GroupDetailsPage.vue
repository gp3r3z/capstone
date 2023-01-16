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
                    <button @click="leaveGroup(foundMe.id)" class="btn btn-danger ms-3">Leave Group</button>
                </div>
                <div v-else-if="!foundMe && activeGroup.capacity == 0">
                    <button class="btn btn-danger ms-3" disabled>Group is full</button>
                </div>
            </div>
        </section>
        <!-- SECTION group members -->
        <section class="row mx-4 p-2 rounded bg-light mt-3">
            <span class="d-flex justify-content-center align-items-center fst-italic fw-bold text-white fs-4">Group
                Members:</span>
            <div class="col-2 mt-3" v-for="g in groupMembers">

                <div ontouchstart="this.classList.toggle('hover');">
                    <div class="container">
                        <div class="front" :style="`background-image: url(${g.profile.picture})`">
                            <div class="inner">
                                <p>{{ g.profile.name }}</p>
                            </div>
                        </div>
                        <div class="back">
                            <div class="inner">
                                <p>{{ g.profile.bio ? g.profile.bio : 'User has no Bio' }}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </section>

        <!-- SECTION Group Events Component -->
        <section class="row mt-3 rounded">
            <div v-for="e in events" class="col-4">
                <GroupEvent :event="e" />
            </div>
        </section>
        <!-- SECTION Group Chat BUTTON -->
        <section class="row">
            <button v-if="foundMe || account.id == activeGroup.creatorId" @click="enterGroupChat" class=" btn-primary float-left btn rounded-circle bg-dark d-flex justify-content-start
                align-items-start" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample">
                <i class="mdi mdi-chat fs-1"></i>
            </button>

        </section>
        <!-- SECTION Group Chat -->
        <!-- <button v-if="foundMe || account.id == activeGroup.creatorId" @click="enterGroupChat" class="btn btn-primary"
            type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample">
            Group Chat
        </button> -->
        <div class="offcanvas offcanvas-start bg-secondary" tabindex="-1" id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel">Group Chat</h5>
                <button @click="leaveGroupChat" type="button" class="btn-close" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div>
                    <section class="row">
                        <div v-for="c in comments" class="col-11">
                            <Comment :comment="c" />
                        </div>
                        <div>
                            <form @submit.prevent="postComment()">
                                <textarea v-model="editable.description" name="Chat...." id="" cols="30"
                                    rows="10"></textarea>
                                <button class="btn-btn-primary">
                                    <i class="mdi mdi-plus"></i>
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </div>

        <!-- SECTION CREATE EVENT BUTTON -->
        <section class="row">
            <button v-if="foundMe || activeGroup.creatorId == account.id" href="#"
                class="float-right btn rounded-circle bg-dark d-flex justify-content-center align-items-center"
                data-bs-toggle="modal" data-bs-target="#create-event-modal" title="Create Event">
                <i class="mdi mdi-gamepad-variant fs-1"></i>
            </button>
        </section>

    </section>

</template>


<script>
import { AppState } from '../AppState';
import { computed, watchEffect, ref } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { groupsService } from '../services/GroupsService.js'
import { commentsService } from '../services/CommentsService.js'
import Comment from '../components/Comment.vue';
import GroupEvent from '../components/GroupEvent.vue';
import { GroupHandler } from '../handler/GroupHandler.js';


export default {
    setup() {
        const route = useRoute();
        const editable = ref({})
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
                await groupsService.getGroupMembersByGroupId(route.params.id);
            }
            catch (error) {
                Pop.error(("[ERROR]"), error.message);
                logger.log(error);
            }
        }
        async function getEventsByGroupId() {
            try {
                await groupsService.getEventsByGroupId(route.params.id);
            }
            catch (error) {
                console.error(error);
                Pop.error(("[ERROR]"), error.message);
                logger.log(error);
            }
        }
        async function getCommentsByGroupId() {
            try {

                await commentsService.getCommentsByGroupId(route.params.id)
            } catch (error) {
                console.error(error)
                Pop.error(('[ERROR]'), error.message)
            }
        }
        watchEffect(() => {
            getGroupById();
            getGroupMembersByGroupId();
            getEventsByGroupId();
            getCommentsByGroupId()
            AppState.activeEvent;



        });
        return {
            editable,
            activeGroup: computed(() => AppState.activeGroup),
            foundMe: computed(() => AppState.groupMembers.find(g => g.accountId == AppState.account.id)),
            account: computed(() => AppState.account),
            groupMembers: computed(() => AppState.groupMembers),
            events: computed(() => AppState.events),
            comments: computed(() => AppState.comments),
            async joinGroup() {
                try {

                    logger.log("Attempting to join group");
                    await groupsService.joinGroup(route.params.id);
                    Pop.success("Joined Group!\nMessage Service Activated");
                }
                catch (error) {
                    Pop.error('Unable to join Group: ', error);
                    logger.log(error);
                }
            },
            async leaveGroup(groupMemberId) {
                try {
                    logger.log("Attempting to leave group", groupMemberId);
                    if (await Pop.confirm("Are you sure you want to leave this group?")) {
                        await groupsService.leaveGroup(groupMemberId);
                    }
                }
                catch (error) {
                    Pop.error(error);
                    logger.log(error);
                }
            },
            async enterGroupChat() {
                try {
                    GroupHandler.EnterGroupChat(route.params.id)
                } catch (error) {
                    Pop.error(error);
                    logger.log(error);
                }
            },
            async leaveGroupChat() {
                try {
                    GroupHandler.LeaveGroupChat(route.params.id)
                } catch (error) {
                    Pop.error(error);
                    logger.log(error);
                }
            },
            // async editGroup() {
            //     try {
            //     }
            //     catch (error) {
            //         Pop.error(("[ERROR]"), error.message);
            //         logger.log;
            //     }
            // },
            async postComment() {
                try {
                    await commentsService.postComment(editable.value, route.params.id)
                    editable.value = {}
                } catch (error) {
                    Pop.error(('[ERROR]'), error.message)
                }
            }
        };
    },
    components: { Comment, GroupEvent }
};
</script>


<style lang="scss" >
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



.cols {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}

.col {
    width: calc(25% - 2rem);
    margin: 1rem;
    cursor: pointer;
}

.container {
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-perspective: 1000px;
    perspective: 1000px;
}

.front,
.back {
    background-size: cover;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    background-position: center;
    -webkit-transition: -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
    transition: -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
    -o-transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
    transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
    transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1), -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    text-align: center;
    min-height: 150px;
    height: auto;
    border-radius: 10px;
    color: #fff;
    font-size: 1.5rem;
}

.back {
    background: #97c0df;
    background: -webkit-linear-gradient(45deg, #016ec2 0%, #596a72 100%);
    background: -o-linear-gradient(45deg, #cedce7 0%, #596a72 100%);
    background: linear-gradient(45deg, #555e64 0%, #596a72 100%);
}

.front:after {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    content: '';
    display: block;
    opacity: .6;
    background-color: #000;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 10px;
}

.container:hover .front,
.container:hover .back {
    -webkit-transition: -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
    transition: -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
    -o-transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
    transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
    transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1), -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
}

.back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}

.inner {
    -webkit-transform: translateY(-50%) translateZ(60px) scale(0.94);
    transform: translateY(-50%) translateZ(60px) scale(0.94);
    top: 50%;
    position: absolute;
    left: 0;
    width: 100%;
    padding: 2rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 1px solid transparent;
    -webkit-perspective: inherit;
    perspective: inherit;
    z-index: 2;
}

.container .back {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
}

.container .front {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
}

.container:hover .back {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
}

.container:hover .front {
    -webkit-transform: rotateY(-180deg);
    transform: rotateY(-180deg);
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
}

.front .inner p {
    font-size: 2rem;
    margin-bottom: 2rem;
    position: relative;
}

.front .inner p:after {
    content: '';
    width: rem;
    height: 2px;
    position: absolute;
    background: #C6D4DF;
    display: block;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: -.75rem;
}

.front .inner span {
    color: rgba(255, 255, 255, 0.7);
    font-family: 'Montserrat';
    font-weight: 300;
}

@media screen and (max-width: 64rem) {
    .col {
        width: calc(33.333333% - 2rem);
    }
}

@media screen and (max-width: 48rem) {
    .col {
        width: calc(50% - 2rem);
    }
}

@media screen and (max-width: 32rem) {
    .col {
        width: 100%;
        margin: 0 0 2rem 0;
    }
}
</style>