<style scoped lang="stylus">
@require '../styles/constants.styl'

width = 65px
height = 95%
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
    opacity 0.6
    transition opacity 0.2s ease
    cursor pointer
  > *:hover
    img
      opacity 1
</style>

<template>
  <div class="leftbar">
    <router-link to="/profile"><img src="../res/profile.svg" alt="" /></router-link>
    <router-link to="/dashboard"><img src="../res/4_rectangles.svg" alt="" /></router-link>
    <router-link to="#"><img src="../res/wallet.svg" alt="" /></router-link>
    <router-link to="#"><img src="../res/message.svg" alt="" /></router-link>
    <router-link to="#"><img src="../res/trade.svg" alt="" /></router-link>
    <router-link to="#"><img src="../res/settings.svg" alt="" /></router-link>
  </div>
</template>
