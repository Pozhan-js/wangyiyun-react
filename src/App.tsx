import React, { Suspense, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'
import AppPlayerBar from '@/views/Player/app-palyer-bar'
import { useAppDisPatch } from './store'
import { fetchCurrentSongAction } from '@/views/Player/store/player'

function App() {
  const dispatch = useAppDisPatch()
  useEffect(() => {
    // 注意有些歌曲是不能播放的 tobu life
    // dispatch(fetchCurrentSongAction(28830410))
    dispatch(fetchCurrentSongAction(484057003))
  }, [])
  return (
    <div className="App">
      <AppHeader></AppHeader>
      <Suspense fallback="">
        <div className="main"> {useRoutes(routes)}</div>
      </Suspense>
      <AppFooter></AppFooter>
      {/* 播放器工具栏 */}
      <AppPlayerBar></AppPlayerBar>
    </div>
  )
}

export default App
