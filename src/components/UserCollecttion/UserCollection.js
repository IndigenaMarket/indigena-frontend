import React, { useEffect, useState } from "react";
import CollectionFilterNav from "../FilterNav/CollectionFilterNav";

import ViewCard from "../ViewCard/ViewCard";
import UserProfileCard from "../UserProfileCard/UserProfileCard";
import NFTCardData from "../SampleData/TopTrendingList";
import CopyRightFooter from "../CopyRightFooter/CopyRightFooter";
import "./UserCol.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../UserProfileCard/UserProfileCard.css";
import nft from "../../Assets/nft.png";
import fb from "../../Assets/user-profile-fb.png";
import email from "../../Assets/user-profile-email.png";
import twitter from "../../Assets/user-profile-twitter.png";
import youtube from "../../Assets/user-profile-youtube.png";
import profilePic from "../../Assets/rectangle-11.png";
import NFTCard from '../NFTCard/NFTCard';
import useWindowDimensions from "../../Utils/useWindowDimensions";

function  UserCollection({ showFilter, setShowFilter }) {
  const history = useNavigate();
  const {width} = useWindowDimensions()
  const wallet = useSelector((state) => state.WalletConnect);
  const { web3, address, market } = wallet;

  const [nftdata, setNftData] = useState([]);
  const [buynft, setbuynft] = useState([]);
  const [profileimage, setprofileimage] = useState("");
  const [bannerimage, setbannerimage] = useState("");
  const [collectioninfo, setcollectioninfo] = useState({});
  const [allcollectiondata, setallcollectiondata] = useState([]);
  const [collectionaddress, setcollectionaddress] = useState("");
  const [profileInfo, setprofileInfo] = useState({});

  const profileiconNavigate = () => {
    history(`/collectionprofile/${profileInfo.WalletAddress}`);
  };

  const editCollectionNavigate = () => {
    history(`/edit-collection`);
  };

  const getprofiledata = async (address) => {
    let data = { WalletAddress: address };
    if (address) {
      let tokensresult = await axios.post(
        process.env.REACT_APP_API_URL.toString() + "/getnft",
        data
      );
      if (tokensresult.data.result.length > 0) {
        setprofileInfo(tokensresult.data.result[0]);
      }
    }
  };

  const getNftData = async () => {
    let url = decodeURIComponent(window.location.href);
    url = url.split("/");
    let CollectionName = url[url.length - 1];
    let nftdataarray = [];

    let data = {
      CollectionName: localStorage.getItem("collectionname"),
      from: "profile-collection",
    };
    let tokensresult = await axios.post(
      process.env.REACT_APP_API_URL.toString() + "/getcollections",
      data
    );

    if (tokensresult.data.status) {
      setNftData(tokensresult.data.result);
      setallcollectiondata(tokensresult.data.result);

      getprofiledata(tokensresult.data.Collectiondata[0].WalletAddress);
      setcollectioninfo(tokensresult.data.Collectiondata[0]);
      setprofileimage(tokensresult.data.Collectiondata[0].LogoImage);
      setbannerimage(tokensresult.data.Collectiondata[0].BannerImage);
      setcollectionaddress(tokensresult.data.Collectiondata[0].WalletAddress);
    }
  };

  const Putonsale = (nft) => {
    if (nft.Status == "Fixedprice" || nft.Status == "Auction") {
      history(
        `/collection/${process.env.REACT_APP_NFT_ETH_CONTRACT}/${nft.NftId}`,
        { state: { owner: nft?.WalletAddress == address } }
      );
    } else {
      localStorage.setItem("ImageUrl", nft.Imageurl);
      localStorage.setItem("nft-data", JSON.stringify(nft));
      history(`/list-item-sale/${nft.NftId}`);
    }
  };
  const [loading, setloading] = useState(false)
  const executeorder = (nft) => {
    history(
      `/collection/${process.env.REACT_APP_NFT_ETH_CONTRACT}/${nft.NftId}`,
      { state: { owner: nft?.WalletAddress == address } }
    );
  };
  const searchInputhandle = async (searchInput, value, min, max) => {
    if (searchInput == "select") {
      if (value == "Price Low - High") {
        setNftData([]);
        let searchdata = await allcollectiondata.sort(function (a, b) {
          if (a["Price"] > b["Price"]) {
            return 1;
          } else if (a["Price"] < b["Price"]) {
            return -1;
          }
          return 0;
        });
        setNftData(searchdata);
      } else if (value == "Price High - Low") {
        getNftData();
      } else if (value == "Recently Listed") {
        setNftData([]);

        let searchdata = await allcollectiondata.sort(function (a, b) {
          if (a["createdAt"] > b["createdAt"]) {
            return 1;
          } else if (a["createdAt"] < b["createdAt"]) {
            return -1;
          }
          return 0;
        });

        let length = searchdata.length;
        searchdata = searchdata.filter((e, i) => i > length - 5);
        setNftData(searchdata);
      } else if (value == "Ending Soon") {
        let auctiondata = allcollectiondata.filter(
          (e, i) => e.AuctionEndDate != undefined
        );
        let searchdata = await auctiondata.sort(function (a, b) {
          if (a["AuctionEndDate"] > b["AuctionEndDate"]) {
            return 1;
          } else if (a["AuctionEndDate"] < b["AuctionEndDate"]) {
            return -1;
          }
          return 0;
        });
        let length = searchdata.length;
        searchdata = searchdata.filter((e, i) => i > length - 5);
        setNftData(searchdata);
      }
    } else if (searchInput == "type") {
      let searchdata = allcollectiondata.filter((e, i) => e.Type == value);
      setNftData(searchdata);
    } else if (searchInput == "usd") {
      let usdethvalue = parseFloat(value) * 0.00029;
      let minethvalue = parseFloat(min) * 0.00029;
      let maxethvalue = parseFloat(max) * 0.00029;
      let searchdata = allcollectiondata.filter(
        (e, i) =>
          parseFloat(e.Price).toFixed(5) == usdethvalue &&
          parseFloat(e.Price).toFixed(5) > minethvalue &&
          parseFloat(e.Price).toFixed(5) < maxethvalue
      );
      setNftData(searchdata);
    } else if (searchInput == "button") {
      let searchdata = allcollectiondata.filter((e, i) => e.Status == value);
      setNftData(searchdata);
    } else if (searchInput == "onsale") {
      if (value == "yes") {
        let searchdata = allcollectiondata.filter(
          (e, i) => e.Status == "Fixedprice" || e.Status == "Auction"
        );
        setNftData(searchdata);
      } else {
        let searchdata = allcollectiondata.filter((e, i) => e.Status == "Mint");
        setNftData(searchdata);
      }
    } else if ((searchInput = "search")) {
      if (value) {
        let serchdata = allcollectiondata.filter((datavalue, i) => {
          return (
            (datavalue.Blockchain &&
              datavalue.Blockchain.toLowerCase().includes(
                value.toLowerCase()
              )) ||
            (datavalue.CollectionName &&
              datavalue.CollectionName.toLowerCase().includes(
                value.toLowerCase()
              )) ||
            (datavalue.Description &&
              datavalue.Description.toLowerCase().includes(
                value.toLowerCase()
              )) ||
            (datavalue.ItemName &&
              datavalue.ItemName.toLowerCase().includes(value.toLowerCase())) ||
            (datavalue.Price &&
              datavalue.Price.toLowerCase().includes(value.toLowerCase()))
          );
        });
        setNftData(serchdata);
      } else {
        getNftData();
      }
    }
  };
  useEffect(() => {
    //if(wallet.connected) {

    getNftData();

    // }
  }, [wallet.connected]);

  return (
    <>
      <div
        className="container-fluid ProfilePage_page"
      >
        {collectioninfo.WalletAddress == address.toString().toLowerCase() ? (
          <div className="row mt-2">
            <div className="col-4 col-md-4 col-lg-4"></div>
            <div className="col-4 col-md-4 col-lg-4"></div>
            <div className="col-4 col-md-4 col-lg-4">
              <button
                className="mintNFT_btn1"
                onClick={() => editCollectionNavigate()}
              >
                Edit collection
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="row">
          {
            width > 600 && <div className="col-1"></div>
          }
          
          <div className="col-12 col-md-10 collction_profile_card_container">
            {/* <UserProfileCard/>  */}
            <div class="container UserProfile_card">
              <div class="row">
                <div class="col-md-12 col-sm-12 col-sm-12">
                  <div class="profile-block">
                    <a>
                      <div
                        class="profile-block-thumb cover-container"
                        style={{
                          backgroundImage:
                            bannerimage !== "" && bannerimage != undefined
                              ? `url(${bannerimage})`
                              : `url(https://akm-img-a-in.tosshub.com/indiatoday/images/story/202005/keyboard-5017973_1920.jpeg?NxXWUVUGjpEzDYZAbAUmrfWMvpSA0qPE&size=770:433)`,
                        }}
                      >
                        {/* <img
                src={banner}
                alt=""
                title=""
              /> */}
                      </div>
                    </a>
                    <div class="profile-img">
                      <a>
                        <img
                          src={profileimage !== "" ? profileimage : nft}
                          alt=""
                          title=""
                        />
                      </a>
                    </div>
                    {/* <div className="profile-Contact">
              <div className="row CollectionSocialIcon_Container">
                <div className="col-lg-9"></div>
                <div className="col-lg-3 ">
                  <div className="row">
                    <div className="col-lg-3">
                      <img  src={fb} alt='social-fb' className="social-img" />
                    </div>
                    <div className="col-lg-3">
                      <img src={twitter} alt='social-fb' className="social-img"/>
                    </div>
                    <div className="col-lg-3">
                      <img src={youtube} alt='social-fb' className="social-img"/>
                    </div>
                    <div className="col-lg-3">
                      <img src={email} alt='social-fb' className="social-img"/>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
            <div className="Collection-name">
              <h2>{collectioninfo.CollectionName}</h2>
            </div> */}
                    <div className="row profile-responsive">
                      <div className="col-md-4 col-lg-4 col-3">
                        {/* <div class="profile-img12"> */}

                        <img
                          className="profile-img12"
                          onClick={() => profileiconNavigate()}
                          src={
                            profileInfo.PrifileUrl
                              ? profileInfo.PrifileUrl
                              : profilePic
                          }
                          alt=""
                          title=""
                        />

                        {/* </div> */}
                      </div>
                      <div className="col-md-4 col-lg-4 col-9">
                        <h2 className="Mobile-header m-0">
                          {collectioninfo.CollectionName
                            ? collectioninfo.CollectionName
                            : ""}
                        </h2>
                      </div>
                      <div className="col-md-4 col-lg-4 col-0"></div>
                    </div>
                    {
                      width < 600 && <br/>
                    }
                    <div className="profile-details">
                      <div className="row profile-details-group ">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-10">
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="profile-details-columns">
                                <div className="asset-key user">
                                  <span>Items</span>
                                  <div className="asset-value">
                                    {nftdata.length}
                                  </div>
                                </div>

                                <div className="asset-key user">
                                  <span>Floor</span>
                                  <div className="asset-value">
                                    {collectioninfo.FloorPrice}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 ">
                              <div className="profile-details-columns">
                                <div className="asset-key user">
                                  <span>Royalties</span>
                                  <div className="asset-value">
                                    {collectioninfo.Royality}
                                  </div>
                                </div>

                                <div className="asset-key user">
                                  <span>Blockchain</span>
                                  <div className="asset-value">
                                    {collectioninfo.Blockchain}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <div className=" container-fluid profile-slogan mb-1"> */}
                          <div className="row  mt-4">
                            {
                              width < 600 && <div className="col-4 col-lg-4 col-md-4"></div>
                            }
                            <div className="col-12 col-lg-4 col-md-4 ">
                              {" "}
                              <h2
                                className="h2_mobile"
                                style={{
                                  color: "#333",
                                  opacity: 0.7,
                                  fontSize: "40px",
                                  fontWeight: "bold",
                                  fontStretch: "normal",
                                  textAlign:"center"
                                }}
                              >
                                Description
                              </h2>
                            </div>
                            {
                              width < 600 && <div className="col-4 col-lg-4 col-md-4"></div>
                            }
                          </div>
                          <div className="row">
                            {
                              width > 600 && <div className="col-2 col-lg-2 col-md-2"></div>
                            }
                            <div className="col-12 col-lg-8 col-md-8">
                              {" "}
                              <p style={{ whiteSpace: "normal" }}>
                                {collectioninfo.Description
                                  ? collectioninfo.Description
                                  : ""}
                              </p>
                            </div>
                            {
                              width > 600 && <div className="col-2 col-lg-2 col-md-2"></div>
                            }
                          </div>
                        </div>

                        <div className="col-lg-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            width > 600 && <div className="col-1"></div>
          }
        </div>
        <div className="row">
          <CollectionFilterNav
            showFilter={showFilter}
            execute={searchInputhandle}
            setShowFilter={setShowFilter}
          />
        </div>
        <div className="row">
          {
            width > 600 && <div className="col-1"></div>
          }
          
          <div className="col-12 col-md-10">
            <div className="row">
              {nftdata !== []
                ? nftdata.map((e, i) => (
                    // <ViewCard key={i} nft={e} execute={executeorder} />
                    <NFTCard
                    key={i} nft={e} loading={loading} address={address} from={"todaynft"}
                    execute={executeorder} width={width}
                  />
                    // <NFTCard key={i} nft={e} loading={loading} address={address} execute={executeorder}/> 
                  ))
                : ""}
            </div>
          </div>
          {
            width > 600 && <div className="col-1"></div>
          }
        </div>
      </div>
      <CopyRightFooter />
    </>
  );
}

export default UserCollection;
