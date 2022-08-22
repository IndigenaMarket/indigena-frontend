import React from "react";
import "./SellNFTs.css";

function SellNFTCard({ heading, desc }) {
  return (
    <div className="col-12 col-md-3 col-lg-3 col-sm-12 mb-3">
      <div className="sellCard2 ">
        <div className="sell1">
          <h4 className="create_and_sell_title1">{heading}</h4>
        </div>
        <div className="sell2 ">
          <p className="sellNFTdesc1">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default SellNFTCard;
