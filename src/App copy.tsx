import React, { Suspense } from 'react'
import { useRoutes, Link } from 'react-router-dom'
// import { useSelector, shallowEqual } from 'react-redux'
// import { shallowEqual } from 'react-redux'
import routes from './router'
import { useAppSelector, useAppDisPatch, shallowEqualApp } from './store'
import { changeMessages } from '@/store/modules/counter'
import { Button } from 'antd'

// import { IRootState } from './store'

// import store from './store'

// // 现获取函数的类型 typeof 返回类型
// type GetStateFnType = typeof store.getState
// // 工具函数ReturnType 返回函数的返回值类型
// type IRootState = ReturnType<GetStateFnType>

function App() {
  const { count, messages } = useAppSelector(
    (state) => ({
      count: state.counter.count,
      messages: state.counter.messages
    }),
    //当state没有发生改变时,就不会被重新执行
    shallowEqualApp
  )

  const disPatch = useAppDisPatch()

  function handleChangeMessage() {
    // console.log('xxxx')
    disPatch(changeMessages('我爱世界'))
  }

  return (
    <div className="App">
      <div>xxx:{count}</div>
      <div>yyy:{messages}</div>
      <div className="nav">
        <Link to={'/discover'}>发现音乐</Link>
        <Link to={'/mine'}>我的音乐</Link>
        <Link to={'/focus'}>关注</Link>
        <Link to={'/download'}>下载客户端</Link>
      </div>
      <Button type="primary">Button</Button>
      <button onClick={handleChangeMessage}>修改message</button>
      <Suspense fallback="">
        <div className="main"> {useRoutes(routes)}</div>
      </Suspense>
    </div>
  )
}

export default App
