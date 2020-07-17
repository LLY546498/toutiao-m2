 <template>
  <div class="channel-edit">
    <!-- 频道编辑 -->
    <van-cell :border=false>
      <div
        slot="title"
        class="channle-title"
        >我的频道</div>
      <van-button
        @click="isEditShow = !isEditShow"
       size="mini" plain round type="danger">{{ isEditShow ? "完成" : "编辑"}}</van-button>
    </van-cell>
    <van-grid
      :border=false
      :gutter="20"
      >
      <van-grid-item
       class="channel-item"
       :class=" {active : index === activeIndex}"
       v-for="(channel, index) in userChannels"
       :icon="(isEditShow && index !==0) ? 'clear' : ''"
       :key="channel.id"
       @click="onUserChannelClick(channel,index)"
       :text="channel.name" />
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border=false>
      <div
        slot="title"
        class="channle-title"
        >频道推荐</div>
    </van-cell>
    <van-grid
      :border=false
      :gutter="20"
      >
      <van-grid-item
       class="channel-item"
       v-for="channel in recommendChannels"
       :key="channel.id"
       :text="channel.name"
       @click="onAddChannel(channel)"
       />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storge'

export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEditShow: false
    }
  },
  computed: {
    ...mapState(['user']),
    // 推荐频道列表
    recommendChannels () {
      // 所有频道 - 我的频道 = 推荐频道
      //  数组的filter 方法遍历数组根据函数的返回值决定是否收集遍历项
      // 返回值， 一个数据所有条件为true的元素
      return this.allChannels.filter(item => {
        // 判断item是否属于用户频道
        return this.userChannels.findIndex(userItem => {
          return userItem.id === item.id
        }) === -1
      })
      // const arr = []
      // this.allChannels.forEach(channel => {
      // let flag = false
      //   for (let i = 0; i <= this.userChannels.length; i++) {
      //     if (this.userChannels[i].id === channel.id) {
      //       arr.push(channel)
      // flag = true
      //       break
      //     }
      //   }
      // })
      // console.log(arr)
      // if(!flag) {
      //   arr.push(channel)
      // }

      // return arr
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    async loadAllChannels () {
      // console.log(data)
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('获取所有频道数据失败')
      }
    },
    async onAddChannel (channel) {
      this.userChannels.push(channel)

      // 数据持久化
      if (this.user) {
        const { data } = await addUserChannel({
          channels: [
            { id: channel.id, seq: this.userChannels.length }
          ]
        })
        console.log(data)
      } else {
        // console.log('本地')
        setItem('uset-channels', this.userChannels)
      }
    },
    onUserChannelClick (channel, index) {
      if (this.isEditShow && index !== 0) {
        this.deleteChannel(channel, index)
      } else {
        this.switchChannel(index)
      }
    },
    deleteChannel (channel, index) {
      if (index <= this.activeIndex) {
        this.$emit('close-popup', this.activeIndex - 1)
      }
      this.userChannels.splice(index, 1)
      this.deleteChannels(channel)
      // console.log('删除频道', channel, index)
    },
    switchChannel (index) {
      // 非编辑状态，执行切换频道操作
      // console.log('切换频道')
      this.$emit('close-popup', index)
      // this.$emit('close-popup', index)
    },
    async deleteChannels (channel) {
      try {
        if (this.user) {
          await deleteUserChannel(channel.id)
        } else {
          setItem('channels', this.userChannels)
        }
      } catch (err) {
        this.$toast('删除频道失败， 请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 110px;
  .channle-title {
    font-size: 32px;
    color: #333;
  }
  .channel-item {
    width: 160px;
    height: 86px;
    margin-top: 30px;
    // margin-right: 22px;
    /deep/.van-grid-item__content{
    background-color: #f4f5f6;
    border-radius: 10px;

    .van-grid-item__text{
      color: #222222;
      font-size: 28px;
      margin-top: 0;
    }
    /deep/.van-grid-item__icon {
      position: absolute;
      right: 26px;
      top: -10px;
      font-size: 40px;
      color: #ccc;
    }
    }

  }
.active {
   /deep/.van-grid-item__text{
   color: red !important;
 }
}

}
</style>
