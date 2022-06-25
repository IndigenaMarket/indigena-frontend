import React ,{useEffect}from 'react';
import nft from '../../Assets/nft.png';
import "./NFTCard.css";
import { useNavigate  } from "react-router-dom";
function NFTCard({nft,execute}) {
  
  const history = useNavigate ();
  useEffect(() => {
		
	}, []);
  // const Putonsale=(id)=>
  // {
  //   alert(id);
  //   history(`/list-item-sale/${id}`);
  // }
 
  return (
    <div className='col-6 col-md-4 col-lg-3'>
    <div className='nftContainer'>
  {/* <img className="card-img-top" src={nft} alt="Card image cap"/> */}
  {/* <div className="NFT_card_body" >
  <img src={nftImage} className="nftCard" />
  <span class="price_container">{price}</span>
  <button class="bid_btn"  onClick={()=>{history.push('/list-item-sale')}}>
    <span className='pc_bid'>Place a Bid</span>
    <span className='mobile_bid'>Bid</span>
    </button> 
    
  </div> */}
  <div className="NFT_card_body" >
  <img src={nft.Imageurl?nft.Imageurl:""} className="nftCard" />
  {nft.Price?<span class="price_container">{nft.Blockchain=="BSC SmartChain"?nft.Price+" BNB":nft.Blockchain=="Polygon"?nft.Price+" MATIC":nft.Price+" ETH"}</span>:" "}
  <button type='button' onClick={()=>execute(nft)} className="bid_btn pc_bid">{(nft.Status=='Fixedprice'||nft.Status=='Auction')?"On Sale":"Put on sale"}
    </button> 
  {/* <button type='button' onClick={()=>execute(nft)} className="bid_btn mobile_bid"> Bid
    </button>  */}
    <button type='button' onClick={()=>execute(nft)} className="bid_btn mobile_bid">{(nft.Status=='Fixedprice'||nft.Status=='Auction')?"On Sale":"Put on sale"}
    </button> 
    
  </div>
</div>
</div>
  ) 
}
 
export default NFTCard