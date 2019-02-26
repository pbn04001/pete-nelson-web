<template>
  <div class="one-page-scroll" ref="pageScroll">
    <div class="section intro">
      <h3>Section 1</h3>
      <MountainsSVG ref="introMountains" class="intro__mountains"/>
    </div>
    <div class="section next">
      <h3>Section 2</h3>
      <SunSVG ref="nextSun" class="next__sun" />
    </div>
    <div class="section third">
      <h3>Section 3</h3>
    </div>
  </div>
</template>

<script>
import anime from 'animejs';
import MountainsSVG from '../assets/images/mountains.svg';
import SunSVG from '../assets/images/sun.svg';

export default {
  name: 'HomeScrollCustom',
  components: {
    MountainsSVG,
    SunSVG,
  },
  data() {
    return {
      currentSection: 1,
      introVisible: false,
      nextVisible: false,
    };
  },
  mounted() {
    this.sections = this.$refs.pageScroll.querySelectorAll('.section');
    this.sections.forEach((section, index) => {
      if (index + 1 !== this.currentSection) {
        this.hideSection(index);
      }
    });
    this.$refs.pageScroll.style.height = 'auto';
    this.calculatePositions();
    this.showIntroBackground(true);
    this.onScroll = window.addEventListener('scroll', this.onScroll);
  },
  methods: {
    getViewHeight() {
      return window.innerHeight;
    },
    calculatePositions() {
      this.$refs.pageScroll.style.height = `${this.sections.length * this.getViewHeight()}px`;
    },
    calculatePosition() {
      const offset = window.pageYOffset / this.getViewHeight();
      let section = Math.ceil(offset) || 1;
      if (section > this.sections.length) {
        section = this.sections.length;
      }
      this.currentSection = section;
      return {
        section,
        offset: (offset % 1),
      };
    },
    performAnimations(lastSection, position) {
      switch (position.section) {
        case 1:
          if (lastSection !== 1) {
            this.showIntroBackground(false);
          }
          if (lastSection === 2 && this.nextVisible) {
            this.hideNextBackground()
          }
          if (position.offset > 0.5) {
            anime({
              targets: this.$refs.introMountains,
              translateY: (position.offset - 0.5) * 200,
            });
          }
          break;
        case 2:
          if (lastSection !== 2) {
            this.showNextBackground();
          }
          if (lastSection === 1 && this.introVisible) {
            this.hideIntroBackground();
          }
          break;
        default:
          console.log('No animation');
      }
    },
    onScroll() {
      const section = this.currentSection;
      const position = this.calculatePosition();
      this.performAnimations(section, position);
    },
    hideSection(section) {
      switch (section) {
        case 0:
          this.$refs.nextSun.style.translateY = (-1 * (this.$refs.nextSun.clientHeight + (window.innerHeight * 0.05) + 50));
          break;
        case 1:
          this.hideNextBackground();
          break;
        default:
          break;
      }
    },
    showIntroBackground(top) {
      //this.sections[0].style.visibility = 'visible';
      this.introVisible = true;
      anime({
        targets: this.$refs.introMountains,
        translateY: top ? 0 : 100,
      });
    },
    hideIntroBackground() {
      this.introVisible = false;
      anime({
        targets: this.$refs.introMountains,
        translateY: this.$refs.introMountains.clientHeight + 50,
      }).finished.then(() => {
        if (!this.introVisible) {
          //this.sections[0].style.visibility = 'hidden';
        }
      });
    },
    showNextBackground() {
      console.log('show next background');
      //this.sections[1].style.visibility = 'visible';
      this.nextVisible = true;
      anime({
        targets: this.$refs.nextSun,
        translateY: 0,
      });
    },
    hideNextBackground() {
      console.log('hide next background', (-1 * (this.$refs.nextSun.clientHeight + (window.innerHeight * 0.05) + 50)));
      this.nextVisible = false;
      anime({
        targets: this.$refs.nextSun,
        translateY: (-1 * (this.$refs.nextSun.clientHeight + (window.innerHeight * 0.05) + 50)),
      }).finished.then(() => {
        if (!this.nextVisible) {
          //this.sections[1].style.visibility = 'hidden';
        }
      });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "@/styles/_globals.scss";
  .one-page-scroll {
    background-color: darkgray;
    height: 0;
    overflow: hidden;
  }
  .section {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
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
  .next {
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
  .third {

  }
  .fourth {

  }
</style>
