import React, { useState, useEffect } from "react";
import "./MyActivity.css";
import NFT from "../../Assets/NFT-5.png";
import Tilt from "react-parallax-tilt";
import CopyRightFooter from "../CopyRightFooter/CopyRightFooter";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ReplayOutlined } from "@mui/icons-material";
import buy from "./Actionicons/buy.png";
import list from "./Actionicons/list.png";
import offer from "./Actionicons/offer.png";
import minted from "./Actionicons/minted.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Slicer, FormatDate1 } from "../Helper/index";
import TablePagination, {
  tablePaginationClasses
} from "@mui/material/TablePagination";
import useWindowDimensions from "../../Utils/useWindowDimensions";
function MyActivity() {
  const {width} = useWindowDimensions()
  const [nft, setnft] = useState({});
  const [nftdata, setnftdata] = useState([]);
  const [searcgnftdata, setsearchnftdata] = useState([]);
  const [daycount, setdaycount] = useState(1);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [lowAddress, setLowAddress] = useState("");

  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.WalletConnect);
  const history = useNavigate();
  const { web3, address, market, BNB_market, MATIC_market } = wallet;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
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
    if (search == "Chain") {
      if (value == "All chains") {
        setData(data1);
        setPage(0);
      } else {
        let data = data1.filter((e, i) => e.Blockchain == value);
        setData(data);
        setPage(0);
      }
    }
  };

  const dayserchhandle = (value) => {
    if (value == "0") {
      setData(data1);
      setPage(0);
    } else if (value == "7") {
      let date = new Date();
      date.setDate(date.getDate() - 7);
      let data = data1.filter((e, i) => new Date(e.createdAt) > new Date(date));
      setData(data);
      setPage(0);
    } else if (value == "14") {
      let date = new Date();
      date.setDate(date.getDate() - 14);
      let data = data1.filter((e, i) => new Date(e.createdAt) > new Date(date));
      setData(data);
      setPage(0);
    } else if (value == "30") {
      let date = new Date();
      date.setMonth(date.getMonth() - 1);
      date.setDate(date.getDate() - (date.getDate() - 1));
      let data = data1.filter((e, i) => new Date(e.createdAt) > new Date(date));
      setData(data);
      setPage(0);
    }
  };
  const getActivites = async () => {
    if (address == "") {
      toast("Connect your wallet");
      return;
    }

    let newAddress = address.toString();
    newAddress = newAddress.toLowerCase();
    setLowAddress(newAddress);
    let result = await axios.post(
      process.env.REACT_APP_API_URL.toString() + "/getActivity",
      { WalletAddress: newAddress }
    );
    if (result.data.status) {
      let date = new Date();
      date.setDate(date.getDate() - 7);
      let data = result.data.result.filter(
        (e, i) => new Date(e.createdAt) > new Date(date)
      );
      setData(data);
      setData1(result.data.result);
      setPage(0);
    }
  };

  useEffect(() => {
    if (address != "") {
      getActivites();
    }
  }, [address]);
  return (
    <>
      <div
        className="container-fluid stats_page"

      >
        <div className="row">
          <div className="col-lg-1 col-md-1 col-1"></div>
          <div className="col-lg-10 col-md-10 col-10">
            <div className="stats_heading_container">
              <h2>My Activities </h2>
            </div>
          </div>
          <div className="col-lg-1 col-md-1 col-1"></div>
        </div>
        <div className=" row stats_btn_grp">
          {
            width > 600 && <div className="col-lg-2"></div>
          }
          
          <div className="col-lg-8 stats_btn_container">
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
                <option value="0">All</option>
              </select>
            </div>
            {/* <div class="form-group stats-form">

              <select
                class="form-select stats-select"
                id="exampleFormControlSelect1"
                onChange={(e) => searchhandle(e.target.value, 'Categories')}
              >
                <option value="All Categories" selected >All Categories</option>
                <option value={"Art"}>Art</option>
                <option value={"Collectibles"}>Collectibles</option>
                <option value={'Music'}>Music</option>
                <option value={'Photography'}>Photography</option>
                <option value={'Sports'}>Sports</option>
                <option value={'Games'}>Games</option>
                <option value={'Metaverses'}>Metaverses</option>
                <option value={'DeFi'}>DeFi</option>
              </select>

            </div> */}
            <div class="form-group stats-form">
              <select
                class="form-select stats-select"
                id="exampleFormControlSelect1"
                onChange={(e) => {
                  searchhandle(e.target.value, "Chain");
                }}
              >
                <option value="All chains" selected>
                  All chains
                </option>
                <option value={"Ethereum"}>Ethereum</option>
                <option value={"BSC SmartChain"}>BSC Smart Chain</option>
                <option value={"Polygon"}>Polygon</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-10 col-12 table-responsive">
              {data.length != 0 ? (
                <table className="stats_table" style={{ textAlign: "center" }}>
                  <thead>
                    <tr>
                      <td className="name">Items</td>
                      <td className="name" style={{ textAlign: "left" }}>
                        Action
                      </td>
                      <td className="name" style={{ textAlign: "left" }}>
                        Price
                      </td>

                      <td className="name">From</td>
                      <td className="name">To</td>
                      <td className="name">Activity on</td>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length != 0
                      ? data.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      ).map((e, i) => {
                          return (
                            <tr className="ActivityColumn">
                              <td className="d-flex pl-5 align-items-center">
                                <img
                                  className="smallImgae mr-2"
                                  src={e?.nftDetails[0]?.Imageurl}
                                  alt=""
                                />
                                <span
                                  className=" ml-2"
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {e?.nftDetails[0]?.ItemName}
                                </span>
                              </td>
                              <td>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                  }}
                                >
                                  <div>
                                    <img
                                      style={{ height: "20px", width: "20px" }}
                                      src={
                                        e.Type == "Transfer"
                                          ? require("./Actionicons/arrow.png")
                                          : e.Type == "Minted"
                                          ? require("./Actionicons/minted.png")
                                          : e.Type == "List"
                                          ? require("./Actionicons/list.png")
                                          : e.Type == "Buy"
                                          ? require("./Actionicons/buy.png")
                                          : e.Type == "Offer"
                                          ? require("./Actionicons/offer.png")
                                          : e.Type == "Sale"
                                          ? require("./Actionicons/list.png")
                                          : e.Type == "Auction"
                                          ? require("./Actionicons/list.png")
                                          : e.Type == "Bid"
                                          ? require("./Actionicons/list.png")
                                          : null
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div>
                                    <span className=" ml-2">{e.Type}</span>
                                  </div>
                                </div>
                              </td>

                              <td>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                  }}
                                >
                                  <div>
                                    {e.price == "-" ? "   " : (
                                      <img
                                        style={{
                                          height: "20px",
                                          width: "20px",
                                        }}
                                        src={
                                          e.Blockchain == "Ethereum"
                                            ? require("../../Assets/currency/eth.svg")
                                            : e.Blockchain == "BSC SmartChain"
                                            ? require("../../Assets/currency/bnb.svg")
                                            : require("../../Assets/currency/matic2.svg")
                                        }
                                        alt=""
                                      />
                                    )}
                                  </div>
                                  <div>
                                    <span className=" ml-2">{e.price}</span>
                                  </div>
                                </div>
                              </td>
                              <td>{e.quantity}</td>
                              <td>
                                {lowAddress == e.from.toLowerCase()
                                  ? "You"
                                  : Slicer(e.from)}
                              </td>
                              <td>
                                {lowAddress == e.to.toLowerCase()
                                  ? "You"
                                  : Slicer(e.to)}
                              </td>
                              <td>{FormatDate1(e.createdAt)}</td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
              ) : (
                <div
                  className="col-lg-12 name mt-3"
                  style={{ justifyContent: "center" }}
                >
                  {"No recent activites"}
                </div>
              )}
                {data.length!=0&&
                 <TablePagination
                 sx={{
                
                  [`& .${tablePaginationClasses.spacer}`]: {
                    // display: "none",

                    // backgroundColor:"red"    
                                },
                  [`& .${tablePaginationClasses.toolbar}`]: {
                    justifyContent: "flex-end",
                    alignItems:"center",
                    // backgroundColor:"yellow"
                  },
                  [`& .${tablePaginationClasses.root}`]: {
                   
                    // backgroundColor:"red"  
                  },
                  [`& .${tablePaginationClasses.selectLabel}`]: {
                    // backgroundColor:"blue"  ,
                    marginTop:"10px"
                 
                  },
                  [`& .${tablePaginationClasses.selectRoot}`]: {
                    // backgroundColor:"yellow"  
                 
                  },
                  [`& .${tablePaginationClasses.selectIcon}`]: {
                    // backgroundColor:"green"  
                  }
                  ,
                  [`& .${tablePaginationClasses.input}`]: {
                    // backgroundColor:"gray"  
                  }
                  ,
                  [`& .${tablePaginationClasses.menuItem}`]: {
                    // backgroundColor:"blue"  
                  }
                  ,
                  [`& .${tablePaginationClasses.displayedRows}`]: {
                    // backgroundColor:"red"  ,
                    marginTop:"10px"
                  },
                  [`& .${tablePaginationClasses.actions}`]: {
                    // backgroundColor:"green"  
                  },
                  alignItems:"center",
                  // backgroundColor:"green"  
                }}
                 component={"div"}
                 rowsPerPageOptions={[]}
                 labelRowsPerPage={""}
                 count={data.length}
                 rowsPerPage={rowsPerPage}
                 page={page}
                 onPageChange={handleChangePage}
                 onRowsPerPageChange={handleChangeRowsPerPage}
         
               />
              }
            </div>
            {
            width > 600 && <div className="col-lg-2"></div>
          }
          </div>
        </div>
      </div>
      <CopyRightFooter />
    </>
  );
}

export default MyActivity;
