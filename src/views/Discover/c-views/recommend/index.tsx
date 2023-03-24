import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { useAppDisPatch } from '@/store'
import {
  // fetchBannerDataAction,
  // fetchHotRecommendActions,
  // fetchNewAlbumAction,
  fetchRecommendDataAction,
  fetchNewRankingListAction
} from './store/recommend'
import TopBanner from './c-cpns/top-banner'
import TopRanking from './c-cpns/top-ranking'
import { RecommendedWrapper } from './style'
import HotRecommend from '../../c-cpns/HotRecommend'
import NewAlbum from '../../c-cpns/NewAlbum'
import UserLogin from './c-cpns/user-login'
import SettleSinger from '../../c-cpns/SettleSinger'
import HotAnchor from '../../c-cpns/HotAnchor'

interface IProps {
  children?: ReactNode
}

const Recommend: FC<IProps> = () => {
  const dispatch = useAppDisPatch()
  useEffect(() => {
    // 调用异步函数
    // dispatch(fetchBannerDataAction())
    // dispatch(fetchHotRecommendActions())
    // dispatch(fetchNewAlbumAction())
    dispatch(fetchRecommendDataAction())
    dispatch(fetchNewRankingListAction())
  }, [])
  return (
    <RecommendedWrapper>
      <TopBanner></TopBanner>
      <div className="content wrap-v2">
        <div className="left">
          <HotRecommend></HotRecommend>
          <NewAlbum></NewAlbum>
          <TopRanking></TopRanking>
        </div>
        <div className="right">
          <UserLogin></UserLogin>
          <SettleSinger></SettleSinger>
          <HotAnchor></HotAnchor>
        </div>
      </div>
    </RecommendedWrapper>
  )
}
export default memo(Recommend)
