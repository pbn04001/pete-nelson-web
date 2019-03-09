<template>
  <div ref="section" class="section forest">
    <h1 ref="title" class="forest__title" >Designer</h1>
    <div ref="card" class="forest__card">

    </div>
    <Hills1 ref="hills1" class="forest__hills forest__hills--1" />
    <Hills2 ref="hills2" class="forest__hills forest__hills--2" />
    <Trees ref="trees" class="forest__trees" />
    <Moon ref="moon" class="forest__moon"/>
    <MoonBack ref="moon_back" class="forest__moon_back"/>
  </div>
</template>

<script>
import anime from 'animejs';
import { delayAnimationCheckVisible } from '@/utils/animation';
import { getClientHeight } from '@/utils/sizes';

// Scenery
import Hills1 from '@/assets/images/hills_1.svg';
import Hills2 from '@/assets/images/hills_2.svg';
import Trees from '@/assets/images/trees.svg';
import Moon from '@/assets/images/moon_yellow.svg';
import MoonBack from '@/assets/images/moon_yellow_back.svg';

export default {
  name: 'ForestSection',
  components: {
    Hills1,
    Hills2,
    Trees,
    Moon,
    MoonBack,
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
      return 'designer';
    },
    getSize() {
      return 2;
    },
    reset(visible = true) {
      this.visible = visible;

      this.hideCard();
      this.$refs.title.style.transform = `translateY(${visible ? 0 : this.titleOffScreen()}px)`;
      this.$refs.hills1.style.transform = `translateY(${visible ? 0 : this.hills1Offscreen()}px)`;
      this.$refs.hills2.style.transform = `translateY(${visible ? 0 : this.hills2Offscreen()}px)`;
      this.$refs.trees.style.transform = `translateY(${visible ? 0 : this.treesOffscreen()}px)`;
      this.$refs.moon.style.transform = `translateY(${visible ? 0 : this.moonOffScreen()}px)`;
    },
    showAnimated(offset) {
      this.visible = true;
      this.showing = true;
      document.body.classList.add('body--forest');

      this.showCard();
      return new Promise((resolve) => {
        anime({
          targets: this.$refs.title,
          translateY: 0,
          easing: 'easeOutSine',
          duration: 500,
        });

        this.$refs.moon_back.classList.remove('forest__moon_back--hide');
        this.$refs.moon_back.classList.add('forest__moon_back--show');

        anime({
          targets: this.$refs.moon,
          translateY: 0,
          easing: 'easeOutSine',
          duration: 300,
        });

        anime({
          targets: this.$refs.trees,
          translateY: this.treesMovement(offset),
          easing: 'easeOutSine',
          opacity: 1,
          duration: 700,
        });

        delayAnimationCheckVisible({
          targets: this.$refs.hills2,
          translateY: this.hills2Movement(offset),
          easing: 'easeOutSine',
          duration: 500,
        }, 200, this, true);

        delayAnimationCheckVisible({
          targets: this.$refs.hills1,
          translateY: this.hills1Movement(offset),
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
      this.$refs.moon_back.classList.remove('forest__moon_back--show');
      this.$refs.moon_back.classList.add('forest__moon_back--hide');
      document.body.classList.remove('body--forest');

      this.hideCard();
      anime({
        targets: this.$refs.title,
        translateY: this.titleOffScreen(),
        easing: 'easeOutSine',
        duration: 500,
      });

      const self = this;
      setTimeout(() => {
        if (!self.visible) {
          anime({
            targets: this.$refs.moon,
            translateY: this.moonOffScreen(),
            easing: 'easeInOutSine',
            duration: 400,
          });
        }
      }, 300);

      anime({
        targets: this.$refs.trees,
        translateY: this.treesOffscreen(),
        easing: 'easeInOutSine',
        duration: 700,
        opacity: 0,
      });

      anime({
        targets: this.$refs.hills2,
        translateY: this.hills2Offscreen(),
        easing: 'easeInOutSine',
        duration: 500,
      });

      anime({
        targets: this.$refs.hills1,
        translateY: this.hills1Offscreen(),
        easing: 'easeInOutSine',
        duration: 300,
      });
    },
    adjustAnimated(offset) {
      if (this.showing || !this.visible) return;

      this.$refs.trees.style.transform = `translateY(${this.treesMovement(offset)}px)`;
      this.$refs.hills2.style.transform = `translateY(${this.hills2Movement(offset)}px)`;
      this.$refs.hills1.style.transform = `translateY(${this.hills1Movement(offset)}px)`;
    },
    cardOffScreen() {
      return (getClientHeight(this.$refs.card) + 50);
    },
    showCard() {
      this.$refs.card.classList.add('forest__card--show');
      this.$refs.card.classList.remove('forest__card--hide');
    },
    hideCard() {
      this.$refs.card.classList.add('forest__card--hide');
      this.$refs.card.classList.remove('forest__card--show');
    },
    titleOffScreen() {
      return -1 * ((this.viewHeight * 0.10) + getClientHeight(this.$refs.title) + 50);
    },
    hills1Offscreen() {
      return getClientHeight(this.$refs.hills1);
    },
    hills2Offscreen() {
      return getClientHeight(this.$refs.hills2) + 200;
    },
    treesOffscreen() {
      return getClientHeight(this.$refs.trees);
    },
    moonOffScreen() {
      return -1 * ((this.viewHeight * 0.10) + getClientHeight(this.$refs.moon) + 50);
    },
    cardMovement(offset) {
      return -1 * (offset * (getClientHeight(this.$refs.card) - this.viewHeight));
    },
    treesMovement(offset) {
      return offset * (this.viewHeight / 15);
    },
    hills2Movement(offset) {
      return offset * (this.viewHeight / 20);
    },
    hills1Movement(offset) {
      return offset * (this.viewHeight / 25);
    },
  },
};
</script>

<style lang="scss">
  @import "./forestSection.scss";
</style>
