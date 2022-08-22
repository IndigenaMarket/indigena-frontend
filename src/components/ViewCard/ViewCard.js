import React, { useEffect } from "react";
import nft from "../../Assets/nft.png";
import "../NFTCard/NFTCard.css";
import { useNavigate } from "react-router-dom";
function NFTCard({ nft, execute,width }) {
  const history = useNavigate();
  useEffect(() => {}, []);
  return (
    <div className= {width < 600 ? "p-0 col-6 col-md-4 col-lg-3" : "col-6 col-md-3 col-lg-3"}>
      <div className="nftContainer">
        <div className="NFT_card_body">
          <div className="img-placeholder">
          <img src={nft.Imageurl ? nft.Imageurl : ""}  />
          </div>
          {nft.Price ? (
            <span class="price_container">
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
            className="bid_btn pc_bid"
          >
            {nft.Status == "Fixedprice" || nft.Status == "Auction"
              ? "On Sale"
              : "View"}
          </button>
          <button
            type="button"
            onClick={() => execute(nft)}
            className="bid_btn mobile_bid"
          >
            {nft.Status == "Fixedprice" || nft.Status == "Auction"
              ? "On Sale"
              : "View"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NFTCard;
