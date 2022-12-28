<template>
  <header class="navbar-dark sticky-top">
    <Navbar />
  </header>
  <main class="main-color">
    <router-view />
  </main>
  <footer>
  </footer>
  <CreateGroup>
    <GroupForm />
  </CreateGroup>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import CreateGroup from "./components/CreateGroup.vue"
import GroupForm from "./components/GroupForm.vue"
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, CreateGroup, GroupForm }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

.main-color {
  background-color: #f2f2e7;
}

.navbar-dark {
  background-color: #2b3754c7;
  backdrop-filter: blur(5px)
}

// footer {
//   display: grid;
//   place-content: center;
//   height: 32px;
// }
</style>
