import React, {  } from 'react'
import Sidebar from './Sidebar'
import HeaderComponent from '../component/HeaderComponent'

function Dashboard({ children }) {
  return (
   <>
    <HeaderComponent/>
    <div className="container-fluid">
      <div className="row border">
        <div className="col-lg-2 p-0">
          <Sidebar />
        </div>
        <div className="col-lg-10">
          {children}
        </div>
      </div>
    </div>
   </>
  )
}

export default Dashboard
