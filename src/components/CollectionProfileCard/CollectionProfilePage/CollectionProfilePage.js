import React from 'react'
import NFTCard from '../../NFTCard/NFTCard'
import CollectionProfileCard from '../CollectionProfileCard'
import NFTCardData from '../../SampleData/TopTrendingList'
import FilterNav from '../../FilterNav/FilterNav'
import './CollectionProfilePage.css'
import CopyRightFooter from '../../CopyRightFooter/CopyRightFooter'
import { useDispatch, useSelector } from "react-redux";
function CollectionProfilePage({ showFilter , setShowFilter }) {
  const wallet = useSelector((state) => state.WalletConnect);
  const { web3, address, market } = wallet;
  return (
    <>
    <div className=' container-fluid CollectionProfilePage_page'>
        <div className='row'>
            <div className='col-1'></div> 
            <div className='col-10 collction_profile_card_container'>
            <CollectionProfileCard/>
            </div>
            <div className='col-1'></div>
        </div>
        <div className='row'>
        <FilterNav showFilter={showFilter}  setShowFilter={setShowFilter}/>
        </div>
        <div className="row" >
            <div className='col-1'></div> 
            <div className='col-10'>
              <div className='row'> 
            {NFTCardData.map((e)=>
          <NFTCard nftImage={e.nftImage} price={e.price} address={address}  />
          )}
          </div>
            </div>
            <div className='col-1'></div>
         
        
            </div>
    </div>
    <CopyRightFooter/>
    </>
  )
}

export default CollectionProfilePage