import React from 'react';
import CollectionCardImg from '../../Assets/collection-card.PNG';
import "./CollectionCard.css";

function CollectionCard({nft,execute,loading}) {
  // collectionName={e.Name}
                    // desc={e.desc}
                    // collectionImage={e.ImageUrl}
                    if(!nft.Price)
                    {
                      nft.Price=0
                    }
  return (
    <div className='col-md-4 col-lg-4 col-12' style={{height:'360px'}}>
   <div className='collection_card_container'>
    <div class="card collection_card">
    <img class="card_img" src={nft.Imageurl!==undefined?nft.Imageurl:" "} alt="Card image cap"/>
    <div class="card_body">
      <h6 class="card-title">{nft.ItemName!==undefined?nft.ItemName:""}</h6>
      <p class="card-text">{nft.Blockchain=="BSC SmartChain"?"Price: "+nft.Price+" BNB":nft.Blockchain=="Polygon"?"Price: "+nft.Price+" MATIC":"Price: "+nft.Price+" ETH"}</p> 
      <button  class="live_btn" onClick={()=>execute(nft)}>{loading?<div className='loading'></div>:"BUY"}</button>
    </div>
  </div>
  </div>
  </div>
  )
}

export default CollectionCard