<template>
  <div ref="section" class="section intro">
    <div ref="introCard" class="intro__card">
      <h1><PeteNelson ref="peteNelson" class="intro__pete-nelson"/></h1>
      <div ref="introCardSub" class="intro__card_sub">
        <hr class="intro__card_bar" />
        <h3 class="intro__card_text">Experienced Web Developer & Designer</h3>
      </div>
    </div>
    <img src="/assets/images/cloud_1.svg" ref="cloud1" class="intro__cloud intro__cloud--1"/>
    <img src="/assets/images/cloud_2.svg" ref="cloud2" class="intro__cloud intro__cloud--2"/>
    <img src="/assets/images/moon.svg" ref="moon" class="intro__moon"/>
    <img src="/assets/images/moon_back.svg" ref="moon_back" class="intro__moon_back"/>
    <img src="/assets/images/skyline_1.svg" ref="skyLine1" class="intro__sky_line intro__sky_line--1"/>
    <img src="/assets/images/skyline_2.svg" ref="skyLine2" class="intro__sky_line intro__sky_line--2"/>
    <img src="/assets/images/skyline_3.svg" ref="skyLine3" class="intro__sky_line intro__sky_line--3"/>
  </div>
</template>

<script>
import anime from 'animejs';
import { getClientHeight, getClientWidth } from '@/utils/sizes';
import {
  delayAnimationCheckVisible,
  delayActionCheckVisible,
  hideSectionAfterAnimation,
} from '@/utils/animation';
import PeteNelson from '@/assets/images/pete_nelson.vue';

export default {
  name: 'IntroSection',
  props: {
    viewHeight: {
      type: Number,
      required: true,
    },
  },
  components: {
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
      return new Promise((resolve) => {
        if (!this.visible) {
          this.showAnimated(top ? 0 : 1, false)
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
      return new Promise((resolve) => {
        this.showAnimated(0, true)
          .then(resolve);
      });
    },
    getHash() {
      return 'intro';
    },
    getSize() {
      return 1;
    },
    getBodyClass() {
      return 'intro';
    },
    reset(visible = true) {
      this.visible = visible;
      this.$refs.introCard.style.transform = `translateX(${visible ? 0 : this.introCardOffScreen()}px)`;
      this.$refs.skyLine1.style.transform = `translateY(${visible ? 0 : this.skyLine1OffScreen()}px)`;
      this.$refs.skyLine2.style.transform = `translateY(${visible ? 0 : this.skyLine2OffScreen()}px)`;
      this.$refs.skyLine3.style.transform = `translateY(${visible ? 0 : this.skyLine3OffScreen()}px)`;
      this.$refs.moon.style.transform = `translateY(${visible ? 0 : this.moonOffScreen()}px)`;
      this.$refs.cloud1.style.transform = `translateY(${visible ? 0 : this.cloud1OffScreen()}px)`;
      this.$refs.cloud2.style.transform = `translateY(${visible ? 0 : this.cloud2OffScreen()}px)`;
      this.$refs.section.style.display = visible ? 'block' : 'none';
    },
    showAssets() {},
    showAnimated(offset, firstLoad) {
      this.visible = true;
      this.showing = true;
      this.$refs.section.style.display = 'block';

      return new Promise((resolve) => {
        if (firstLoad) {
          this.animatePeteNelson();
          setTimeout(() => {
            this.showRemainingAnimated(offset)
              .then(resolve);
          }, 700);
        } else {
          this.$refs.introCardSub.classList.add('intro__card_sub--show');
          anime({
            targets: this.$refs.introCard,
            translateX: 0,
            easing: 'easeOutSine',
            duration: 400,
          });
          this.showRemainingAnimated(offset)
            .then(resolve);
        }
      });
    },
    showRemainingAnimated(offset) {
      return new Promise((resolve) => {
        this.$refs.moon_back.classList.remove('intro__moon_back--hide');
        delayActionCheckVisible(() => {
          this.$refs.moon_back.classList.add('intro__moon_back--show');
        }, 300, this, true);

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
        })
          .finished
          .then(() => {
            this.showing = false;
            resolve();
          });
      });
    },
    hideAnimated() {
      this.visible = false;
      this.$refs.moon_back.classList.remove('intro__moon_back--show');
      this.$refs.moon_back.classList.add('intro__moon_back--hide');

      anime({
        targets: this.$refs.introCard,
        translateX: this.introCardOffScreen(),
        easing: 'easeOutSine',
        duration: 400,
      });

      delayAnimationCheckVisible({
        targets: this.$refs.moon,
        translateY: this.moonOffScreen(),
        easing: 'easeInOutSine',
        duration: 400,
      }, 300, this, false);

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
      });
      anime({
        targets: this.$refs.skyLine1,
        translateY: this.skyLine1OffScreen(),
        easing: 'easeInOutSine',
        duration: 400,
      });

      delayAnimationCheckVisible({
        targets: this.$refs.skyLine2,
        translateY: this.skyLine2OffScreen(),
        easing: 'easeInOutSine',
        duration: 400,
      }, 75, this, false);

      delayAnimationCheckVisible({
        targets: this.$refs.skyLine3,
        translateY: this.skyLine3OffScreen(),
        easing: 'easeInOutSine',
        duration: 400,
      }, 150, this, false);

      hideSectionAfterAnimation(1000, this);
    },
    adjustAnimated(offset) {
      if (this.showing || !this.visible) return;

      this.$refs.cloud1.style.transform = `translateY(${this.cloud1Movement(offset)}px)`;
      this.$refs.cloud2.style.transform = `translateY(${this.cloud2Movement(offset)}px)`;
      this.$refs.skyLine1.style.transform = `translateY(${this.skyLine1Movement(offset)}px)`;
      this.$refs.skyLine2.style.transform = `translateY(${this.skyLine2Movement(offset)}px)`;
      this.$refs.skyLine3.style.transform = `translateY(${this.skyLine3Movement(offset)}px)`;
    },
    animatePeteNelson() {
      this.$refs.introCard.style.transform = 'translateX(0px)';
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
        delay: 500,
        duration: 150,
      });
      anime({
        targets: document.getElementById('name-n2'),
        direction: 'normal',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        delay: 650,
        duration: 200,
      });
      anime({
        targets: document.getElementById('name-n3'),
        direction: 'normal',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        delay: 850,
        duration: 150,
      });
      anime({
        targets: document.getElementById('name-mask-rectangle'),
        width: ['0%', '100%'],
        easing: 'easeInOutSine',
        delay: 1000,
        duration: 500,
      });

      delayActionCheckVisible(() => {
        this.$refs.introCardSub.classList.add('intro__card_sub--show');
      }, 1000, this, true);
    },
    skyLine1OffScreen() {
      return getClientHeight(this.$refs.skyLine1) + 50;
    },
    skyLine2OffScreen() {
      return getClientHeight(this.$refs.skyLine2) + 50;
    },
    skyLine3OffScreen() {
      return getClientHeight(this.$refs.skyLine3) + 50;
    },
    moonOffScreen() {
      return -1 * ((this.viewHeight * 0.10) + getClientHeight(this.$refs.moon) + 50);
    },
    cloud1OffScreen() {
      return -1 * ((this.viewHeight * 0.025) + getClientHeight(this.$refs.cloud1) + 50);
    },
    cloud2OffScreen() {
      return -1 * ((this.viewHeight * 0.19) + getClientHeight(this.$refs.cloud2) + 50);
    },
    introCardOffScreen() {
      return -1 * (128 + getClientWidth(this.$refs.introCard));
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

<style lang="scss">
  @import "./introSection.scss";
</style>
