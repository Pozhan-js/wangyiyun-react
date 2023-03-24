import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getBanners,
  getHotRecommend,
  getNewAlbum,
  getNewRankingList,
  getArtistList
} from '../service/recommend'

interface IRecommoendState {
  banners: any[]
  hotRecommends: any[]
  newAlbums: any[]
  rankings: any[]
  settleSinger: any[]
  // upRanking: any
  // newRanking: any
  // originRankings: any
}
// 轮播图
// export const fetchBannerDataAction = createAsyncThunk(
//   'banners',
//   async (arg, { dispatch }) => {
//     const res = await getBanners()
//     // console.log(res)
//     dispatch(changeBannersActions(res.banners))
//     // return res.banners
//   }
// )
// // 热门推荐
// export const fetchHotRecommendActions = createAsyncThunk(
//   'hotRecommend',
//   async (arg, { dispatch }) => {
//     const res = await getHotRecommend(8)
//     dispatch(changeHotRecommendAction(res.result))
//     // console.log(res)
//   }
// )
// // 内容轮播
// export const fetchNewAlbumAction = createAsyncThunk(
//   'newAlbum',
//   async (arg, { dispatch }) => {
//     const res = await getNewAlbum()
//     dispatch(changeNewAlbumAction(res.albums))
//     // console.log(res)
//   }
// )

export const fetchRecommendDataAction = createAsyncThunk(
  'fetchData',
  async (_, { dispatch }) => {
    getBanners().then((res) => {
      dispatch(changeBannersActions(res.banners))
    }),
      getHotRecommend(8).then((res) => {
        dispatch(changeHotRecommendAction(res.result))
      }),
      getNewAlbum().then((res) => {
        dispatch(changeNewAlbumAction(res.albums))
      }),
      getArtistList(5).then((res) => {
        dispatch(changeArtistListAction(res.artists))
      })
  }
)
const rankingIds = [19723756, 3779629, 2884035]
// 排行榜单
export const fetchNewRankingListAction = createAsyncThunk(
  'ranking',
  async (_, { dispatch }) => {
    // 第一种方式 rankingIds.forEach((item) => {
    //   getNewRankingList(item).then((res) => {
    //     switch (item) {
    //       case 19723756:
    //         console.log(res)
    //         break
    //       case 3779629:
    //         console.log(res)
    //         break
    //       case 2884035:
    //         console.log(res)
    //         break
    //     }
    //   })
    // })
    // 第二种方式
    /* 为了保证能所有结果的顺序是正确的 */
    const promise: Promise<any>[] = []
    for (const id of rankingIds) {
      promise.push(getNewRankingList(id))
    }

    Promise.all(promise).then((res) => {
      // console.log(res)
      const playlists = res.map((item) => item.playlist)
      dispatch(changeRankingsAction(playlists))
    })
  }
)

const initialState: IRecommoendState = {
  banners: [],
  hotRecommends: [],
  newAlbums: [],
  rankings: [],
  settleSinger: []
  // upRanking: {},
  // newRanking: {},
  // originRankings: {}
}

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersActions(state, { payload }) {
      state.banners = payload
    },
    changeHotRecommendAction(state, { payload }) {
      state.hotRecommends = payload
    },
    changeNewAlbumAction(state, { payload }) {
      state.newAlbums = payload
    },
    changeRankingsAction(state, { payload }) {
      state.rankings = payload
    },
    changeArtistListAction(state, { payload }) {
      state.settleSinger = payload
    }
    // changeNewRankingAction(state, { payload }) {
    //   state.newRanking = payload
    // },
    // changeOriginRankingAction(state, { payload }) {
    //   state.originRankings = payload
    // }
  }
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchBannerDataAction.pending, () => {
  //       console.log('pending')
  //     })
  //     .addCase(fetchBannerDataAction.fulfilled, (state, { payload }) => {
  //       state.banners = payload
  //     })
  // }
})

export const {
  changeBannersActions,
  changeHotRecommendAction,
  changeNewAlbumAction,
  changeRankingsAction,
  changeArtistListAction
  // changeUpRankingAction,
  // changeNewRankingAction,
  // changeOriginRankingAction
} = recommendSlice.actions
export default recommendSlice.reducer
