<template>
  <div class="container-fluid text-white">

    <!-- SECTION COVERIMAGE -->
    <div class="accountCoverImg mt-3 p-3 " style="background-image: url('https://thiscatdoesnotexist.com');">
      <section class="row">
        <div class="about text-center">
          <h1>Welcome {{ account.name }}</h1>
          <img class="rounded" :src="account.picture" alt="" />
          <p>{{ account.email }}</p>
        </div>
      </section>
    </div>
    <!-- SECTION BIO -->
    <section class="row mt-3">
      <h3 class="border-bottom text-center">Bio</h3>
    </section>
    <section class="row mt-3">
      <h3 class="border-bottom text-center">MyGroups</h3>
    </section>
    <section class="row mt-3">
      <h3 class="border-bottom text-center">MyEvents</h3>
    </section>
  </div>
  <div class="cont">
    <div></div>

  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.accountCoverImg {
  height: 40vh;
  background-size: cover;
  background-position: center;
}
</style>
