<template>
  <header class="navbar-dark sticky-top">
    <Navbar />
  </header>
  <main class="bg-img">
    <router-view />
  </main>
  <footer>
  </footer>
  <CreateGroup>
    <GroupForm />
  </CreateGroup>
  <EditGroupForm />
  <EditEventForm />
  <CreateEvent>
    <EventForm />
  </CreateEvent>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import CreateEvent from './components/CreateEvent.vue'
import CreateGroup from "./components/CreateGroup.vue"
import EditEventForm from './components/EditEventForm.vue'
import EditGroupForm from './components/EditGroupForm.vue'
import EventForm from './components/EventForm.vue'
import GroupForm from "./components/GroupForm.vue"
import Navbar from './components/Navbar.vue'


export default {
  setup() {
    return {
      appState: computed(() => AppState),
    }
  },
  components: { Navbar, CreateGroup, GroupForm, EditGroupForm, EditEventForm, CreateEvent, CreateEvent, EventForm }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

.bg-img {
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #FFFFFF;
  background-image: linear-gradient(#fa0707 75%, #3B4371 100%);
}

.main-color {
  background-color: #050505;
}

.navbar-dark {
  background-color: #3b437185;
  backdrop-filter: blur(5px)
}

// footer {
//   display: grid;
//   place-content: center;
//   height: 32px;
// }
</style>
