<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import ChoiceQuizz from './components/ChoiceQuizz.vue';
import { ref } from 'vue';
import QuizzTypeSelector from './components/QuizzTypeSelector.vue';


const appObject={
   id:"container-s"
}
const type=ref<string | null>(null)
</script>

<template>
    <div class="wrapper" v-bind="appObject">
      <div v-if="type === null" class="welcome-container">
      <h1>Welcome To Learnly Quizz</h1>
      <QuizzTypeSelector :selected-type="type" @update:type="type = $event" />
     </div>
      <div v-if="type !== null">
      <ChoiceQuizz :type="type" />
      </div>
    </div>
</template>

<style scoped>
.wrapper{
  width: 100%;
  min-height:100vh ;
}

.welcome-container{
  width: 100%;
  min-height: 100vh;
  text-align: center;
   flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;

}

.wrap-button{
  margin-top: 1.2em;
  display: flex;
  
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

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
