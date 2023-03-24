import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSongDetail, getSongLytic } from './../service/player'
import { ParseLyric, ILyric } from '@/utils/parse-lyric'

export const fetchCurrentSongAction = createAsyncThunk(
  'currentSong',
  async (id: number, { dispatch }) => {
    getSongDetail(id).then((res) => {
      if (!res.songs.length) return
      const song = res.songs[0]
      dispatch(changeCurrentSongAction(song))
      // console.log(res.songs[0])
    })

    getSongLytic(id).then((res) => {
      // console.log(ParseLyric(res?.lrc?.lyric))
      dispatch(changeLyricAction(ParseLyric(res?.lrc?.lyric)))
    })
  }
)
interface IPlayerState {
  currentSong: any
  lyrics: ILyric[]
  lyricIndex: number
  playSongList: []
  playSongIndex: number
}

const initialState: IPlayerState = {
  currentSong: {},
  lyrics: [],
  lyricIndex: -1,
  playSongList: [],
  playSongIndex: -1
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload
    },
    changeLyricAction(state, { payload }) {
      state.lyrics = payload
    },
    changeLyricIndexAction(state, { payload }) {
      state.lyricIndex = payload
    }
  }
})

export default playerSlice.reducer
export const {
  changeCurrentSongAction,
  changeLyricAction,
  changeLyricIndexAction
} = playerSlice.actions
