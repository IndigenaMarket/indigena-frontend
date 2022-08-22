import React, { useState, useEffect } from 'react';
import Logout from "../../Assets/exit.png";
import Collectioncard from '../ProfileCollection/Profilecard'
import { useNavigate } from "react-router-dom";
import CollectionCard from "../CollectionCard/CollectionCard";
import NFTCard from '../NFTCard/NFTCard';
import { useDispatch, useSelector } from "react-redux";
import { connectWallet, connectFailed } from "../../redux/WalletAction";
import '../MarketPlaceCollection/MarketPlaceCollection.css'
import axios from 'axios';
import CopyRightFooter from '../CopyRightFooter/CopyRightFooter';
import FilterNav from '../FilterNav/FilterNav';
import useWindowDimensions from '../../Utils/useWindowDimensions';
const AWS = require('aws-sdk');

function Allnft({ showFilter, setShowFilter }) {
  let history = useNavigate();
  const {width} = useWindowDimensions()
  const [loading, setloading] = useState(false)
  const [nftcollectiondata, setNftcollectionData] = useState([]);
  const [collectiondata, setcollectiondata] = useState([]);
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.WalletConnect);
  const { web3, address, market } = wallet;
  const [allcollectiondata, setallcollectiondata] = useState([]);
  const [nftdata, setNftData] = useState([]);

  const getNftData = async () => {
    let tokensresult = await axios.get(process.env.REACT_APP_API_URL.toString() + "/getAll");
    setNftData(tokensresult.data.result);
    setallcollectiondata(tokensresult.data.result);
  }
  useEffect(() => {
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
    let tokensresult = await axios.post(process.env.REACT_APP_API_URL.toString() + "/SearchgetAll", { searchInput: searchInput, value: value, min: min, max: max });
    setNftData(tokensresult.data.result)
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
            width > 600 ? 
          <div className="row MarketPlaceCollectionRow1">
            <div className="col-lg-2 logoutIcon_container">
              <img src={Logout} onClick={() => logoutclicked()} />
            </div>
            <div className="col-lg-10 MarketPlaceCollection_heading_container">
            </div>
          </div> : null 
          }
          <FilterNav showFilter={showFilter} execute={searchInputhandle} width={width}
          setShowFilter={setShowFilter} />
          <div className="row nftcard-body" >
             {
              width > 600 ? <div className='col-1'></div> : null
            }
            <div className='col-12 col-md-10'>
                <div className='row'>
                  {nftdata.length==0?null:
                  
                  nftdata.map((e, i) => (
                    e !== undefined ?
                      <NFTCard
                        key={i} nft={e} loading={loading} address={address}
                        execute={buyNft} width={width}
                      /> : ""
                  ))}
              </div>
            </div>
            {
              width > 600 ? <div className='col-1'></div> : null
            }
            
          </div>
        </div>
      </div>
      <CopyRightFooter />
    </>
  )
}

export default Allnft