import React, { useEffect } from "react";
import nft from "../../Assets/nft.png";
import "./NFTCard.css";
import { useNavigate } from "react-router-dom";

function NFTCard({loading, nft, execute,address,from,width }) {
  const history = useNavigate();
  // useEffect(() => {}, []);
  if (!nft?.Price) {
    nft.Price = 0
  }
  var owner=false;
  if(from=="profile"){
    owner=true;
  }else if(from=="todaynft"){
    owner=false;
  }else{
    var add1=nft?.collection[0]?.WalletAddress;
    var myadd2=address;
   if(address!=""){
      if(myadd2!=undefined){
        if(add1!=undefined){
         owner=add1.toString().toLowerCase()==myadd2.toString().toLowerCase();
      }} }
  }

  return (
    <div className="col-6 col-md-3 col-lg-3">
      <div className="nftNewContainer m-sm-2 my-2 mx-0" >
        <div className="" style={{ height:"100%",width:"100%",borderRadius:"10px",position:"relative" }}>
          <div className="img-placeholder">
          <img  src={nft.Imageurl !== undefined ? nft.Imageurl : ""}  
              style={{ height:"100%",width:"100%",objectFit:"cover",borderRadius:".5em"}} />
          </div>
          {nft.Price ? (
            <span class="price_container-trending">
              {nft.Blockchain == "BSC SmartChain"
                ? nft.Price + " BNB"
                : nft.Blockchain == "Polygon"
                ? nft.Price + " MATIC"
                : nft.Price + " ETH"}
            </span>
          ) : (
            " "
          )}
          <button
            type="button"
            onClick={() => execute(nft)}
            className="bid_btn-trending pc_bid"
          >
            {from=="profile"?   nft.Status == "Fixedprice" || nft.Status == "Auction" ? "On Sale":"Put on sale":
            from=="todaynft"?"View":  owner?"View":"View"  }
          </button>
          <button
            type="button"
            onClick={() => execute(nft)}
            className="bid_btn-trending mobile_bid"
          >
          {from=="profile"?   nft.Status == "Fixedprice" || nft.Status == "Auction" ? "On Sale":"Put on sale":
            from=="todaynft"?"View":  owner?"View":"View"  }
          </button>
        </div>
      </div>
    </div>
  );
}

export default NFTCard;
