<template>
  <div id="app">
    <NavBar />
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'home',
  components: {
    NavBar,
  },
};
</script>

<style lang="scss">
@import "@/styles/main.scss";
</style>
