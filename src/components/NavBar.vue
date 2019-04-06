<template>
  <nav class="nav-bar">
    <div
      class="nav-bar__menu"
      v-on:click="toggleMenu"
    >
      <div
        v-bind:class="{
          'nav-bar__menu-hamburger': true,
          'nav-bar__menu-hamburger--open': open,
        }"
      ></div>
      <div
        v-bind:class="{
          'nav-bar__menu-body': true,
          'nav-bar__menu-body--open': open,
          'nav-bar__menu-body--close': !open,
        }">
        <ul>
          <li>
            <router-link to="/">Home</router-link>
            <router-link to="/resume">Resume</router-link>
            <a href="mailto:petenelson.webdesign@gmail.com">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      open: false,
    };
  },
  methods: {
    toggleMenu() {
      this.open = !this.open;
    },
  },
};
</script>

<style lang="scss">
@import './navBar.scss';
</style>
