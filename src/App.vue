<template>
  <div id="app">
    <h3>黑马头条</h3>
    <i class=" iconfont icon-yuedu"></i>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-cell-group>
    <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
    <div class="abb"></div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
</style>
