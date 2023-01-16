<template>
  <div class="container-fluid text-white">

    <div class="accountCoverImg mt-3 p-3 " :style="`background-image: url(${account.coverImg})`">
      <section class="row">
        <div class="about text-center">
          <h1>Welcome {{ account.name }}</h1>
          <img class="rounded" :src="account.picture" alt="" />
          <p>{{ account.email }}</p>
        </div>
        <section class="row">
          <form @submit.prevent="editAccount()">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input v-model="editable.name" type="text" required class="form-control" id="name">
            </div>
            <div class="mb-3">
              <label for="coverImg" class="form-label">Profile Background</label>
              <input v-model="editable.coverImg" type="text" required class="form-control" id="coverImg">
            </div>
            <div class="mb-3">
              <label for="picture" class="form-label">Profile Picture </label>
              <input v-model="editable.picture" type="text" required class="form-control" id="picture">
            </div>
            <div class="mb-3">
              <label for="bio" class="form-label">Bio</label>
              <textarea v-model="editable.bio" required class="form-control" id="bio" rows="3"></textarea>
            </div>
            <span class="form-check form-check-inline">
              <input class="form-check-input selectable" v-model="editable.platform.nintendo"
                :checked="editable.platform.nintendo" type="checkbox" name="NINTENDO" id="NINTENDO">
              <label class="form-check-label" for="NINTENDO">
                NINTENDO
              </label>
            </span>
            <span class="form-check form-check-inline">
              <input class="form-check-input selectable" v-model="editable.platform.pc" :checked="editable.platform.pc"
                type="checkbox" name="PC" id="PC">
              <label class="form-check-label" for="PC">
                PC
              </label>
            </span>
            <span class="form-check form-check-inline">
              <input class="form-check-input selectable" v-model="editable.platform.playstation"
                :checked="editable.platform.playstation" type="checkbox" name="PLAYSTATION" id="PLAYSTATION">
              <label class="form-check-label" for="PLAYSTATION">
                PLAYSTATION
              </label>
            </span>
            <span class="form-check form-check-inline">
              <input class="form-check-input selectable" v-model="editable.platform.xbox"
                :checked="editable.platform.xbox" type="checkbox" name="XBOX" id="XBOX">
              <label class="form-check-label" for="XBOX">
                XBOX
              </label>
            </span>

            <div class="row justify-content-end">
              <button class="btn btn-success col-3" type="submit">Submit</button>
            </div>
          </form>
        </section>
      </section>


    </div>

    <section class="row mt-3">
      <h3 class="border-bottom text-center">MyGroups</h3>
      <div v-for="g in myGroups" class="bg-danger">
        <GroupRowCard :group="g" />
      </div>
    </section>
    <section class="row mt-3">
      <h3 class="border-bottom text-center">MyEvents</h3>
      <div v-for="e in myEvents">
        <GroupEvent :event="e" />
      </div>
    </section>
  </div>
  <div class="cont">
    <div></div>

  </div>
</template>

<script>
import { computed, watchEffect, ref } from 'vue'
import { AppState } from '../AppState'
import Pop from '../utils/Pop.js'
import { logger } from '../utils/Logger.js'
import { accountService } from '../services/AccountService.js'




export default {
  setup() {

    const editable = ref({ platform: { playstation: Boolean, xbox: Boolean, pc: Boolean, nintendo: Boolean } })

    async function getMyGroups() {
      try {
        await accountService.getMyGroups()
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
    }
    async function getMyEvents() {
      try {
        await accountService.getMyEvents()
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
    }



    watchEffect(() => {
      if (AppState.account.id) {
        editable.value = { ...AppState.account }

      }

      getMyGroups()
      getMyEvents()
      AppState.activeEvent

    })

    return {
      account: computed(() => AppState.account),
      platform: computed(() => AppState.account.platform),
      myGroups: computed(() => AppState.myGroups),
      myEvents: computed(() => AppState.myEvents),
      editable,

      async editAccount() {
        try {
          // editable.value.platform = platform.value
          logger.log('This is the edit request from the FE', editable.value)
          await accountService.editAccount(editable.value)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.accountCoverImg {
  height: 90vh;
  background-size: cover;
  background-position: center;
}
</style>
