 <template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <van-cell
        center
        :border="false"
        class="base-info">
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="currentUser.photo" />
          <div class="name" slot="title">{{currentUser.name}}</div>
          <van-button
          class="update-btn"
          type="default"
          size="mini"
          round
          >编辑资料</van-button>
      </van-cell>
      <van-grid :border="false" class="data-info">
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="span">{{currentUser.follow_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="span">{{currentUser.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="span">{{currentUser.art_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="span">{{currentUser.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div v-else class="not-login">
        <div @click="$router.push('/login')">
          <img src="./mobile.png" alt="">
        </div>
        <div class="text">登录 / 注册</div>
    </div>
    <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="icon"
        icon="shoucang"
        text="收藏" />
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="icon"
        icon="lishi"
        text="历史" />
    </van-grid>
      <van-cell title="消息通知" is-link url="/" />
      <van-cell class="mb-4" title="小智同学" is-link to="/" />
      <van-cell
      title="退出登录"
      v-if="user"
      @click="onLogout"
      class="logout-cell" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      currentUser: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadCurrentUser()
  },
  mounted () {},
  methods: {
    onLogout () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗'
      })
        .then(() => {
          this.$store.commit('setUser', null)
        }).catch(() => {

        })
    },
    async loadCurrentUser () {
      const { data } = await getUserInfo()
      console.log(data)
      this.currentUser = data.data
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .my-info {
    // height: 370px;
    background: url("./banner.png") no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      // height: 115px;
      padding-top: 78px;
      padding-bottom: 35px;
      background-color: unset;
      .avatar {
        box-sizing: border-box;
        width: 132px;
        height: 132px;
        border: 1px solid #fff;
        margin-right: 20px;
      }
      .name {
        font-size: 30px;
        color: #fff;
      }
      .update-btn {
        height: 45px;
        font-size: 16px;
        color: #666666;
      }

    }

    .data-info {
      .data-info-item {
        height: 130px;
        background-color: unset;
        border: null;
        color: #fff;
        // font-size: 16px;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .span {
          font-size: 33px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }
  .not-login {
    height: 360px;
    background: url("./banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 132px;
      height: 132px;
    }
    .text {
      font-size: 28px;
      color: #fff;
    }
  }
  /deep/.nav-grid {
      .nav-grid-item {
        height: 140px;
        .icon {
          font-size: 44px;
        }
        .icon-shoucang {
          color: #eb5253;
        }
        .icon-lishi {
          color: #ff9d1d;
        }
        .van-grid-item__text {
          font-size: 24px;
          color: #333;
        }
      }
    }
    .logout-cell {
      text-align: center;
      color: #d86262;
    }
    .mb-4 {
      margin-bottom: 8px;
    }
}
</style>
