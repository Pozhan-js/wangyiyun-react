import React, { memo } from 'react'
import { FC, ReactNode, useRef, ElementRef } from 'react'
import { AlbumWrapper } from './style'
import { shallowEqualApp, useAppSelector } from '@/store'
import AreaHeaderV1 from '@/components/AreaHeaderV1'
import { Carousel } from 'antd'
import NewAlbumItem from '@/components/NewAlbumItem'

interface IProps {
  children?: ReactNode
}

const NewAlbum: FC<IProps> = () => {
  /* 拿到轮播图实列 */
  const bannersRef = useRef<ElementRef<typeof Carousel>>(null)

  /* 获取redux中的数据 */
  const { newAlbums } = useAppSelector((state) => {
    return {
      newAlbums: state.recommend.newAlbums
    }
  }, shallowEqualApp)
  // console.log(newAlbums)

  /* 点击切换轮播图 */
  function handlePrevClick() {
    bannersRef.current?.prev()
  }
  function handleNextClick() {
    bannersRef.current?.next()
  }

  return (
    <AlbumWrapper>
      <AreaHeaderV1 title="新碟上架" moreLink="/discover/album"></AreaHeaderV1>
      <div className="content">
        <button
          className="sprite_02 arrow arrow-left"
          onClick={handlePrevClick}
        ></button>
        <div className="banner">
          <Carousel ref={bannersRef} dots={false} speed={1500}>
            {[0, 1].map((item) => {
              return (
                <div key={item}>
                  <div className="album-list">
                    {newAlbums?.slice(item * 5, (item + 1) * 5).map((album) => {
                      return (
                        <NewAlbumItem
                          key={album.id}
                          itemData={album}
                        ></NewAlbumItem>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
        <button
          className="sprite_02 arrow arrow-right"
          onClick={handleNextClick}
        ></button>
      </div>
    </AlbumWrapper>
  )
}
export default memo(NewAlbum)
