<template>
  <div class="modal-header">
    <h1 class="modal-title fs-5" id="exampleModalLabel">Create Group</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <form @submit.prevent="createGroup()">
    <div class="modal-body">
      <div class="form-floating mb-3 elevation-5">
        <input v-model="editable.groupName" type="text" required class="form-control" id="name"
          placeholder="Event Name">
        <label for="name">Group Name</label>
      </div>
      <div class="form-floating mb-3 elevation-5">
        <input v-model="editable.capacity" type="number" required class="form-control" id="location"
          placeholder="Event Location">
        <label for="location">Group Capacity</label>
      </div>
      <div class="form-floating mb-3 elevation-5">
        <input v-model="editable.description" type="text" required class="form-control" id="description"
          placeholder="Event Description">
        <label for="description">Group Description</label>
      </div>
      <div class="form-floating mb-3 elevation-5">
        <input v-model="editable.coverImg" type="url" required class="form-control" id="coverImg"
          placeholder="Cover Image">
        <label for="coverImg">Cover Image</label>
      </div>
      <div class="form-floating mb-3 elevation-5">
        <select v-model="editable.skillLevel" class="form-select" id="floatingSelect"
          aria-label="Floating label select example">
          <option value="beginner">Beginner</option>
          <option value="casual">Casual</option>
          <option value="competitive">Competitive</option>
        </select>
        <label for="floatingSelect">Level of Play</label>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-primary">Create Group</button>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { groupsService } from "../services/GroupsService.js";
export default {
  setup() {
    const editable = ref({})
    const route = useRoute();
    const router = useRouter()
    return {
      editable,
      async createGroup() {
        try {
          const group = await groupsService.createGroup(route.params.id, editable.value)
          editable.value = {}
          Modal.getOrCreateInstance('#exampleModal').hide()
          router.push({ name: 'GroupDetails', params: { groupId: group.id } })
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped>
.input-group-append {
  cursor: pointer;
}
</style>