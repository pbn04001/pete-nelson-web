<template>
  <div class="home">
    <NavBar />
    <HomeScroll />
  </div>
</template>

<script>
import HomeScroll from '@/components/HomeScroll.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'home',
  components: {
    NavBar,
    HomeScroll,
  },
};
</script>
