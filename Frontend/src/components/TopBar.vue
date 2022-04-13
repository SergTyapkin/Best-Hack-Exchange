<template>
  <div class="toolbar">
    <img class="logo" src="/res/favpng_logo-breaking-bad 1.svg" alt="" />
    <div class="search-box">
      <form>
        <img src="/res/search.svg" alt="" />
        <input v-model="search" type="search" id="search" placeholder="Search..." />
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: '',
    };
  },
};
</script>
