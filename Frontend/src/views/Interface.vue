<style lang="stylus" scoped>
.page
  height 100%
  display flex
  flex-direction column
  .bottom-container
    flex 1
    display flex
    .main-component
      flex 1
</style>

<template>
  <div class="page">
    <TopBar></TopBar>

    <div class="bottom-container">
      <LeftBar></LeftBar>

      <div class="main-component">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
import LeftBar from '../components/LeftBar.vue';
import TopBar from '../components/TopBar.vue';

export default {
  components: {LeftBar, TopBar}
}
</script>
