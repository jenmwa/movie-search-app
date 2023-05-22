<script setup lang="ts">
import { type IMovie } from '../models/IMovie'

const props = defineProps({
  movies: {
    type: Array as () => IMovie[],
    required: true,
  }
})
console.log(props.movies)

const goto = (imdbID: string) => {
  const url = `https://www.imdb.com/title/${imdbID}/`;
  window.open(url, '_blank');
};

</script>

<template>

<div class="result">
    <p v-if="movies.length > 0">your result:</p>
      <div class='div-wrapper'>
      <article class='movie-container' v-for='movie in movies' :key='movie.imdbID'>
        <div class='upper'>
          <div class="movie_img">
            <img class='img-poster' :src='movie.Poster === "N/A" ? "/placeholder.png" : movie.Poster' width='375' :alt="'movieposter for ' + movie.Title"/>
          </div>
          <div class="movie-text">
            <div class="text-upper">
              <h4>{{ movie.Title }}</h4>
              <span class='movie-year'>{{ movie.Year }}</span>
              <p class="movie-plot">{{ movie.Plot}}</p>
            </div>
            <div class='down'>
              <button class='read-more-btn' @click='goto(movie.imdbID)'>READ MORE >></button>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>

</template>

<style scoped>

.read-more-btn{
  width: 100%;
}


</style>