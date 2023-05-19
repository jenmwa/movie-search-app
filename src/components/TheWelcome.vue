<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { API_KEY } from '../config'


interface IMovie {
  imdbID: string;
  Poster: string;
  Title: string;
  Plot: string;
  Year: string;
}

const searchWord = ref('');
const movies = ref<IMovie[]>([])

const search = async () => {
  try {
    const response = await axios.get(`http://www.omdbapi.com/?s=${searchWord.value}&apikey=${API_KEY}`)
    console.log(response.data);

    if(response.data && response.data.Search) {
      movies.value = response.data.Search;
      console.log(movies.value);

      for(const movie of movies.value) {
        const movieResponse = await axios.get(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`)
        movie.Plot = movieResponse.data.Plot;
      }
      console.log(movies.value)
      //save in localStorage?
    }
  } catch (error) {
    console.error('API request failed:', error);
  }
  searchWord.value = '';
}

const goto = (imdbID: string) => {
  const url = `https://www.imdb.com/title/${imdbID}/`;
  window.open(url, '_blank');
};

const resetBtn = () => {
  console.log('click reset');
  searchWord.value = '';
  movies.value = [];
}

</script>

<template>
  <main>
    <h3>Let's search for a movie!</h3>
    <div class='container'>
      <div class='input_wrapper'>
        <label for='searchInput'>
          <input type='text' class="search-input" id='searchInput' placeholder='Type here' v-model='searchWord' @keydown.enter='search'>
          <span></span>
        </label>
      </div>
      <button class='glow-on-hover' id='searchBtn' @click='search'>SEARCH</button>
      <button class='reset' @click="resetBtn">Reset</button>
    </div>
 
  <p v-if="movies.length > 0">your result:</p>
  <div class='div-wrapper'>
    <article class='movie-container' v-for='movie in movies' :key='movie.imdbID'>
      <div class='upper'>
        <img class='img-poster' :src='movie.Poster === "N/A" ? "/placeholder.png" : movie.Poster' width='375' :alt="'movieposter for ' + movie.Title"/>
        <h4>{{ movie.Title }}</h4>
        <p class='movie-year'>{{ movie.Year }}</p>
        <p class="movie-plot">{{ movie.Plot}}</p>
      </div>
      <div class='down'>
        <button class='read-more-btn' @click='goto(movie.imdbID)'>READ MORE >></button>
      </div>
    </article>

  </div>
</main>

</template>

<style scoped>

main {
max-width: 400px;
margin: 0 auto;
}

h3 {
  margin-top: 2rem;
  text-align: center;
}

.input_wrapper {
  position: relative;
  background: linear-gradient(21deg, #FEE187, #D3D3D3);
  padding: 0.5px;
  display: inline-block;
  margin: 1rem 0;
  width: 100%;
}

#searchInput {
  line-height: 1.5;
  font-size: 1rem;
  color: whitesmoke;
  background-color: #151515;
  padding-left: 1rem;

}
input:focus::placeholder {
  color: transparent;
}

.input_wrapper *:not(span) {
  position: relative;
  display: inherit;
  margin: 0;
  border: none;
  outline: none;
  padding: 0.2em;
  z-index: 1;
  width: 100%;
}

.input_wrapper *:not(span):focus + span {
  opacity: 1;
  transform: scale(1);
}

.input_wrapper span {
  transform: scale(0.993, 0.94);
  transition: transform 0.5s, opacity 0.25s;
  opacity: 0;
  position: absolute; 
  z-index: 0;
  margin: 4px;
  inset:0;
  pointer-events: none;
  box-shadow: inset 3px -3px 10px #D3D3D3, -3px 3px 10px #FEE187;
}

button {
  color: #fff;
  background-color: #151515;
  cursor: pointer;
  width: 100%;
  height: 2.35rem;
  font-size: 1rem;
  display: block;
  margin-bottom: 1rem;
}

.reset {
  border: 2px solid #D3D3D3;
}

.glow-on-hover {
  position: relative;
  z-index: 0;
  color: black;
  font-weight: bold;
  border: 4px solid #FFC61B;
}

.glow-on-hover:before {
  content: '';
  background: linear-gradient(45deg, #FFC61B, #FEE187,  #D3D3D3, #FEE187,  #FFC61B,  #FEE187, #D3D3D3,  #FEE187, #FFC61B);
  position: absolute;
  top: -2px;
  left:-2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing 20s linear infinite;
  opacity: 0;
  transition: opacity .3s ease-in-out;
}

.glow-on-hover:active:after {
    background: transparent;
}

.glow-on-hover:hover:before {
    opacity: 1;
}

.glow-on-hover:after {
  z-index: -1;
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #FEE187;
  left: 0;
  top: 0;
}

@keyframes glowing {
  0% { background-position: 0 0; }
  50% { background-position: 400% 0; }
  100% { background-position: 0 0; }
}

h4 {
  font-size: 1.2rem;
  font-weight: bold;
}

.div-wrapper{
  /* border: 1px solid #FEE187; */
  margin-block: 2rem;
  }

.movie-container {
  border: 2px solid #D3D3D3;
  /* background-color: #192A56; */
  margin-bottom: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  max-width: 424px;
  text-align: left;
}  

.img-poster {
  width: 100%;
}

.movie-year{
  margin-bottom: 2rem;
}
.read-more-btn{
  width: 100%;
  border: 4px solid  #FEE187;

}


@media screen and (min-width: 768px) {

  main {
    max-width: 800px;
  }

  h3 {
    margin-top: 3rem;
    text-align: left;
  }

  .container {
    display: flex;
  }
  .input_wrapper {
    width: 420px;
    margin: 0;
    height: 2.4rem;
  }

  .glow-on-hover, .reset {
    width: 25%;
    margin-left: 2rem;
  }

  .div-wrapper{
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }

  .movie-container {
    max-width: 300px;
    justify-content: space-between;
  }
}


@media screen and (min-width: 1024px) {

  main {
    max-width: 1288px;
    margin: 0;
  }

  .movie-container {
    max-width: 200px;
  }

  .read-more-btn{
  text-align: left;
  padding-left: 1rem;

}
}

</style>
