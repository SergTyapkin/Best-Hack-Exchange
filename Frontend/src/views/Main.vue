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
  <BluredBG v-if="page.profile"></BluredBG>
  <div class="page">
    <TopBar></TopBar>

    <div class="bottom-container">
      <LeftBar></LeftBar>

      <div class="main-component">
        <Profile v-if="page.profile"></Profile>
        <Dashboard v-if="page.dashboard"></Dashboard>
        <Wallet v-if="page.wallet"></Wallet>
      </div>
    </div>
  </div>
</template>

<script>
import LeftBar from '../components/LeftBar.vue';
import TopBar from '../components/TopBar.vue';
import BluredBG from "./sign_in_up/BluredBG.vue";
import Profile from "./Profile.vue";
import Dashboard from "./Dashboard.vue";

export default {
  components: {BluredBG, LeftBar, TopBar, Profile, Dashboard},

  data() {
    return {
      page: {},
    };
  },

  mounted() {
    const pageName = location.pathname.slice(1); // removes '/' from beginning
    this.page[pageName] = true;
  }
};
</script>
