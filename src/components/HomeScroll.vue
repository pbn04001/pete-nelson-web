<template>
  <div class="one-page-scroll" ref="pageScroll">
    <IntroSection ref="introSection" :view-height="viewHeight" />
    <MountainsSection ref="mountainSection" :view-height="viewHeight" />
    <ForestSection ref="forestSection" :view-height="viewHeight" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import debounce from 'debounce';
import { SCREEN_SIZE, getScreenSizeMax } from '@/utils/sizes';
// Sections
import IntroSection from './sections/intro/IntroSection.vue';
import MountainsSection from './sections/mountains/MountainsSection.vue';
import ForestSection from './sections/forest/ForestSection.vue';

export default {
  name: 'HomeScrollCustom',
  components: {
    IntroSection,
    MountainsSection,
    ForestSection,
  },
  computed: {
    ...mapState({
      currentHomeSection: state => state.currentHomeSection,
    }),
  },
  data() {
    return {
      currentSection: this.getCurrentSection(),
      lockSection: null,
      viewHeight: this.getViewHeight(),
      currentHomeSectionPropagation: false,
      hasLoadedAnimations: false,
      swapping: false,
      stopScrollOnSwap: true,
    };
  },
  watch: {
    currentHomeSection: function currentHomeSection(val) {
      // If we fired navigation change via this component, we want to stop this method from continuing.
      if (this.currentHomeSectionPropagation) {
        this.currentHomeSectionPropagation = false;
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
      this.stopInitialScroll();
    }
    window.addEventListener('resize', this.onResize);
  },
  mounted() {
    this.sections = [
      this.$refs.introSection,
      this.$refs.mountainSection,
      this.$refs.forestSection,
    ];
    this.totalSectionsSize = 0;
    this.sectionSizes = this.sections
      .map((section) => {
        const size = section.getSize();
        this.totalSectionsSize += size;
        return size;
      });

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
      if (this.lockSection) return this.lockSection;
      if (this.sections && section) {
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
          this.calculatePageSize();
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
    stopInitialScroll() {
      // Preventing scrolling until first animating is complete
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    },
    loadAnimations() {
      this.hasLoadedAnimations = true;
      this.stopInitialScroll();
      this.calculatePageSize();
      this.sections.forEach((section, index) => {
        this.sections[index].reset(false);
      });
      this.setHash();
      this.sections[this.currentSection].load()
        .then(() => {
          if (this.currentSection > 0) {
            this.scrollToNewSection(this.currentSection);
          }
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
        const newScroll = this.sectionSizes.slice(0, newSection).reduce((acc, cur) => acc + cur, 0);
        window.scrollTo(0, (newScroll * this.getViewHeight() + (this.getViewHeight() / 2)));
      }, 1);
    },
    getViewHeight() {
      return window.innerHeight;
    },
    calculatePageSize() {
      this.$refs.pageScroll.style.height = `${(this.totalSectionsSize * this.getViewHeight()) + this.getViewHeight()}px`;
    },
    calculatePosition() {
      let offset = window.pageYOffset / (this.getViewHeight() + 1);
      const section = this.sectionSizes.findIndex((size) => {
        const newOffset = offset - size;
        if (newOffset <= 0) {
          offset /= size;
          return true;
        }
        offset -= size;
        return false;
      });
      this.currentSection = section;
      return {
        section: section,
        offset: (offset % 1),
      };
    },
    setHash() {
      this.currentHomeSectionPropagation = true;
      window.location.hash = this.sections[this.currentSection].getHash();
    },
    performAnimations(lastSection, position) {
      if (lastSection !== position.section) {
        this.swapping = window.pageYOffset;
        this.setHash();
        this.sections[lastSection].hide();
        setTimeout(() => {
          if (this.currentSection === position.section) {
            this.sections[position.section].show(position.section > lastSection)
              .then(() => { this.swapping = null; });
          }
        }, 300);
      }
      this.sections[position.section].adjust(position.offset);
    },
    onScroll() {
      if (this.lockSection) return;
      if (this.swapping && this.stopScrollOnSwap) {
        window.scrollTo(0, this.swapping);
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

<style lang="scss">
  @import "./homeScroll.scss";
</style>
