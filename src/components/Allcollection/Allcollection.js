import React, { useState, useEffect } from 'react';
import Logout from "../../Assets/exit.png";
import Collectioncard from '../ProfileCollection/Profilecard'
import { useNavigate } from "react-router-dom";
import CollectionCard from "../CollectionCard/CollectionCard";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet, connectFailed } from "../../redux/WalletAction";
import './MarketPlaceCollection.css'
import axios from 'axios';
import CopyRightFooter from '../CopyRightFooter/CopyRightFooter';
import FilterNav from '../FilterNav/AllcollectionfilterNav';
import useWindowDimensions from '../../Utils/useWindowDimensions';
const AWS = require('aws-sdk');
function Allcollection({ showFilter, setShowFilter }) {
  let history = useNavigate();
  const [loading, setloading] = useState(false)
  const [nftcollectiondata, setNftcollectionData] = useState([]);
  const [collectiondata, setcollectiondata] = useState([]);
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.WalletConnect);
  const { web3, address, market } = wallet;
  const [allcollectiondata, setallcollectiondata] = useState([]);
  const [nftdata, setNftData] = useState([]);
  const {width} = useWindowDimensions()
  const getcollection = async () => {
    let tokensresult = await axios.get(process.env.REACT_APP_API_URL.toString() + "/getAllcollection");
    setcollectiondata(tokensresult.data.result);
  }
  const getNftData = async () => {
    let tokensresult = await axios.get(process.env.REACT_APP_API_URL.toString() + "/getAll");
    setNftData(tokensresult.data.result);
    setallcollectiondata(tokensresult.data.result);
  }
  useEffect(() => {
    getcollection();
    getNftData();
  }, []);

  const Collections = (nft) => {
    localStorage.setItem("collectionname", nft.CollectionName);
    history(`/UserCollection/${nft.CollectionName}`);
  }
  const buyNft = async (nft) => {
    history(`/collection/${process.env.REACT_APP_NFT_ETH_CONTRACT}/${nft.NftId}`,{state: { owner:nft?.WalletAddress==address  }, });
  }
  const searchInputhandle = async (searchInput, value, min, max) => {
    let tokensresult = await axios.post(process.env.REACT_APP_API_URL.toString() + "/Searchcollection", { searchInput: searchInput, value: value, min: min, max: max });
    setcollectiondata(tokensresult.data.result)
  }

  const errorDiv = () => {
    return (
      <p>Wallet Disconnected!</p>
    )
  }
  const logoutclicked = () => {
    const { web3Modal } = wallet;
    web3Modal.clearCachedProvider();
    dispatch(connectFailed(errorDiv()));
    history('/');
  }


  return (
    <>
      <div className="MarketPlaceCollection_page" >
        <div className="container-fluid">
          {
            width > 600 &&
            <div className="row MarketPlaceCollectionRow1">
              <div className="col-lg-2 logoutIcon_container">
                <img src={Logout} onClick={() => logoutclicked()} />
              </div>
              <div className="col-lg-10 MarketPlaceCollection_heading_container">
              </div>
            </div>
           }
          <FilterNav showFilter={showFilter} execute={searchInputhandle} setShowFilter={setShowFilter} />
          <div className="row collection_heading_container">
            <h1 className="our_collections_heading">Our Collections</h1>
          </div>
          <div className="row nftcard-body" >
            {
              width > 600 ? <div className='col-1 col-sm-0'></div> : null
            }
            
            <div className='col-12 col-sm-12 col-md-12'>
            <div className={width > 600 ? "container" : "" }>
                <div className= {width < 600 ? "row mx-2" : "row"} 
                style={{ justifyContent: "space-around", marginLeft:width < 600 ? "0px" : "1%"}}>
                  {collectiondata !== [] ? collectiondata.map((e, i) =>
                    <Collectioncard key={i} nft={e} execute={Collections} />
                  ) : ''}
                </div>
              </div>
            </div>
            {
              width > 600 ? <div className='col-1 col-sm-0'></div> : null
            }
          </div>
        </div>
      </div>
      <CopyRightFooter />
    </>
  )
}

export default Allcollection