import React from "react";
import './ResourcesStarted.css'

function ResourcesStartedCard({image,url}) {
  return (
    <div className="col-4">
    <div className="resourceCard_Container">
      {/* <img className="card-img-top" src={nft} alt="Card image cap"/> */}
      <a href={url} target={"_blank"}style={{color:"black"}} >
      <div className="resource_Card_body">
        <img
          src={image}
          className="resourceCard_img"
        />
        
      </div></a>
    </div>
    </div>
  );
} 

export default ResourcesStartedCard;
