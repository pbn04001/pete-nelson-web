<template>
  <div ref="section" class="section intro">
    <SkyLine1 ref="skyLine1" class="intro__sky_line intro__sky_line--1"/>
    <SkyLine2 ref="skyLine2" class="intro__sky_line intro__sky_line--2"/>
    <SkyLine3 ref="skyLine3" class="intro__sky_line intro__sky_line--3"/>
  </div>
</template>

<script>
import anime from 'animejs';
import SkyLine1 from '@/assets/images/skyline_1.svg';
import SkyLine2 from '@/assets/images/skyline_2.svg';
import SkyLine3 from '@/assets/images/skyline_3.svg';

export default {
  name: 'IntroSection',
  props: {
    viewHeight: {
      type: Number,
      required: true,
    },
  },
  components: {
    SkyLine1,
    SkyLine2,
    SkyLine3,
  },
  data() {
    return {
      visible: true,
      showing: false,
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
      this.adjustAnimated(offset);
    },
    reset() {
      this.visible = false;
      this.$refs.skyline1.style.translateY = this.skyLine1OffScreen();
      this.$refs.skyline2.style.translateY = this.skyLine2OffScreen();
      this.$refs.skyline3.style.translateY = this.skyLine3OffScreen();
      this.$refs.section.style.display = 'none';
    },
    showAnimated(offset) {
      this.$refs.section.style.display = 'block';
      this.visible = true;
      this.showing = true;
      anime({
        targets: this.$refs.skyLine3,
        translateY: this.skyLine3Movement(offset),
        easing: 'easeOutBack',
        duration: 500,
      });
      anime({
        targets: this.$refs.skyLine2,
        translateY: this.skyLine2Movement(offset),
        easing: 'easeOutBack',
        duration: 500,
        delay: 100,
      });
      anime({
        targets: this.$refs.skyLine1,
        translateY: this.skyLine1Movement(offset),
        easing: 'easeOutBack',
        duration: 500,
        delay: 100,
      }).finished.then(() => {
        this.showing = false;
      });
    },
    hideAnimated() {
      this.visible = false;
      anime({
        targets: this.$refs.skyLine1,
        translateY: this.skyLine1OffScreen(),
        easing: 'easeInOutSine',
        duration: 400,
      });
      anime({
        targets: this.$refs.skyLine2,
        translateY: this.skyLine2OffScreen(),
        easing: 'easeInOutSine',
        duration: 400,
        delay: 75,
      });
      anime({
        targets: this.$refs.skyLine3,
        translateY: this.skyLine3OffScreen(),
        easing: 'easeInOutSine',
        duration: 400,
        delay: 150,
      }).finished.then(() => {
        if (!this.visible) {
          this.$refs.section.style.display = 'none';
        }
      });
    },
    adjustAnimated(offset) {
      if (this.showing) return;

      anime({
        targets: this.$refs.skyLine1,
        translateY: this.skyLine1Movement(offset),
        duration: 20,
      });

      anime({
        targets: this.$refs.skyLine2,
        translateY: this.skyLine2Movement(offset),
        duration: 20,
      });

      anime({
        targets: this.$refs.skyLine3,
        translateY: this.skyLine3Movement(offset),
        duration: 20,
      });
    },
    skyLine1OffScreen() {
      return this.$refs.skyLine1.clientHeight + 50;
    },
    skyLine2OffScreen() {
      return this.$refs.skyLine2.clientHeight + 50;
    },
    skyLine3OffScreen() {
      return this.$refs.skyLine3.clientHeight + 50;
    },
    skyLine1Movement(offset) {
      return offset * (this.viewHeight / 15);
    },
    skyLine2Movement(offset) {
      return offset * (this.viewHeight / 13);
    },
    skyLine3Movement(offset) {
      return offset * (this.viewHeight / 11);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "@/styles/_globals.scss";
  .intro {
    &__sky_line {
      position: absolute;
      right: 0;
      bottom: -6rem;
      width: 100%;
    }
    &__sky_line--1 {
      z-index: 3;
      & path {
        fill: $dark-blue;
      }
    }
    &__sky_line--2 {
      z-index: 2;
      & path {
        fill: $darker-blue;
      }
    }
    &__sky_line--3 {
      z-index: 1;
      & path {
        fill: $darkest-blue;
      }
    }
  }
</style>
