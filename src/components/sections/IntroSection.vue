<template>
  <div ref="section" class="section intro">
    <div class="intro__card">
      <PeteNelson ref="peteNelson" class="intro__pete-nelson"/>
    </div>
    <Cloud1 ref="cloud1" class="intro__cloud intro__cloud--1"/>
    <Cloud2 ref="cloud2" class="intro__cloud intro__cloud--2"/>
    <img src="/img/moon.svg" ref="moon" alt="Moon" class="intro__moon"/>
    <img src="/img/moon_back.svg" ref="moon_back" alt="Moon Glow" class="intro__moon_back"/>
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
import PeteNelson from '@/assets/images/pete_nelson.svg';

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
    Cloud1,
    Cloud2,
    PeteNelson,
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
    show(top = true) {
      if (!this.visible) {
        this.showAnimated(top ? 0 : 1, false);
      }
    },
    adjust(offset) {
      this.adjustAnimated(offset);
    },
    load() {
      this.showAnimated(0, true);
    },
    reset() {
      this.visible = false;
      this.$refs.skyLine1.style.transform = `translateY(${this.skyLine1OffScreen()}px)`;
      this.$refs.skyLine2.style.transform = `translateY(${this.skyLine2OffScreen()}px)`;
      this.$refs.skyLine3.style.transform = `translateY(${this.skyLine3OffScreen()}px)`;
      this.$refs.moon.style.transform = `translateY(${this.moonOffScreen()}px)`;
      this.$refs.cloud1.style.transform = `translateY(${this.cloud1OffScreen()}px)`;
      this.$refs.cloud2.style.transform = `translateY(${this.cloud2OffScreen()}px)`;
      this.$refs.section.style.display = 'none';
    },
    showAnimated(offset, firstLoad) {
      this.$refs.section.style.display = 'block';
      this.visible = true;
      this.showing = true;

      if (firstLoad) {
        this.animatePeteNelson();
      }

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
        targets: this.$refs.cloud1,
        translateY: this.cloud1Movement(offset),
        opacity: 0.6,
        easing: 'easeOutSine',
        duration: 1000,
      });
      anime({
        targets: this.$refs.cloud2,
        translateY: this.cloud2Movement(offset),
        opacity: 0.6,
        easing: 'easeOutSine',
        duration: 1000,
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
        targets: this.$refs.cloud1,
        translateY: this.cloud1OffScreen(),
        opacity: 0,
        easing: 'easeOutSine',
        duration: 1000,
      });
      anime({
        targets: this.$refs.cloud2,
        translateY: this.cloud2OffScreen(),
        opacity: 0,
        easing: 'easeOutSine',
        duration: 1000,
      }).finished.then(() => {
        if (!this.visible) {
          this.$refs.section.style.display = 'none';
        }
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
      });
    },
    adjustAnimated(offset) {
      if (this.showing) return;

      anime({
        targets: this.$refs.cloud1,
        translateY: this.cloud1Movement(offset),
        duration: 20,
      });

      anime({
        targets: this.$refs.cloud2,
        translateY: this.cloud2Movement(offset),
        duration: 20,
      });

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
    animatePeteNelson() {
      anime({
        targets: document.getElementById('name-p'),
        loop: false,
        direction: 'normal',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 500,
      });
      anime({
        targets: document.getElementById('name-n1'),
        direction: 'normal',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 150,
      });
      anime({
        targets: document.getElementById('name-n2'),
        direction: 'normal',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        delay: 150,
        duration: 200,
      });
      anime({
        targets: document.getElementById('name-n3'),
        direction: 'normal',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        delay: 350,
        duration: 150,
      });
      anime({
        targets: document.getElementById('name-mask-rectangle'),
        width: '100%',
        easing: 'easeInOutSine',
        delay: 500,
        duration: 500,
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
    moonOffScreen() {
      return -1 * ((this.viewHeight * 0.10) + this.$refs.moon.clientHeight + 50);
    },
    cloud1OffScreen() {
      return -1 * (this.$refs.moon.clientHeight + 100);
    },
    cloud2OffScreen() {
      return -1 * ((this.viewHeight * 0.19) + this.$refs.moon.clientHeight + 50);
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
    cloud1Movement(offset) {
      return -1 * offset * (this.viewHeight / 25);
    },
    cloud2Movement(offset) {
      return -1 * offset * (this.viewHeight / 10);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "@/styles/_globals.scss";
  .intro {
    &__card {
      position: absolute;
      top: 8rem;
      left: 8rem;
      text-align: left;
    }

    &__pete-nelson {
      height: 13rem;

      .cls-1{
        fill: $light-gray;
      }
      .cls-2,.cls-3,.cls-4{
        fill: none;
        stroke: $light-gray;
        stroke-miterlimit: 10;
      }
      .cls-2{stroke-width:1.25rem;}
      .cls-3{stroke-width:1rem;}
      .cls-4{stroke-width:1.125rem}
    }

    &__cloud {
      z-index: 2;
      position: absolute;
      width: 25%;
      height: 25%;
      opacity: .6;

      & path {
        fill: $dark-blue;
      }

      &--1 {
        right: 25%;
      }
      &--2 {
        top: 19%;
        right: -3%;
      }
    }
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
      z-index: 13;
      & path {
        fill: $dark-blue;
      }
    }
    &__sky_line--2 {
      z-index: 12;
      bottom: -5.5vw;
      & path {
        fill: $darker-blue;
      }
    }
    &__sky_line--3 {
      z-index: 11;
      bottom: -5vw;
      & path {
        fill: $darkest-blue;
      }
    }
  }
</style>
