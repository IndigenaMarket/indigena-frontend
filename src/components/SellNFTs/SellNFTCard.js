import React from "react";
import "./SellNFTs.css";

function SellNFTCard({ heading, desc }) {
  return (
    <div className="col-12 col-md-3 col-lg-3">
      <div className="sellCard" >
        <div>
          <h4 className="create_and_sell_title">{heading}</h4>
        </div>
        <div>
          <p className="sellNFTdesc">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default SellNFTCard;
