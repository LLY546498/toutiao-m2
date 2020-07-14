 <template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="注册 / 登录"
      left-arrow
      @click-left="$router.back()"
    />
    <van-form
    @submit="onLogin"
    :show-error="false"
    :show-error-message="false"
    @failed="onfailed"
    validate-first
    ref="login-form"
    >
    <van-field
      v-model="user.mobile"
      name="mobile"
      placeholder="请输入手机号"
      :rules="userFormRules.mobile"
    >
      <i slot="left-icon" class="iconfont icon-shouji"></i>
    </van-field>
    <van-field
      v-model="user.code"
      type="number"
      name="code"
      placeholder="请输入验证码"
      :rules="userFormRules.code"
    >
      <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
    <template #button>
      <div class="btn-b">
        <van-count-down
          v-if="isCountDownShow"
          slot="button"
          :time="1000 * 60"
          format="ss s"
          @finish="isCountDownShow = false"
          />
        <van-button
          v-else
          @click.prevent="onSendSms"
          slot="button"
          class="yan-btn"
          round
          size="small"
          color="#eee"
          type="default"
          :loading="isSendSmsLoading"
          center
          >发送验证码</van-button>
      </div>
    </template>
    </van-field>
    <div style="margin: 20px;">
      <van-button block type="info"  native-type="submit">
        登录
      </van-button>
    </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false,
      isSendSmsLoading: false
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
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login(this.user)
        // console.log('登录成功', res)
        this.$toast.success('登录成功')
        this.$store.commit('setUser', data.data)
        this.$router.back()
      } catch (err) {
        // if (err.response.status === 400) {
        // console.log('登陆失败', err)
        this.$toast.fail('登录失败')
        // }
      }
    },
    onfailed (error) {
      // console.log('验证失败', error)
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    async onSendSms () {
      // 校验手机号码，
      // 验证通过 ， 请求发送验证过码， 用户接收短信   输入验证码  请求登录
      // 请求发送验证码  隐藏发送按钮  显示倒计时
      // 倒计时结束 隐藏倒计时 显示发送按钮
      try {
        await this.$refs['login-form'].validate('mobile')

        this.isSendSmsLoading = true // 展示按钮的loading状态
        await sendSms(this.user.mobile)
        this.isCountDownShow = true
      } catch (err) {
        // console.log('验证失败', err)
        let message = ''
        if (err && err.response && err.response.status === 429) {
          message = '发送太频繁，请稍后重试'
        } else if (err.name === 'mobile') {
          message = err.message
        } else {
          message = '发送失败请稍后重试'
        }
        // console.dir(err)
        this.$toast({
          message,
          position: 'top'
        })
      }

      this.isSendSmsLoading = false
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
