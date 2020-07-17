import request from '@/utils/request'
// 获取联想搜索建议
export const getSearchSugggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
