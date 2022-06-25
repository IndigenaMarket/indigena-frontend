import React,{useState,useEffect} from 'react';
import ListItem from './ListItem';
import "./SettledNftList.css";
import TopCollectionsListData from '../SampleData/TopCollectionsList';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet, connectFailed } from "../../redux/WalletAction";
import tokenAbi from'../../contracts/token.json'
import tokenBNBAbi from'../../contracts/Wbnb.json'
import tokenMaticAbi from'../../contracts/Wmatic.json'
const AWS = require('aws-sdk');
function TodayMinted() {
  const[nftdata,setnftdata]=useState([]);
  const[average,setaverage]=useState(5);
  const wallet = useSelector((state) => state.WalletConnect);
  const {web3, address, market,BNB_market,MATIC_market} = wallet;
  const history = useNavigate ();
  const getNftData = async() => {
    let tokensresult=await axios.get(process.env.REACT_APP_API_URL.toString()+"/TodayMintednft");
    setaverage(parseInt(tokensresult.data.result.length/3))
    setnftdata(tokensresult.data.result);
  }
  useEffect(() => {
  getNftData();
  }, []);

  const TodayMintedNft=async(nft)=>{
    history(`/collection/${process.env.REACT_APP_NFT_CONTRACT_ADDRESS}/${nft.NftId}`);
  }
 
  return (
    <div className="topCollections_page">
      <div className="container-fluid">
          <div className="row topCollections_heading_container">
              <h1 className="topCollections_heading">Today Minted NFT's</h1>
          </div>
          <div className="row"  >
              <div className='col-1'></div>
              <div className='col-10 topCollectionsListContainer'>
                  <div className='row'>
                 
                    <div className='col-md-4 col-lg-4 col-12' style={{marginRgiht:'10%'}}>
                    {nftdata.slice(0,average).map((e,index)=>
                  <ListItem  nft={e} execute={TodayMintedNft} index={index}/>
                  )}
                    </div>
                    <div className='col-md-4 col-lg-4 col-12' style={{marginRgiht:'10%'}}>
                    {nftdata.slice(average,2*average).map((e,index)=>
                  <ListItem  nft={e} execute={TodayMintedNft} index={average+index}/>
                  )}
                    </div>
                    <div className='col-md-4 col-lg-4 col-12' style={{marginRgiht:'10%'}}>
                    {nftdata.slice(2*average,3*average).map((e,index)=>
                  <ListItem  nft={e} execute={TodayMintedNft} index={(2*average)+index}/>
                  )}
                    </div>
                  
                  </div>
              </div>
         
              <div className='col-1'></div>
        </div>
        {/* <div className="row btn_row" >
          <Link to='stats'>
            <button className="section-bottom-button">Stats</button>
            </Link>
        </div> */}
      </div>
    </div>
  )
}

export default TodayMinted