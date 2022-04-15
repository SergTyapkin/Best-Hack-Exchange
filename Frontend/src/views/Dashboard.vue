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

<style lang="stylus">
.fusioncharts-container // hide white background
  svg
    background-color unset !important

.fusioncharts-container svg > g:nth-of-type(2) // hide FusionCharts logo
  display none
  overflow hidden

.fusioncharts-container // graph's grid
  .raphael-group-25-axisReferenceVisualsBottom
    > path
      stroke-linecap round
</style>

<template>
  <Interface>
    <div class="dashboard-page">
      <BluredBG></BluredBG>

      <div class="page-name">Dashboard</div>

      <div class="stocks-row">
        <div class="title">STOCKS</div>
        <div class="stocks">
          <Stock v-for="(stock, idx) in stocks" @click="selectStock(idx)"
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
              :onInitialized="(e) => {this.chart = e.sender}"
          ></fusioncharts>
        </div>
      </div>
    </div>
  </Interface>
</template>


<script>
import Stock from "../components/Stock.vue";
import BluredBG from "../components/BluredBG.vue";
import Interface from "./Interface.vue";

export default {
  components: {Interface, BluredBG, Stock},

  data() {
    return {
      selectedStockIdx: 0,

      stocks: [],


      height: window.innerHeight / 5 * 4 - 112 - 50, // fixme: убрать эту дичь и сделать 100%
      dataSource: {
        "chart": {
          "theme": "my"
        },
        "data": [
          {},
        ],
      }
    }
  },

  async mounted() {
    this.stocks = await this.getStocks();
    if (this.stocks.length)
      this.selectStock(0);
  },

  methods: {
    async getStocks() {
      const stocks = await this.$store.state.api.getStocks();
      if (!stocks.ok_) {
        this.$store.state.popups.error('Не удалось получить акции');
        return [];
      }

      return stocks.stocks;
    },

    async getStats(name) {
      const stats = await this.$store.state.api.getLineStats(name, '1h', new Date(Date.now() - 86400000));
      if (!stats.ok_) {
        this.$store.state.popups.error('Не удалось получить графики');
        return [];
      }

      return stats.data;
    },

    formatTime(date) {
      const h = date.getHours();
      const m = date.getMinutes();
      const s = date.getSeconds();
      return h % 12 + ':' + m + (h > 12 ? 'PM' : 'AM');
    },

    addPointToChart(value) {
      const arr = this.dataSource.data;

      if (arr.length > 11) {
        arr.splice(0, 1);
      }
      arr.push({
        label: this.formatTime(new Date()),
        value: value + (Math.random() - 0.5) * 5000
      });
    },

    setChartData(valueArray) {
      this.dataSource.data = [];
      valueArray.forEach((el) => {
        this.dataSource.data.push({
          label: el.date,
          value: el.value
        });
      });
    },

    async selectStock(idx) {
      this.stocks[this.selectedStockIdx].isSelected = false;
      this.selectedStockIdx = idx;
      const stock = this.stocks[this.selectedStockIdx];
      stock.isSelected = true;

      const data = await this.getStats(stock.name);
      this.setChartData(data);
    }
  }
}
</script>
