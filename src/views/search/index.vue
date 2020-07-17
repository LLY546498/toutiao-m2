 <template>
  <div class="search-container">
    <!-- 搜索框 -->
    <form action="/">
    <van-search
      v-model="searchText"
      background="#3296fa"
      @search="onSearch"
      @cancel="$router.back()"
      placeholder="请输入搜索关键词"
      @focus="isResultShow = false"
      show-action
    > </van-search>
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow"/>
    <!-- 联想建议 -->
    <search-suggestion
     v-else-if="searchText"
     :search-text="searchText"
     />
        <!-- 历史记录 -->
    <search-history v-else/>
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
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
      isResultShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSearch () {
      console.log('确定')
      this.isResultShow = true
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
