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
  <BluredBG></BluredBG>
  <div class="page">
    <div>
      <Logo></Logo>
      <TopBar></TopBar>
    </div>
    <div class="bottom-container">
      <LeftBar></LeftBar>

      <div class="main-component">

      </div>
    </div>
  </div>
</template>

<script>
import LeftBar from '../../components/LeftBar.vue';
import TopBar from '../../components/TopBar.vue';
import BluredBG from "./BluredBG.vue";

export default {
  components: {BluredBG, LeftBar, TopBar},

  props: {
    token: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      users: null,
    };
  },
};
</script>
