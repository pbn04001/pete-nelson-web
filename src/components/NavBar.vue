<template>
  <nav class="nav-bar">
    <div
      class="nav-bar__menu"
      v-on:click="toggleMenu"
    >
      Menu
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
            <a class="nav-bar__link-mobile" href="https://github.com/pbn04001">GitHub</a>
            <a class="nav-bar__link-mobile" href="https://twitter.com/petenelsonweb">Twitter</a>
          </li>
        </ul>
      </div>
    </div>
    <a class="nav-bar__github" title="Pete Nelson GitHub" href="https://github.com/pbn04001">
      <img src="/assets/icons/github.svg" />
    </a>
    <a class="nav-bar__twitter" title="Pete Nelson Twitter" href="https://twitter.com/petenelsonweb">
      <img src="/assets/icons/twitter.svg" />
    </a>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    resume: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  created() {
    if (this.resume) {
      this.$router.push('/resume');
    }
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
