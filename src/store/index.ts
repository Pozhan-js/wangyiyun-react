import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/store/modules/counter'
import {
  useSelector,
  useDispatch,
  TypedUseSelectorHook,
  shallowEqual
} from 'react-redux'
import recommendReducer from '@/views/Discover/c-views/recommend/store/recommend'
import playerReducer from '@/views/Player/store/player'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    recommend: recommendReducer,
    player: playerReducer
  }
})

// 现获取函数的类型 typeof 返回类型
type GetStateFnType = typeof store.getState
// 工具函数ReturnType 返回函数的返回值类型
export type IRootState = ReturnType<GetStateFnType>
// 获取dispatch函数的类型
type IRootDispatch = typeof store.dispatch

//创建自己定义的函数  (这里是一个函数调用签名)
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
export const useAppDisPatch: () => IRootDispatch = useDispatch
export const shallowEqualApp = shallowEqual

export default store
