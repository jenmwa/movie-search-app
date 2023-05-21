<script setup lang="ts">


</script>

<template>
  <section class="about">
    <h3>What's this about?</h3>
    <div class='container'>
      <p>As of May 2023 we're having our skill course regarding JavaScript, and with that, frameworks! </p>
      <p>First out is Vue.js, and with getting through the basics, it's always nice to do a project.</p>
      <p>This time I went for a movie Render App, to tryout fetching an API, and render the result with VUE.js</p>
      <p>I went for the omdb API (who doesn't like movies?), using Axios (to revisit and to revive the knowledge using Axios from previous courses),
        to fetch API's, and my project is based in VUE also using router for the first time! <br>(thank you Sussi for sharing knowledge ❤️).</p>
       <h4>How to use the app?</h4>
       <span class='p-text'>easy as a lemon sqeezy (...)!</span>
       <ul>
        <li>On the startpage, type down your movie.</li>
        <li>We're searching the omdb API for the title you entered and we'll get back the result.</li>
        <li>If there's several movies that match the title, you'll get a maximum of 10 movies rendered on the page.</li>
        <li>You'll get the poster, title, year and the plot for the movie, and if you want to read more about the movie, just blick the button and you'll eget to Imdb.com</li>
        <li>Ready to search for another movie?<br>
        Go ahead!</li>
        <li>And if you accidently refresh the page or walk through the menu, the previous search result is saved to localStorage and will show.</li>
        <li>Start over? <br>just hit refresh!</li>
       </ul>

       <p class='p-last'>Jenny Waller May 2023</p>
    </div>
  </section>

</template>

<style>
.about {
  max-width: 400px;
  margin: 0 auto 6rem auto;
}

h3 {
  font-size: 2rem;
  margin-block: 2rem;
  text-align: center;
}

h4 {
  font-size: 1.5rem;
}

p {
  margin-bottom: 1rem;
}

.p-last {
  margin-top: 4rem;
}


@media screen and (min-width: 768px) {
  .about {
    max-width: 600px;
  }

  h3 {
    margin-top: 3rem;
    text-align: left;
  }

    .p-last {
    margin-bottom: 6rem;
  }

}



@media screen and (min-width: 1024px) {
  .about {
  max-width: 800px;
  margin: 0;
  }
}

</style>
