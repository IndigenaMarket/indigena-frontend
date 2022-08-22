import React, { useState, useEffect } from "react";
import "./Stats.css";
import NFT from "../../Assets/NFT-5.png";
import Tilt from "react-parallax-tilt";
import CopyRightFooter from "../CopyRightFooter/CopyRightFooter";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ReplayOutlined } from "@mui/icons-material";
import useWindowDimensions from "../../Utils/useWindowDimensions";

function Stats() {
  const {width} = useWindowDimensions()
  const [nft, setnft] = useState({});
  const [nftdata, setnftdata] = useState([]);
  const [searcgnftdata, setsearchnftdata] = useState([]);
  const [daycount, setdaycount] = useState(1);

  const history = useNavigate();

  const collectionpageswitch = (collectionName) => {
    localStorage.setItem("collectionname", collectionName);
    history(`/UserCollection/${collectionName}`);
  };
  const getdata = async (average) => {
    let result = await axios.post(
      process.env.REACT_APP_API_URL.toString() + "/statAllcollection",
      { daycount: daycount }
    );
    let tabledata = [];
    await result.data.result.map(async (tokenarray, i) => {
      var price = 0;
      let allnftdata = await getcollectionnft(tokenarray);

      await allnftdata.map(async (data, i) => {
        price = price + parseFloat(data.Price ? data.Price : 0);
      });
      tokenarray.Price = price;
      tokenarray.PriceAvg = ((price / average.totalAmount) * 100).toFixed(2);
      tokenarray.Volume = allnftdata.length;
      tokenarray.VolumeAvg = (
        (allnftdata.length / average.count) *
        100
      ).toFixed(2);
      tabledata.push(tokenarray);
      if (i == result.data.result.length - 1) {
        let searchdata = tabledata.sort(function (a, b) {
          if (a["Volume"] < b["Volume"]) {
            return 1;
          } else if (a["Volume"] > b["Volume"]) {
            return -1;
          }
          return 0;
        });
        setnftdata(searchdata);
        setsearchnftdata(searchdata);
      }
    });
  };

  const getaverage = async () => {
    let result = await axios.post(
      process.env.REACT_APP_API_URL.toString() + "/TotalAmount",
      { daycount: daycount }
    );
    getdata(result.data.result[0]);
  };
  const getcollectionnft = async (tokenarray) => {
    let tokensresult = await axios.post(
      process.env.REACT_APP_API_URL.toString() + "/FindCollectionNft",
      { tokenId: tokenarray.TokenId, daycount: daycount }
    );
    return tokensresult.data.result;
  };
  const searchhandle = (value, search) => {
    if (search == "Categories") {
      if (value == "All Categories") {
        setnftdata(searcgnftdata);
      } else {
        let data = searcgnftdata.filter((e, i) => e.Categery == value);
        setnftdata(data);
      }
    } else if (search == "Chain") {
      if (value == "All chains") {
        setnftdata(searcgnftdata);
      } else {
        let data = searcgnftdata.filter((e, i) => e.Blockchain == value);
        setnftdata(data);
      }
    } else {
      setnftdata(searcgnftdata);
    }
  };

  const dayserchhandle = (value) => {
    setdaycount(parseInt(value));
  };

  useEffect(() => {
    getaverage();
  }, [daycount]);
  return (
    <>
      <div
        className="container-fluid stats_page"

      >
        <div className="row">
          <div className="col-lg-1 col-md-1 col-1"></div>
          <div className="col-lg-10 col-md-10 col-10">
            <div className="stats_heading_container">
              <h2>Top NFTs </h2>
              <small>
                The top NFTS on INDIGENA, Ranked by volume, floor price and
                other statistic
              </small>
            </div>
          </div>
          <div className="col-lg-1 col-md-1 col-1"></div>
        </div>

        <div className=" row stats_btn_grp">
            {
              width > 600 ? <div className="col-lg-2"></div> : null
            }
          
          <div className="col-12 col-lg-8 col-md-8  stats_btn_container">
            <div class="form-group stats-form">
              <select
                class="form-select stats-select"
                id="exampleFormControlSelect1"
                onChange={(e) => dayserchhandle(e.target.value)}
              >
                <option value="7" selected>
                  Last 7 days
                </option>
                <option value="14">Last 2 weeks</option>
                <option value="30">Last Month</option>
              </select>
            </div>
            <div class="form-group stats-form">
              <select
                class="form-select stats-select"
                id="exampleFormControlSelect1"
                onChange={(e) => searchhandle(e.target.value, "Categories")}
              >
                <option value="All Categories" selected>
                  All Categories
                </option>
                <option value={"Art"}>Art</option>
                <option value={"Collectibles"}>Collectibles</option>
                <option value={"Music"}>Music</option>
                <option value={"Photography"}>Photography</option>
                <option value={"Sports"}>Sports</option>
                <option value={"Games"}>Games</option>
                <option value={"Metaverses"}>Metaverses</option>
                <option value={"DeFi"}>DeFi</option>
              </select>
            </div>
            <div class="form-group stats-form">
              <select
                class="form-select stats-select"
                id="exampleFormControlSelect1"
                onChange={(e) => searchhandle(e.target.value, "Chain")}
              >
                <option value="All chains" selected>
                  All chains
                </option>
                <option value={"Ethereum"}>Ethereum</option>
                <option value={"BSC SmartChain"}>BSC SmartChain</option>
                <option value={"Polygon"}>Polygon</option>
              </select>
            </div>
          </div>
          {
              width > 600 ? <div className="col-lg-2"></div> : null
            }
          <div className="row">
            {
              width > 600 ? <div className="col-lg-1"></div> : null
            }
            
            <div className="col-lg-10 col-12 table-responsive" style={{overflow:"auto"}}>
              <table className="stats_table" style={{minWidth: width < 600 && "900px"}}>
                <thead>
                  <tr>
                    <th>Collection</th>
                    <th>Floor Price</th>
                    <th>Volume(24)</th>
                    <th>Volume %(24)</th>
                    <th>Avg Price(24)</th>
                    <th>Avg Price %(24)</th>
                    <th>Floor %(24)</th>
                  </tr>
                </thead>
                <tbody>
                  {nftdata.length > 0
                    ? nftdata.map((e, i) => {
                        return (
                          <tr>
                            <td>
                        

                              <img
                                className="smallImgae mr-2"
                                src={e.LogoImage}
                                alt=""
                              />

                              <span
                                className=" ml-2"
                                style={{ textTransform: "capitalize" }}
                              >
                                           {e.CollectionName}
                              </span>
                            </td>
                            <td>{e.FloorPrice}</td>
                            <td>{e.Volume}</td>
                            <td>{"+" + e.VolumeAvg + "%"}</td>
                            <td>{e.Price.toFixed(2)}</td>
                            <td>{"+" + e.PriceAvg + "%"}</td>
                            <td>+2.65%</td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
            {
              width > 600 ? <div className="col-lg-1"></div> : null
            }
          </div>
        </div>
      </div>
      <CopyRightFooter />
    </>
  );
}

export default Stats;
