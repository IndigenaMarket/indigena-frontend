
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NFTCard from "../NFTCard/NFTCard";
import NFTCardData from "../SampleData/TopTrendingList";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Fade } from "react-reveal";
import useWindowDimensions from "../../Utils/useWindowDimensions";

function TopTrending() {
  const {width} = useWindowDimensions()
  const [nft, setnft] = useState({});
  const [loading, setloading] = useState(false)
  const [nftdata, setnftdata] = useState([]);
  const history = useNavigate();
  const wallet = useSelector((state) => state.WalletConnect);
  const { web3, address, market, BNB_market, MATIC_market } = wallet;
  const getdata = async () => {
    let result = await axios.get(
      process.env.REACT_APP_API_URL.toString() + "/getFavouritesNFT"
    );
    setnftdata(result.data.result.filter((e, i) => i < 8));
    //setnftdata(result.data.result);
  };
  const executeorder = (nft) => {
    if (address == "") {
      toast("Connect Wallet");
      return;
    }
    history(
      `/collection/${process.env.REACT_APP_NFT_ETH_CONTRACT}/${nft.NftId}`,
      { state: { owner: nft?.WalletAddress == address } }
    );
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <div className="Todays_Picks_page">
      <div className="container-fluid">
        <div className="row todaysPicks_heading_container">
        {    nftdata !== [] ?  <h1 className="topPicks_heading">Top Trending</h1>:null}
        </div>
        <Fade bottom>
          <div className="row">
            {
              width > 600 ? <div className="col-1"></div> : null
            }
            <div className="col-12 col-md-10">
              <div className="row">
                {nftdata !== []
                  ? nftdata.map((e, i) => (
                      <NFTCard
                      key={i} nft={e} loading={loading} address={address} from={"todaynft"}
                      execute={executeorder} width={width}
                    />
                    ))
                  : ""}
              </div>
            </div>
            {
              width > 600 ? <div className="col-1"></div> : null
            }
          </div>
        </Fade>
        <div className="row btn_row">
          <Link to="/collections">
            <button className="section-bottom-button">Marketplace</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopTrending;
