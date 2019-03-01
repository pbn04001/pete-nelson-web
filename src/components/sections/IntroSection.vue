<template>
  <div ref="section" class="section intro">
    <img src="/img/moon.svg" ref="moon" alt="Moon" class="intro__moon"/>
    <img src="/img/moon_back.svg" ref="moon_back" alt="Moon Glow" class="intro__moon_back intro__moon_back--show"/>
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
import Cloud1 from '@/assets/images/cloud_1.svg';
import Cloud2 from '@/assets/images/cloud_2.svg';

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
      this.$refs.moon.style.translateY = this.moonOffScreen();
      this.$refs.section.style.display = 'none';
      this.$refs.moon_back.classList.remove('intro__moon_back--show');
      this.$refs.moon_back.classList.add('intro__moon_back--hide');
    },
    showAnimated(offset) {
      this.$refs.section.style.display = 'block';
      this.visible = true;
      this.showing = true;
      this.$refs.moon_back.classList.remove('intro__moon_back--hide');
      setTimeout(() => {
        this.$refs.moon_back.classList.add('intro__moon_back--show');
      }, 300);
      anime({
        targets: this.$refs.moon,
        translateY: 0,
        easing: 'easeOutSine',
        duration: 300,
      });
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
      this.$refs.moon_back.classList.remove('intro__moon_back--show');
      this.$refs.moon_back.classList.add('intro__moon_back--hide');
      anime({
        targets: this.$refs.moon,
        translateY: this.moonOffScreen(),
        easing: 'easeInOutSine',
        delay: 300,
        duration: 400,
      });
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
    moonOffScreen() {
      return -1 * ((this.viewHeight * 0.10) + this.$refs.moon.clientHeight + 50);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "@/styles/_globals.scss";
  .intro {
    &__moon {
      z-index: 1;
      position: absolute;
      top: 10%;
      right: 15%;
      width: 20%;
      height: 20%;
    }
    &__moon_back {
      position: absolute;
      width: 95%;
      height: 95%;
      top: -27.5%;
      right: -22.5%;
      opacity: 0;

      &--hide {
        opacity: 0;
        transition: opacity linear 300ms;
      }
      &--show {
        opacity: 1;
        transition: opacity linear 300ms;
      }
    }
    &__sky_line {
      position: absolute;
      right: 0;
      bottom: -6vw;
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
      bottom: -5.5vw;
      & path {
        fill: $darker-blue;
      }
    }
    &__sky_line--3 {
      z-index: 1;
      bottom: -5vw;
      & path {
        fill: $darkest-blue;
      }
    }
  }
</style>
