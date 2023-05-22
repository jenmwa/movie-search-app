<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import FooterComponent from './components/FooterComponent.vue';

</script>

<template>
  <header>
    <img alt="My Movie Reels logo" class="logo" src="@/assets/video-player-movie-svgrepo-com.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="Welcome to My Vue project!" />

      <nav>
        <RouterLink to="/movie-search-app/">Home</RouterLink>
        <RouterLink to="/movie-search-app/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
  <FooterComponent />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    scale:1.2;
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    margin-top: 1rem;
    padding: 0 0 1rem 0;
    margin-top: 1rem;
  }
}
</style>
