 <template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="注册 / 登录"
    />
    <van-form>
    <van-field
      v-model="user.mobile"
      name="手机名"
      placeholder="请输入手机号"
    >
    <i slot="left-icon" class="iconfont icon-shouji"></i>
    </van-field>
    <van-field
      v-model="user.code"
      type="number"
      name="验证码"
      placeholder="请输入验证码"
    >
    <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
    <template #button>
      <div class="btn-b">
        <van-button class="yan-btn" round size="small" color="#eee" type="default">发送验证码</van-button>
      </div>
    </template>
    </van-field>
    <div style="margin: 20px;">
      <van-button @click="onLogin" block type="info"  native-type="submit">
        登录
      </van-button>
    </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLogin () {
      // 1,找到数据接口，
      // 2，封装请求方法，
      // 3，请求调用，
      // 4，处理响应结果
      try {
        const res = await login(this.user)
        console.log('登录成功', res)
      } catch (err) {
        if (err.response.status === 400) {
          console.log('登陆失败', err)
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.iconfont {
  font-size: 40px;
}
.btn-b {
  width: 152px;
  height: 46px;
  padding-left: 14px;
  border-left: 2px solid #eee;
  .yan-btn {
  width: 152px;
  height: 46px;
  background-color: #eee;
  line-height: 46px;
  font-size: 22px;
  color: #666!important;
  }
}
</style>
