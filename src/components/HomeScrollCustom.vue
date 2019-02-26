<template>
  <div class="one-page-scroll" ref="pageScroll">
    <div class="section intro">
      <h3>Section 1</h3>
      <MountainsSVG ref="introMountains" class="intro__mountains"/>
    </div>
    <div class="section next">
      <h3>Section 2</h3>

    </div>
    <div class="section third">
      <h3>Section 3</h3>
    </div>
  </div>
</template>

<script>
import anime from 'animejs';
import MountainsSVG from '../assets/icons/mountains.svg';

export default {
  name: 'HomeScrollCustom',
  components: {
    MountainsSVG,
  },
  data() {
    return {
      currentSection: 1,
      introVisible: false,
    };
  },
  mounted() {
    this.sections = this.$refs.pageScroll.querySelectorAll('.section');
    this.sections.forEach((section, index) => {
      if (index > 0) {
        this.sections[index].style.visibility = 'hidden';
      }
    });
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
          if (position.offset > 0.5) {
            anime({
              targets: this.$refs.introMountains,
              translateY: (position.offset - 0.5) * 200,
            });
          }
          break;
        case 2:
          if (lastSection === 1) {
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
    showIntroBackground(top) {
      this.sections[0].style.visibility = 'visible';
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
          this.sections[0].style.visibility = 'hidden';
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "@/styles/_globals.scss";
  .one-page-scroll {
    background-color: darkgray;
  }
  .section {
    position: sticky;
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
      & svg {
        fill: yellow;
      }
    }
  }
  .third {

  }
  .fourth {

  }
</style>
