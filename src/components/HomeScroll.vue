<template>
  <div class="one-page-scroll" ref="pageScroll">
    <IntroSection ref="introSection" :view-height="viewHeight" />
    <MountainsSection ref="mountainSection" :view-height="viewHeight" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import debounce from 'debounce';
import { SCREEN_SIZE, getScreenSizeMax } from '@/utils/sizes';
// Sections
import IntroSection from './sections/intro/IntroSection.vue';
import MountainsSection from './sections/mountains/MountainsSection.vue';

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
      hasLoadedAnimations: false,
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
    this.isMobile = this.getIsMobile();
    if (!this.isMobile) {
      // Preventing scrolling until first animating is complete
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', this.onResize);
  },
  mounted() {
    this.sections = [
      this.$refs.introSection,
      this.$refs.mountainSection,
    ];
    if (!this.isMobile) {
      this.loadAnimations();
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    getIsMobile() {
      return window.innerWidth < getScreenSizeMax(SCREEN_SIZE.SM);
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
      const isMobile = this.getIsMobile();
      this.viewHeight = this.getViewHeight();
      if (!isMobile) {
        if (!this.hasLoadedAnimations) {
          this.loadAnimations();
        } else {
          this.calculatePositions();
          this.stopScroll = true;
          this.scrollToNewSection(this.currentSection);
          debounce(this.resetNoVisibleSections(), 200);
        }
      } else if (!this.isMobile) { // Only run once when first viewing mobile
        this.$refs.pageScroll.style.height = 'auto';
        this.sections.forEach((section, index) => {
          this.sections[index].reset();
        });
      }
      this.isMobile = isMobile;
    },
    loadAnimations() {
      this.hasLoadedAnimations = true;
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
      this.calculatePositions();
      this.sections.forEach((section, index) => {
        this.sections[index].reset(false);
      });
      this.setHash();
      this.sections[this.currentSection].load()
        .then(() => {
          this.scrollToNewSection(this.currentSection);
          document.body.style.overflow = null;
          this.onScroll = window.addEventListener('scroll', this.onScroll);
          // TODO: Show scroll indicator to user
        });
    },
    resetNoVisibleSections() {
      this.sections.forEach((section, index) => {
        if (index !== this.currentSection) {
          this.sections[index].reset(false);
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
      if (this.stopScroll) {
        this.stopScroll = false;
        return;
      }
      if (!this.isMobile) {
        const lastSection = this.currentSection;
        const position = this.calculatePosition();
        this.performAnimations(lastSection, position);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "./homeScroll.scss";
</style>
