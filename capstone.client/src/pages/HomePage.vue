<template>
  <section class="container-fluid bg-img">
    <div class="row justify-content-center mt-5">
      <div class="col-5 rounded blur text-white text-center elevation-3">
        <h3 class="p-1">Top Games</h3>

      </div>
    </div>
    <div class="row justify-content-center mt-4 mx-3">
      <div class="col-11">
        <div id="carouselExampleFade" class="carousel slide carousel-fade elevation-3" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="https://i.ytimg.com/vi/JldMvQMO_5U/maxresdefault.jpg" class="d-block carousel-img rounded"
                alt="...">
            </div>
            <div class="carousel-item">
              <img
                src="https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-1520x800.png"
                class="d-block carousel-img rounded" alt="...">
            </div>
            <div class="carousel-item">
              <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                class="d-block carousel-img rounded" alt="...">
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
      <div class="col-5 rounded blur text-white text-center elevation-3">
        <h3 class="p-1">Filter By Genre</h3>
      </div>
    </section>

    <section class="row p-3 mx-2 my-4 justify-content-center">
      <div class="col-12 blur elevation-5 p-3 rounded d-flex justify-content-between">
        <button @click="getGames()" class="button-82-pushable" role="button"><span class="button-82-shadow"></span><span
            class="button-82-edge"></span><span class="button-82-front text">All</span></button>
        <button @click="getGamesByGenres('shooter')" class="button-82-pushable" role="button"><span
            class="button-82-shadow"></span><span class="button-82-edge"></span><span
            class="button-82-front text">FPS</span></button>
        <button @click="getGamesByGenres('strategy')" class="button-82-pushable" role="button"><span
            class="button-82-shadow"></span><span class="button-82-edge"></span><span
            class="button-82-front text">Strategy</span></button>
        <button @click="getGamesByGenres('role-playing-games-rpg')" class="button-82-pushable" role="button"><span
            class="button-82-shadow"></span><span class="button-82-edge"></span><span
            class="button-82-front text">RPG</span></button>
        <button @click="getGamesByGenres('sports')" class="button-82-pushable" role="button"><span
            class="button-82-shadow"></span><span class="button-82-edge"></span><span
            class="button-82-front text">Sports</span></button>
        <button @click="getGamesByGenres('fighting')" class="button-82-pushable" role="button"><span
            class="button-82-shadow"></span><span class="button-82-edge"></span><span
            class="button-82-front text">Fighting</span></button>

        <!-- <button @click="getGames()" class="col-1  btn bg-light fw-bold">All</button>
        <button @click="getGamesByGenres('shooter')" class="col-1  btn btn-primary fw-bold">FPS</button>
        <button @click="getGamesByGenres('strategy')" class="col-1  btn btn-primary fw-bold">Strategy</button>
        <button @click="getGamesByGenres('role-playing-games-rpg')" class="col-1  btn btn-primary fw-bold">RPG</button>
        <button @click="getGamesByGenres('sports')" class="col-1  btn btn-primary fw-bold">Sports</button>
        <button @click="getGamesByGenres('fighting')" class="col-1  btn btn-primary fw-bold">Fighting</button> -->
      </div>
    </section>

    <section class="l-container">
      <div v-for="g in games">
        <GameCard :game="g" />
      </div>
    </section>
  </section>
</template>

<script>
import { useRoute } from 'vue-router';
import { onMounted, computed, ref } from 'vue'
import Pop from '../utils/Pop';
import { gamesService } from '../services/GamesService.js'
import { AppState } from '../AppState';
import GameCard from '../components/GameCard.vue';


export default {
  setup() {
    const filterResults = ref("");

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
    async function getGamesByGenres(query) {
      try {
        await gamesService.getGamesByGenres(query);
      }
      catch (error) {
        console.error(error);
        Pop.error(("[ERROR]"), error.message);
      }
    }
    async function getAllGenres() {
      try {
        await gamesService.getAllGenres()
      } catch (error) {
        console.error(error)
        Pop.error(error.message)
      }
    }
    onMounted(() => {
      getGames();
      getAllGenres();

    });
    return {
      getGamesByGenres,
      getGames,
      games: computed(() => AppState.games),
      route,

    };
  },
  components: {
    GameCard,


  }
}
</script>

<style scoped lang="scss">
.blur {
  backdrop-filter: blur(5px);
  background-color: rgba(56, 56, 56, 0.541);
}

.l-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  width: 100%;
  padding: 30px;
}

@media screen and (max-width: 760px) {
  .l-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

.carousel-img {
  height: 65vh;
  width: 100%;
}

.card-img {
  height: 35vh;
  width: 50vh;
}

/* CSS */
.button-82-pushable {
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  transition: filter 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-82-shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: hsl(0deg 0% 0% / 0.25);
  will-change: transform;
  transform: translateY(2px);
  transition:
    transform 600ms cubic-bezier(.3, .7, .4, 1);
}

.button-82-edge {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(to left,
      #2b3754 0%,
      #629FCB 8%,
      #629FCB 92%,
      #2b3754 100%);
}

.button-82-front {
  display: block;
  position: relative;
  padding: 12px 27px;
  border-radius: 12px;
  font-size: 1.1rem;
  color: white;
  background: #344264;
  will-change: transform;
  transform: translateY(-4px);
  transition:
    transform 600ms cubic-bezier(.3, .7, .4, 1);
}

@media (min-width: 768px) {
  .button-82-front {
    font-size: 1.25rem;
    padding: 12px 42px;
  }
}

.button-82-pushable:hover {
  filter: brightness(110%);
  -webkit-filter: brightness(110%);
}

.button-82-pushable:hover .button-82-front {
  transform: translateY(-6px);
  transition:
    transform 250ms cubic-bezier(.3, .7, .4, 1.5);
}

.button-82-pushable:active .button-82-front {
  transform: translateY(-2px);
  transition: transform 34ms;
}

.button-82-pushable:hover .button-82-shadow {
  transform: translateY(4px);
  transition:
    transform 250ms cubic-bezier(.3, .7, .4, 1.5);
}

.button-82-pushable:active .button-82-shadow {
  transform: translateY(1px);
  transition: transform 34ms;
}

.button-82-pushable:focus:not(:focus-visible) {
  outline: none;
}
</style>


