import React from 'react'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <div>
        {/* navbar */}
      <div>

      </div>
      {/* outlet */}
      <div>
        <Outlet/>
      </div>
      {/* footer */}
      <div>

      </div>
    </div>
  )
}

export default Root
