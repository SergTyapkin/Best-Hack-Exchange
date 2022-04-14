<style scoped lang="stylus">
@require '../styles/constants.styl'

width = 65px
height = 80%
borderColor = textColor5

.leftbar
  width width
  //box-shadow 5px 5px 3px shadowColor3
  background mix(bgColor, transparent, 60%)
  border 1px solid borderColor
  border-radius radiusXL
  height height
  margin-left 30px
  display inline-flex
  flex-direction column
  align-items center
  padding 30px 10px
  box-sizing border-box
  img
    width 30px
    margin 15px
    stroke red
    opacity 0.6
    transition opacity 0.2s ease
  img:hover
    opacity 1
</style>

<template>
  <div class="leftbar">
    <img src="../res/profile.svg" alt="" />
    <img src="../res/4_rectangles.svg" alt="" />
    <img src="../res/wallet.svg" alt="" />
    <img src="../res/message.svg" alt="" />
    <img src="../res/trade.svg" alt="" />
    <img src="../res/settings.svg" alt="" />
  </div>
</template>
