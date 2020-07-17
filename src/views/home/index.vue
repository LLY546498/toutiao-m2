 <template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      >
      <van-button
      class="search-btn"
        slot="title"
        icon="search"
        round type="info"
        >搜索</van-button>
    </van-nav-bar>
    <!-- tab标签栏 频道列表 -->
    <van-tabs v-model="active" class="channel-tabs">
      <van-tab
        class="tab-item"
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
      <!-- 文章列表 -->
      <article-list :channel = "channel"></article-list>

      </van-tab>
      <div slot="nav-right" class="wap-nav-placeholder"></div>
      <!-- 汉堡按钮 -->
      <div slot="nav-right"
        class="wap-nav-wrap"
        @click="isChannelEditShow =true"
      >
        <van-icon name="wap-nav" />
      </div>
      <!-- 弹出层  -->
      <van-popup
        v-model="isChannelEditShow"
        position="bottom"
        class="channel-edit-popup"
        closeable
        close-icon-position = "top-right"
        get-container="body"
        style="height: 100%"
        >
        <!-- 频道编辑 -->
        <channel-edit
         :user-channels="channels"
         @close-popup="closeUpdate"
         :active-index="active"
         ></channel-edit>
      </van-popup>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storge'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: true
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels () {
      // const { data } = await getUserChannels()
      // this.channels = data.data.channels
      let channels = []
      if (this.user) {
        // 已登录
        const { data } = await getUserChannels()
        channels = data.data.channels
      } else {
        // 没有登录
        const localstorages = getItem('uset-channels')
        if (localstorages) {
          channels = localstorages
        } else {
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
      }
      this.channels = channels

      // console.log(this.channels)
    },
    closeUpdate (index) {
      this.isChannelEditShow = false
      this.active = index
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  /deep/.van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    font-size: 28px;
    border: 0;
    .van-icon {
      font-size: 32px;
      color: #fff;
    }
  }
  .channel-tabs {
    /deep/.van-tab {
      width: 200px;
      // height: 82px;
      // padding-right: 66px;
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/.van-tabs__line {
      width: 31px!important;
      height: 6px;
      background-color: #3296fa;
      border-radius: 50%;
    }
  }
  .wap-nav-placeholder{
    width: 66px;
    flex-shrink: 0;
  }
  .wap-nav-wrap {
    position: fixed;
    right: 0;
    height: 84px;
    line-height: 84px;
    background-color: #fff;
    opacity: .9;
    width: 66px;
    display: flex;
    justify-content: center;
    align-items: center;
    .van-icon {
      font-size: 58px;
    }
    &:before {
      content:'';
      width: 2px;
      height: 60px;
      background: url('./gradient-gray-line.png') no-repeat;
      background-size: contain;
      position: absolute;
      top: 12px;
      left: 0;

    }
  }

}

</style>
