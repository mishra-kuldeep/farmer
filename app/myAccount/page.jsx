"use client"
import React from 'react'
import BarChart from '@/component/myaccount/farmerDash/barChart'
import LeastOrder from '@/component/myaccount/farmerDash/leastOrder'
import Sortinfo from '@/component/myaccount/farmerDash/sortInfo'
import BuyerSortInfo from '@/component/myaccount/buyerDash/buyerSortInfo'
import { useSelector } from 'react-redux'
import SelectedTransporter from '@/component/myaccount/buyerDash/selectedTransporter'

const MyAccount = () => {
  const user = useSelector((state) => state.auth);
  return (
    <div className='dashboard-container m-0'>
     { user?.profile?.role === 2 && <Sortinfo/>}
     { user?.profile?.role === 3 && <BuyerSortInfo/>}
      <div className='row'>
          <div className='col-md-7'>
            <BarChart />
          </div>
          <div className='col-md-5'>
           { user?.profile?.role === 2 &&  <LeastOrder />}
           { user?.profile?.role === 3 &&  <SelectedTransporter />}
          </div>
        </div>
    </div>
  )
}

export default MyAccount