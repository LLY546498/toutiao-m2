 <template>
  <div class="search-suggestion">
    <van-cell
      v-for="(str, index) in suggestions"
      :key="index"
      :title="str"
      icon="search" />
  </div>
</template>

<script>
import { getSearchSugggestions } from '@/api/search'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  computed: {},
  watch: {
    // 属性名： 要监视的数据的名称
    // 简写
    // searchText () {
    //   console.log('hellow')
    // }
    // 完整写法
    searchText: {
    // 当数据发生变化时会执行handler
      async handler () {
      // 找到数据接口
        const { data } = await getSearchSugggestions(this.searchText)
        // 请求获取数据
        // 模板绑定展示
        // console.log(data)
        this.suggestions = data.data.options
      },
      // 该回调将会在侦听开始之后被立即调用
      immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>
