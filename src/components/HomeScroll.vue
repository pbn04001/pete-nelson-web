<template>
  <div class="pinContainer" ref="pinContainer">
    <section class="panel intro">
      Intro
    </section>
    <section class="panel next">
      Next
    </section>
    <section class="panel third">
      Third
    </section>
    <section class="panel fourth">
      Forth
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeScroll',
  created() {
    this.$nextTick(this.pinContainerScene);
  },
  mounted() {
    this.panels = this.$refs.pinContainer.querySelectorAll('.panel');
    this.panels.forEach((panel, index) => {
      panel.classList.add(`panel-${index}`);
    });
  },
  destroyed() {
    // Destroy ScrollMagic when our component is removed from DOM
    this.$ksvuescr.$emit('destroy')
  },
  methods: {
    pinContainerScene() {
      const Length = this.panels.length

      // Create a new Timeline (equivalent to new TimelineMax())
      const tl = new this.$gsap.TimelineMax()

      for (var i = 0; i < Length; i++) { // For each panel in this.panels array:
        let animFrom, animOutLetters;
        console.log(i)
        switch (i) { // Set animFrom value, depending on the index i of the item
          case 0:
            break; // First panel is already visible on page load, so no animation
          case 1:
            animFrom = {x: '-100%'} // Second panel comes from the left
            break;
          case 2:
            animFrom = {x: '100%'} // Third one comes from the right
            break;
          case 3:
            animFrom = {y: '-100%'} // Finally, the last one comes from the top
            break;
        }
        if (i !== 0) { // For each panel except the one whom index is 0, create the tween and add it to the tl timeline
          tl.fromTo(`section.panel-${i}`, 1.5, animFrom, {x: '0%', y: '0%', ease: Linear.easeNone})
        }
      }

      // create scene and set its params
      const scene = new this.$scrollmagic.Scene({
        triggerElement: '.pinContainer',
        triggerHook: 'onLeave',
        duration: `${Length * 100}%`
      })
        .setPin('.pinContainer')
        .setTween(tl)

      // Add scene to ScrollMagic controller by emiting an 'addScene' event on vm.$ksvuescr (which is our global event bus)
      this.$ksvuescr.$emit('addScene', 'pinContainerScene', scene)

      // TAAAAAAADAAAAAAAAAAAA
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "@/styles/_globals.scss";
  .pinContainer {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }
  .panel {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left:0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
  .intro {
    background-color: blue;
  }
  .next {
    background-color: red;
  }
  .third {
    background-color: green;
  }
  .fourth {
    background-color: gray;
  }
</style>
