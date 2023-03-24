import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HotAnchorWrapper } from './style'
import { hotRadios } from '@/assets/data/loacl_data'
import AreaHeaderV2 from '@/components/AresHeaderV2'

interface IProps {
  children?: ReactNode
}

const HotAnchor: FC<IProps> = () => {
  return (
    <HotAnchorWrapper>
      <AreaHeaderV2 title="热门主播"></AreaHeaderV2>
      <div className="anchors">
        {hotRadios.map((item) => {
          return (
            <div className="item" key={item.picUrl}>
              <div className="image">
                <img src={item.picUrl} alt="" />
              </div>
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="position">{item.position}</div>
              </div>
            </div>
          )
        })}
      </div>
    </HotAnchorWrapper>
  )
}
export default memo(HotAnchor)
