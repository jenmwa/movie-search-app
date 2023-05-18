<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import movies from '../components/TheWelcome.vue'
import searchWord from '../components/TheWelcome.vue'

const goto = (imdbID: string) => {
  const url = `https://www.imdb.com/title/${imdbID}/`;
  window.open(url, '_blank');
};

</script>

<template>

<div class='div-wrapper'>
    <div class='movie-container' v-for='movie in movies' :key='movie.imdbID'>
      <img class="img-poster" :src='movie.Poster === "N/A" ? "/placeholder.png" : movie.Poster' width="375"/>
      <h4>{{ movie.Title }}</h4>
      <p>{{ movie.Year }}</p>
      <button class='read-more-btn' @click='goto(movie.imdbID)'>READ MORE</button>
    </div>
  </div>

</template>

<style scoped>

.read-more-btn{
  width: 100%;
}


</style>