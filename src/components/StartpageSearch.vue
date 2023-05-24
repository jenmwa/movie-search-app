<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { type IMovie } from '../models/IMovie';
import MoviesComponent from '../components/MoviesComponent.vue';
import LoadSpinner from './LoadSpinner.vue';
import MovieSearch from './MovieSearch.vue';


const movies = ref<IMovie[]>(
  JSON.parse(sessionStorage.getItem('movies') || "[]")
);

const showSpinner = ref(false);

const searchMovies = async (searchText: string) => {
showSpinner.value = true;
  try {
    const response = await axios.get(`https://www.omdbapi.com/?s=${searchText}&apikey=5eed9320`)

    if(response.data && response.data.Search) {
      movies.value = response.data.Search;

      for(const movie of movies.value) {
        const movieResponse = await axios.get(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=5eed9320`)
        movie.Plot = movieResponse.data.Plot;
        sessionStorage.setItem('movies', JSON.stringify(response.data.Search))
      }
    }
  } catch (error) {
    console.error('API request failed:', error);
  }

  showSpinner.value = false;
}

</script>

<template>
  <main>
    <h3>Let's search for a movie!</h3>
    <MovieSearch @search="searchMovies"></MovieSearch>
    <LoadSpinner v-if="showSpinner"/>
    <MoviesComponent v-else :movies="movies" />
</main>

</template>

<style scoped>
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
