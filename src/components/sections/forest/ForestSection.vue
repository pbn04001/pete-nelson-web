<template>
  <div ref="section" class="section forest">
    <div ref="card" class="forest__card">
      <h1 class="forest__title" >Designer</h1>
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
      if (this.visible && !this.showing) {
        this.adjustAnimated(offset);
      }
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

      this.$refs.card.style.opacity = visible ? 1 : 0;
      this.$refs.card.style.transform = `translateY(${visible ? 0 : this.cardOffScreen()}px)`;
    },
    showAnimated() {
      this.visible = true;
      this.showing = true;
      document.body.classList.add('body--forest');

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
        resolve();
      });
    },
    hideAnimated() {
      this.visible = false;
      document.body.classList.remove('body--forest');

      anime({
        targets: this.$refs.card,
        translateY: this.cardOffScreen(),
        opacity: 0,
        easing: 'easeOutSine',
        duration: 700,
      });
    },
    adjustAnimated(offset) {
      anime({
        targets: this.$refs.card,
        translateY: this.cardMovement(offset),
        duration: 100,
      });
    },
    cardOffScreen() {
      return (getClientHeight(this.$refs.card) + 50);
    },
    cardMovement(offset) {
      return -1 * (offset * (getClientHeight(this.$refs.card) - this.viewHeight));
    },
  },
};
</script>

<style lang="scss">
  @import "./forestSection.scss";
</style>
