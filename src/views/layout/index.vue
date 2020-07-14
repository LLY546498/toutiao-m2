 <template>
  <div class="layout-container">
    <van-tabbar class="layout-tabbar" v-model="active" fixed route>
      <van-tabbar-item replace to="/">
      <i slot='icon' class="iconfont icon-shouye"></i>
      <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/qa">
      <i slot='icon' class="iconfont icon-wenda"></i>
      <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/video">
      <i slot='icon' class="iconfont icon-shipin"></i>
      <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/my">
      <i slot='icon' class="iconfont icon-wode"></i>
      <span class="text">我的</span>
      </van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data () {
    return {
      active: 0
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    i.iconfont {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
