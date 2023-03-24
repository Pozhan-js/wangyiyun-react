import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { TopRankingWrapper } from './style'
import AreaHeaderV1 from '@/components/AreaHeaderV1'
import { shallowEqualApp, useAppSelector } from '@/store'
import TopRankingItem from '../top-ranking-item'

interface IProps {
  children?: ReactNode
}

const TopRanking: FC<IProps> = () => {
  const { rankings = [] } = useAppSelector((state) => {
    return {
      rankings: state.recommend.rankings
    }
  }, shallowEqualApp)
  return (
    <TopRankingWrapper>
      <AreaHeaderV1 title="榜单" moreLink="/discover/ranking"></AreaHeaderV1>
      <div className="content">
        {rankings.map((item) => {
          return <TopRankingItem key={item.id} itemData={item}></TopRankingItem>
        })}
      </div>
    </TopRankingWrapper>
  )
}
export default memo(TopRanking)
