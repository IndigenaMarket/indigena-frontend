import React from "react";
import './ResourcePage.css';

function ResourcePageCard({ heading, desc,index,url}) {
  
  return (
    <div className="col-6 col-md-3 col-lg-3 resourceCard">
     <a href={url} target={"_blank"}style={{color:"black"}} ><div className="ResourcePageCard" >
        <div className="resourceCard_title_container">
          <h5 className="ResourcePageCard_title">{heading}</h5>
        </div>
        <div className="resourceCard_desc_container">
          <p className="ResourcePageCarddesc">{desc}</p>
        </div>
      </div></a>
    </div>
  );
}

export default ResourcePageCard;