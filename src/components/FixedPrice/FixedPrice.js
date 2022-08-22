import React, { useState, useEffect } from "react";
import "./FixedPrice.css";
import {
  connectWallet,
  connectFailed,
  addNetwork,
} from "../../redux/WalletAction";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import nftAbi from "../../contracts/MainContract1155_Eth.json";
import nftBNB from "../../contracts/MainContract1155_BSC.json";
import nftMatic from "../../contracts/MainContract1155_Matic.json";
import axios from "axios";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../s3client";
import { toast } from "react-toastify";
const AWS = require("aws-sdk");

function FixedPrice() {
  const history = useNavigate();
  const wallet = useSelector((state) => state.WalletConnect);
  const { web3, address, market } = wallet;
  const [code, setCode] = useState("");
  const [nft, setnft] = useState("");
  const [Price, setPrice] = useState("");
  const [NftResult, setNftResult] = useState({});
  const [tokenId, settokenId] = useState("");
  const [loading, setloading] = useState(false);
  const [blockchain, setblockchain] = useState("");
  useEffect(async () => {
    let url = decodeURIComponent(window.location.href);
    url = url.split("/");
    let tokenid = url[url.length - 1];
    // let nftresult=await axios.get("https://indigenanft.nyc3.digitaloceanspaces.com"+tokenid+".json")
    let nftresult = await axios.get(
      process.env.REACT_APP_INDIGENA_BUCKETNAME + tokenid + ".json"
    );
    //toast(nftresult);
 
    setNftResult(nftresult);
    setnft(nftresult.data.pinataContent);
    settokenId(tokenid);
    setblockchain(nftresult.data.Blockchain);
    if (nftresult.data.pinataContent.Blockchain == "Ethereum") {
      if (
        window.ethereum &&
        window.ethereum.networkVersion !== process.env.REACT_APP_ETH_Chain_ID
      ) {
        await addNetwork(process.env.REACT_APP_ETH_Chain_ID);
      }
    } else if (nftresult.data.pinataContent.Blockchain == "BSC SmartChain") {
      if (
        window.ethereum &&
        window.ethereum.networkVersion !== process.env.REACT_APP_BSC_Chain_ID
      ) {
        await addNetwork(process.env.REACT_APP_BSC_Chain_ID);
        //window.location.reload(false);
      }
    } else {
      if (
        window.ethereum &&
        window.ethereum.networkVersion !== process.env.REACT_APP_MATIC_Chain_ID
      ) {
        await addNetwork(process.env.REACT_APP_MATIC_Chain_ID);
        //window.location.reload(false);
      }
    }
  }, [web3]);

  const handleSelection = (e) => {
    const checked = e.target.checked;

    if (checked) {
      // console.log("checked");
    } else {
      // console.log("Not checked");
    }
  };
  const onchangeprice = (price) => {
    setPrice(price);
  };
  //toast(nft.contractAddress)
  const networkCheck=async()=>{
    if (nft.Blockchain == "Ethereum") {
      if (
        window.ethereum &&
        window.ethereum.networkVersion !== process.env.REACT_APP_ETH_Chain_ID
      ) {
        await addNetwork(process.env.REACT_APP_ETH_Chain_ID);
        getApproval()
      }else{
        getApproval()
      }
    } else if (nft.Blockchain == "BSC SmartChain") {
      if (
        window.ethereum &&
        window.ethereum.networkVersion !== process.env.REACT_APP_BSC_Chain_ID
      ) {
        await addNetwork(process.env.REACT_APP_BSC_Chain_ID);
        getApproval()
      }else{
        getApproval()
      }
    } else if(nft.Blockchain == "Polygon") {
      if (
        window.ethereum &&
        window.ethereum.networkVersion !== process.env.REACT_APP_MATIC_Chain_ID
      ) {
        await addNetwork(process.env.REACT_APP_MATIC_Chain_ID);
        getApproval()
      }else{
        getApproval()
      }
    }else{
      toast("Something went wrong")
    }
  }
  const getApproval = async () => {
  
    setloading(true);

 
    try {
      const nftInstance = new web3.eth.Contract(
        nft.Blockchain == "Ethereum"
          ? nftAbi
          : nft.Blockchain == "BSC SmartChain"
          ? nftBNB
          : nftMatic,
        nft.Blockchain == "Ethereum"
          ? process.env.REACT_APP_NFT_ETH_CONTRACT
          : nft.Blockchain == "BSC SmartChain"
          ? process.env.REACT_APP_NFT_BNB_CONTRACT
          : process.env.REACT_APP_NFT_MATIC_CONTRACT
      );
      const nftApproveRes = await nftInstance.methods
        .setApprovalForAll(
          nft.Blockchain == "Ethereum"
            ? process.env.REACT_APP_NFT_TRADE_ETH
            : nft.Blockchain == "BSC SmartChain"
            ? process.env.REACT_APP_NFT_TRADE_BNB
            : process.env.REACT_APP_NFT_TRADE_MATIC,
          true
        )
        .send({ from: address });

      if (nftApproveRes.status) {
        NftResult.data.pinataContent.Price = Price;
        if (Price) {
          NftResult.data.pinataContent.Status = "Fixed price";
        }
        const s3Bucket = "indigena";
        const objectName = tokenId.toString() + ".json";
        const objectData = JSON.stringify(NftResult.data);
        const objectType = "application/json";
        const params = {
          Bucket: s3Bucket,
          Key: objectName,
          Body: objectData,
          ContentType: objectType,
          ACL: "public-read",
        };
        //  const result1 =await s3.putObject(params).promise();
        const reresult1s = await s3Client.send(new PutObjectCommand(params));
        
        let result = await axios.put(
          process.env.REACT_APP_API_URL.toString() + "/updatenftprice",
          { tokenId: tokenId, price: Price, status: "Fixedprice" }
        );
        let idNo=tokenId.split("-");
        let data=idNo[1]
        let newaddress=address.toLowerCase()
        let Activity = await axios.post(
          process.env.REACT_APP_API_URL.toString() + "/createActivity",
          {WalletAddress:newaddress,
            TokenId:tokenId,
            Token:data,
            Blockchain:nft.Blockchain,
            from:address,
            to:"-",
            Type:"List",
            price:Price,
            quantity:1
          }
        );
        if (result.status) {
          toast("Listed Success");
          history("/collections");
        } else {
          toast("Something Went wrong");
        }
      }
      setloading(false);
    } catch (e) {
      setloading(false);
    }

  };

  return (
    <div className=" container-fluid FixedPrice_page">
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <form>
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
                    disabled={true}
                    style={{ height: "45px" }}
                    value={nft.Blockchain}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6  col-6">
                <div class="form-group">
                  {/* <select
                                    class="form-control form-select"
                                    id="exampleFormControlSelect1"
                                  >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                  </select> */}
                  <input
                    type="number"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Price"
                    style={{ height: "45px" }}
                    onChange={(e) => onchangeprice(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* <div className="row">
            <div className="col-lg-12 input_label">
                <span >Duration</span>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
            <div class="form-group">
                                  
                                  <select
                                    class="form-control form-select"
                                    id="exampleFormControlSelect1"
                                  >
                                    <option>7 days</option>
                                    <option>14 days</option>
                                    <option>21 days</option>
                                  </select>
                                </div>
            </div>
        </div> */}
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
                    id="flexSwitchCheckDefa ult"
                    onClick={(e) => handleSelection(e)}
                  />
                </div>
              </div>
            </div>
          </form>
          <button className="mintNFT_btn1 mt-5"  onClick={() => networkCheck()}>
            {loading ? <div className="loading"></div> : "List for sale"}
          </button>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
}

export default FixedPrice;
