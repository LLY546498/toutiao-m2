 <template>
  <div class="layout-container" fixed>
    <van-tabbar v-model="active">
      <!-- <van-tabbar-item replace to="/" icon="iconfont icon-shouye">首页</van-tabbar-item> -->
      <van-tabbar-item replace to="/" class-prefix="icon" icon="iconfont icon-shouye">首页</van-tabbar-item>
      <van-tabbar-item replace to="/qa" icon="iconfont icon-wenda">问答</van-tabbar-item>
      <van-tabbar-item replace to="/video" icon="iconfont icon-shipin">视频</van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="iconfont icon-wode">我的</van-tabbar-item>
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

<style scoped lang="less"></style>
