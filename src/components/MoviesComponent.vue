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
<section class="result">
  <p v-if="movies.length > 0">your top result:</p>
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
</section>

</template>

<style scoped>


h4 {
  font-size: 1.2rem;
  font-weight: bold;
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

.div-wrapper{
  margin: 2rem 0 4rem 0;
  }

.movie-container {
  border: 2px solid #D3D3D3;
  margin-bottom: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  max-width: 424px;
  text-align: left;
}  

.movie_img {
  position: relative;
  height: 33rem;
}

.img-poster {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.movie-year{
  display: block;
  margin-bottom: 2rem;
}
.read-more-btn{
  width: 100%;
  border: 4px solid  #FEE187;
  margin-top: 2rem;

}

@media screen and (min-width: 768px) {
  .movie-container {
    min-width: 100%;
    /* justify-content: space-between; */
  }

  .upper {
    display: flex;
  }

  .movie_img {
    width: 50%;
  }

  .movie-text {
    margin-left: 2rem;
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .read-more-btn{
    margin-top: 2rem;
  }

}


@media screen and (min-width: 1024px) {
  .div-wrapper {
    min-width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .movie-container {
    width: calc(50% - 12px);
  }

  .read-more-btn{
  text-align: left;
  padding-left: 1rem;
  }
}


</style>