<template>
  <div class="main-content">
    <div class="user" v-for="user in users" :key="user.id">
      <h1>Token - {{ user.token }}</h1>
      <h2>Balance - {{ user.balance }} Tz</h2>
      <h2>Balance USD - {{ user.USD }} USD</h2>
      <h1>{{ token }}</h1>
    </div>
  </div>
</template>

<style lang="stylus">
.user
  color white
</style>

<script>
export default {
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
  async created() {
    const response = await fetch("http://127.0.0.1:5000/", {
      type: "GET",
      contentType: "application/json; charset=utf-8",
    });
    this.users = await response.json();
  },
};
</script>
