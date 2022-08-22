import React, { useState, useEffect } from "react";
import Logout from "../../Assets/exit.png";
import Collectioncard from "../ProfileCollection/Profilecard";
import { useNavigate } from "react-router-dom";
import CollectionCard from "../CollectionCard/CollectionCard";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet, connectFailed } from "../../redux/WalletAction";
import "../MarketPlaceCollection/MarketPlaceCollection.css";
import axios from "axios";
import { toast } from "react-toastify";
import CopyRightFooter from "../CopyRightFooter/CopyRightFooter";
import FilterNav from "../FilterNav/FilterNav";
import NFTCard from "../NFTCard/NFTCard";
import useWindowDimensions from "../../Utils/useWindowDimensions";
const AWS = require("aws-sdk");
function Likednft({ showFilter, setShowFilter }) {
  let history = useNavigate();
  const {width} = useWindowDimensions()
  const [loading, setloading] = useState(false);
  const [nftcollectiondata, setNftcollectionData] = useState([]);
  const [collectiondata, setcollectiondata] = useState([]);
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.WalletConnect);
  const { web3, address, market } = wallet;
  const [allcollectiondata, setallcollectiondata] = useState([]);
  const [nftdata, setNftData] = useState([]);

  const getNftData = async () => {
    if (address) {
      let tokensresult = await axios.post(
        process.env.REACT_APP_API_URL.toString() + "/Likednfts",
        { address: address }
      );

      if (tokensresult.data.status) {
        setNftData(tokensresult.data.result);
      } else {
        toast("Check your wallet connection");
      }
    }

    // setallcollectiondata(tokensresult.data.result);
  };
  useEffect(() => {
    // getcollection();
    getNftData();
  }, [address]);

  const Collections = (nft) => {
    localStorage.setItem("collectionname", nft.CollectionName);
    history(`/UserCollection/${nft.CollectionName}`);
  };
  const buyNft = async (nft) => {
    history(
      `/collection/${process.env.REACT_APP_NFT_ETH_CONTRACT}/${nft.NftId}`,
      { state: { owner: nft?.WalletAddress == address } }
    );
  };
  const searchInputhandle = async (searchInput, value, min, max) => {
    // toast(value);
    // toast(searchInput);
    let tokensresult = await axios.post(
      process.env.REACT_APP_API_URL.toString() + "/SearchgetAll",
      { searchInput: searchInput, value: value, min: min, max: max }
    );
    setNftData(tokensresult.data.result);
  };

  const errorDiv = () => {
    return <p>Wallet Disconnected!</p>;
  };
  const logoutclicked = () => {
    const { web3Modal } = wallet;
    web3Modal.clearCachedProvider();
    dispatch(connectFailed(errorDiv()));
    history("/");
  };

  return (
    <>
      <div
        className="MarketPlaceCollection_page"
      >
        <div className="container-fluid">
          <div className="row MarketPlaceCollectionRow1">
            <div className="col-lg-2 logoutIcon_container">
              <img src={Logout} onClick={() => logoutclicked()} />
            </div>
            <div className="col-lg-10 MarketPlaceCollection_heading_container"></div>
          </div>
          {/* <FilterNav showFilter={showFilter} execute={searchInputhandle} setShowFilter={setShowFilter}/> */}

          <div className="row nftcard-body">
            <div className="col-1"></div>
            <div className="col-10">
              <div className="row collection_heading_container">
                <h1 className="our_collections_heading">Yours favourite NFT</h1>
              </div>
              <div className="container">
                <div className="row">
                  {nftdata.map((e, i) =>
                    e !== undefined ? (
          
                      <NFTCard
                      key={i} nft={e} loading={loading} address={address} from={"todaynft"}
                      execute={buyNft} width={width}
                    />
                    ) : (
                      ""
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="col-1"></div>
          </div>
        </div>
      </div>
      <CopyRightFooter />
    </>
  );
}

export default Likednft;
