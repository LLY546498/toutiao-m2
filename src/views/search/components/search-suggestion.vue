 <template>
  <div class="search-suggestion">
    <van-cell
      v-for="(str, index) in suggestions"
      :key="index"
      :title="str"
      icon="search"
      @click="$emit('search', str)"
      >
      <div slot="title" v-html="hightlight(str)"></div>
    </van-cell>

  </div>
</template>

<script>
import { getSearchSugggestions } from '@/api/search'
import { debounce } from 'lodash'
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
      handler: debounce(async function () {
      // 找到数据接口
        const { data } = await getSearchSugggestions(this.searchText)
        // 请求获取数据
        // 模板绑定展示
        // console.log(data)
        this.suggestions = data.data.options
      }, 50),
      // 该回调将会在侦听开始之后被立即调用
      immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {
    hightlight (str) {
      return str.replace(
        new RegExp(this.searchText, 'gi'), `<span style="color:red">${this.searchText}</span>`
      )
    }
  }
}
</script>

<style scoped lang="less"></style>
