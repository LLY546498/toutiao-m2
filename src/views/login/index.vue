 <template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="登录"
    />
    <van-form @submit="onSubmit">
    <van-field
      v-model="username"
      name="用户名"
      placeholder="请输入手机号"
      :rules="[{ required: true, message: '请输入手机号' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="密码"
      placeholder="请输入验证码"
      :rules="[{ required: true, message: '请输入验证码' }]"
    />
    <div style="margin: 16px;">
      <van-button block type="info" native-type="submit">
        登录
      </van-button>
    </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSubmit (values) {
      console.log('submit', values)
    }
  }
}
</script>

<style scoped lang="less">

</style>
