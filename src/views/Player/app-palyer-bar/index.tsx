import React, { memo, useEffect, useState, useRef } from 'react'
import type { FC, ReactNode } from 'react'
import { Slider, message } from 'antd'
import { Link } from 'react-router-dom'
import {
  PlayerBarWrapper,
  BarControl,
  BarOperator,
  BarPlayerInfo
} from './style'
import { shallowEqualApp, useAppDisPatch, useAppSelector } from '@/store'
import { getImageUrl } from '@/utils/format'
import { getSongPlayUrl, formateTime } from '@/utils/handle-player'
import { changeLyricIndexAction } from './../store/player'

interface IProps {
  children?: ReactNode
}

const AppPlayerBar: FC<IProps> = () => {
  /* 组件内部定义的数据 */
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [progress, setProgress] = useState<number>(0)
  const [isSliding, setIsSliding] = useState<boolean>(false)
  const [duration, setDuration] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState(0)

  const audioRef = useRef<HTMLAudioElement>(null)

  const { currentSong, lyrics, lyricIndex } = useAppSelector((state) => {
    return {
      currentSong: state.player.currentSong,
      lyrics: state.player.lyrics,
      lyricIndex: state.player.lyricIndex
    }
  }, shallowEqualApp)
  // console.log(currentSong)

  const dispatch = useAppDisPatch()

  // /* 组件内副作用 */
  useEffect(() => {
    // 1.播放音乐 感叹号表示强解析 表示一定有值
    audioRef.current!.src = getSongPlayUrl(currentSong.id)
    // audioRef.current
    //   ?.play()
    //   .then(() => {
    //     setIsPlaying(true)
    //     console.log('歌曲播放成功！')
    //   })
    //   .catch((err) => {
    //     setIsPlaying(false)
    //     console.log('歌曲播放失败！', err)
    //   })
    //获取歌曲总时长
    setDuration(currentSong.dt)
  }, [currentSong])

  // 音乐播放的进度处理
  function handleTimeUpdate() {
    // 当前时间
    const currentTimeX = (audioRef.current?.currentTime as number) * 1000
    if (!isSliding) {
      // 获取进度
      const progress = ((currentTimeX as number) / duration) * 100
      setCurrentTime(currentTimeX)
      setProgress(progress)
    }

    // 虎丘当前时间的歌词
    let index = lyrics.length - 1
    for (let i = 0; i < lyrics.length; i++) {
      const lyric = lyrics[i]
      if (lyric.time > currentTime) {
        index = i - 1
        break
      }
    }
    //记录当前index 表示当下标为一样是
    if (lyricIndex == index || index == -1) return
    dispatch(changeLyricIndexAction(index))
    const currentLyric = lyrics[index]
    // console.log(lyrics[index].text)

    // 显示歌词 open显示你没有图标
    message.open({
      content: currentLyric.text,
      //设置为0 就不会消失
      // duration: 0,设置key值 表示 有相同调用时会覆盖前面的
      key: 'lyric',
      style: {
        bottom: '60px'
      }
    })
  }

  // 改变音乐播放进度
  function handleSliderChange(value: number) {
    const currentTime = (value / 100) * duration

    // 设置播放时间
    audioRef.current!.currentTime = currentTime / 1000
    setProgress(value)
    setCurrentTime(currentTime)
    setIsSliding(false)
  }

  // 拖拽进度条改变进度
  function handleSliderChanging(value: number) {
    setIsSliding(true)
    setProgress(value)

    //获取拖拽时对应的时间
    const time = (value / 100) * duration
    setCurrentTime(time)
  }

  // 暂停按钮
  function handlePlayBtnClick() {
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setIsPlaying(!isPlaying))
    // console.log(isPlaying)
    setIsPlaying(!isPlaying)
    // console.log(isPlaying)
  }

  return (
    <PlayerBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl isPlaying={isPlaying}>
          <button className="btn sprite_playbar prev"></button>
          <button
            onClick={handlePlayBtnClick}
            className="btn sprite_playbar play"
          ></button>
          <button className="btn sprite_playbar next"></button>
        </BarControl>
        <BarPlayerInfo>
          <Link to="#/player">
            <img
              className="image"
              alt=""
              src={getImageUrl(currentSong?.al?.picUrl, 50)}
            />
          </Link>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong?.name}</span>
              <span className="singer-name">{currentSong?.ar?.[0]?.name}</span>
            </div>
            <div className="progress">
              {/* 这个是进度条组件 */}
              <Slider
                step={0.5}
                tooltip={{ formatter: null }}
                value={progress}
                onAfterChange={handleSliderChange}
                onChange={handleSliderChanging}
              ></Slider>
              <div className="time">
                <span className="current">{formateTime(currentTime)}</span>
                <span className="divider">/</span>
                <span className="duratio">{formateTime(duration)}</span>
              </div>
            </div>
          </div>
        </BarPlayerInfo>
        <BarOperator>
          <div className="left">
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="btn sprite_playbar volume"></button>
            <button className="btn sprite_playbar loop"></button>
            <button className="btn sprite_playbar playlist"></button>
          </div>
        </BarOperator>
      </div>
      {/* TODO 歌曲列表以及 onEnded 事件没有写 */}
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate}></audio>
    </PlayerBarWrapper>
  )
}
export default memo(AppPlayerBar)
