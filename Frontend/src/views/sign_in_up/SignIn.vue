<style lang="stylus">
logo-size = 40px

.form
  .logo
    width logo-size
    height logo-size
    margin 20px 0
</style>

<template>
  <BluredBg></BluredBg>

  <div class="profile-page">
    <form class="form centered-horizontal" novalidate @submit.prevent="signIn">
      <img class="logo" src="/Frontend/src/res/favicon.ico" alt="BH Exchange" />

      <div class="info-container">
        <div class="title">Sign in to BH Exchange</div>
      </div>

      <div class="fields-container">
        <div>
          <span class="error-text">{{ errors.email }}</span>
          <input type="email" autocomplete="on" placeholder=" " v-model="email">
          <label>Email</label>
        </div>
        <div>
          <span class="error-text">{{ errors.password }}</span>
          <input type="password" autocomplete="on" placeholder=" " v-model="password">
          <label>Password</label>
        </div>
      </div>

      <div class="submit-container">
        <input type="submit" value="Sign in">
        <div class="text info">Don’t have an account?<router-link to="/signup"> Tap here to sign in.</router-link></div>
      </div>
    </form>
  </div>
</template>


<script>
import BluredBg from './BluredBG.vue'

export default {
  components: {BluredBg},

  data() {
    return {
      email: '',
      password: '',

      enabled: true,

      errors: {}
    }
  },

  methods: {
    async __signInAction() {
      if (this.email.length === 0) {
        this.errors.email = 'Логин не может быть пустым';
        return;
      }
      if (this.password.length === 0) {
        this.errors.password = 'Пароль не может быть пустым';
        return;
      }

      const response = await this.$store.state.api.signIn(this.email, this.password);
      if (response.ok_) {
        await this.$store.dispatch('GET_USER');
        await this.$router.push('/profile');
        this.$store.state.popups.success('Успешный вход!');
        return;
      }

      if (response.status_ === 403) {
        const error = 'Неверный логин или пароль';
        this.errors.username = error;
        this.errors.password = error;
      } else {
        this.$store.state.popups.error("Не удалось создать пользователя", 'Произошла неизвестная ошибка!');
      }
    },

    async signIn() {
      if (!this.enabled) {
        return;
      }
      this.enabled = false;

      this.errors = {};
      await this.__signInAction();

      this.enabled = true;
    },
  }
}
</script>
