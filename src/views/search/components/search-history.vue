 <template>
  <div class="search-history">
    <van-cell title="搜索历史" >
      <div v-if="isDeleteShow">
        <span @click="$emit('upDate-histories', [])">全部删除</span>
      &nbsp;&nbsp;
      <span @click="isDeleteShow=false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true"></van-icon>
    </van-cell>
    <van-cell
      v-for="(item,index) in searchHistories"
      :key="index"
       @click="onDelete(item,index)"
      :title="item">
      <van-icon v-show="isDeleteShow" name="close"></van-icon>
    </van-cell>
  </div>
</template>

<script>
// import { setItem } from '@/utils/storge'
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  computed: {},
  watch: {
  },
  created () {},
  mounted () {},
  methods: {
    onDelete (item, index) {
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
        // setItem('search-histories', this.searchHistories)
      } else {
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
