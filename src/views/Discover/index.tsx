import React, { memo, Suspense } from 'react'
import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './c-cpns/NavBar'

interface IProps {
  children?: ReactNode
}

const Discover: FC<IProps> = () => {
  return (
    <div>
      <div>
        <NavBar></NavBar>
      </div>
      <Suspense fallback="">
        <Outlet></Outlet>
      </Suspense>
    </div>
  )
}
export default memo(Discover)
