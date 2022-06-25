import React from 'react';
import CollectionCardImg from '../../Assets/collection-card.PNG';
import "./profilecard.css";

function Profilecard({nft,execute,loading}) {
  // collectionName={e.Name}
                    // desc={e.desc}
                    // collectionImage={e.ImageUrl}
  return (
    <div className='col-md-4 col-lg-4 col-12 ' style={{height:'360px'}}>
   <div className='collection_card_container'>
    <div class="card collection_card">
    <img class="card_img" src={nft.BannerImage} alt="Card image cap"/>
    <div class="card_body">
      <h6 class="card-title">{nft.Name}</h6>
      <p class="card-text">{nft.CollectionName}</p>
      <p class="card-text">{nft.Blockchain=="BSC SmartChain"?"Floor Price: "+nft.FloorPrice+" BNB":nft.Blockchain=="Polygon"?"Floor Price: "+nft.FloorPrice+" MATIC":"Floor Price: "+nft.FloorPrice+" ETH"}</p>
      <button  class="live_btn" onClick={()=>execute(nft)}>View</button>
    </div>
  </div>
  </div>
  </div>
  )
}

export default Profilecard