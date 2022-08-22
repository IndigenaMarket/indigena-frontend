import React from "react";
import "./ResourcePage.css";

function ResourcePageCard({ heading, desc, index, url,width }) {
  return (
    <div className="col-6 col-md-3 col-lg-3">
      {/* <a href={url} target={"_blank"}style={{color:"black"}} >
      <div className="ResourcePageCard" >
        <div className="resourceCard_title_container">
          <h5 className="ResourcePageCard_title">{heading}</h5>
        </div>
        <div className="resourceCard_desc_container">
          <p className="ResourcePageCarddesc">{desc}</p>
        </div>
      </div>
    </a> */}
        <a href={url} target={"_blank"} style={{ color: "black" }}>
          <div className="resource-cards-div">
            {
              width > 600 ? <h3>{heading}</h3> : <h5>{heading}</h5>
            }
           {
            width > 600 ? <p>{desc}</p> : <font size="1">{desc}</font>
           } 
          </div>
        </a>
    </div>
  );
}

export default ResourcePageCard;
