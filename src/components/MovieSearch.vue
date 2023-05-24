<script setup lang="ts">
import { ref } from 'vue';

const searchWord = ref('');

const emits = defineEmits<{(e: 'search', searchText:string): void}>()

const resetBtn = () => {
  searchWord.value = '';
//movies.value = [];
  sessionStorage.removeItem('movies');
}

const search = () => {
  emits('search', searchWord.value);
  searchWord.value = '';
}
</script>

<template>
  <div class='container'>
    <div class='input_wrapper'>
      <label for='searchInput'>
        <input type='text' class="search-input" id='searchInput' placeholder='Type your Movie Title here' v-model='searchWord' @keydown.enter='search'>
        <span></span>
      </label>
    </div>
    <button class='search-btn' id='searchBtn' @click='search'>SEARCH</button>
    <button class='reset-btn' @click="resetBtn">Reset</button>
  </div>
</template>

<style lang="scss">

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

#searchInput:focus {
  outline-color: Highlight;
  outline-color: -webkit-focus-ring-color;
  outline-style: auto;
  outline-width: 1px;
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

.reset-btn {
  border: 2px solid #D3D3D3;
  margin-bottom:6rem;
}

.reset-btn:hover, .reset-btn:focus {
  font-weight: bold;
}

.search-btn {
  background-color: #FEE187;
  position: relative;
  z-index: 0;
  color: black;
  font-weight: bold;
  border: 4px solid #FFC61B;
}

.search-btn:before {
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

.search-btn:active:after {
    background: transparent;
}

.search-btn:hover:before {
    opacity: 1;
}

.search-btn:after {
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

@media screen and (min-width: 768px) {

  .container {
    display: flex;
  }
  .input_wrapper {
    width: 420px;
    margin: 0;
    height: 2.4rem;
  }

  .search-btn, .reset-btn {
    width: 25%;
    margin-left: 2rem;
  }

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

  .search-btn, .reset-btn {
    width: 240px;
    margin-left: 2rem;
  }

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
