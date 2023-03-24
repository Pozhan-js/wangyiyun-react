import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { AlbumWrItemWrapper } from './style'
import { getImageUrl } from '@/utils/format'

interface IProps {
  children?: ReactNode
  itemData?: any
}

const NewAlbumItem: FC<IProps> = (props) => {
  const { itemData } = props
  return (
    <AlbumWrItemWrapper>
      <div className="top">
        <img src={getImageUrl(itemData.picUrl, 100)} alt="" />
        <a href="" className="cover sprite_cover"></a>
      </div>
      <div className="bottom">
        <div className="name">{itemData.name}</div>
        <div className="artist">{itemData.artist.name}</div>
      </div>
    </AlbumWrItemWrapper>
  )
}
export default memo(NewAlbumItem)
