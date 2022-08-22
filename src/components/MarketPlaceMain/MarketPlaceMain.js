import React, { useState, useEffect } from "react";
import FilterNav from "../FilterNav/FilterNav";
import Collectioncard from "../ProfileCollection/Profilecard";
import NFTCard from "../NFTCard/NFTCard";
import NFTCardData from "../SampleData/TopTrendingList";
import CollectionCard from "../CollectionCard/CollectionCard";
import SearchIcon from "@mui/icons-material/Search";
import CopyRightFooter from "../CopyRightFooter/CopyRightFooter";
import "./MarketPlaceMain.css";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import useWindowDimensions from "../../Utils/useWindowDimensions";
function MarketPlaceMain({ showFilter, setShowFilter }) {
  const {width} = useWindowDimensions()
  const [nft, setnft] = useState({});
  const [nftdata, setNftData] = useState([]);
  const history = useNavigate();
  const wallet = useSelector((state) => state.WalletConnect);
  const { web3, address, market, BNB_market, MATIC_market } = wallet;
  const [loading, setloading] = useState(false);
  const [allcollectiondata, setallcollectiondata] = useState([]);
  const [collectiondata, setcollectiondata] = useState([]);
  const [properties, setproperties] = useState(true);
  const getNftData = async () => {
    let tokensresult = await axios.get(
      process.env.REACT_APP_API_URL.toString() + "/getAll"
    );
    setNftData(tokensresult.data.result);
    // setallcollectiondata(tokensresult.data.result);
  };
  const getpropnft = async (value, name) => {
    let tokensresult = await axios.post(
      process.env.REACT_APP_API_URL.toString() + "/GetPropertiesnft",
      { character: value, name: name }
    );
    // setNftData(tokensresult.data.result);
    // setallcollectiondata(tokensresult.data.result);
  };
  const getcollection = async () => {
    let tokensresult = await axios.get(
      process.env.REACT_APP_API_URL.toString() + "/getAllcollection"
    );
    setcollectiondata(tokensresult.data.result);
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const character = queryParams.get("character");
    const name = queryParams.get("name");

    if (character) {
      setproperties(false);
      getpropnft(character, name);
    } else {
      getNftData();
      getcollection();
    }
  }, []);

  const buyNft = async (nft) => {
    if (address == "") {
      toast("Connect Wallet");
      return;
    }
    history(
      `/collection/${process.env.REACT_APP_NFT_ETH_CONTRACT}/${nft.NftId}`,
      { state: { owner: nft?.WalletAddress == address } }
    );
  };
  const Collections = (nft) => {
    localStorage.setItem("collectionname", nft.CollectionName);
    history(`/UserCollection/${nft.CollectionName}`);
  };
  const searchInputhandle = async (searchInput, value, min, max) => {
    let tokensresult = await axios.post(
      process.env.REACT_APP_API_URL.toString() + "/SearchgetAll",
      { searchInput: searchInput, value: value, min: min, max: max }
    );
    setNftData(tokensresult.data.result);
  };
  return (
    <>
      <div
        className="container-fluid CollectionMainPage"
      >
        <div className="row marketPlaceFilterRow">
          {
            width > 600 &&
  
          <div className="searchBarMobile">
            <div className="filtersearchbar_container">
              <div className="search">
                <input
                  className="filtersearchbar"
                  placeholder="Search"
                  type="text"
                  name="txtBox"
                />
                <button className="search_btn">
                  <SearchIcon color="action" class="search_icon"></SearchIcon>
                </button>
              </div>
            </div>
          </div>
          }
          <FilterNav
            showFilter={showFilter}
            execute={searchInputhandle}
            setShowFilter={setShowFilter}
          />
        </div>
        {/* <div className="row" >
            <div className='col-1'></div> 
            <div className='col-10'>
              <div className='row'> 
              {collectiondata !== [] ? collectiondata.map((e, i)=>

<Collectioncard key={i} nft={e} execute={Collections} />

) : ''}
              {nftdata.map((e,i) => (
                  e!==undefined?
                  <CollectionCard 
                    
                    key={i} nft={e} loading={ loading}
                    execute={buyNft}
                  />:""
                ))}
          </div>
            </div>
            <div className='col-1'></div>
        
        
            </div> */}
        <div className="row nftcard-body">
          {
            width > 600 && <div className="col-1"></div>
          }
          
          <div className="col-12 col-md-10">
            {properties && (
              <div className={width > 600 ? "container" : "" }>
                <div
                   className= {width < 600 ? "row mx-2" : "row"}
                  style={{ justifyContent: "space-around", marginLeft: "1%" }}
                >
                  {collectiondata !== []
                    ? collectiondata.map((e, i) => (
                        <Collectioncard key={i} nft={e} execute={Collections} />
                      ))
                    : ""}
                </div>
              </div>
            )}
            {/* <div className="divider">
              <Divider style={{ color: "firebrick" }} />
            </div> */}

            <div className={width > 600 ? "container" : "" }>
              <div className="row">
                {nftdata.map((e, i) =>
                  e !== undefined ? (
                    // <CollectionCard

                    //   key={i} nft={e} loading={ loading}
                    //   execute={buyNft}
                    // />
                    <NFTCard
                      key={i}
                      nft={e}
                      loading={loading}
                      address={address}
                      execute={buyNft}
                      width={width}
                    />
                  ) : (
                    ""
                  )
                )}
              </div>
            </div>
          </div>
          {
            width > 600 && <div className="col-1"></div>
          }
        </div>
      </div>

      <CopyRightFooter />
    </>
  );
}

export default MarketPlaceMain;
