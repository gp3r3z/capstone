<template>
    <div class="row justify-content-end" v-if="comment.creatorId == account.id">
        <div class="border rounded myMessage mt-3 p-2 col-6 me-3">
            <div class="row">
                <div class="col-8">
                    <h4>{{ comment.description }}</h4>
                </div>
            </div>
        </div>
        <div class="row justify-content-end">
            <div class="col-3 filter-row ">
                <img :src="account.picture" class="img-fluid rounded-circle" alt="">
            </div>
        </div>

    </div>
    <div class="row justify-content-start" v-else>
        <div class="border rounded senderMessage mt-3 p-2 col-8 ms-3">
            <h4>{{ comment.description }}</h4>
        </div>
        <div class="row justify-content-start">
            <div class="col-3 filter-row ">
                <img src="https://thiscatdoesnotexist.com" class="img-fluid rounded-circle" alt="">
            </div>
        </div>
    </div>



</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';

export default {
    props: {
        comment: {
            type: Object,
            required: true
        }
    },


    setup() {
        return {
            account: computed(() => AppState.account),
            activeGroupCreator: computed(() => AppState.activeGroupCreator),
            groupMembers: computed(() => AppState.groupMembers)
        };

    }
}
</script>

<style>
.myMessage {
    background-color: blue;

}

.senderMessage {
    background-color: green;
}

.filter-row {
    transform: translateY(-.75vh);
}
</style>