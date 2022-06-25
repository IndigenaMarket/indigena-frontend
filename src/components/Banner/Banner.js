import React, { useEffect, useState } from 'react'
import nft from '../../Assets/nft.png'
import banner from '../../Assets/banner.png'
import './Banner.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate  } from "react-router-dom";

function Banner() {
  
  const[nftdata,setNftData]=useState([]);
  const history = useNavigate ();
  const getNftData = async() => {
    
   
    
    let tokensresult=await axios.get(process.env.REACT_APP_API_URL.toString()+"/getAll");
    console.log(tokensresult);
    if(tokensresult.status==200)
    { 
      console.log(tokensresult.data.result);
      
      // for(var i=0;i<tokensresult.data.result.length;i++){
      //   if(tokensresult.data.result[i].Status=="Fixedprice")
      //   {
          
      //     setNftData(tokensresult.data.result[i]);
      //     break;
      //   }
      // }


      let data= await tokensresult.data.result.filter((e,i)=> e.Status=="Fixedprice")
      

      setNftData(data);
      
      
     
    }

    
  
  
  
}
const buyNft=async()=>
{
     history(`/collection/${process.env.REACT_APP_NFT_CONTRACT_ADDRESS}/${nftdata[nftdata.length-1].NftId}`);
}
useEffect(() => {
  getNftData();
}, []);
  return (
    <div className="banner_conatainer" >
      <br></br>
      <div className="container bg_mobile " >
        <div className="row bg_container "  >
          <div className="col-1"></div>
          <div className="col-md-5 col-lg-5 col-sm-12 left_main_content">
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
          <div className="col-md-5 col-lg-5 col-sm-12"> 
              <img className="banner_nft" src={nftdata.length>0?nftdata[nftdata.length-1].Imageurl:nft}/>
 
 
  {/* <img src={nft} className="nftCard" /> */}
{/* <span class="price_container">0.001</span> */}
{nftdata.length>0?<span class="price_container">{nftdata[nftdata.length-1].Blockchain=="BSC SmartChain"?nftdata[nftdata.length-1].Price+" BNB":nftdata[nftdata.length-1].Blockchain=="Polygon"?nftdata[nftdata.length-1].Price+" MATIC":nftdata[nftdata.length-1].Price+" ETH"}</span>:" "}
  <button type='button' onClick={()=>buyNft()} className="bid_btn pc_bid">{nftdata.length>0?"On Sale":""}
    </button> 
  <button type='button'  className="bid_btn mobile_bid"> On Sale
    </button> 

          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
