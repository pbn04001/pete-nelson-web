<template>
  <div ref="section" class="section desert">
    <div ref="card" class="desert__card">
      <h1 class="desert__title" >The End</h1>
      <div ref="cardSub" class="desert__card_sub">
        Thank you for taking the time to visit my online portfolio.
        <br/><br/>
        You may contact me at <a href="mailto:petenelson.webdesign@gmail.com">petenelson.webdesign@gmail.com</a>
        <br/><br/>
        <a href="/resume">Click here to view my full resume</a>
      </div>
    </div>
    <DesertBack2 ref="desertBack2" class="desert__back desert__back--2" />
    <DesertBack1 ref="desertBack1" class="desert__back desert__back--1" />
    <Sun ref="sun" class="desert__sun" />
    <Birds ref="birds" class="desert__birds" />
  </div>
</template>

<script>
import anime from 'animejs';
import { delayAnimationCheckVisible, hideSectionAfterAnimation } from '@/utils/animation';
import { getClientHeight } from '@/utils/sizes';
import DesertBack1 from '@/assets/images/desert_back_1.svg';
import DesertBack2 from '@/assets/images/desert_back_2.svg';
import Sun from '@/assets/images/desert_sun.svg';
import Birds from '@/assets/images/desert_birds.svg';

export default {
  name: 'DesertSection',
  components: {
    DesertBack1,
    DesertBack2,
    Sun,
    Birds,
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
      return new Promise((resolve) => {
        if (!this.visible) {
          this.showAnimated(top ? 0 : 1)
            .then(resolve);
        } else {
          resolve();
        }
      });
    },
    adjust(offset) {
      this.adjustAnimated(offset);
    },
    load() {
      this.showAnimated(0);
      return new Promise(resolve => resolve());
    },
    getHash() {
      return 'end';
    },
    getSize() {
      return 1;
    },
    getBodyClass() {
      return 'desert';
    },
    reset(visible = true) {
      this.visible = visible;

      this.$refs.card.style.opacity = visible ? 1 : 0;
      this.$refs.card.style.transform = `translateY(${visible ? 0 : this.cardOffScreen()}px)`;
      this.$refs.desertBack1.style.transform = `translateY(${visible ? 0 : this.desertBack1Offscreen()}px)`;
      this.$refs.desertBack2.style.transform = `translateY(${visible ? 0 : this.desertBack2Offscreen()}px)`;
      this.$refs.sun.style.opacity = visible ? 1 : 0;
      this.$refs.sun.style.transform = `translateY(${visible ? 0 : this.sunOffscreen()}px)`;
      this.$refs.birds.style.transform = `translateY(${visible ? 0 : this.birdsOffscreen()}px)`;
      this.$refs.section.style.display = visible ? 'block' : 'none';
    },
    showAssets() {},
    showAnimated(offset) {
      this.visible = true;
      this.showing = true;
      this.$refs.section.style.display = 'block';

      return new Promise((resolve) => {
        anime({
          targets: this.$refs.card,
          translateY: 0,
          easing: 'easeOutSine',
          duration: 800,
        });
        delayAnimationCheckVisible({
          targets: this.$refs.card,
          opacity: 1,
          easing: 'easeOutSine',
          duration: 500,
        }, 300, this, true);

        anime({
          targets: this.$refs.sun,
          translateY: 0,
          opacity: 1,
          easing: 'easeOutSine',
          duration: 700,
        });

        anime({
          targets: this.$refs.birds,
          translateY: this.birdsMovement(offset),
          opacity: 1,
          easing: 'easeOutSine',
          duration: 700,
        });

        delayAnimationCheckVisible({
          targets: this.$refs.desertBack2,
          translateY: this.desertBack2Movement(offset),
          easing: 'easeOutSine',
          duration: 500,
        }, 200, this, true);

        delayAnimationCheckVisible({
          targets: this.$refs.desertBack1,
          translateY: this.desertBack1Movement(offset),
          easing: 'easeOutSine',
          duration: 300,
        }, 200, this, true)
          .then(() => {
            this.showing = false;
            resolve();
          });
      });
    },
    hideAnimated() {
      this.visible = false;

      anime({
        targets: this.$refs.card,
        translateY: this.cardOffScreen(),
        opacity: 0,
        easing: 'easeOutSine',
        duration: 700,
      });

      anime({
        targets: this.$refs.sun,
        translateY: this.sunOffscreen(),
        opacity: 0,
        easing: 'easeInOutSine',
        duration: 700,
      });

      anime({
        targets: this.$refs.birds,
        translateY: this.birdsOffscreen(),
        opacity: 0,
        easing: 'easeInOutSine',
        duration: 700,
      });

      anime({
        targets: this.$refs.desertBack2,
        translateY: this.desertBack2Offscreen(),
        easing: 'easeInOutSine',
        duration: 500,
      });

      anime({
        targets: this.$refs.desertBack1,
        translateY: this.desertBack1Offscreen(),
        easing: 'easeInOutSine',
        duration: 300,
      });

      hideSectionAfterAnimation(700, this);
    },
    adjustAnimated(offset) {
      if (this.showing || !this.visible) return;

      this.$refs.desertBack2.style.transform = `translateY(${this.desertBack2Movement(offset)}px)`;
      this.$refs.desertBack1.style.transform = `translateY(${this.desertBack1Movement(offset)}px)`;
      this.$refs.birds.style.transform = `translateY(${this.birdsMovement(offset)}px)`;
    },
    desertBack1Offscreen() {
      return getClientHeight(this.$refs.desertBack1);
    },
    desertBack2Offscreen() {
      return getClientHeight(this.$refs.desertBack2);
    },
    sunOffscreen() {
      return getClientHeight(this.$refs.sun);
    },
    birdsOffscreen() {
      return -1 * ((this.viewHeight * 0.5) + getClientHeight(this.$refs.birds));
    },
    cardOffScreen() {
      return (getClientHeight(this.$refs.card) + 50);
    },
    desertBack1Movement(offset) {
      return offset * (this.viewHeight / 30);
    },
    desertBack2Movement(offset) {
      return offset * (this.viewHeight / 20);
    },
    birdsMovement(offset) {
      return offset * (this.viewHeight / 15);
    },
  },
};
</script>

<style lang="scss">
  @import "./desertSection.scss";
</style>
