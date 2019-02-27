<template>
  <div ref="section" class="section developer">
    <h3>Section 1</h3>
    <SunSVG ref="sun" class="developer__sun"/>
  </div>
</template>

<script>
import anime from 'animejs';
import SunSVG from '@/assets/images/sun.svg';

export default {
  name: 'DeveloperSection',
  components: {
    SunSVG,
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
      this.$refs.sun.style.translateY = this.sunOffScreen();
      this.$refs.section.style.visibility = 'hidden';
    },
    showAnimated(offset) {
      console.log('show', offset);
      this.$refs.section.style.visibility = 'visible';
      this.visible = true;
      anime({
        targets: this.$refs.sun,
        translateY: this.sunMovement(offset),
      });
    },
    hideAnimated() {
      console.log('hide')
      this.visible = false;
      anime({
        targets: this.$refs.sun,
        translateY: this.sunOffScreen(),
      }).finished.then(() => {
        if (!this.visible) {
          this.$refs.section.style.visibility = 'hidden';
        }
      });
    },
    adjustAnimated(offset) {
      console.log('adjust', offset);
      anime({
        targets: this.$refs.sun,
        translateY: this.sunMovement(offset),
      });
    },
    sunOffScreen() {
      return (-1 * (this.$refs.sun.clientHeight + (this.viewHeight * 0.05) + 50));
    },
    sunMovement(offset) {
      return offset * (this.viewHeight / 15);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "@/styles/_globals.scss";
  .developer {
    &__sun {
      position: absolute;
      width: 10%;
      right: 10%;
      top: 5%;

      & path {
        fill: yellow;
      }
    }
  }
</style>
