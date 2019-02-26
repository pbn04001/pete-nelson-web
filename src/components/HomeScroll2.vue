<template>
  <full-page ref="fullpage" :options="options" id="fullpage">
    <div class="section">
      <h3>Section 1</h3>
    </div>
    <div class="section">
      <h3>Section 2</h3>
    </div>
    <div class="section">
      <h3>Section 3</h3>
    </div>
    <div>
      footer
    </div>
  </full-page>
</template>

<script>
export default {
  name: 'HomeScroll2',
  data() {
    return {
      options: {
        afterLoad: this.afterLoad,
        scrollOverflow: true,
        scrollBar: false,
        menu: '#menu',
        navigation: false,
        anchors: ['page1', 'page2', 'page3'],
        sectionsColor: ['#41b883', '#ff5f45', '#0798ec', '#fec401', '#1bcee6', '#ee1a59', '#2c3e4f', '#ba5be9', '#b4b8ab'],
      },
    };
  },
  methods: {
    afterLoad(a, b, c) {

      console.log('After load')
    },
    addSection(e) {
      debugger
      e.preventDefault()
      var newSectionNumber = document.querySelectorAll('.fp-section').length + 1
      // creating the section div
      var section = document.createElement('div')
      section.className = 'section'
      section.innerHTML = `<h3>Section ${newSectionNumber}</h3>`
      // adding section
      document.querySelector('#fullpage').appendChild(section)
      // creating the section menu element
      var sectionMenuItem = document.createElement('li')
      sectionMenuItem.setAttribute('data-menuanchor', 'page' + newSectionNumber)
      sectionMenuItem.innerHTML = `<a href="#page${newSectionNumber}">Section${newSectionNumber}</a>`
      // adding it to the sections menu
      var sectionsMenuItems = document.querySelector('#menu')
      sectionsMenuItems.appendChild(sectionMenuItem)
      // adding anchor for the section
      this.options.anchors.push(`page${newSectionNumber}`)
      // we have to call `update` manually as DOM changes won't fire updates
      // requires the use of the attribute ref="fullpage" on the
      // component element, in this case, <full-page>
      // ideally, use an ID element for that element too
      this.$refs.fullpage.build()
    },
    removeSection() {
      var sections = document.querySelector('#fullpage').querySelectorAll('.fp-section')
      var lastSection = sections[sections.length - 1]
      // removing the last section
      lastSection.parentNode.removeChild(lastSection)
      // removing the last anchor
      this.options.anchors.pop()
      // removing the last item on the sections menu
      var sectionsMenuItems = document.querySelectorAll('#menu li')
      var lastItem = sectionsMenuItems[sectionsMenuItems.length - 1]
      lastItem.parentNode.removeChild(lastItem)
    },
    toggleNavigation() {
      this.options.navigation = !this.options.navigation
    },
    toggleScrollbar() {
      console.log('Changing scrollbar...')
      this.options.scrollBar = !this.options.scrollBar
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "@/styles/_globals.scss";

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
