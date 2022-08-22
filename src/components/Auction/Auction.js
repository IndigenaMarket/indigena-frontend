import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  connectWallet,
  connectFailed,
  addNetwork,
} from "../../redux/WalletAction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import "./Auction.css";
import nftAbi from "../../contracts/MainContract1155_Eth.json";
import nftBNB from "../../contracts/MainContract1155_BSC.json";
import nftMatic from "../../contracts/MainContract1155_Matic.json";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../s3client";
import { toast } from "react-toastify";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";

const AWS = require("aws-sdk");
function Auction() {
  const history = useNavigate();
  const ETHCHAINID = process.env.REACT_APP_ETH_Chain_ID;
  const BSCCHAINID = process.env.REACT_APP_BSC_Chain_ID;
  const MATICCHAINID = process.env.REACT_APP_MATIC_Chain_ID;
  const [tokenid, settokenId] = useState("");
  const [nft, setnft] = useState("");
  const [NftResult, setNftResult] = useState({});
  const [Price, setPrice] = useState("");
  const [Duration, setDuration] = useState("");
  const [loading, setloading] = useState(false);
  const [blockchain, setblockchain] = useState("");

  const [value, setValue] = useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue)
    setDuration(newValue)
  };

  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.WalletConnect);
  const { web3, address, market } = wallet;
  useEffect(async () => {
    let url = decodeURIComponent(window.location.href);
    url = url.split("/");
    let tokenid = url[url.length - 1];
    let nftresult = await axios.get(
      process.env.REACT_APP_INDIGENA_BUCKETNAME + tokenid + ".json"
    );
    setNftResult(nftresult);
    setnft(nftresult.data.pinataContent);
    settokenId(tokenid);
    setblockchain(nftresult.data.pinataContent.Blockchain);

    if (nftresult.data.pinataContent.Blockchain == "Ethereum") {
      if (window.ethereum && window.ethereum.networkVersion !== ETHCHAINID) {
        await addNetwork(ETHCHAINID);
      }
    } else if (nftresult.data.pinataContent.Blockchain == "BSC SmartChain") {
      if (window.ethereum && window.ethereum.networkVersion !== BSCCHAINID) {
        await addNetwork(BSCCHAINID);
      }
    } else {
      if (window.ethereum && window.ethereum.networkVersion !== MATICCHAINID) {
        await addNetwork(MATICCHAINID);
      }
    }
  }, []);

  const handleSelection = (e) => {
    const checked = e.target.checked;
    if (checked) {
    } else {
    }
  };
  const networkChange = async () => {
    if (nft.Blockchain == "Ethereum") {
      if (window.ethereum && window.ethereum.networkVersion !== ETHCHAINID) {
        await addNetwork(ETHCHAINID);
        getApproval();
      } else {
        getApproval();
      }
    } else if (nft.Blockchain == "BSC SmartChain") {
      if (window.ethereum && window.ethereum.networkVersion !== BSCCHAINID) {
        await addNetwork(BSCCHAINID);
        getApproval();
      } else {
        getApproval();
      }
    } else {
      if (window.ethereum && window.ethereum.networkVersion !== MATICCHAINID) {
        await addNetwork(MATICCHAINID);
        getApproval();
      } else {
        getApproval();
      }
    }
  };
  const getApproval = async () => {
    if (Price == "") {
      toast("Enter price");
      return;
    } else if (isNaN(Price)) {
      toast("Enter valid price");
      return;
    } else if (Duration == "") {
      toast("Select duration");
      return;
    }else if(new Date(Duration)<new Date()){
      toast("Select duration must be morethan current time");
      return;
    }
    if (address) {
      setloading(true);
      NftResult.data.pinataContent.Price = Price;
      let current_time = new Date();
      let minutes = 10;
      var enddate = new Date(Duration);
      //ending testing purpose date
      if (Price) {
        NftResult.data.pinataContent.AuctionEndDate = enddate;
        NftResult.data.pinataContent.Status = "Auction";
        NftResult.data.pinataContent.Auctionstartprice = Price;
      }
    
      const s3Bucket = 'indigena'; // replace with your bucket name
      const objectName = tokenid.toString() + '.json'; // File name which you want to put in s3 bucket
      const objectData = JSON.stringify(NftResult.data); // file data you want to put
      const objectType = 'application/json';
      const params = {
        Bucket: "indigena",
        Key: objectName,
        Body: objectData,
        ContentType: objectType,
        ACL: 'public-read'
      };

      try {
        const nftInstance = new web3.eth.Contract(blockchain == "Ethereum" ? nftAbi : blockchain == "BSC SmartChain" ? nftBNB : nftMatic, blockchain == "Ethereum" ? process.env.REACT_APP_NFT_ETH_CONTRACT : blockchain == "BSC SmartChain" ? process.env.REACT_APP_NFT_BNB_CONTRACT : process.env.REACT_APP_NFT_MATIC_CONTRACT);
        const nftApproveRes = await nftInstance.methods.setApprovalForAll(blockchain == "Ethereum" ? process.env.REACT_APP_NFT_TRADE_ETH : blockchain == "BSC SmartChain" ? process.env.REACT_APP_NFT_TRADE_BNB : process.env.REACT_APP_NFT_TRADE_MATIC
          , true).send({ from: address });
        if (nftApproveRes.status) {
          const result1 = await s3Client.send(new PutObjectCommand(params));
          let result = await axios.put(process.env.REACT_APP_API_URL.toString() + "/updatenftprice", { tokenId: tokenid, price: Price, status: "Auction", enddate: enddate })
          let idNo=tokenid.split("-");
          let data=idNo[1]
          let newaddress=address.toLowerCase()
          let Activity = await axios.post(
            process.env.REACT_APP_API_URL.toString() + "/createActivity",
            {WalletAddress:newaddress,
              TokenId:tokenid,
              Token:data,
              Blockchain:blockchain,
              from:address,
              to:"-",
              Type:"Auction",
              price:Price,
              quantity:1
            }
          );
          if (result.status) {
            toast("Listed Success");
            history('/collections')
          }
          else {
            toast("Something Went wrong")
          }
        }
        setloading(false)
      }
      catch (e) {
        setloading(false)
      }
    } else {
      toast("Please connect wallet");
    }
  };

  return (
    <div className=" container-fluid Auction_page">
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <form>
            <div className="row">
              <div className="col-lg-12 input_label">
                <span>Method</span>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div class="form-group">
                  <select
                    class="form-control form-select"
                    id="exampleFormControlSelect1"
                    disabled={true}
                    style={{ height: "45px" }}
                  >
                    <option>Sell to highest bidder</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 input_label">
                <span>Price</span>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-6">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="INDI"
                    value={nft.Blockchain}
                    disabled={true}
                    style={{ height: "45px" }}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6  col-6">
                <div class="form-group">
                  <input
                    type="number"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Price"
                    style={{ height: "45px" }}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 input_label">
                <span>Duration</span>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div
                  class="form-control"
                  style={{
                    height: "40px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "red",
                  }}
                >
                  <div className="col-lg-11">
                    {/* <DatePicker   selected={Duration} onChange={(date) => setDuration(date)} /> */}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      // label="Date&Time picker"
                      value={value}
                      minDateTime={new Date()}
                      onChange={handleChange}
                      renderInput={(params) => <TextField   {...params} />}
                    />
                    </LocalizationProvider>
                   
                  </div>
                  {/* <div className="col-lg-1 ">
                    <img
                      src={require("../../Assets/currency/calendar.svg")}
                      style={{
                        height: "20px",
                        width: "20px",
                        color: "rgba(0,0,0,0.5)",
                      }}
                      alt=""
                    />
                  </div> */}
                </div>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-lg-10 input_label">
                <span className="reservePriceHeading">
                  Include Reserve Price
                </span>
              </div>
              <div className="col-lg-2">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    onClick={(e) => handleSelection(e)}
                  />
                </div>
              </div>
            </div>
          </form>
          <button className="mintNFT_btn1" onClick={() => networkChange()}>
            {loading ? <div className="loading"></div> : "List for sale"}
          </button>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
}

export default Auction;
