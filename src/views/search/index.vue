 <template>
  <div class="search-container">
    <!-- 搜索框 -->
    <form action="/">
    <van-search
      v-model="searchText"
      background="#3296fa"
      @search="onSearch(searchText)"
      @cancel="$router.back()"
      placeholder="请输入搜索关键词"
      @focus="isResultShow = false"
      show-action
    >
    </van-search>
    </form>
    <!-- 搜索结果 -->
    <search-result
      :searchText="searchText"
      v-if="isResultShow"/>
    <!-- 联想建议 -->
    <search-suggestion
     v-else-if="searchText"
     :search-text="searchText"
     @search="onSearch"
     >
     </search-suggestion>
        <!-- 历史记录 -->
    <search-history
    :searchHistories = "searchHistories"
    @search="onSearch"
    @upDate-histories="searchHistories=$event"
     v-else/>
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storge'
// import { getSearchHistories } from '@/api/search'
import { mapState } from 'vuex'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: getItem('search-histories') || []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    searchHistories (searchText) {
      setItem('search-histories', searchText)
    }
  },
  created () {
    // const { data } = await getSearchHistories()
    // console.log(data)
    this.loadSearchHistories()
  },
  mounted () {},
  methods: {
    onSearch (searchText) {
      // console.log('确定')
      // 把输入框设置为你要搜索的文本
      this.searchText = searchText

      // 触发搜索记录搜索历史记录
      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }

      this.searchHistories.unshift(searchText)

      // 如果用户已登录，则把搜索记录存在线上
      // 如果没有登录则存在本地

      this.isResultShow = true
    },
    async loadSearchHistories () {
      const searchHistories = getItem('search-histories')
      // if (this.user) {
      //   const { data } = await getSearchHistories()
      //   // console.log(searchHistories)
      //   searchHistories = [...new Set([
      //     ...searchHistories,
      //     ...data.data.keywords
      //   ])]
      // }
      this.searchHistories = searchHistories
    }

  }
}
</script>

<style scoped lang="less">
.search-container {
  .van-search__action{
    color: #fff;
  }
}
</style>
