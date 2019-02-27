<template>
  <div ref="section" class="section intro">
    <h3>Section 1</h3>
    <MountainsSVG ref="mountains" class="intro__mountains"/>
  </div>
</template>

<script>
import anime from 'animejs';
import MountainsSVG from '@/assets/images/mountains.svg';

export default {
  name: 'IntroSection',
  props: {
    viewHeight: {
      type: Number,
      required: true,
    },
  },
  components: {
    MountainsSVG,
  },
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    hide() {
      if (this.visible) {
        this.hideAnimated();
      }
    },
    show(top) {
      if (!this.visible) {
        this.showAnimated(top ? 0 : 1);
      }
    },
    adjust(offset) {
      this.adjustAnimated(offset);
    },
    reset() {
      this.visible = false;
      this.$refs.mountains.style.translateY = this.mountainsOffScreen();
      this.$refs.section.style.visibility = 'hidden';
    },
    showAnimated(offset) {
      this.$refs.section.style.visibility = 'visible';
      this.visible = true;
      anime({
        targets: this.$refs.mountains,
        translateY: this.mountainMovement(offset),
      });
    },
    hideAnimated() {
      this.visible = false;
      anime({
        targets: this.$refs.mountains,
        translateY: this.mountainsOffScreen(),
      }).finished.then(() => {
        if (!this.visible) {
          this.$refs.section.style.visibility = 'hidden';
        }
      });
    },
    adjustAnimated(offset) {
      anime({
        targets: this.$refs.mountains,
        translateY: this.mountainMovement(offset),
      });
    },
    mountainsOffScreen() {
      return this.$refs.mountains.clientHeight + 50;
    },
    mountainMovement(offset) {
      return offset * (this.viewHeight / 5);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "@/styles/_globals.scss";
  .intro {
    &__mountains {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 60%;

      & path {
        fill: black;
      }
    }
  }
</style>
