import React,{useEffect,useState} from "react";
import Collectioncard from '../ProfileCollection/Profilecard'
import "./OurCollections.css";
import axios from 'axios';
import OurCollectionsList from "../SampleData/OurCollectionsList";
import collectionImage1 from "../../Assets/rectangle.png";
import collectionImage2 from "../../Assets/rectangle-11.png";
import collectionImage3 from "../../Assets/rectangle-1.png";
import collectionImage4 from "../../Assets/rectangle-2.png";
import collectionImage5 from "../../Assets/rectangle-11.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function OurCollections() {
  const history=useNavigate()
  const[nftcollectiondata,setNftcollectionData]=useState([]);
  const[collectiondata,setcollectiondata]=useState([]);
  const getNftData = async() => {
    
 
    let tokensresult=await axios.get(process.env.REACT_APP_API_URL.toString()+"/getAllcollection");
    console.log(tokensresult.data.result)
 
    //alert(JSON.stringify(tokensresult.data.result[0]));
    setcollectiondata(tokensresult.data.result.filter((e,i)=> i<6));
    
    
    
  }
  useEffect(() => {
getNftData();
}, []);

const Collections=(nft)=>
{
  console.log(nft)
  localStorage.setItem("collectionname",nft.CollectionName);
  history(`/UserCollection/${nft.CollectionName}`);
}
  return (
    
    <div className="OurCollections_page">
      <div className="container-fluid">
        <div className="row collection_heading_container">
          <h1 className="our_collections_heading">Our Collections</h1>
        </div>
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <div className="row mobile_carousel">
              <div className="row collections_pc" style={{justifyContent:"space-around",marginLeft:"1%"}}>
                {/* {OurCollectionsList.map((e) => (
                  <CollectionCard 
                    collectionName={e.collectionName}
                    desc={e.desc}
                    collectionImage={e.collectionImage}
                  />
                ))} */}
           {collectiondata !== [] ? collectiondata.map((e, i)=>

<Collectioncard key={i} nft={e} execute={Collections} />

) : ''}
              </div>
              <div
                id="carouselExampleIndicators"
                class="carousel slide"
                data-ride="carousel"
              >
                <ol class="carousel-indicators">
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="0"
                    class="active"
                  ></li>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="1"
                  ></li>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="2"
                  ></li>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="3"
                  ></li>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="4"
                  ></li>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="5"
                  ></li>
                </ol>
                <div class="carousel-inner">
                  <div className="row">
                    <div class="carousel-item active">
                       {/* <div
                        className="col-md-4 col-lg-4 col-12"
                        style={{ height: "440px" }}
                      >
                        <div className="collection_card_container">
                          <div class="card collection_card">
                            <img
                              class="card_img"
                              src={collectionImage2}
                              alt="Card image cap"
                            />
                            <div class="card_body">
                              <h5 class="card-title">Kai</h5>
                              <p class="card-text">Kai represents the current Indigena Team</p>
                              <button class="live_btn">Live</button>
                            </div>
                          </div>
                        </div>

                      </div>  */}
                     {collectiondata !== [] ? collectiondata.filter((e,i)=>i==0).map((nft, i)=>
                       <div
                        className="col-md-4 col-lg-4 col-12"
                        style={{ height: "440px" }}
                      >
                        <div className="collection_card_container">
                          <div class="card collection_card">
                            <img
                              class="card_img"
                              src={nft.BannerImage!==undefined?nft.BannerImage:" "}
                              alt="Card image cap"
                            />
                            <div class="card_body">
                            <h6 class="card-title">{nft.Name}</h6>
      <p class="card-text">{nft.CollectionName}</p>
      <p class="card-text">{nft.Blockchain=="BSC SmartChain"?"Floor Price: "+nft.FloorPrice+" BNB":nft.Blockchain=="Polygon"?"Floor Price: "+nft.FloorPrice+" MATIC":"Floor Price: "+nft.FloorPrice+" ETH"}</p>
      <button  class="live_btn" onClick={()=>Collections(nft)}>View</button>
                            </div>
                          </div>
                        </div>
                      </div> ):""}
                        
                    </div>
                    {collectiondata !== [] ? collectiondata.filter((e,i)=>i >1).map((nft, i)=>
                    
                    <div class="carousel-item">
                      <div
                        className="col-md-4 col-lg-4 col-12"
                        style={{ height: "440px" }}
                      >
                        <div className="collection_card_container">
                          <div class="card collection_card">
                            <img
                              class="card_img"
                              src={nft.BannerImage!==undefined?nft.BannerImage:" "}
                              alt="Card image cap"
                            />
                            <div class="card_body">
                            <h6 class="card-title">{nft.Name}</h6>
      <p class="card-text">{nft.CollectionName}</p>
      <p class="card-text">{nft.Blockchain=="BSC SmartChain"?"Floor Price: "+nft.FloorPrice+" BNB":nft.Blockchain=="Polygon"?"Floor Price: "+nft.FloorPrice+" MATIC":"Floor Price: "+nft.FloorPrice+" ETH"}</p>
      <button  class="live_btn" onClick={()=>Collections(nft)}>View</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    ):""}
                   
                    
                    
                  </div>
                </div>
                <a
                  class="carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a
                  class="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
          <div className="col-1"></div>
        </div>
        <div className="row btn_row">
          <Link to='/collections'>
          <button className="section-bottom-button">Collections</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OurCollections;
