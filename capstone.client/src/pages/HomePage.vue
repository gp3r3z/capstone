<template>
  <section class="container-fluid">
    <div class="row justify-content-center mt-5">
      <div class="col-6 rounded bg-primary text-center">
        <h3> Top Games</h3>
      </div>
    </div>
    <div class="row justify-content-center mt-4 mx-3">
      <div class="col-12">
        <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
                class="d-block carousel-img" alt="...">
            </div>
            <div class="carousel-item">
              <img
                src="https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-1520x800.png"
                class="d-block carousel-img" alt="...">
            </div>
            <div class="carousel-item">
              <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                class="d-block carousel-img" alt="...">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>

    <section class="row justify-content-center mt-5">
      <div class="col-6 rounded bg-primary text-center">
        <h3>Filter By Genre</h3>
      </div>
    </section>

    <section class="row p-3 mx-2 my-4 justify-content-center bg-white rounded">
      <div class="col-12 bg-dark elevation-5 p-2 rounded d-flex justify-content-between">
        <button @click="filterBy = 'concert'" class="col-1  btn btn-primary fw-bold">FPS</button>
        <button @click="filterBy = 'convention'" class="col-1  btn btn-primary fw-bold">MMO</button>
        <button @click="filterBy = 'sport'" class="col-1  btn btn-primary fw-bold">RPG</button>
        <button @click="filterBy = 'digital'" class="col-1  btn btn-primary fw-bold">HORROR</button>
        <button @click="filterBy = 'digital'" class="col-1  btn btn-primary fw-bold">FIGHTING</button>
        <button @click="filterBy = ''" class="col-1  btn btn-primary fw-bold">ALL</button>
      </div>
    </section>

    <section class="row justify-content-center">
      <div v-for="g in games" class="col-3 m-4 pb-4 px-4 pt-1 rounded elevation-5 bg-white" @click="">
        <GameCard :game="g" />
      </div>
    </section>
  </section>
</template>

<script>
import { useRoute } from 'vue-router';
import { onMounted, computed } from 'vue'
import Pop from '../utils/Pop';
import { gamesService } from '../services/GamesService.js'
import { AppState } from '../AppState';
import GameCard from '../components/GameCard.vue';

export default {
  setup() {
    const route = useRoute();
    async function getGames() {
      try {
        await gamesService.getGames();
      }
      catch (error) {
        console.error(error);
        Pop.error(("[ERROR]"), error.message);
      }
    }
    onMounted(() => {
      getGames();
    });
    return {
      games: computed(() => AppState.games),
      route,
    };
  },
  components: { GameCard }
}
</script>

<style scoped lang="scss">
.carousel-img {
  height: 65vh;
  width: 100%;
}

.card-img {
  height: 35vh;
  width: 50vh;
}
</style>


