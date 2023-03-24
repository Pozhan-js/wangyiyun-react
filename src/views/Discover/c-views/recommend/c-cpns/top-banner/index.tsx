import React, { memo, useState, useRef } from 'react'
import type { FC, ReactNode, ElementRef } from 'react'
import { Carousel, Button } from 'antd'
import classNames from 'classnames'
import { useAppSelector, shallowEqualApp } from '@/store'
import { BannerWrapper, BannerLeft, BannerRight, BannerControl } from './style'

interface IProps {
  children?: ReactNode
}

const TopBanner: FC<IProps> = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  /**
   * 从store中获取数据
   */
  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqualApp
  )

  /**定义内部数据 */
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)

  let backgroundImage = banners[currentIndex]?.imageUrl
  if (backgroundImage) {
    backgroundImage = backgroundImage + '?imageView&blur=40x20'
  }
  /**
   * 事件处理函数
   */
  function handlePrevClick() {
    console.log('左')

    bannerRef.current?.prev()
  }
  function handleNextClick() {
    console.log('右')

    bannerRef.current?.next()
  }
  // function handleAfterChange(current: number) {
  //   // setCurrentIndex(current)
  //   // console.log(current)
  //   // 写出轮播图的运行原理
  //   // TODO:写出轮播图的运行原理
  //   return current
  // }
  function handleBeforeChange(from: number, to: number) {
    // console.log(from, to)
    setCurrentIndex(to)
  }

  return (
    <BannerWrapper
      style={{
        background: `url('${backgroundImage}') center center / 6000px`
      }}
    >
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel
            autoplay
            autoplaySpeed={3000}
            // afterChange={handleAfterChange}
            beforeChange={handleBeforeChange}
            effect="fade"
            dots={false}
            ref={bannerRef}
          >
            {banners.map((item) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              )
            })}
          </Carousel>
          <ul className="dots">
            {banners.map((item, index) => {
              return (
                <li key={item.imageUrl}>
                  <span
                    className={classNames('item', {
                      active: currentIndex === index
                    })}
                  ></span>
                </li>
              )
            })}
          </ul>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          {/* TODO:切换轮播图按钮消失 */}
          <Button className="btn left" onClick={handlePrevClick}></Button>
          <Button className="btn right" onClick={handleNextClick}></Button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
}
export default memo(TopBanner)
