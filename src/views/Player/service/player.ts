import http from '@/service'

export const getSongDetail = (ids: number) => {
  return http.get({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

// 获取歌词信息
export function getSongLytic(id: number) {
  return http.get({
    url: '/lyric',
    params: {
      id
    }
  })
}
