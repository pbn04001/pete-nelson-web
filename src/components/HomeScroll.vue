<template>
  <div class="one-page-scroll" ref="pageScroll">
    <IntroSection ref="introSection" :view-height="viewHeight" />
    <DeveloperSection ref="developerSection" :view-height="viewHeight" />
  </div>
</template>

<script>
import IntroSection from './sections/IntroSection.vue';
import DeveloperSection from './sections/DeveloperSection.vue';

export default {
  name: 'HomeScrollCustom',
  components: {
    IntroSection,
    DeveloperSection,
  },
  data() {
    return {
      currentSection: 0,
      firstLoad: true,
      viewHeight: this.getViewHeight(),
    };
  },
  created() {
    window.addEventListener('resize', this.setViewHeight);
  },
  mounted() {
    this.sections = [
      this.$refs.introSection,
      this.$refs.developerSection,
    ];
    this.sections.forEach((section, index) => {
      this.sections[index].reset();
    });
    this.$refs.pageScroll.style.height = 'auto';
    this.calculatePositions();
    this.sections[this.currentSection].load();
    this.onScroll = window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setViewHeight);
  },
  methods: {
    setViewHeight() {
      this.viewHeight = this.getViewHeight();
    },
    getViewHeight() {
      return window.innerHeight;
    },
    calculatePositions() {
      this.$refs.pageScroll.style.height = `${(this.sections.length * this.getViewHeight()) + this.getViewHeight()}px`;
    },
    calculatePosition() {
      const offset = window.pageYOffset / (this.getViewHeight() + 1);
      let section = Math.ceil(offset) || 1;
      if (section > this.sections.length) {
        section = this.sections.length;
      }
      this.currentSection = section - 1;
      return {
        section: section - 1,
        offset: (offset % 1),
      };
    },
    performAnimations(lastSection, position) {
      if (lastSection !== position.section) {
        this.sections[position.section].show(lastSection > position.section, this.firstLoad);
        this.sections[lastSection].hide();
        this.firstLoad = false;
      }
      this.sections[position.section].adjust(position.offset);
    },
    onScroll() {
      const section = this.currentSection;
      const position = this.calculatePosition();
      this.performAnimations(section, position);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "@/styles/_globals.scss";
  .one-page-scroll {
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
</style>
