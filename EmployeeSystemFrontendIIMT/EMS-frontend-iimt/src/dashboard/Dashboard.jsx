import React, {  } from 'react'
import Sidebar from './Sidebar'
import DashboardContent from './DashboardContent'
import AttendanceReport from '../pages/AttendanceReport'
import HeaderComponent from '../component/HeaderComponent'
import useUserStorage from '../Stores/UserStorage'
import WelcomePage from '../pages/WelcomePage'

function Dashboard({ children }) {
  return (
   <>
    <HeaderComponent/>
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 p-0">
          <Sidebar />
        </div>
        <div className="col-10">
          {children ? children : <WelcomePage/>}
        </div>
      </div>
    </div>
   </>
  )
}

export default Dashboard
