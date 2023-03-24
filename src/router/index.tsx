import React, { lazy } from 'react'
import { RouteObject, Navigate } from 'react-router-dom'

//当组件这杨引入时 在打包时 webpack会将这些组件打包到一个js文件 这样导致文件过大 阻塞加载
// 可以进行组件分包 我们在js中 分包 会用到import（） 函数 在react中会用到lazy（）
// import Discover from '@/views/Discover'
// import Mine from '@/views/Mine'
// import Focus from '@/views/Focus'
// import Download from '@/views/Download'

const Discover = lazy(() => import('@/views/Discover'))
const Recommend = lazy(() => import('@/views/Discover/c-views/recommend'))
const Ranking = lazy(() => import('@/views/Discover/c-views/ranking'))
const Songs = lazy(() => import('@/views/Discover/c-views/songs'))
const DjRadio = lazy(() => import('@/views/Discover/c-views/djradio'))
const Artist = lazy(() => import('@/views/Discover/c-views/artist'))
const Album = lazy(() => import('@/views/Discover/c-views/album'))

const Focus = lazy(() => import('@/views/Focus'))
const Mine = lazy(() => import('@/views/Mine'))
const Download = lazy(() => import('@/views/Download'))

// 懒加载也会带来问题js代码会先执行一次同步代码 当js执行解析路由时 组件还未加载完成 这时就会报错
// 我们可以用到

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'/mine'} />
  },
  {
    path: '/discover',
    element: <Discover />,
    children: [
      {
        path: 'recommend',
        element: <Recommend />
      },
      {
        path: 'ranking',
        element: <Ranking></Ranking>
      },
      {
        path: 'songs',
        element: <Songs />
      },
      {
        path: 'djradio',
        element: <DjRadio />
      },
      {
        path: 'artist',
        element: <Artist />
      },
      {
        path: 'album',
        element: <Album />
      }
    ]
  },
  {
    path: '/mine',
    element: <Mine />
  },
  {
    path: '/focus',
    element: <Focus />
  },
  {
    path: '/download',
    element: <Download />
  }
]

export default routes
