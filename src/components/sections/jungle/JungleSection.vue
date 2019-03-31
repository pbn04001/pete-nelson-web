<template>
  <div ref="section" class="section jungle">
    <JungleBack1 ref="jungleBack1" class="jungle__back jungle__back--1" />
    <JungleBack2 ref="jungleBack2" class="jungle__back jungle__back--2" />
    <JungleTrees ref="jungleTrees" class="jungle__trees" />
    <img src="/img/scene/jungle_leaves.svg" ref="jungleLeaves" class="jungle__leaves" />
  </div>
</template>

<script>
import anime from 'animejs';
import { delayAnimationCheckVisible } from '@/utils/animation';
import { getClientHeight } from '@/utils/sizes';
import JungleBack1 from '@/assets/images/jungle_back_1.svg';
import JungleBack2 from '@/assets/images/jungle_back_2.svg';
import JungleTrees from '@/assets/images/jungle_trees.svg';

export default {
  name: 'JungleSection',
  components: {
    JungleBack1,
    JungleBack2,
    JungleTrees,
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
      return 'artist';
    },
    getSize() {
      return 2;
    },
    reset(visible = true) {
      this.visible = visible;

      //this.$refs.card.style.opacity = visible ? 1 : 0;
      //this.$refs.card.style.transform = `translateY(${visible ? 0 : this.cardOffScreen()}px)`;
      this.$refs.jungleBack1.style.transform = `translateY(${visible ? 0 : this.jungleBack1Offscreen()}px)`;
      this.$refs.jungleBack2.style.transform = `translateY(${visible ? 0 : this.jungleBack2Offscreen()}px)`;
      this.$refs.jungleTrees.style.transform = `translateY(${visible ? 0 : this.jungleTreesOffscreen()}px)`;
      this.$refs.jungleLeaves.style.transform = `translateY(${visible ? 0 : this.jungleLeavesOffscreen()}px)`;
    },
    showAssets() {},
    showAnimated(offset) {
      this.visible = true;
      this.showing = true;
      document.body.classList.add('body--jungle');

      return new Promise((resolve) => {
        /*anime({
          targets: this.$refs.card,
          translateY: this.cardMovement(offset),
          easing: 'easeOutSine',
          duration: 800,
        });
        delayAnimationCheckVisible({
          targets: this.$refs.card,
          opacity: 1,
          easing: 'easeOutSine',
          duration: 500,
        }, 300, this, true);*/

        /*anime({
          targets: this.$refs.clouds,
          translateY: 0,
          easing: 'easeOutSine',
          opacity: 1,
          duration: 700,
        });*/

        anime({
          targets: this.$refs.jungleLeaves,
          translateY: this.jungleLeavesMovement(offset),
          easing: 'easeOutSine',
          duration: 500,
        });

        anime({
          targets: this.$refs.jungleTrees,
          translateY: this.jungleTreesMovement(offset),
          easing: 'easeOutSine',
          duration: 500,
        });

        delayAnimationCheckVisible({
          targets: this.$refs.jungleBack1,
          translateY: this.jungleBack1Movement(offset),
          easing: 'easeOutSine',
          duration: 500,
        }, 200, this, true);

        delayAnimationCheckVisible({
          targets: this.$refs.jungleBack2,
          translateY: this.jungleBack2Movement(offset),
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
      document.body.classList.remove('body--jungle');

      /*anime({
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
      });*/

      anime({
        targets: this.$refs.jungleLeaves,
        translateY: this.jungleLeavesOffscreen(),
        easing: 'easeOutSine',
        duration: 500,
      });

      anime({
        targets: this.$refs.jungleTrees,
        translateY: this.jungleTreesOffscreen(offset),
        easing: 'easeOutSine',
        duration: 500,
      });

      anime({
        targets: this.$refs.jungleBack1,
        translateY: this.jungleBack1Offscreen(),
        easing: 'easeInOutSine',
        duration: 500,
      });

      anime({
        targets: this.$refs.jungleBack2,
        translateY: this.jungleBack2Offscreen(),
        easing: 'easeInOutSine',
        duration: 300,
      });
    },
    adjustAnimated(offset) {
      if (this.showing || !this.visible) return;

      //this.$refs.card.style.transform = `translateY(${this.cardMovement(offset)}px)`;
      this.$refs.jungleBack1.style.transform = `translateY(${this.jungleBack1Movement(offset)}px)`;
      this.$refs.jungleBack2.style.transform = `translateY(${this.jungleBack2Movement(offset)}px)`;
      this.$refs.jungleTrees.style.transform = `translateY(${this.jungleTreesMovement(offset)}px)`;
      this.$refs.jungleLeaves.style.transform = `translateY(${this.jungleLeavesMovement(offset)}px)`;
    },
    /*cardMovement(offset) {
      return -1 * (offset * (getClientHeight(this.$refs.card) - this.viewHeight));
    },*/
    jungleBack1Offscreen() {
      return getClientHeight(this.$refs.jungleBack1);
    },
    jungleBack2Offscreen() {
      return getClientHeight(this.$refs.jungleBack2);
    },
    jungleTreesOffscreen() {
      return getClientHeight(this.$refs.jungleTrees);
    },
    jungleLeavesOffscreen() {
      return getClientHeight(this.$refs.jungleLeaves);
    },
    jungleBack1Movement(offset) {
      return offset * (this.viewHeight / 40);
    },
    jungleBack2Movement(offset) {
      return offset * (this.viewHeight / 30);
    },
    jungleTreesMovement(offset) {
      return offset * (this.viewHeight / 25);
    },
    jungleLeavesMovement(offset) {
      return offset * (this.viewHeight / 20);
    },
  },
};
</script>

<style lang="scss">
  @import "./jungleSection.scss";
</style>
