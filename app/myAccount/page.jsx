"use client"
import React from 'react'
import BarChart from '@/component/myaccount/farmerDesh/barChart'
import LeastOrder from '@/component/myaccount/farmerDesh/leastOrder'
import Sortinfo from '@/component/myaccount/farmerDesh/sortInfo'

const MyAccount = () => {
  return (
    <div className='dashboard-container m-0'>
      <Sortinfo/>
      <div className='row'>
          <div className='col-md-8'>
            <BarChart />
          </div>
          <div className='col-md-4'>
            <LeastOrder />
          </div>
        </div>
    </div>
  )
}

export default MyAccount