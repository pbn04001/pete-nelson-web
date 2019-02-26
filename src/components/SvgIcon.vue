<template>
  <svg :class="className" xmlns="http://www.w3.org/2000/svg">
    <title v-if="title">{{ title }}</title>
    <use :xlink:href="name" xmlns:xlink="http://www.w3.org/1999/xlink"/>
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',

  props: {
    name: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      default: null,
    },
  },

  computed: {
    className() {
      return `svg-icon ${this.className}`;
    },
  },
};
</script>

<style>
  .svg-icon {
    fill: currentColor;
    height: 24px;
    width: 24px;
  }
</style>
