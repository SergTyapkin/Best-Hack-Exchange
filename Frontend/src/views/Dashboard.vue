<style lang="stylus" scoped>
@require '../styles/constants.styl'

photo-size = 180px
photo-column-width = 300px

borderColorInputs = textColor5

.dashboard-page
  position relative
  display flex
  flex-direction column
  padding-right 80px
  padding-bottom 20px
  margin-left 80px
  height 100%
  box-sizing border-box

.page-name
  position absolute
  top -40px

.stocks-row
  .title
    font-size 12px
    color textColor2
    line-height 40px
  .stocks
    display flex

.graphs-row
  flex 1
  margin-top 30px
  height 400px
  .graph-container
    height 400px
</style>

<template>
  <div class="dashboard-page">
    <div class="page-name">Dashboard</div>

    <div class="stocks-row">
      <div class="title">STOCKS</div>
      <div class="stocks">
        <Stock v-for="stock in stocks"
            :name="stock.name"
            :value="stock.value"
            :is-increase="stock.isIncrease"
            :percents ="stock.percents"
            :is-selected ="stock.isSelected"
        ></Stock>
      </div>
    </div>

    <div class="graphs-row">
      <div class="graph-container">
        <fusioncharts
            type="line"
            width="100%"
            :height="height"
            dataformat="json"
            :dataSource="dataSource"
        ></fusioncharts>
      </div>
    </div>
  </div>
</template>


<script>
import User from "../models/user";
import Stock from "../components/Stock.vue";

export default {
  components: {Stock},

  data() {
    return {
      user: new User(),

      enabled: true,
      errors: {},

      stocks: [
        {
          name: 'ARP',
          value: 1.9678,
          isIncrease: true,
          percents: 12.5,
          isSelected: true,
        },
        {
          name: 'ETH',
          value: 23.234,
          isIncrease: false,
          percents: 5.235,
        },
        {
          name: 'LTC',
          value: 380.234,
          isIncrease: true,
          percents: 39.69,
        },
      ],

      height: innerHeight - 382, // fixme: убрать эту дичь и сделать 100%
      dataSource: {
        "chart": {
          "caption": "Total footfall in Bakersfield Central",
          "subCaption": "Last week",
          "xAxisName": "Day",
          "yAxisName": "No. of Visitors",
          "lineThickness": "2",
          "theme": "candy"
        },
        "data": [
          {
            "label": "Mon",
            "value": "15123"
          },
          {
            "label": "Tue",
            "value": "14233"
          },
          {
            "label": "Wed",
            "value": "23507"
          },
          {
            "label": "Thu",
            "value": "9110"
          },
          {
            "label": "Fri",
            "value": "15529"
          },
          {
            "label": "Sat",
            "value": "20803"
          },
          {
            "label": "Sun",
            "value": "19202"
          }
        ],
        "trendlines": [
          {
            "line": [
              {
                "startvalue": "18500",
                "color": "#1aaf5d",
                "displayvalue": "Average{br}weekly{br}footfall",
                "valueOnRight": "1",
                "thickness": "2"
              }
            ]
          }
        ]
      }
    }
  },

  mounted() {
    this.user.set(this.$store.state.user);
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

      const response = await this.$store.state.api.updateUser(this.user.toNetwork());
      if (response.ok_) {
        await this.$store.dispatch('GET_USER');
        this.$store.state.popups.success('Данные обновлены');
        return;
      }

      if (response.status_ === 409) {
        this.errors.email = 'Такой email уже занят';
      } else {
        this.$store.state.popups.error("Не удалось обновить данные", 'Произошла неизвестная ошибка!');
      }
    },

    async changeData() {
      if (!this.enabled) {
        return;
      }
      this.enabled = false;

      await this.__signInAction();

      this.enabled = true;
    }
  }
}
</script>
