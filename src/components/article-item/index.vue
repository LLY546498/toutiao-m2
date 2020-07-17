 <template>
  <!-- <div class="article-item"> -->
    <van-cell class="article-item">
      <!-- {{article.title}} -->
      <div slot="title" class="title van-multi-ellipsis--l3">{{article.title}}</div>

      <div slot="label">
        <div class="cover-wrap" v-if="article.cover.type === 3">
          <div
            class="cover-wrap-item"
            v-for="(img , index) in article.cover.images"
            :key="index"
            >
            <van-image
              class="cover-image"
              fit="cover"
              :src="img"
            />
          </div>
        </div>
        <div class="label-wrap">
          <span>{{article.aut_name}}</span>
          <span>{{article.comm_count}}评论</span>
          <span>{{article.pubdate | relativeTime}}</span>
        </div>
      </div>

      <!-- <div slot="default" v-else=""> -->
      <van-image
        class="right-img"
        v-if="article.cover.type === 1"
        fit="cover"
        :src="article.cover.images[0]"
      />
      <!-- </div> -->
    </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  /deep/ .van-cell__value{
    flex: unset;
    width: 245px;
    height: 163px;
    margin-right: 26px;
  }
  .right-img {
    width: 245px;
    height: 163px;
  }
  .cover-wrap {
    padding: 30px 0;
    display: flex;
    .cover-wrap-item {
      flex: 1;
      // flex-wrap: nowrap;
      // width: 245px;
      height: 146px;
      &:not(:last-child) {
        margin-right: 4px;
      }
      .cover-image {
        width: 100%;
        height: 146px;
      }
    }
  }
  .label-wrap {
    font-size: 23px;
    color: #b4b4b4;
  }
  .label-wrap span {
    margin-right: 24px;
  }
}
</style>
