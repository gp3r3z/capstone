<template>
  <div class="container-fluid" >
    <img class="background" :src="account.coverImg" />
    <div class="row">
      <div class="about text-center">
        <h1>Welcome {{ account.name }}</h1>
        <img class="rounded" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
      </div>
    </div>
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
</style>
