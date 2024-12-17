"use client"
import BuyerBarChart from '@/component/myaccount/buyerDash/buyerBharchart';
import BuyerSortInfo from '@/component/myaccount/buyerDash/buyerSortInfo';
import SelectedTransporter from '@/component/myaccount/buyerDash/selectedTransporter';
import BarChart from '@/component/myaccount/farmerDash/barChart';
import LeastOrder from '@/component/myaccount/farmerDash/leastOrder';
import Sortinfo from '@/component/myaccount/farmerDash/sortInfo';
import LeastOrderpickup from '@/component/myaccount/transpoterDash/leastOrderpickup';
import TransporterBarChart from '@/component/myaccount/transpoterDash/transporterBharchart';
import TranspoterSortInfo from '@/component/myaccount/transpoterDash/transpoterSortInfo';
import React from 'react'
import { useSelector } from 'react-redux'


const MyAccount = () => {
  const user = useSelector((state) => state.auth);
  return (
    <div className='dashboard-container m-0'>
     { user?.profile?.role === 2 && <Sortinfo/>}
     { user?.profile?.role === 3 && <BuyerSortInfo/>}
     { user?.profile?.role === 4 && <TranspoterSortInfo/>}
      <div className='row'>
          <div className='col-md-7'>
          { user?.profile?.role === 2 &&  <BarChart />}
          { user?.profile?.role === 3 &&  <BuyerBarChart />}
          { user?.profile?.role === 4 &&  <TransporterBarChart />}
          </div>
          <div className='col-md-5'>
           { user?.profile?.role === 2 &&  <LeastOrder />}
           { user?.profile?.role === 3 &&  <SelectedTransporter />}
           { user?.profile?.role === 4 &&  <LeastOrderpickup />}
          </div>
        </div>
    </div>
  )
}

export default MyAccount