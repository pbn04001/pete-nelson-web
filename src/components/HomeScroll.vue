<template>
  <div class="one-page-scroll" ref="pageScroll">
    <IntroSection ref="introSection" :view-height="viewHeight" />
    <MountainsSection ref="mountainSection" :view-height="viewHeight" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { SCREEN_SIZE, getScreenSizeMax } from '@/utils/sizes';
// Sections
import IntroSection from './sections/IntroSection.vue';
import MountainsSection from './sections/MountainsSection.vue';

export default {
  name: 'HomeScrollCustom',
  components: {
    IntroSection,
    MountainsSection,
  },
  computed: {
    ...mapState({
      currentHomeSection: state => state.currentHomeSection,
    }),
  },
  data() {
    return {
      currentSection: this.getCurrentSection(),
      viewHeight: this.getViewHeight(),
      stopSectionSelect: false,
    };
  },
  watch: {
    currentHomeSection: function currentHomeSection(val) {
      if (this.stopSectionSelect) {
        this.stopSectionSelect = false;
        return;
      }
      const newSection = this.getCurrentSection(val);
      if (newSection !== this.currentSection) {
        this.scrollToNewSection(newSection);
      }
    },
  },
  created() {
    if (!this.isMobile()) {
      // Preventing scrolling until first animating is complete
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
      window.addEventListener('resize', this.onResize);
    }
  },
  mounted() {
    this.sections = [
      this.$refs.introSection,
      this.$refs.mountainSection,
    ];
    if (!this.isMobile()) {
      this.calculatePositions();
      this.sections.forEach((section, index) => {
        this.sections[index].reset();
      });
      this.setHash();
      this.sections[this.currentSection].load()
        .then(() => {
          this.scrollToNewSection(this.currentSection);
          document.body.style.overflow = null;
          this.onScroll = window.addEventListener('scroll', this.onScroll);
          // TODO: Show scroll indicator to user
        });
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    isMobile() {
      return true; //window.innerWidth < getScreenSizeMax(SCREEN_SIZE.SM);
    },
    getCurrentSection(section) {
      if (this.sections) {
        return this.sections.findIndex(curSection => curSection.getHash() === section.replace('#', ''));
      }
      if (window.location.hash === '#developer') {
        return 1;
      }
      return 0;
    },
    onResize() {
      this.viewHeight = this.getViewHeight();
      this.sections.forEach((section, index) => {
        if (index !== this.currentSection) {
          this.sections[index].reset();
        }
      });
    },
    scrollToNewSection(newSection) {
      setTimeout(() => {
        window.scrollTo(0, (newSection * this.getViewHeight() + (this.getViewHeight() / 2)));
      }, 1);
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
    setHash() {
      this.stopSectionSelect = true;
      window.location.hash = this.sections[this.currentSection].getHash();
    },
    performAnimations(lastSection, position) {
      if (lastSection !== position.section) {
        this.setHash();
        this.sections[lastSection].hide();
        setTimeout(() => {
          if (this.currentSection === position.section) {
            this.sections[position.section].show(position.section > lastSection);
          }
        }, 300);
      }
      this.sections[position.section].adjust(position.offset);
    },
    onScroll() {
      const lastSection = this.currentSection;
      const position = this.calculatePosition();
      this.performAnimations(lastSection, position);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "./homeScroll.scss";
</style>
