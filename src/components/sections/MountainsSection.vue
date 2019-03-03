<template>
  <div ref="section" class="section mountains">
    <Mountains1 ref="mountains1" class="mountains__mountains mountains__mountains--1" />
    <Mountains2 ref="mountains2" class="mountains__mountains mountains__mountains--2" />
    <Clouds ref="clouds" class="mountains__clouds" />
  </div>
</template>

<script>
import anime from 'animejs';
import Mountains1 from '@/assets/images/mountains_1.svg';
import Mountains2 from '@/assets/images/mountains_2.svg';
import Clouds from '@/assets/images/mountain_clouds.svg';

export default {
  name: 'MountainsSection',
  components: {
    Mountains1,
    Mountains2,
    Clouds,
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
    load() {
      this.showAnimated(0);
      return new Promise((resolve) => resolve());
    },
    getHash() {
      return 'developer';
    },
    reset() {
      this.visible = false;

      this.$refs.mountains1.style.transform = `translateY(${this.mountains1Offscreen()}px)`;
      this.$refs.mountains2.style.transform = `translateY(${this.mountains2Offscreen()}px)`;
      this.$refs.clouds.style.transform = `translateY(${this.cloudsOffscreen()}px)`;
    },
    showAnimated(offset) {
      this.visible = true;
      this.showing = true;
      document.body.classList.add('body--mountains');
      this.$refs.section.style.zIndex = '100';

      anime({
        targets: this.$refs.clouds,
        translateY: 0, //this.mountains2Movement(offset),
        easing: 'easeOutSine',
        opacity: 1,
        duration: 700,
      });

      anime({
        targets: this.$refs.mountains2,
        translateY: 0, //this.mountains2Movement(offset),
        easing: 'easeOutSine',
        delay: 200,
        duration: 500,
      });

      anime({
        targets: this.$refs.mountains1,
        translateY: 0, //this.mountains1Movement(offset),
        easing: 'easeOutSine',
        delay: 200,
        duration: 300,
      }).finished.then(() => {
        this.showing = false;
      });
    },
    hideAnimated() {
      this.visible = false;
      document.body.classList.remove('body--mountains');
      this.$refs.section.style.zIndex = '0';

      anime({
        targets: this.$refs.clouds,
        translateY: this.cloudsOffscreen(),
        easing: 'easeInOutSine',
        duration: 700,
        opacity: 0,
      });

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
        duration: 300,
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
      return this.$refs.mountains1.clientHeight;
    },
    mountains2Offscreen() {
      return this.$refs.mountains2.clientHeight;
    },
    cloudsOffscreen() {
      return this.$refs.clouds.clientHeight;
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
      bottom: -6vw;
      left: 0;

      &--1 {
        z-index: 3
      }
      &--2 {
        z-index: 2;
      }
    }

    &__clouds {
      z-index: 1;
      position: absolute;
      width: 100%;
      bottom: -6vw;
      left: 0;
      opacity: 0;
    }
  }
</style>
