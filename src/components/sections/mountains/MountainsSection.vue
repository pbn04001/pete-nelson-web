<template>
  <div ref="section" class="section mountains">
    <div ref="card" class="mountains__card">
      <h1 class="mountains__title" >Developer</h1>
      <div ref="cardSub" class="mountains__card_sub">
        Accomplished full stack web developer / designer with over 13 years of professional experience.  Have worked on delivering full stack
        solutions from the initial design phase into full production implementation.  Extensive experience using major UI frameworks React, Vue,
        and Angular. Written both rest and soap services in Node and Java.  Setup and integrated with many types of databases including SQL Server,
        Postgres, and MySql. Able to create site designs, illustrations, and logos using Sketch, Illustrator and Photoshop.  Written backend
        python scripts using Spark and Kafka for processing 20k network transactions a second.  Experience working in AWS to setup services using
        S3, EC2, Lambda, etc. Education includes both a BA in Computer Science, and a Masters in Business Administration.

        <h4>Languages</h4>
        <span class="mountains__tech_list">
          Javascript, Java, Scala, Python, Swift
        </span>

        <h4>UI Frameworks</h4>
        <span class="mountains__tech_list">
          React/Redux, Angular, VUE, ExtJS
        </span>

        <h4>UI</h4>
        <span class="mountains__tech_list">
          CSS3, SASS, PostCSS, SVG, HTML5
        </span>

        <h4>Server</h4>
        <span class="mountains__tech_list">
          Node, Express, Spring, Rest, Soap, Kafka, Spark
        </span>

        <h4>Design</h4>
        <span class="mountains__tech_list">
          Illustrator, Sketch, Photoshop
        </span>

        <h4>Databases</h4>
        <span class="mountains__tech_list">
          MySQL, SQL Server, Postgress, Hadoop, OpenTSDB
        </span>

        <h4>Databases</h4>
        <span class="mountains__tech_list">
          Enzyme, Karma, Chai, Sinon, Nightwatch, Cucumber
        </span>
      </div>
    </div>
    <img src="/assets/images/mountains_2.svg" ref="mountains2" class="mountains__mountains mountains__mountains--2" />
    <img src="/assets/images/mountains_1.svg" ref="mountains1" class="mountains__mountains mountains__mountains--1" />
    <img src="/assets/images/mountain_clouds.svg" ref="clouds" class="mountains__clouds" />
  </div>
</template>

<script>
import anime from 'animejs';
import { delayAnimationCheckVisible, hideSectionAfterAnimation } from '@/utils/animation';
import { getClientHeight } from '@/utils/sizes';

export default {
  name: 'MountainsSection',
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
    };
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
      return 'developer';
    },
    getSize() {
      return 2;
    },
    getBodyClass() {
      return 'mountains';
    },
    reset(visible = true) {
      this.visible = visible;

      this.$refs.card.style.opacity = visible ? 1 : 0;
      this.$refs.card.style.transform = `translateY(${visible ? 0 : this.cardOffScreen()}px)`;
      this.$refs.mountains1.style.transform = `translateY(${visible ? 0 : this.mountains1Offscreen()}px)`;
      this.$refs.mountains2.style.transform = `translateY(${visible ? 0 : this.mountains2Offscreen()}px)`;
      this.$refs.clouds.style.transform = `translateY(${visible ? 0 : this.cloudsOffscreen()}px)`;
      this.$refs.section.style.display = visible ? 'block' : 'none';
    },
    showAssets() {},
    showAnimated(offset) {
      this.visible = true;
      this.showing = true;
      this.$refs.section.style.display = 'block';

      return new Promise((resolve) => {
        anime({
          targets: this.$refs.card,
          translateY: this.cardMovement(offset),
          easing: 'easeOutSine',
          duration: 800,
        });
        delayAnimationCheckVisible({
          targets: this.$refs.card,
          opacity: 1,
          easing: 'easeOutSine',
          duration: 500,
        }, 300, this, true);

        anime({
          targets: this.$refs.clouds,
          translateY: 0,
          easing: 'easeOutSine',
          opacity: 1,
          duration: 700,
        });

        delayAnimationCheckVisible({
          targets: this.$refs.mountains2,
          translateY: this.mountains2Movement(offset),
          easing: 'easeOutSine',
          duration: 500,
        }, 200, this, true);

        delayAnimationCheckVisible({
          targets: this.$refs.mountains1,
          translateY: this.mountains1Movement(offset),
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

      anime({
        targets: this.$refs.card,
        translateY: this.cardOffScreen(),
        opacity: 0,
        easing: 'easeOutSine',
        duration: 700,
      });

      anime({
        targets: this.$refs.clouds,
        translateY: this.cloudsOffscreen(),
        easing: 'easeInOutSine',
        duration: 700,
        opacity: 0,
      });

      anime({
        targets: this.$refs.mountains2,
        translateY: this.mountains2Offscreen(),
        easing: 'easeInOutSine',
        duration: 500,
      });

      anime({
        targets: this.$refs.mountains1,
        translateY: this.mountains1Offscreen(),
        easing: 'easeInOutSine',
        duration: 300,
      });

      hideSectionAfterAnimation(700, this);
    },
    adjustAnimated(offset) {
      if (this.showing || !this.visible) return;

      this.$refs.card.style.transform = `translateY(${this.cardMovement(offset)}px)`;
      this.$refs.mountains2.style.transform = `translateY(${this.mountains2Movement(offset)}px)`;
      this.$refs.mountains1.style.transform = `translateY(${this.mountains1Movement(offset)}px)`;
    },
    cardMovement(offset) {
      return -1 * (offset * (getClientHeight(this.$refs.card) - this.viewHeight));
    },
    mountains1Offscreen() {
      return getClientHeight(this.$refs.mountains1);
    },
    mountains2Offscreen() {
      return getClientHeight(this.$refs.mountains2);
    },
    cloudsOffscreen() {
      return getClientHeight(this.$refs.clouds);
    },
    cardOffScreen() {
      return (getClientHeight(this.$refs.card) + 50);
    },
    mountains1Movement(offset) {
      return offset * (this.viewHeight / 30);
    },
    mountains2Movement(offset) {
      return offset * (this.viewHeight / 20);
    },
  },
};
</script>

<style lang="scss">
  @import "./mountainsSection.scss";
</style>
