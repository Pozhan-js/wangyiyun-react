import http from '@/service'

export function getBanners() {
  return http.get({
    url: '/banner'
  })
}

export function getHotRecommend(limit = 30) {
  return http.get({
    url: '/personalized',
    params: {
      limit
    }
  })
}

export function getNewAlbum(limit = 10) {
  return http.get({
    url: '/album/newest',
    params: {
      limit
    }
  })
}

export function getNewRankingList(id: number) {
  return http.get({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

export function getArtistList(limit = 30) {
  return http.get({
    url: '/artist/list',
    params: {
      limit
    }
  })
}
