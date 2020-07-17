 <template>
  <div class="article-list">
    <van-pull-refresh
     v-model="isPullDownLoading"
     :success-text="refreshSuccessText"
     :success-duration="1000"
     @refresh="onRefresh"
    >
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article = 'article'></article-item>
    </van-list>
  </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      isPullDownLoading: false,
      refreshSuccessText: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 请求获取数据，
      //  把数据放到list数组中
      // 设置本次加载状态结束， 它才可以判断是否需要记载下一次
      // 否则就永远停在这里
      // 数据全部加载完成

      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(), // 获取相当于页码， 请求最新数据数据用最新时间戳
        with_top: 1
      })
      console.log(data)
      const { results } = data.data
      this.list.push(...results)

      this.loading = false

      // 如果还有数据更新获取下一页数据的页码
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }

      // console.log(data)
      // setTimeout(() => {
      //   if (this.refreshing) {
      //     this.list = []
      //     this.refreshing = false
      //   }

      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }
      //   this.loading = false

      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
    },
    async onRefresh () {
      // console.log('onRefresh')
      // 下拉刷新组件自己就会展示loading状态
      // 1， 请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(), // 获取相当于页码， 请求最新数据数据用最新时间戳
        with_top: 1
      })
      // 2，把数据放到数据列表中
      const { results } = data.data
      this.list.unshift(...results)
      // 3，关闭刷新的状态loading
      this.isPullDownLoading = false
      this.refreshSuccessText = `更新了${results.length}条数据`
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 180px;
  bottom: 100px;
  overflow-y: auto;
}
</style>
