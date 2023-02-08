<template>
  <section class="container-fluid bg-img">
    <div class="row justify-content-center mt-3">
      <div class="col-5 rounded blur text-white text-center elevation-3">
        <h3 class="p-1">Top Games</h3>

      </div>
    </div>
    <!-- SECTION top games carousel  -->
    <div class="row top-games-carousel justify-content-center mt-4 mx-3">
      <div class="col-11">
        <div id="carouselExampleFade" class="carousel slide carousel-fade elevation-3" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="https://i.ytimg.com/vi/JldMvQMO_5U/maxresdefault.jpg" class="d-block carousel-img rounded"
                alt="...">
            </div>
            <div class="carousel-item">
              <img src="https://wallpapercave.com/wp/wp7438615.jpg" class="d-block carousel-img rounded" alt="...">
            </div>
            <div class="carousel-item">
              <img src="https://cdn.akamai.steamstatic.com/steam/apps/306130/capsule_616x353.jpg?t=1674679947"
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

    <section class="row justify-content-center m-3">
      <div class="col-2 rounded bg-dark d-flex align-items-center">
        <button @click="searchGamesToggle(searchToggle)" class="btn"><i class="mdi mdi-magnify fs-1"></i></button>
        <h3>Search</h3>
      </div>
      <div v-if="searchToggle" class="col-12">
        <form @submit.prevent="searchQuery(searchResults)" class="row justify-content-center mt-3">
          <input v-model="searchResults" type="text" placeholder="Search by Game Name" class=" col-4"
            aria-label="Default" aria-describedby="inputGroup-sizing-default" minlength="3">
          <div class="input-group-append  text-center">
            <button class="button-82-pushable mt-3 " role="button"><span class="button-82-shadow"></span><span
                class="button-82-edge"></span><span class="button-82-front text">Search</span></button>
          </div>
        </form>
      </div>



    </section>
    <div class="row justify-content-center mt-2">
      <div class="col-8">
        <h2 class="p-2 text-center bar">Filter By Genre</h2>
      </div>
    </div>
    <section class="row p-3 mx-2 my-2 justify-content-around">

      <button @click="getGames()" class="button-82-pushable col-2" role="button"><span
          class="button-82-shadow "></span><span class="button-82-edge"></span><span
          class="button-82-front text">All</span></button>
      <button @click="getGamesByGenres('shooter')" class="button-82-pushable col-2" role="button"><span
          class="button-82-shadow "></span><span class="button-82-edge"></span><span
          class="button-82-front text">FPS</span></button>
      <button @click="getGamesByGenres('strategy')" class="button-82-pushable col-2" role="button"><span
          class="button-82-shadow "></span><span class="button-82-edge"></span><span
          class="button-82-front text">Strategy</span></button>
      <button @click="getGamesByGenres('role-playing-games-rpg')" class="button-82-pushable col-2" role="button"><span
          class="button-82-shadow "></span><span class="button-82-edge"></span><span
          class="button-82-front text">RPG</span></button>
      <button @click="getGamesByGenres('sports')" class="button-82-pushable col-2" role="button"><span
          class="button-82-shadow "></span><span class="button-82-edge"></span><span
          class="button-82-front text">Sports</span></button>
      <!-- <button @click="getGamesByGenres('fighting')" class="button-82-pushable col-2" role="button"><span
          class="button-82-shadow "></span><span class="button-82-edge"></span><span
          class="button-82-front text">Fighting</span></button> -->
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
        <li>
          <hr class="dropdown-divider">
        </li>
        <li><a class="dropdown-item" href="#">Separated link</a></li>
      </ul>

      <!-- <button @click="getGames()" class="col-1  btn bg-light fw-bold">All</button>
        <button @click="getGamesByGenres('shooter')" class="col-1  btn btn-primary fw-bold">FPS</button>
        <button @click="getGamesByGenres('strategy')" class="col-1  btn btn-primary fw-bold">Strategy</button>
        <button @click="getGamesByGenres('role-playing-games-rpg')" class="col-1  btn btn-primary fw-bold">RPG</button>
        <button @click="getGamesByGenres('sports')" class="col-1  btn btn-primary fw-bold">Sports</button>
        <button @click="getGamesByGenres('fighting')" class="col-1  btn btn-primary fw-bold">Fighting</button> -->

    </section>
    <Suspense>
      <section class="l-container">
        <div v-for="g in games">
          <GameCard :game="g" />
        </div>
      </section>
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </section>
  <section class="row justify-content-center">
    <div class="col-4 text-center mb-3">
      <button :disabled="!prevPage" @click="switchPage(prevPage)" class="button-82-pushable" role="button"><span
          class="button-82-shadow"></span><span class="button-82-edge"></span><span
          class="button-82-front text">Prev</span></button>
    </div>
    <div class="col-4 text-center mb-3">
      <button :disabled="!nextPage" @click="switchPage(nextPage)" class="button-82-pushable" role="button"><span
          class="button-82-shadow"></span><span class="button-82-edge"></span><span
          class="button-82-front text">Next</span></button>
    </div>
  </section>

</template>

<script>
import { useRoute } from 'vue-router';
import { onMounted, computed, ref } from 'vue'
import Pop from '../utils/Pop';
import { gamesService } from '../services/GamesService.js'
import { AppState } from '../AppState';
import GameCard from '../components/GameCard.vue';
import { logger } from '../utils/Logger.js';


export default {
  setup() {
    const filterResults = ref("");
    let searchResults = ref("")

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
    async function switchPage(url) {
      try {
        await gamesService.switchPage(url)
      } catch (error) {
        console.error(error)
        Pop.error(error.message)
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
      searchResults,
      getGames,
      searchToggle: computed(() => AppState.searchToggle),
      switchPage,
      games: computed(() => AppState.games),
      prevPage: computed(() => AppState.prevPage),
      nextPage: computed(() => AppState.nextPage),
      route,
      async searchGamesToggle(searchToggle) {
        try {
          AppState.searchToggle = !searchToggle
          // logger.log(searchToggle)
        } catch (error) {
          Pop.error(error)
        }
      },
      async searchQuery(input) {
        try {
          await gamesService.searchQuery(input)
          searchResults.value = ""
          AppState.searchToggle = false
          Pop.success('Search results updated')
        } catch (error) {
          Pop.error("Unable to find game by that query. Try another game")
          logger.log(error)

        }
      }

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
  background-color: #cebcce61;
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

.bar {
  display: block;
  position: relative;
  padding: 12px 27px;
  border-radius: 12px;
  color: rgb(255, 255, 255);
  background: #886a6a9e;
  backdrop-filter: blur(5px);
  will-change: transform;
}

.bar-shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(to left,
      #002574 0%,
      #9a9bff 8%,
      #fe5a5a 92%,
      #980000 100%);
}

.carousel-img {
  height: 45vh;
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
      #002574 0%,
      #9a9bff 8%,
      #fe5a5a 92%,
      #980000 100%);
}

.button-82-front {
  display: block;
  position: relative;
  padding: 10px 15px;
  border-radius: 12px;
  font-size: 1.1rem;
  color: rgb(255, 255, 255);
  background: #886a6a9e;
  backdrop-filter: blur(5px);
  will-change: transform;
  transform: translateY(-4px);
  transition:
    transform 600ms cubic-bezier(.3, .7, .4, 1);
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

.top-games-carousel {
  min-height: 25vh;
}

@media (min-width: 425px) {
  // .button-82-pushable {
  //   padding: 10px 10px;
  // }
}
</style>


