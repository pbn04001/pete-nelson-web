<template>
  <div ref="section" class="section jungle">
    <h1 ref="title" class="jungle__title">Logo Designer</h1>
    <div ref="card" class="jungle__card">
      <div ref="image1" class="jungle__card_inside" v-if="renderImages">
        <img src="/img/spacecake/website/spacecake-web-large.png" />
      </div>
      <div ref="image2" class="jungle__card_inside" v-if="renderImages">
        <img src="/img/highberry/website/highberry-web-large.jpg" />
      </div>
    </div>
    <JungleBack1 ref="jungleBack1" class="jungle__back jungle__back--1" />
    <JungleBack2 ref="jungleBack2" class="jungle__back jungle__back--2" />
    <JungleTrees ref="jungleTrees" class="jungle__trees" />
    <img src="/img/scene/jungle_leaves.svg" ref="jungleLeaves" class="jungle__leaves" />
  </div>
</template>

<script>
import anime from 'animejs';
import { delayAnimationCheckVisible, delayActionCheckVisible } from '@/utils/animation';
import { getClientHeight } from '@/utils/sizes';

// Scenery
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
      renderImages: false,
      offset: null,
      currentImage: null,
      triggerShowImages: null,
    };
  },
  updated() {
    if (this.triggerShowImages !== null) {
      this.showImage(this.offset);
      this.triggerShowImages = null;
    }
  },
  watch: {
    renderImages: {
      handler(newValue, oldValue) {
        if (newValue && !oldValue) {
          this.triggerShowImages = this.offset;
        }
      },
    },
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
      return 'logo-design';
    },
    getSize() {
      return 2;
    },
    reset(visible = true) {
      this.visible = visible;

      this.hideCard();
      this.$refs.title.style.transform = `translateY(${visible ? 0 : this.titleOffScreen()}px)`;
      this.$refs.jungleBack1.style.transform = `translateY(${visible ? 0 : this.jungleBack1Offscreen()}px)`;
      this.$refs.jungleBack2.style.transform = `translateY(${visible ? 0 : this.jungleBack2Offscreen()}px)`;
      this.$refs.jungleTrees.style.transform = `translateY(${visible ? 0 : this.jungleTreesOffscreen()}px)`;
      this.$refs.jungleLeaves.style.transform = `translateY(${visible ? 0 : this.jungleLeavesOffscreen()}px)`;
    },
    showAssets() {
      this.renderImages = true;
    },
    showAnimated(offset) {
      this.renderImages = true;
      this.visible = true;
      this.showing = true;
      this.offset = offset;
      document.body.classList.add('body--jungle');

      delayActionCheckVisible(() => {
        this.showCard();
      }, 600, this, true);

      this.showImage(offset);

      return new Promise((resolve) => {
        anime({
          targets: this.$refs.title,
          translateY: 0,
          easing: 'easeOutSine',
          duration: 500,
        });

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

      this.hideCard();

      anime({
        targets: this.$refs.title,
        translateY: this.titleOffScreen(),
        easing: 'easeOutSine',
        duration: 500,
      });

      anime({
        targets: this.$refs.jungleLeaves,
        translateY: this.jungleLeavesOffscreen(),
        easing: 'easeOutSine',
        duration: 500,
      });

      anime({
        targets: this.$refs.jungleTrees,
        translateY: this.jungleTreesOffscreen(),
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

      this.showImage(offset);
      this.$refs.jungleBack1.style.transform = `translateY(${this.jungleBack1Movement(offset)}px)`;
      this.$refs.jungleBack2.style.transform = `translateY(${this.jungleBack2Movement(offset)}px)`;
      this.$refs.jungleTrees.style.transform = `translateY(${this.jungleTreesMovement(offset)}px)`;
      this.$refs.jungleLeaves.style.transform = `translateY(${this.jungleLeavesMovement(offset)}px)`;
    },
    showImage(offset) {
      if (this.$refs.image1) {
        if (offset < 0.5) {
          this.swapImages(this.$refs.image1);
        } else {
          this.swapImages(this.$refs.image2);
        }
      }
    },
    swapImages(newImage) {
      const { currentImage } = this;
      if (currentImage === newImage) return;
      if (currentImage) {
        currentImage.classList.remove('jungle__card_inside--show');
        currentImage.classList.add('jungle__card_inside--hide');
      }
      newImage.classList.remove('jungle__card_inside--hide');
      newImage.classList.add('jungle__card_inside--show');
      this.currentImage = newImage;
    },
    cardOffScreen() {
      return (getClientHeight(this.$refs.card) + 50);
    },
    showCard() {
      this.$refs.card.classList.add('jungle__card--show');
      this.$refs.card.classList.remove('jungle__card--hide');
    },
    hideCard() {
      this.$refs.card.classList.add('jungle__card--hide');
      this.$refs.card.classList.remove('jungle__card--show');
    },
    titleOffScreen() {
      return -1 * ((this.viewHeight * 0.10) + getClientHeight(this.$refs.title) + 50);
    },
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
