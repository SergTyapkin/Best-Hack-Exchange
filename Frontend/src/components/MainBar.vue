<template>
  <div class="form">
    <form action="/about">
      <h1>Введите свой токен</h1>
      <input v-model="token" type="text" />
      <input class="btn" type="submit" value="Отправить" />
    </form>
  </div>
</template>

<style lang="stylus" scoped>
.form
  margin-top 15%
  margin-left 37%
  input
    border 1px solid white
    margin-left -15%
    width 65%
    height 30px
    font-size 27px
    background black
    color white
  .btn
    height 30px
    margin-left 3%
    width 20%
</style>

<script>
export default {
  data() {
    return {
      token: "",
    };
  },
  async created() {
    const users = await this.$store.state.api.getUser();
    if (!users.ok_)
      return;
    this.users = users;
  },
};
</script>
