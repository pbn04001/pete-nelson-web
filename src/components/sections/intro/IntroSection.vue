<template>
  <div ref="section" class="section intro">
    <div ref="introCard" class="intro__card">
      <h1><PeteNelson ref="peteNelson" class="intro__pete-nelson"/></h1>
      <div ref="introCardSub" class="intro__card_sub">
        <hr class="intro__card_bar" />
        <span class="intro__card_text">Developer & Designer</span>
      </div>
    </div>
    <Cloud1 ref="cloud1" class="intro__cloud intro__cloud--1"/>
    <Cloud2 ref="cloud2" class="intro__cloud intro__cloud--2"/>
    <Moon ref="moon" class="intro__moon"/>
    <MoonBack ref="moon_back" class="intro__moon_back"/>
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
import Moon from '@/assets/images/moon.svg';
import MoonBack from '@/assets/images/moon_back.svg';
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
    Moon,
    MoonBack,
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
      if (this.visible && !this.showing) {
        this.adjustAnimated(offset);
      }
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
    reset(visible = true) {
      if (visible && !this.visible) {
        this.$refs.moon_back.classList.remove('intro__moon_back--hide');
        this.$refs.moon_back.classList.add('intro__moon_back--show');
      } else if (!visible && this.visible) {
        this.$refs.moon_back.classList.add('intro__moon_back--hide');
        this.$refs.moon_back.classList.remove('intro__moon_back--show');
      }

      this.$refs.introCard.style.transform = `translateX(${visible ? 0 : this.introCardOffScreen()}px)`;
      this.$refs.skyLine1.style.transform = `translateY(${visible ? 0 : this.skyLine1OffScreen()}px)`;
      this.$refs.skyLine2.style.transform = `translateY(${visible ? 0 : this.skyLine2OffScreen()}px)`;
      this.$refs.skyLine3.style.transform = `translateY(${visible ? 0 : this.skyLine3OffScreen()}px)`;
      this.$refs.moon.style.transform = `translateY(${visible ? 0 : this.moonOffScreen()}px)`;
      this.$refs.cloud1.style.transform = `translateY(${visible ? 0 : this.cloud1OffScreen()}px)`;
      this.$refs.cloud2.style.transform = `translateY(${visible ? 0 : this.cloud2OffScreen()}px)`;
      this.visible = visible;
    },
    showAnimated(offset, firstLoad) {
      this.visible = true;
      this.showing = true;
      document.body.classList.add('body--intro');

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
      document.body.classList.remove('body--intro');

      anime({
        targets: this.$refs.introCard,
        translateX: this.introCardOffScreen(),
        easing: 'easeOutSine',
        duration: 400,
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
        duration: 200,
      });

      anime({
        targets: this.$refs.cloud2,
        translateY: this.cloud2Movement(offset),
        duration: 200,
      });

      anime({
        targets: this.$refs.skyLine1,
        translateY: this.skyLine1Movement(offset),
        duration: 200,
      });

      anime({
        targets: this.$refs.skyLine2,
        translateY: this.skyLine2Movement(offset),
        duration: 200,
      });

      anime({
        targets: this.$refs.skyLine3,
        translateY: this.skyLine3Movement(offset),
        duration: 200,
      });
    },
    animatePeteNelson() {
      this.$refs.introCard.style.transform = `translateX(0px)`;
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
      setTimeout(() => {
        this.$refs.introCardSub.classList.add('intro__card_sub--show');
      }, 1000);
    },
    skyLine1OffScreen() {
      return (this.$refs.skyLine1.clientHeight || this.$refs.skyLine1.parentNode.clientHeight) + 50;
    },
    skyLine2OffScreen() {
      return (this.$refs.skyLine2.clientHeight || this.$refs.skyLine2.parentNode.clientHeight) + 50;
    },
    skyLine3OffScreen() {
      return (this.$refs.skyLine3.clientHeight || this.$refs.skyLine3.parentNode.clientHeight) + 50;
    },
    moonOffScreen() {
      return -1 * ((this.viewHeight * 0.10) + (this.$refs.moon.clientHeight || this.$refs.moon.parentNode.clientHeight) + 50);
    },
    cloud1OffScreen() {
      return -1 * ((this.$refs.moon.clientHeight || this.$refs.moon.parentNode.clientHeight) + 100);
    },
    cloud2OffScreen() {
      return -1 * ((this.viewHeight * 0.19) + (this.$refs.moon.clientHeight || this.$refs.moon.parentNode.clientHeight) + 50);
    },
    introCardOffScreen() {
      return -1 * (128 + (this.$refs.introCard.clientWidth || this.$refs.introCard.parentNode.clientWidth));
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

<style scoped lang="scss">
  @import "./introSection.scss";
</style>
