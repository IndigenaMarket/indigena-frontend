import React, { useEffect, useState } from 'react'
import nft from '../../Assets/nft.png'
import banner from '../../Assets/banner.png'
import './Banner.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";

function Banner() {

  const [nftdata, setNftData] = useState([]);
  const history = useNavigate();
  const wallet = useSelector((state) => state.WalletConnect);
  const { web3, address, market, BNB_market, MATIC_market } = wallet;
  const getNftData = async () => {
    let tokensresult = await axios.get(process.env.REACT_APP_API_URL.toString() + "/getAll");
  
    if (tokensresult.status == 200) {
      let data = await tokensresult.data.result.filter((e, i) => e.Status == "Fixedprice")
   
      setNftData(data);
    }
  }
  const buyNft = async () => {
    if(address==""){
      toast("Connect Wallet")
      return;
    }
   
    history(`/collection/${process.env.REACT_APP_NFT_ETH_CONTRACT}/${nftdata[nftdata.length - 1].NftId}`,{state: { owner:nft?.WalletAddress==address  }, });
  }
  useEffect(() => {
    getNftData();
  }, []);
  return (
    <div className="banner_conatainer"  style={{justifyContent:"center",alignItems:"center"}}>
      <br></br>  
        <div className="row bg_container "  >
        <img 
       className="bg-image"
          src={nftdata.length > 0 ? nftdata[nftdata.length - 1].Imageurl : nft} 
       />
      
          <div className="col-1"></div>
          <div className="col-md-5 col-lg-5 col-sm-5 col-10 left_main_content">
            <span className="left_title_1">Discover, Collect &#x26; Sell Extraordinary Cultural NFTS</span>
            <span className="left_title_2">Connecting Indigenous with Blockchain</span>
            <div className="btn_grp">
              <Link to='/collections'>

                <button className="explore_btn">Explore</button>
              </Link>
              <Link to='/mint'>
                <button className="create_btn">Create</button>
              </Link>
            </div>
          </div>
          <div className="col-md-5 col-lg-5 col-sm-5 col-12">
            <div className='banner_nft2'>
              <img className="banner_nft" 
              src={nftdata.length > 0 ? nftdata[nftdata.length - 1].Imageurl : nft} 
              // src={""}
              />
              
              {nftdata.length > 0 ? 
              <span class="price_container">{nftdata[nftdata.length - 1].Blockchain == "BSC SmartChain" ? nftdata[nftdata.length - 1].Price + " BNB" : nftdata[nftdata.length - 1].Blockchain == "Polygon" ? nftdata[nftdata.length - 1].Price + " MATIC" : nftdata[nftdata.length - 1].Price + " ETH"}</span> : " "}
              <button type='button' onClick={() => buyNft()} className="bid_btn pc_bid">
                {nftdata.length > 0 ? "On Sale" : ""}
              </button>
              <button type='button' className="bid_btn mobile_bid"> On Sale
              </button>
            </div>
          </div>
          <div className="col-1"></div>
        </div>

    </div>
  );
}

export default Banner;
