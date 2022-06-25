import React,{useState,useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import NFTCard from '../NFTCard/NFTCard';
import NFTCardData from '../SampleData/TopTrendingList';
import axios from 'axios';

function TodaysPick() {
  const[nft,setnft]=useState({});
  const[nftdata,setnftdata]=useState([]);
  const history = useNavigate ();
  const getdata=async()=>
  {
    let result=await axios.get(process.env.REACT_APP_API_URL.toString()+"/todaynft");
    console.log("Today nft",result.data.result);
    setnftdata(result.data.result.filter((e,i)=> i<8));
    //setnftdata(result.data.result);
  }
const executeorder=(nft)=>
{
  //alert(nft.TokenId)
  //console.log("execute",nft.tokenId);
// //history('/menuboard');
  history(`/collection/${process.env.REACT_APP_NFT_CONTRACT_ADDRESS}/${nft.NftId}`);
}
  useEffect(() => {
    getdata()
  }, []);
  return (
    <div className="Todays_Picks_page">
      <div className="container-fluid">
          <div className="row todaysPicks_heading_container">
              <h1 className="topPicks_heading">Today's Pick</h1>
          </div>
          <div className="row" >
            <div className='col-1'></div>
            <div className='col-10'>
              <div className='row'> 
              {nftdata !== [] ? nftdata.map((e, i)=>

<NFTCard key={i} nft={e} execute={executeorder} />

) : ''}
          </div>
            </div>
            <div className='col-1'></div>
        
        </div>
        <div className="row btn_row" >
          <Link to='/marketplace'>
            <button className="section-bottom-button">Marketplace</button>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default TodaysPick