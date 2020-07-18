 <template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 请求获取数据
      const { data } = await getSearchResults({
        page: this.page,
        per_page: this.per_page,
        q: this.searchText
      })
      // console.log(data)
      // 将数据添加到列表中
      const { results } = data.data
      this.list.push(...results)
      // 设置加载状态结束
      this.loading = false
      // 判断数据是否加载完毕
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-result {
  position: fixed;
  right: 0;
  left: 0;
  top: 98px;
  bottom: 0;
  overflow-y: auto;
}
</style>
