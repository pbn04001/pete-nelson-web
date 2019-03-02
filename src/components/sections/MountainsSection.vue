<template>
  <div ref="section" class="section mountains">
    <Mountains1 ref="mountains1" alt="Mountains" class="mountains__mountains mountains__mountains--1" />
    <Mountains2 ref="mountains2" alt="Mountains" class="mountains__mountains mountains__mountains--2" />
  </div>
</template>

<script>
import anime from 'animejs';
import Mountains1 from '@/assets/images/mountains_1.svg';
import Mountains2 from '@/assets/images/mountains_2.svg';

export default {
  name: 'MountainsSection',
  components: {
    Mountains1,
    Mountains2,
  },
  props: {
    viewHeight: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      visible: true,
      showing: true,
    };
  },
  methods: {
    hide() {
      if (this.visible) {
        this.hideAnimated();
      }
    },
    show(top) {
      if (!this.visible) {
        this.showAnimated(top ? 0 : 1);
      }
    },
    adjust(offset) {
      //  this.adjustAnimated(offset);
    },
    load() {},
    reset() {
      this.visible = false;

      this.$refs.mountains1.style.transform = `translateY(${this.mountains1Offscreen()}px)`;
      this.$refs.mountains2.style.transform = `translateY(${this.mountains2Offscreen()}px)`;
      this.$refs.section.style.display = 'none';
    },
    showAnimated(offset) {
      this.$refs.section.style.display = 'block';
      this.visible = true;
      this.showing = true;

      anime({
        targets: this.$refs.mountains2,
        translateY: 0, //this.mountains2Movement(offset),
        easing: 'easeOutSine',
        duration: 700,
      });

      anime({
        targets: this.$refs.mountains1,
        translateY: 0, //this.mountains1Movement(offset),
        easing: 'easeOutSine',
        duration: 500,
      }).finished.then(() => {
        this.showing = false;
      });
    },
    hideAnimated() {
      this.visible = false;

      anime({
        targets: this.$refs.mountains2,
        translateY: this.mountains2Offscreen(),
        easing: 'easeInOutSine',
        duration: 500,
      });

      anime({
        targets: this.$refs.mountains1,
        translateY: this.mountains1Offscreen(),
        easing: 'easeInOutSine',
        duration: 500,
      }).finished.then(() => {
        if (!this.visible) {
          this.$refs.section.style.display = 'none';
        }
      });
    },
    adjustAnimated(offset) {
      anime({
        targets: this.$refs.mountains1,
        translateY: this.mountains1Movement(offset),
        duration: 20,
      });
    },
    mountains1Offscreen() {
      return this.$refs.mountains1.clientHeight + 50;
    },
    mountains2Offscreen() {
      return this.$refs.mountains2.clientHeight + 50;
    },
    mountains1Movement(offset) {
      return offset * (this.viewHeight / 30);
    },
    mountains2Movement(offset) {
      return offset * (this.viewHeight / 20);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
  @import "@/styles/_globals.scss";
  .mountains {
    &__mountains {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;

      &--1 {
        z-index: 3
      }
      &--2 {
        z-index: 2;
      }
    }
  }
</style>
