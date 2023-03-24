import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { RecommendWrapper } from './style'
import AreaHeaderV1 from '@/components/AreaHeaderV1'
import { shallowEqualApp, useAppSelector } from '@/store'
import SongsMenuItem from '@/components/SongsMenuItem'
interface IProps {
  children?: ReactNode
}

const HotRecommend: FC<IProps> = () => {
  const { hotRecommend } = useAppSelector((state) => {
    return {
      hotRecommend: state.recommend.hotRecommends
    }
  }, shallowEqualApp)

  return (
    <RecommendWrapper>
      <AreaHeaderV1
        keywords={['华语', '流行', '摇滚', '民谣', '电子']}
        title={'热门推荐'}
        moreLink="/discover/songs"
      ></AreaHeaderV1>
      <div className="recommend-list">
        {hotRecommend.map((item) => {
          return <SongsMenuItem key={item.id} itemData={item}></SongsMenuItem>
        })}
      </div>
    </RecommendWrapper>
  )
}
export default memo(HotRecommend)
