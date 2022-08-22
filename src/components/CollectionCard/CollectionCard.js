import React from 'react';
import CollectionCardImg from '../../Assets/collection-card.PNG';
import "./CollectionCard.css";

function CollectionCard({ nft, execute, loading,address }) {
  if (!nft.Price) {
    nft.Price = 0
  }
  var add1=nft?.collection[0]?.WalletAddress;
  var myadd2=address;
  var owner=false;
  if(address==""){
    if(myadd2!=undefined){
      if(add1!=undefined){
        owner=add1.toString().toLowerCase()==myadd2.toString().toLowerCase();
    }} }

  return (
    <div className='col-md-4 col-lg-4 col-12' style={{ height: '360px',}}>
      <div className='collection_card_container'>
        <div class="card collection_card">
          <img class="card_img" src={nft.Imageurl !== undefined ? nft.Imageurl : ""} alt="Card image cap" />
          <div class="card_body">
            {/* <h6 class="card-title">{nft.ItemName !== undefined ? nft.ItemName : ""}</h6> */}
            <p class="card-text">{nft.Blockchain == "BSC SmartChain" ? "Price: " + nft.Price + " BNB" : nft.Blockchain == "Polygon" ? "Price: " + nft.Price + " MATIC" : "Price: " + nft.Price + " ETH"}</p>
            <button class="live_btn" onClick={() => execute(nft)}>{loading ? <div className='loading'></div> :owner?"View": "BUY"}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionCard