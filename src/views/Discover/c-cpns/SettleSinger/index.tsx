import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { SettleSingerWrapper } from './style'
import AreaHeaderV2 from '@/components/AresHeaderV2'
import { useAppSelector, shallowEqualApp } from '@/store'
import { getImageUrl } from '@/utils/format'

interface IProps {
  children?: ReactNode
}

const SettleSinger: FC<IProps> = () => {
  const { settleSinger } = useAppSelector((state) => {
    return {
      settleSinger: state.recommend.settleSinger
    }
  }, shallowEqualApp)
  return (
    <SettleSingerWrapper>
      <AreaHeaderV2
        title="入驻歌手"
        moreText="查看全部 &gt;"
        moreLink="#/discover/ranking"
      ></AreaHeaderV2>
      <div className="artists">
        {settleSinger.map((item) => {
          return (
            <a href="#/discover/artist" className="item" key={item.id}>
              <img src={getImageUrl(item.picUrl, 62)} alt="" />
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="alias">{item.alias.join(' ')}</div>
              </div>
            </a>
          )
        })}
      </div>
      <div className="apply-for">
        <a href="#">申请成为网易音乐人</a>
      </div>
    </SettleSingerWrapper>
  )
}
export default memo(SettleSinger)
