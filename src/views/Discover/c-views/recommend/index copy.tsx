import React, { memo, useState, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import http from '@/service'

interface IProps {
  children?: ReactNode
}

export interface IBanner {
  imageUrl: string
  targetId: number
  targetType: number
  titleColor: string
  typeTitle: string
  url: any
  exclusive: boolean
  scm: string
  bannerBizType: string
}

const Recommend: FC<IProps> = () => {
  const [banners, setBanners] = useState<IBanner[]>([])

  useEffect(() => {
    http
      .get({
        url: '/banner'
      })
      .then((res) => {
        // console.log(res)
        setBanners(res.banners)
      })
  }, [])
  // console.log(banners)
  return (
    <div>
      Recommend
      <ul>
        {banners.map((item, index) => {
          return <li key={index}>{item.imageUrl}</li>
        })}
      </ul>
    </div>
  )
}
export default memo(Recommend)
