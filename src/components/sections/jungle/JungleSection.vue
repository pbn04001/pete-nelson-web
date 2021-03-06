<template>
  <div ref="section" class="section jungle">
    <h1 ref="title" class="jungle__title">Logo Designer</h1>
    <div ref="card" class="jungle__card">
      <div ref="image1" class="jungle__card_inside" v-if="renderImages">
        <picture>
          <img
            sizes="(max-width: 2960px) 100vw, 2960px"
            srcset="
              /img/logos/spacecake/SpaceCake_Productions_Logo_qib821_c_scale_w_200.png 200w,
              /img/logos/spacecake/SpaceCake_Productions_Logo_qib821_c_scale_w_1206.png 1206w,
              /img/logos/spacecake/SpaceCake_Productions_Logo_qib821_c_scale_w_1852.png 1852w,
              /img/logos/spacecake/SpaceCake_Productions_Logo_qib821_c_scale_w_2503.png 2503w,
              /img/logos/spacecake/SpaceCake_Productions_Logo_qib821_c_scale_w_2960.png 2960w"
            src="/img/logos/spacecake/SpaceCake_Productions_Logo_qib821_c_scale_w_2960.png"
            alt="SpaceCake Productions Logo">
        </picture>
      </div>
      <div ref="image2" class="jungle__card_inside no-back-mobile" v-if="renderImages">
        <picture>
          <img
            class="no-border"
            sizes="(max-width: 1720px) 100vw, 1720px"
            srcset="
              /img/logos/blucifer/Blucifer_Logo_ylhfmr_c_scale_w_200.png 200w,
              /img/logos/blucifer/Blucifer_Logo_ylhfmr_c_scale_w_592.png 592w,
              /img/logos/blucifer/Blucifer_Logo_ylhfmr_c_scale_w_871.png 871w,
              /img/logos/blucifer/Blucifer_Logo_ylhfmr_c_scale_w_1119.png 1119w,
              /img/logos/blucifer/Blucifer_Logo_ylhfmr_c_scale_w_1720.png 1720w"
            src="/img/logos/blucifer/Blucifer_Logo_ylhfmr_c_scale_w_1720.png"
            alt="Blucifer Team Sticker">
        </picture>
      </div>
      <div ref="image3" class="jungle__card_inside no-back-mobile" v-if="renderImages">
        <picture>
          <img
            class="no-border"
            sizes="(max-width: 2960px) 100vw, 2960px"
            srcset="
              /img/logos/slumgullion/slumgullion_sticker_wsqxgb_c_scale_w_200.png 200w,
              /img/logos/slumgullion/slumgullion_sticker_wsqxgb_c_scale_w_556.png 556w,
              /img/logos/slumgullion/slumgullion_sticker_wsqxgb_c_scale_w_824.png 824w,
              /img/logos/slumgullion/slumgullion_sticker_wsqxgb_c_scale_w_1100.png 1100w,
              /img/logos/slumgullion/slumgullion_sticker_wsqxgb_c_scale_w_1348.png 1348w,
              /img/logos/slumgullion/slumgullion_sticker_wsqxgb_c_scale_w_1596.png 1596w,
              /img/logos/slumgullion/slumgullion_sticker_wsqxgb_c_scale_w_1809.png 1809w,
              /img/logos/slumgullion/slumgullion_sticker_wsqxgb_c_scale_w_2025.png 2025w,
              /img/logos/slumgullion/slumgullion_sticker_wsqxgb_c_scale_w_2223.png 2223w,
              /img/logos/slumgullion/slumgullion_sticker_wsqxgb_c_scale_w_2960.png 2960w"
            src="/img/logos/slumgullion/slumgullion_sticker_wsqxgb_c_scale_w_2960.png"
            alt="Slumgullion Team Sticker">
        </picture>

      </div>
    </div>
    <img src="/assets/images/jungle_back_1.svg" ref="jungleBack1" class="jungle__back jungle__back--1" />
    <img src="/assets/images/jungle_back_2.svg" ref="jungleBack2" class="jungle__back jungle__back--2" />
    <img src="/assets/images/jungle_trees.svg" ref="jungleTrees" class="jungle__trees" />
    <img src="/assets/images/jungle_leaves.svg" ref="jungleLeaves" class="jungle__leaves" />
  </div>
</template>

<script>
import anime from 'animejs';
import {
  delayAnimationCheckVisible,
  delayActionCheckVisible,
  hideSectionAfterAnimation,
} from '@/utils/animation';
import { getClientHeight } from '@/utils/sizes';

export default {
  name: 'JungleSection',
  components: {
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
      return 5;
    },
    getBodyClass() {
      return 'jungle';
    },
    reset(visible = true) {
      this.visible = visible;

      this.hideCard();
      this.$refs.title.style.transform = `translateY(${visible ? 0 : this.titleOffScreen()}px)`;
      this.$refs.jungleBack1.style.transform = `translateY(${visible ? 0 : this.jungleBack1Offscreen()}px)`;
      this.$refs.jungleBack2.style.transform = `translateY(${visible ? 0 : this.jungleBack2Offscreen()}px)`;
      this.$refs.jungleTrees.style.transform = `translateY(${visible ? 0 : this.jungleTreesOffscreen()}px)`;
      this.$refs.jungleLeaves.style.transform = `translateY(${visible ? 0 : this.jungleLeavesOffscreen()}px)`;
      this.$refs.section.style.display = visible ? 'block' : 'none';
    },
    showAssets() {
      this.renderImages = true;
    },
    showAnimated(offset) {
      this.renderImages = true;
      this.visible = true;
      this.showing = true;
      this.offset = offset;
      this.$refs.section.style.display = 'block';

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

        hideSectionAfterAnimation(500, this);
      });
    },
    hideAnimated() {
      this.visible = false;

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
        if (offset < 0.3) {
          this.swapImages(this.$refs.image1);
        } else if (offset < 0.7) {
          this.swapImages(this.$refs.image2);
        } else {
          this.swapImages(this.$refs.image3);
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
