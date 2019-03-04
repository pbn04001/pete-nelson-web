<template>
  <div ref="section" class="section mountains">
    <div ref="card" class="mountains__card">
      <h1 class="mountains__title" >Developer</h1>
      <div ref="cardSub" class="mountains__card_sub">
        Experienced web developer with over 19 years of professional experience.  Full stack javascript developer
        with a focus on UI development.  Have worked with most major frameworks such as React, VUE and Angular.
        Advanced CSS knowledge with experience creating pixel perfect designs that are both responsive and cross browser compatible.
        Extensive backend knowledge from Node to Java.
      </div>
    </div>
    <Mountains1 ref="mountains1" class="mountains__mountains mountains__mountains--1" />
    <Mountains2 ref="mountains2" class="mountains__mountains mountains__mountains--2" />
    <Clouds ref="clouds" class="mountains__clouds" />
  </div>
</template>

<script>
import anime from 'animejs';
import { delayAnimationCheckVisible } from '@/utils/animation';
import { getClientHeight } from '@/utils/sizes';
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
      return 'developer';
    },
    reset(visible = true) {
      this.visible = visible;

      this.$refs.card.style.opacity = visible ? 1 : 0;
      this.$refs.card.style.transform = `translateY(${visible ? 0 : this.cardOffScreen()}px)`;
      this.$refs.mountains1.style.transform = `translateY(${visible ? 0 : this.mountains1Offscreen()}px)`;
      this.$refs.mountains2.style.transform = `translateY(${visible ? 0 : this.mountains2Offscreen()}px)`;
      this.$refs.clouds.style.transform = `translateY(${visible ? 0 : this.cloudsOffscreen()}px)`;
    },
    showAnimated(offset) {
      this.visible = true;
      this.showing = true;
      document.body.classList.add('body--mountains');

      return new Promise((resolve) => {
        anime({
          targets: this.$refs.card,
          translateY: 0,
          opacity: 1,
          easing: 'easeOutSine',
          duration: 700,
        });

        anime({
          targets: this.$refs.clouds,
          translateY: 0,
          easing: 'easeOutSine',
          opacity: 1,
          duration: 700,
        });

        delayAnimationCheckVisible({
          targets: this.$refs.mountains2,
          translateY: this.mountains2Movement(offset),
          easing: 'easeOutSine',
          duration: 500,
        }, 200, this);

        delayAnimationCheckVisible({
          targets: this.$refs.mountains1,
          translateY: this.mountains1Movement(offset),
          easing: 'easeOutSine',
          duration: 300,
        }, 200, this)
          .then(() => {
            this.showing = false;
            resolve();
          });
      });
    },
    hideAnimated() {
      this.visible = false;
      document.body.classList.remove('body--mountains');

      anime({
        targets: this.$refs.card,
        translateY: this.cardOffScreen(),
        opacity: 0,
        easing: 'easeOutSine',
        duration: 700,
      });

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
        targets: this.$refs.mountains2,
        translateY: this.mountains2Movement(offset),
        duration: 200,
      });
      anime({
        targets: this.$refs.mountains1,
        translateY: this.mountains1Movement(offset),
        duration: 200,
      });
    },
    mountains1Offscreen() {
      return getClientHeight(this.$refs.mountains1);
    },
    mountains2Offscreen() {
      return getClientHeight(this.$refs.mountains2);
    },
    cloudsOffscreen() {
      return getClientHeight(this.$refs.clouds);
    },
    cardOffScreen() {
      return -1 * (getClientHeight(this.$refs.card) + 100);
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

<style scoped lang="scss">
  @import "./mountainsSection.scss";
</style>
