import React from "react";
import "./TopCollectionsList.css";
import bnb from "./tokens/cryptocurrency_bnb.png";
import eth from "./tokens/cryptocurrency_eth.png";
import matic from "./tokens/cryptocurrency_matic.png";
import { useNavigate } from "react-router-dom";
import{BackSlicer} from "../Helper/index"
function ListItem({ rating, profileImage, userName, collectionName, index, blockchain }) {
  let history = useNavigate();
  const collectionpageswitch = () => {
    localStorage.setItem("collectionname", collectionName);
    history(`/UserCollection/${collectionName}`);
  };
  
  return (
    <div className="listItem_container">
      <div className="row" >

          
          <div className="col-md-1 col-lg-1 col-sm-1  col-1 mt-2 " style={{color:"black", textAlign:"center",fontWeight:"500",display: "flex",justifyContent: "center",alignItems: "center"}}>
            {index + 1}
          </div>
          
          <div className="col-md-8 col-lg-8 col-sm-8 col-8  mt-2  row" >
        
              <div className="col-3 " style={{alignItems:"flex-start"}}>
                <img
                  src={profileImage}
                  style={{ cursor: "pointer",}}
                  onClick={() => collectionpageswitch()}
                  className="listItem_img1"
                />
              </div>
              <div className="col-9" style={{textAlign:"left"}}>
                  <span className="collectionName" >{BackSlicer(collectionName,10)}</span><br />
                    <span className="userName">Floor Price</span>
                </div>
          
            </div>
          <div className="col-md-3 col-lg-3 col-sm-3 col-3 mt-2 " style={{textAlign:"right",display:"inline-block"}}>
            <span>{rating+" Items"}</span><br/>
            <p className="flrvalue">{blockchain == "BSC SmartChain" ? <img className="tokenimg" src={bnb} /> : blockchain == "Ethereum" ? <img className="tokenimg" src={eth} /> : <img className="tokenimg" src={matic} /> } 
            <span> {userName}</span>
            </p>
          </div>

        </div>

    </div>
  );
}

export default ListItem;
