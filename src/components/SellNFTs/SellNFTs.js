import React from 'react'
import SellNFTCard from './SellNFTCard';
import './SellNFTs.css';
import setupData from '../SampleData/SetupWallet';
import { Link } from 'react-router-dom';
import {Fade} from "react-reveal";
import useWindowDimensions from "../../Utils/useWindowDimensions"

function SellNFTs() {
  const {width} = useWindowDimensions()
  return (
    <div className="topCollections_page">
    <div className="container-fluid">
        <div className="row topCollections_heading_container">
            <h1 className="topCollections_heading">Create and Sell your NFTs</h1>
        </div>
        <Fade bottom>
        <div className="row" >
          {
            width < 600 ? null : <div className='col-1'></div>
          }
            <div className='col-11 col-md-10 mx-auto'>
                <div className='row'>
                    {setupData.map((e)=>
                    <SellNFTCard heading={e.heading} desc={e.desc} />
                    )}
                </div>
            </div>
          {
            width < 600 ? null : <div className='col-1'></div>
          }
      </div>
      </Fade>
      <div className="row btn_row" >
        <Link to='/mint'>
          <button className="section-bottom-button">Create</button>
          </Link>
      </div>
    </div>
  </div>
  )
}

export default SellNFTs