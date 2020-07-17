
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用处理相对时间
dayjs.extend(relativeTime)

dayjs.locale('zh-cn')
// Vue过滤器

Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})

// console.log(dayjs('1990').from(dayjs()))
