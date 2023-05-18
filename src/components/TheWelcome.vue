<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { API_KEY } from '../config'


interface IMovie {
  imdbID: string;
  Poster: string;
  Title: string;
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
      console.log(movies.value)
    }
  } catch (error) {
    console.error('API request failed:', error);
  }
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

// onMounted(async () => {
//   try {
//     const response = await axios.get('http://www.omdbapi.com/?t=almost+famous&apikey=${API_KEY}');
//     console.log(response.data)
//     if (response.data) {
//       // movies.value = response.data.results.slice(0, 10);
//       movies.value = response.data;
//       console.log(movies.value)
//     } else {
//       console.error('Invalid API response:', response.data);
//     }
//   } catch (error) {
//     console.error('API request failed:', error);
//   }
// }
// );
// console.log(movies)
// import WelcomeItem from './WelcomeItem.vue'
// import DocumentationIcon from './icons/IconDocumentation.vue'
// import ToolingIcon from './icons/IconTooling.vue'
// import EcosystemIcon from './icons/IconEcosystem.vue'
// import CommunityIcon from './icons/IconCommunity.vue'
// import SupportIcon from './icons/IconSupport.vue'


</script>

<template>
  <main>
    <h3>Let's search for a movie!</h3>
    <div class="container">
      <div class="input_wrapper">
        <label for='searchInput'>
          <input type='text' class="search-input" id='searchInput' placeholder='Type here' v-model='searchWord' @keydown.enter='search'>
          <span></span>
        </label>
      </div>
      <button class="glow-on-hover" id="searchBtn" @click="search">SEARCH</button>
      <button class="reset" @click="resetBtn">Reset</button>
    </div>
  <!-- <div >
    {{movies.Title}}<br>
  {{movies.Year}}<br>
  {{movies.Plot}}<br>
  </div> -->
 
  <div class='div-wrapper'>
    <div class='movie-container' v-for='movie in movies' :key='movie.imdbID'>
      <img class="img-poster" :src='movie.Poster === "N/A" ? "/placeholder.png" : movie.Poster' width="375"/>
      <h4>{{ movie.Title }}</h4>
      <p>{{ movie.Year }}</p>
      <button class='read-more-btn' @click='goto(movie.imdbID)'>READ MORE</button>
    </div>
  </div>
</main>

  <!-- <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>

    Vue’s
    <a href="https://vuejs.org/" target="_blank" rel="noopener">official documentation</a>
    provides you with all information you need to get started.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Tooling</template>

    This project is served and bundled with
    <a href="https://vitejs.dev/guide/features.html" target="_blank" rel="noopener">Vite</a>. The
    recommended IDE setup is
    <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VSCode</a> +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank" rel="noopener">Volar</a>. If
    you need to test your components and web pages, check out
    <a href="https://www.cypress.io/" target="_blank" rel="noopener">Cypress</a> and
    <a href="https://on.cypress.io/component" target="_blank">Cypress Component Testing</a>.

    <br />

    More instructions are available in <code>README.md</code>.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

    Get official tools and libraries for your project:
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>,
    <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>, and
    <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener">Vue Dev Tools</a>. If
    you need more resources, we suggest paying
    <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">Awesome Vue</a>
    a visit.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    Got stuck? Ask your question on
    <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a>, our official
    Discord server, or
    <a href="https://stackoverflow.com/questions/tagged/vue.js" target="_blank" rel="noopener"
      >StackOverflow</a
    >. You should also subscribe to
    <a href="https://news.vuejs.org" target="_blank" rel="noopener">our mailing list</a> and follow
    the official
    <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">@vuejs</a>
    twitter account for latest news in the Vue world.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support Vue</template>

    As an independent project, Vue relies on community backing for its sustainability. You can help
    us by
    <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">becoming a sponsor</a>.
  </WelcomeItem> -->
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

/* button { */
  /* border: 4px solid #D3D3D3;
  display: block;
  height: 2.35rem;
  font-size: 1rem;
  color: #fff;
  background-color: #151515;
  cursor: pointer;
  width: 22em; */
  /* min-width: 26.5em; */
/* 
} */

button {
  color: #fff;
  background-color: #151515;
  cursor: pointer;
  width: 100%;
  height: 2.35rem;
  font-size: 1rem;
  border: 4px solid #FFC61B;
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

/* .search-btn {
  box-shadow: inset 0 0 0 4px #58afd1;
  color: #58afd1;
  transition: color 0.25s 0.25s/3;
  position: relative;
}

.search-btn::before,
.search-btn::after{
  border: 0 solid transparent;
  box-sizing: border-box;
  content: '';
  pointer-events: none;
  position: absolute;
  width: 0;
  height: 0;
  bottom: 0;
  right: 0;
}

.search-btn::before {
  border-top-width: 4px;
  border-left-width: 4px;
}

.search-btn::after {
  border-bottom-width: 4px;
  border-right-width: 4px;
}

.search-btn:hover {
  color: #ffe593;
}

.search-btn:hover::before,
.search-btn:hover::after {
  border-color: #ffe593;
  transition: border-color 0s, width 0.25s, height 0.25s;
  width: 100%;
  height: 100%;
}

.search-btn:hover:before {
  transition-delay: 0s, 0s, 0.25s;
} 

.search-btn:hover:after {
  transition-delay: 0s, 0.25s, 0s;
} */


h4 {
  font-size: 1.2rem;
  font-weight: bold;
}

.div-wrapper{
  /* border: 1px solid #FEE187; */
  margin-block: 2rem;
  }

.movie-container {
  border: 4px solid #192A56;
  margin-bottom: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 424px;
}  

.img-poster {
  width: 100%;
}

.read-more-btn{
  width: 100%;
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
    width: 50%;
    margin: 0;
  }

  .glow-on-hover {
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
}

</style>
