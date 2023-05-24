<script setup lang="ts">
import { ref } from 'vue';
import type { IMovie } from '../models/IMovie';
import MoviesComponent from '../components/MoviesComponent.vue';
import LoadSpinner from './LoadSpinner.vue';
import MovieSearch from './MovieSearch.vue';
import { getMovies, getMoviePlot } from '../services/OmdbService';


const movies = ref<IMovie[]>(
  JSON.parse(sessionStorage.getItem('movies') || "[]")
);

const showSpinner = ref(false);

const searchMovies = async (searchText: string) => {
showSpinner.value = true;
  try {
    movies.value = await getMovies(searchText);

    if( movies.value) {

      for(const movie of movies.value) {
        movie.Plot = await getMoviePlot(movie.imdbID); 
      }
      sessionStorage.setItem('movies', JSON.stringify( movies.value))
    } else {
        console.log('movie title doesnt exist');
    }
  } catch (error) {
    console.error('API request failed:', error);
  }

  showSpinner.value = false;
}

const resetMovies = () => {
  movies.value = [];
  sessionStorage.removeItem('movies');
};

</script>

<template>
  <main>
    <h3>Let's search for a movie!</h3>
    <MovieSearch @search="searchMovies" @reset="resetMovies" :movies="movies"></MovieSearch>
    <LoadSpinner v-if="showSpinner"/>
    <MoviesComponent v-else :movies="movies" />
  </main>
</template>

<style scoped lang="scss">
main {
max-width: 400px;
margin: 0 auto;
}

h3 {
  font-size: 2rem;
  margin-top: 2rem;
  text-align: center;
}

@media screen and (min-width: 768px) {

  main {
    max-width: 800px;
  }

  h3 {
    margin-top: 3rem;
    text-align: left;
  }

}

@media screen and (min-width: 1024px) {

  main {
    max-width: 1288px;
    margin: 0;
  }

}

</style>
