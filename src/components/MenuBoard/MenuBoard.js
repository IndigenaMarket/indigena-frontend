import React, { useState, useEffect } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import Logout from "../../Assets/exit.png";
import NFT from "../../Assets/NFT-9.png";
import Filters from "../FilterNav/Filters";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HistoryIcon from "@mui/icons-material/History";
import LockIcon from "@mui/icons-material/Lock";
import SellIcon from "@mui/icons-material/Sell";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import dropDownIcon from "../../Assets/Icon-arrow-dropdown.png";
import "./MenuBoard.css";
import MenuBoardDropDown from "./MenuBoardDropDown";
import ColoredLine from "../ColoredLine/ColoredLine";
import Accordion from "./Accordion";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../s3client";
import tokenAbi from "../../contracts/TokenContract_WETH.json";
import tokenBNBAbi from "../../contracts/TokenContract_WETH.json";
import tokenMaticAbi from "../../contracts/TokenContract_WMATIC.json";
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2'


import nftAbi from "../../contracts/MainContract1155_Eth.json";
import nftBNB from "../../contracts/MainContract1155_BSC.json";
import nftMatic from "../../contracts/MainContract1155_Matic.json";

import axios from "axios";
import { useTimer } from "react-timer-hook";
import { Form, Modal, Button } from "react-bootstrap";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  connectWallet,
  connectFailed,
  addNetwork,
} from "../../redux/WalletAction";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import GridViewIcon from "@mui/icons-material/GridView";
//import ShowChartIcon from '@mui/icons-material/ShowChart';
import "./MenuBoardDropDown.css";
import { Block } from "@mui/icons-material";
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import { toast } from "react-toastify";
import { RoundValue, RoundValue2, Slicer, FormatDate1 } from "../Helper/index";
import { parse } from "path";
import useWindowDimensions from "../../Utils/useWindowDimensions";
const AWS = require("aws-sdk");

function MyTimer({ expiryTimestamp, timeover }) {
  
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => timeover() });

  useEffect(async () => {
    let url = window.location.href;
    url = url.split("/");
    let tokenid = url[url.length - 1];
    let nftresult = await axios.get(
      process.env.REACT_APP_INDIGENA_BUCKETNAME + tokenid + ".json"
    );
    const time = new Date(nftresult.data.pinataContent.AuctionEndDate);
    // const time = new Date("2022-08-05T11:10:04.523Z");

    time.setSeconds(time.getSeconds());
    restart(time);
  }, []);
  return (
    <div className="row" style={{ textAlign: "center" }}>
      <div className="col-12" style={{ fontSize: "20px" }}>
        {days == 0 ? null : (
          <>
            <span>
              {days}
              {" Days "}
            </span>
          </>
        )}
        {
          // days == 0 ||
          hours == 0 ? null : (
            <>
              <span>
                {hours}
                {" Hours "}
              </span>
            </>
          )
        }

        {
          // days == 0 || hours == 0 ||
          minutes == 0 ? null : (
            <>
              <span>
                {minutes}
                {" Minutes "}
              </span>
            </>
          )
        }

        {
          // days == 0 || hours == 0 || minutes == 0 ||
          seconds == 0 ? null : (
            <>
              <span>
                {seconds}
                {" Seconds"}
              </span>
            </>
          )
        }
      </div>
    </div>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function MenuBoard() {
  const {width} = useWindowDimensions();
  const [nft, setnft] = useState({});
  const dispatch = useDispatch();
  const { state } = useLocation();
  const wallet = useSelector((state) => state.WalletConnect);
  const history = useNavigate();
  const { web3, address, market, BNB_market, MATIC_market } = wallet;
  // if(wallet.connected)
  // {
  //   getFavourites();
  // }
  const [NftResult, setNftResult] = useState({});
  const [tokenId, setTokenId] = useState("");
  const [price, setprice] = useState("");
  const [expiryTimestamp, setexpiryTimestamp] = useState("");
  const [showListing, setShowListing] = useState(false);
  const [showPriceListing, setShowPriceListing] = useState(true);
  const [showBidActivity, setShowBidActivity] = useState(false);
  const [showRecentActivity, setShowRecentActivity] = useState(false);
  const [timer, settimer] = useState(false);
  const [bitdata, setbitdata] = useState([]);
  const [offerdata, setofferdata] = useState([]);
  const [modalshow, setmodalshow] = useState(false);
  const [offerModel, setofferModel] = useState(false);
  const [currentPrice, setcurrentPrice] = useState("");
  const [properties, setproperties] = useState([]);
  const [index, setindex] = useState(0);
  const [unlockcontent, setunlockcontent] = useState(false);
  const [historydata, sethistorydata] = useState([]);
  const [creatordetails, setcreatordetails] = useState({});
  const [ownerDetails, setOwnerDetails] = useState({});

  const [buymodal, setbuymodal] = useState(false);
  const [pricehistorydata, setpricehistorydata] = useState([]);
  const [Views, setViews] = useState(true);
  const [Buybuttonenable, setBuybuttonenable] = useState(true);
  const [Viewscount, setViewscount] = useState("");
  const [AdminStatus, setAdminStatus] = useState(false);
  const [Removemodal, setRemovemodal] = useState(false);
  const [BlockModal, setBlockModal] = useState(false);
  const [blockchain, setblockchain] = useState(false);
  const [favouritescount, setfavouritescount] = useState(0);
  const [alreadyLiked, setalreadyLiked] = useState(false);
  const [bitstatus, setbitstatus] = useState(false);
  const [creatorAddress, setcreatorwalletAddress] = useState("");
  const [MakeOfferDisable, setMakeOfferDisable] = useState(false);
  const [loadingindex, setloadingindex] = useState(null);
  const [loading, setloading] = useState(false);
  const [isNftOwner, setIsNftOwner] = useState(false);
  const [reRender, setReRender] = useState(true);
  const [tempdata, settempdata] = useState([]);

  const getdata = async () => {
    let url = window.location.href;
    url = url.split("/");
    let tokenid = url[url.length - 1];
    let idNo = tokenid.split("-");
    let data1 = idNo[0];
    let data = idNo[1];

    var config = {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    };
    let nftresult = await axios.get(
      process.env.REACT_APP_INDIGENA_BUCKETNAME + tokenid + ".json",
      config
    );

    setNftResult(nftresult.data);
    let propertiesdataarray = [];
    let propertiesdata = Object.entries(
      nftresult?.data.pinataContent.Properties
    );
    for (var i = 0; i < propertiesdata.length; i++) {
      propertiesdataarray.push(propertiesdata[i][1]);
    }
    setproperties(propertiesdataarray);
    setnft(nftresult.data.pinataContent);
    
    getbitdata(tokenid);
    getOffer(decodeURIComponent(tokenid));
    setblockchain(nftresult.data.pinataContent.Blockchain);
    setTokenId(tokenid);
  };
  const getbitdata = async (tokenId) => {
    let bitdata = await axios.post(
      process.env.REACT_APP_API_URL.toString() + "/maxbid",
      { TokenId: tokenId }
    );
    let biddata = [];
    if (bitdata.data.result.length > 0) {
      bitdata.data.result.map(async (data, i) => {
        data.Price = data.Price.$numberDecimal;
        biddata.push(data);
      });
      setbitdata(biddata);
      setcurrentPrice(biddata[0].Price);
    }
  };

  const getOffer = async (tokenId) => {
    let bitdata = await axios.post(
      process.env.REACT_APP_API_URL.toString() + "/getOffer",
      { TokenId: tokenId }
    );
    let biddata = [];
    if (bitdata.data.result.length > 0) {
      bitdata.data.result.map(async (data, i) => {
        if (data.WalletAddress == address && data.Status == "Pending") {
          setMakeOfferDisable(true);
        }
        data.Price = data.Price.$numberDecimal;
        biddata.push(data);
      });
      setofferdata(biddata);
    }
  };
  const executeorder = async () => {
    let url = window.location.href;
    url = url.split("/");
    let tokenid = url[url.length - 1];
    let bitdata = await axios.post(
      process.env.REACT_APP_API_URL.toString() + "/maxbid",
      { TokenId: tokenid }
    );

    if (web3 != null) {
      if (nft.Blockchain == "Ethereum") {
        if (
          window.ethereum &&
          window.ethereum.networkVersion !== process.env.REACT_APP_ETH_Chain_ID
        ) {
          await addNetwork(process.env.REACT_APP_ETH_Chain_ID);
        }
      } else if (nft.Blockchain == "BSC SmartChain") {
        if (
          window.ethereum &&
          window.ethereum.networkVersion !== process.env.REACT_APP_BSC_Chain_ID
        ) {
          await addNetwork(process.env.REACT_APP_BSC_Chain_ID);
        }
      } else {
        if (
          window.ethereum &&
          window.ethereum.networkVersion !==
            process.env.REACT_APP_MATIC_Chain_ID
        ) {
          await addNetwork(process.env.REACT_APP_MATIC_Chain_ID);
        }
      }
      const tokenInstance = new web3.eth.Contract(
        nft.Blockchain == "Ethereum"
          ? tokenAbi
          : nft.Blockchain == "BSC SmartChain"
          ? tokenBNBAbi
          : tokenMaticAbi,
        nft.Blockchain == "Ethereum"
          ? process.env.REACT_APP_WETH_TOKEN
          : nft.Blockchain == "BSC SmartChain"
          ? process.env.REACT_APP_WBNB_TOKEN
          : process.env.REACT_APP_WMATIC_TOKEN
      );
      var status = false;
      let tempdata = [];
      let count = 0;

      await bitdata.data.result.map(async (data, i) => {
        //toast(JSON.stringify(data.WalletAddress));
        count = count + 1;
        const Balance = await tokenInstance.methods
          .balanceOf(data.WalletAddress)
          .call();
        // toast(Balance);
        const price = await web3.utils.toWei(
          data.Price.$numberDecimal.toString(),
          "ether"
        );

        var amt1 = await web3.utils.fromWei(Balance.toString(), "ether");
        var amt2 = await web3.utils.fromWei(price.toString(), "ether");
        if (parseFloat(amt1) > parseFloat(amt2)) {
          data.Price = data.Price.$numberDecimal;
          setindex(i);
          tempdata.push(data);
        }
        if (i == bitdata.data.result.length - 1) {
          let searchdata = tempdata.sort(function (a, b) {
            if (parseFloat(a["Price"]) < parseFloat(b["Price"])) {
              return 1;
            } else if (parseFloat(a["Price"]) > parseFloat(b["Price"])) {
              return -1;
            }
            return 0;
          });
          settempdata(searchdata);
        }
      });
    }
  };

  const offerReject = async (id, walletaddress, tokenId) => {
    let tokensresult = await axios.put(
      process.env.REACT_APP_API_URL.toString() + "/updateOffer",
      {
        WalletAddress: walletaddress,
        tokenId: tokenId,
        status: "Rejected",
        _id: id,
      }
    );
    if (tokensresult.data.status) {
      toast("Rejected");
      getOffer(tokenId);
    } else {
      toast("Something went wrong");
    }
  };

  const getsaleshistory = async () => {
    let url = decodeURIComponent(window.location.href);
    url = url.split("/");
    let tokenid = url[url.length - 1];
    let nftresult = await axios.get(
      process.env.REACT_APP_INDIGENA_BUCKETNAME + tokenid + ".json"
    );
    var moralis_url;
    tokenid = url[url.length - 1].split("-");
    tokenid = tokenid[tokenid.length - 1];
    if (nftresult.data.pinataContent.Blockchain == "Ethereum") {
      moralis_url =
        "https://deep-index.moralis.io/api/v2/nft/" +
        process.env.REACT_APP_NFT_ETH_CONTRACT.toString() +
        "/" +
        tokenid +
        "/transfers?chain=eth&format=decimal";
    } else if (nftresult.data.pinataContent.Blockchain == "BSC SmartChain") {
      moralis_url =
        "https://deep-index.moralis.io/api/v2/nft/" +
        process.env.REACT_APP_NFT_BNB_CONTRACT.toString() +
        "/" +
        tokenid +
        "/transfers?chain=bsc&format=decimal";
    } else {
      moralis_url =
        "https://deep-index.moralis.io/api/v2/nft/" +
        process.env.REACT_APP_NFT_MATIC_CONTRACT.toString() +
        "/" +
        tokenid +
        "/transfers?chain=polygon&format=decimal";
    }

    //toast(moralis_url)
    let salesdata = await axios.get(moralis_url, {
      headers: {
        "X-API-Key": process.env.REACT_APP_MORALIS_API_KEY.toString(),
      },
    });
    sethistorydata(salesdata.data.result);
    if (salesdata.data.result.length > 0) {
      setcreatorwalletAddress(salesdata.data.result[0].to_address);
      let data = { WalletAddress: salesdata.data.result[0].to_address };
      let tokensresult = await axios.post(
        process.env.REACT_APP_API_URL.toString() + "/getnft",
        data
      );
      if (tokensresult.data.result != []) {
        setcreatordetails(tokensresult.data.result.slice(-1)[0]);
        setOwnerDetails(tokensresult.data.result[0]);
      }

      if (wallet.connected) {
        let pricechartdata = [];
        salesdata.data.result.map((data, i) => {
          let pricehistory = {};
          pricehistory["Price"] = web3.utils.fromWei(data.value);
          pricehistory["Date"] = data.block_timestamp.slice(0, 10);
          pricechartdata.unshift(pricehistory);

          if (i + 1 == salesdata.data.result.length) {
            setpricehistorydata(pricechartdata);
          }
        });
      }
    }
  };

  const getdollar = (network) => {
    var price = 0;
    if (network == "Ethereum") {
      price = nft.Price
        ? parseFloat(nft.Price) * parseFloat(localStorage.getItem("Eth-price"))
        : 0;
    } else if (network == "BSC SmartChain") {
      price = nft.Price
        ? parseFloat(nft.Price) * parseFloat(localStorage.getItem("Bnb-price"))
        : 0;
    } else if (network == "Polygon") {
      price = nft.Price
        ? parseFloat(nft.Price) *
          parseFloat(localStorage.getItem("Matic-price"))
        : 0;
    }
    let roundPrice = RoundValue2(price);
    return roundPrice;
  };

  useEffect(async () => {
    getFavourites();
    checkuserStatus();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    getUserType();
    await getdata();
    getsaleshistory();

    if (Views) {
        getReview();
    }

    //await getbitdata()
  }, [wallet.connected]);
  const checkuserStatus = async () => {
    if (address) {
      let tokensresult = await axios.post(
        process.env.REACT_APP_API_URL.toString() + "/checkUserStatus",
        { WalletAddress: address }
      );
      if (tokensresult.data.result) {
        toast("You are blocked by admin.Please contact our admin team");
        history("/resources");
      } else {
        return;
      }
    }
  };
  const getUserType = async () => {
    let tokensresult = await axios.post(
      process.env.REACT_APP_API_URL.toString() + "/getnft",
      { WalletAddress: address }
    );
    if (tokensresult.data.result[0].IsAdmin) {
      setAdminStatus(true);
    }
  };
  const RemoveNft = async () => {
    let tokensresult = await axios.put(
      process.env.REACT_APP_API_URL.toString() + "/updatenftprice",
      { tokenId: tokenId, status: "Block" }
    );
    if (tokensresult.data.status) {
      toast("Updated sucessfully");
      history("/marketplace");
    } else {
      toast("Something went wrong");
    }
  };
  const blockUser = async () => {
    //toast(creatordetails.WalletAddress)
    let tokensresult = await axios.put(
      process.env.REACT_APP_API_URL.toString() + "/updateCollection",
      { WalletAddress: creatordetails.WalletAddress }
    );
    if (tokensresult.data.status) {
      toast("Updated sucessfully");
      history("/marketplace");
    } else {
      toast("Something went wrong");
    }
  };
  const getReview = async () => {
    setViews(false);
    let url = decodeURIComponent(window.location.href);
    url = url.split("/");
    let tokenid = url[url.length - 1];
    let tokensresult = await axios.post(
      process.env.REACT_APP_API_URL.toString() + "/GetViews",
      { NftId: tokenid ,address:address}
    );
    setViewscount(tokensresult.data.result[0].Views);
  };

  const getFavourites = async () => {
    let url = decodeURIComponent(window.location.href);
    url = url.split("/");
    let tokenid = url[url.length - 1];
    let tokensresult = await axios.post(
      process.env.REACT_APP_API_URL.toString() + "/getFavourites",
      { NftId: tokenid, WalletAddress: address }
    );
    setfavouritescount(tokensresult.data.result);
    if (tokensresult.data.alreadyLiked) {
      setalreadyLiked(true);
    }
    if (tokensresult.data.success) {
      setIsNftOwner(tokensresult.data.owner);
    }
  };
  const addFavourites = async () => {
    let url = decodeURIComponent(window.location.href);
    url = url.split("/");
    let tokenid = url[url.length - 1];
    if (address) {
      let tokensresult = await axios.post(
        process.env.REACT_APP_API_URL.toString() + "/AddFavourites",
        { NftId: tokenid, WalletAddress: address }
      );
      setalreadyLiked(true);
      setfavouritescount(tokensresult.data.result);
    } else {
      toast("Please connect wallet");
      setloading(false);
    }
  };
  const buyNft = async () => {
    setloading(true);
    let url = decodeURIComponent(window.location.href);
    url = url.split("/");
    let tokenId = url[url.length - 1];
    //toast(tokenId);
    if (address) {
      try {
        const amount = web3.utils.toWei(nft.Price, "ether");
        web3.eth.getBalance(address).then(async (balance) => {
          if (parseFloat(balance) >= parseFloat(amount)) {
            const nonce = Date.now();
            let signaturehash = await axios.post(
              process.env.REACT_APP_API_URL.toString() + "/getsignature",
              {
                seller: nft.Selleraddress,
                buyer: address,
                nftAddress:
                  nft.Blockchain == "Ethereum"
                    ? process.env.REACT_APP_NFT_ETH_CONTRACT
                    : nft.Blockchain == "BSC SmartChain"
                    ? process.env.REACT_APP_NFT_BNB_CONTRACT
                    : process.env.REACT_APP_NFT_MATIC_CONTRACT,
                inEth: true,
                _orderType: 0,
                amount: amount,
                tokenId: nft.tokenId,
                qty: nft.Copies,
                timestamp: nonce,
                Blockchain: nft.Blockchain,
              }
            );
            var sighash = signaturehash.data.result;
            var signtuple = [
              nft.Selleraddress,
              address,
              nft.Blockchain == "Ethereum"
                ? process.env.REACT_APP_NFT_ETH_CONTRACT
                : nft.Blockchain == "BSC SmartChain"
                ? process.env.REACT_APP_NFT_BNB_CONTRACT
                : process.env.REACT_APP_NFT_MATIC_CONTRACT,
              true,
              amount,
              nft.tokenId,
              nft.Copies,
              nonce,
              sighash,
            ];
            const res =
              nft.Blockchain == "Ethereum"
                ? await market.methods
                    .executeOrder(signtuple)
                    .send({ from: address, value: amount })
                : nft.Blockchain == "BSC SmartChain"
                ? await BNB_market.methods
                    .executeOrder(signtuple)
                    .send({ from: address, value: amount })
                : await MATIC_market.methods
                    .executeOrder(signtuple)
                    .send({ from: address, value: amount });
            if (res.status) {
              NftResult.pinataContent.Status = "Buy";
              NftResult.pinataContent.Selleraddress = address;
              const s3Bucket = "indigena";
              const objectName = tokenId.toString() + ".json";
              const objectData = JSON.stringify(NftResult);
              const objectType = "application/json";
              const params = {
                Bucket: s3Bucket,
                Key: objectName,
                Body: objectData,
                ContentType: objectType,
                ACL: "public-read",
              };
              const result1 = await s3Client.send(new PutObjectCommand(params));
              let result = await axios.put(
                process.env.REACT_APP_API_URL.toString() + "/updatenftprice",
                { tokenId: tokenId, price: nft.Price, status: "Buy" }
              );
              let idNo = tokenId.split("-");
              let data = idNo[1];
              let newaddress = address.toLowerCase();
              let newaddress2 = ownerDetails.WalletAddress.toLowerCase();
              let Activity = await axios.post(
                process.env.REACT_APP_API_URL.toString() + "/createActivity",
                [
                  {
                    WalletAddress: newaddress,
                    TokenId: tokenId,
                    Token: data,
                    Blockchain: nft.Blockchain,
                    from: ownerDetails.WalletAddress,
                    to: address,
                    Type: "Buy",
                    price: nft.Price,
                    quantity: 1,
                  },
                  {
                    WalletAddress: newaddress2,
                    TokenId: tokenId,
                    Token: data,
                    Blockchain: nft.Blockchain,
                    from: ownerDetails.WalletAddress,
                    to: address,
                    Type: "Sale",
                    price: nft.Price,
                    quantity: 1,
                  },
                ]
              );

              if (result.status) {
                setloading(false);
                toast("You are the owner of this nft");
                history("/user-profile");
              } else {
                toast("Something Went wrong");
              }
            } else {
            }
          } else {
            setloading(false);
            toast(
              "You don’t have enough" +
                (nft.Blockchain == "Ethereum"
                  ? " ETH "
                  : nft.Blockchain == "BSC SmartChain"
                  ? " BNB "
                  : " MATIC ") +
                " to buy"
            );
          }
        });
      } catch (e) {
        setloading(false);
      }
    } else {
      toast("Please connect the wallet");
      setloading(false);
    }
  };

  const placebid = async () => {
    if (parseFloat(nft.Auctionstartprice) < parseFloat(price)) {
      setloading(true);
      await claimnfthandle();
      try {
        const tokenInstance = new web3.eth.Contract(
          nft.Blockchain == "Ethereum"
            ? tokenAbi
            : nft.Blockchain == "BSC SmartChain"
            ? tokenBNBAbi
            : tokenMaticAbi,
          nft.Blockchain == "Ethereum"
            ? process.env.REACT_APP_WETH_TOKEN
            : nft.Blockchain == "BSC SmartChain"
            ? process.env.REACT_APP_WBNB_TOKEN
            : process.env.REACT_APP_WMATIC_TOKEN
        );
        const allowance = await tokenInstance.methods
          .allowance(
            address,
            nft.Blockchain == "Ethereum"
              ? process.env.REACT_APP_NFT_TRADE_ETH
              : nft.Blockchain == "BSC SmartChain"
              ? process.env.REACT_APP_NFT_TRADE_BNB
              : process.env.REACT_APP_NFT_TRADE_MATIC
          )
          .call();
        const Balance = await tokenInstance.methods.balanceOf(address).call();
        const amount = web3.utils.toWei(price, "ether");
        var amt1 = await web3.utils.fromWei(Balance.toString(), "ether");
        var amt2 = await web3.utils.fromWei(amount.toString(), "ether");

        if (parseFloat(amt1) > parseFloat(amt2)) {
          const approveRes = await tokenInstance.methods
            .approve(
              nft.Blockchain == "Ethereum"
                ? process.env.REACT_APP_NFT_TRADE_ETH
                : nft.Blockchain == "BSC SmartChain"
                ? process.env.REACT_APP_NFT_TRADE_BNB
                : process.env.REACT_APP_NFT_TRADE_MATIC,
              amount
            )
            .send({ from: address });
          if (new Date(nft.AuctionEndDate) > new Date()) {
          }
          let result = await axios.post(
            process.env.REACT_APP_API_URL.toString() + "/createbid",
            { WalletAddress: address, TokenId: tokenId, Price: price }
          );
          let idNo = tokenId.split("-");
          let data = idNo[1];
          let newaddress = address.toLowerCase();
          let Activity = await axios.post(
            process.env.REACT_APP_API_URL.toString() + "/createActivity",
            [
              {
                WalletAddress: newaddress,
                TokenId: tokenId,
                Token: data,
                Blockchain: nft.Blockchain,
                from:
                  nft.Blockchain == "Ethereum"
                    ? process.env.REACT_APP_NFT_TRADE_ETH
                    : nft.Blockchain == "BSC SmartChain"
                    ? process.env.REACT_APP_NFT_TRADE_BNB
                    : process.env.REACT_APP_NFT_TRADE_MATIC,
                to: address,
                Type: "Bid",
                price: price,
                quantity: 1,
              },
            ]
          );
          if (result.data.status) {
            toast("Bidded Sucessfully");
            setloading(false);
            setmodalshow(false);
            getbitdata(tokenId);
          } else {
            toast("Something Went Wrong");
          }
        } else {
          try {
            const name = await tokenInstance.methods.name().call();
            toast("You don’t have enough " + name + " to bid");
            setloading(false);
          } catch (err) {
            toast(
              "You don’t have enough " + nft.Blockchain == "Ethereum"
                ? "WETH"
                : nft.Blockchain == "BSC SmartChain"
                ? "WBNB"
                : "WMATIC" + " to bid"
            );
            setloading(false);
          }
        }
      } catch (e) {
        setloading(false);
      }
    } else {
      toast("Please bid more than " + nft.Auctionstartprice);
      setloading(false);
    }
  };
  const networkChange = async () => {};
  const ownerCheck = async () => {
    const tokenInstance = new web3.eth.Contract(
      nft.Blockchain == "Ethereum"
        ? tokenAbi
        : nft.Blockchain == "BSC SmartChain"
        ? tokenBNBAbi
        : tokenMaticAbi,
      nft.Blockchain == "Ethereum"
        ? process.env.REACT_APP_WETH_TOKEN
        : nft.Blockchain == "BSC SmartChain"
        ? process.env.REACT_APP_WBNB_TOKEN
        : process.env.REACT_APP_WMATIC_TOKEN
    );
    const allowance = await tokenInstance.methods
      .allowance(
        address,
        nft.Blockchain == "Ethereum"
          ? process.env.REACT_APP_NFT_TRADE_ETH
          : nft.Blockchain == "BSC SmartChain"
          ? process.env.REACT_APP_NFT_TRADE_BNB
          : process.env.REACT_APP_NFT_TRADE_MATIC
      )
      .call();
  };
  const MakeOffer = async () => {
    try {
      if (price) {
        setloading(true);
        await claimnfthandle();
        const tokenInstance = new web3.eth.Contract(
          nft.Blockchain == "Ethereum"
            ? tokenAbi
            : nft.Blockchain == "BSC SmartChain"
            ? tokenBNBAbi
            : tokenMaticAbi,
          nft.Blockchain == "Ethereum"
            ? process.env.REACT_APP_WETH_TOKEN
            : nft.Blockchain == "BSC SmartChain"
            ? process.env.REACT_APP_WBNB_TOKEN
            : process.env.REACT_APP_WMATIC_TOKEN
        );
        const allowance = await tokenInstance.methods
          .allowance(
            address,
            nft.Blockchain == "Ethereum"
              ? process.env.REACT_APP_NFT_TRADE_ETH
              : nft.Blockchain == "BSC SmartChain"
              ? process.env.REACT_APP_NFT_TRADE_BNB
              : process.env.REACT_APP_NFT_TRADE_MATIC
          )
          .call();
        const Balance = await tokenInstance.methods.balanceOf(address).call();
        const amount = web3.utils.toWei(price, "ether");
        const approveRes = await tokenInstance.methods
          .approve(
            nft.Blockchain == "Ethereum"
              ? process.env.REACT_APP_NFT_TRADE_ETH
              : nft.Blockchain == "BSC SmartChain"
              ? process.env.REACT_APP_NFT_TRADE_BNB
              : process.env.REACT_APP_NFT_TRADE_MATIC,
            amount
          )
          .send({ from: address });
        if (new Date(nft.AuctionEndDate) > new Date()) {
        }
        let result = await axios.post(
          process.env.REACT_APP_API_URL.toString() + "/createOffer",
          {
            WalletAddress: address,
            TokenId: decodeURIComponent(tokenId),
            Price: price,
            status: "Pending",
          }
        );
        let idNo = tokenId.split("-");
        let data = idNo[1];
        let newaddress = address.toLowerCase();
        let newaddress2 = ownerDetails.WalletAddress.toLowerCase();
        let Activity = await axios.post(
          process.env.REACT_APP_API_URL.toString() + "/createActivity",
          [
            {
              WalletAddress: newaddress,
              TokenId: tokenId,
              Token: data,
              Blockchain: nft.Blockchain,
              from: ownerDetails.WalletAddress,
              to: address,
              Type: "Offer",
              price: price,
              quantity: 1,
            },
            {
              WalletAddress: newaddress2,
              TokenId: tokenId,
              Token: data,
              Blockchain: nft.Blockchain,
              from: ownerDetails.WalletAddress,
              to: address,
              Type: "Offer",
              price: price,
              quantity: 1,
            },
          ]
        );
        if (result.data.status) {
          toast("Added Sucessfully");
          setofferModel(false);
          setloading(false);
          getOffer(decodeURIComponent(tokenId));
          ///$("#exampleModal").modal("hide");
        } else {
          toast("Something Went Wrong");
        }
      } else {
        toast("Please Enter amount");
        setloading(false);
      }
    } catch (e) {
      setloading(false);
    }
  };

  const timeover = async () => {
    let url = window.location.href;
    url = url.split("/");
    let tokenid = url[url.length - 1];

    //toast("https://indigenanft.nyc3.digitaloceanspaces.com"+tokenid+".json");

    let nftresult = await axios.get(
      process.env.REACT_APP_INDIGENA_BUCKETNAME + tokenid + ".json"
    );

    if (new Date(nftresult.data.pinataContent.AuctionEndDate) < new Date()) {
      // if (new Date("2022-08-05T11:10:04.523Z") < new Date()) {
      //toast("Timer called");
      settimer(true);
      AuctionExpired();
      executeorder();
    }
  };

  const AuctionExpired = async () => {
    let url = window.location.href;
    url = url.split("/");
    let tokenid = url[url.length - 1];
    let bitdata = await axios.post(
      process.env.REACT_APP_API_URL.toString() + "/maxbid",
      { TokenId: tokenid }
    );

    if (bitdata.data.result.length == 0) {
      let NftResult = await axios.get(
        process.env.REACT_APP_INDIGENA_BUCKETNAME + tokenid + ".json"
      );
      NftResult.data.pinataContent.Status = "Buy";

      const s3Bucket = "indigena";
      const objectName = decodeURIComponent(tokenId).toString() + ".json";
      //toast(objectName);
      const objectData = JSON.stringify(NftResult.data);
      const objectType = "application/json";
      const params = {
        Bucket: s3Bucket,
        Key: objectName,
        Body: objectData,
        ContentType: objectType,
        ACL: "public-read",
      };
      // const result1 =await s3.putObject(params).promise();
      const result1 = await s3Client.send(new PutObjectCommand(params));
      let result = await axios.put(
        process.env.REACT_APP_API_URL.toString() + "/updatenftprice",
        { tokenId: tokenId, status: "Auction Expired" }
      );
      if (result.status) {
        history("/collections");
      }
    }
  };

  const clickClaimButton = async (index, nftid) => {
    setloading(true);
    try {
      await claimnfthandle();
      let url = decodeURIComponent(window.location.href);
      url = url.split("/");
      let tokenId = url[url.length - 1];
      const tokenInstance = new web3.eth.Contract(
        tokenAbi,
        nft.Blockchain == "Ethereum"
          ? process.env.REACT_APP_WETH_TOKEN
          : nft.Blockchain == "BSC SmartChain"
          ? process.env.REACT_APP_WBNB_TOKEN
          : process.env.REACT_APP_WMATIC_TOKEN
      );
      const allowance = await tokenInstance.methods
        .allowance(
          address,
          nft.Blockchain == "Ethereum"
            ? process.env.REACT_APP_NFT_TRADE_ETH
            : nft.Blockchain == "BSC SmartChain"
            ? process.env.REACT_APP_NFT_TRADE_BNB
            : process.env.REACT_APP_NFT_TRADE_MATIC
        )
        .call();
      const amount = web3.utils.toWei(
        tempdata[index].Price.toString(),
        "ether"
      );
      if (
        web3.utils.fromWei(allowance) <
        parseFloat(tempdata[index].Price.toString())
      ) {
        const approveRes = await tokenInstance.methods
          .approve(
            nft.Blockchain == "Ethereum"
              ? process.env.REACT_APP_NFT_TRADE_ETH
              : nft.Blockchain == "BSC SmartChain"
              ? process.env.REACT_APP_NFT_TRADE_BNB
              : process.env.REACT_APP_NFT_TRADE_MATIC,
            "99999999999999999999999999"
          )
          .send({ from: address });
      }
      const walletBalance = tokenInstance.methods
        .balanceOf(address)
        .call()
        .then(async (result) => {
          var amt1 = await web3.utils.fromWei(result.toString(), "ether");
          var amt2 = await web3.utils.fromWei(amount.toString(), "ether");
          if (parseFloat(amt1) > parseFloat(amt2)) {
            const nonce = Date.now();
            nft.Copies = 1;

            let signaturehash = await axios.post(
              process.env.REACT_APP_API_URL.toString() + "/getsignature",
              {
                seller: nft.Selleraddress,
                buyer: address,
                nftAddress:
                  nft.Blockchain == "Ethereum"
                    ? process.env.REACT_APP_NFT_ETH_CONTRACT
                    : nft.Blockchain == "BSC SmartChain"
                    ? process.env.REACT_APP_NFT_BNB_CONTRACT
                    : process.env.REACT_APP_NFT_MATIC_CONTRACT,
                inEth: false,
                _orderType: 0,
                amount: amount,
                tokenId: nft.tokenId,
                qty: nft.Copies,
                timestamp: nonce,
                Blockchain: nft.Blockchain,
              }
            );
            var sighash = signaturehash.data.result;
            var signtuple = [
              nft.Selleraddress,
              address,
              nft.Blockchain == "Ethereum"
                ? process.env.REACT_APP_NFT_ETH_CONTRACT
                : nft.Blockchain == "BSC SmartChain"
                ? process.env.REACT_APP_NFT_BNB_CONTRACT
                : process.env.REACT_APP_NFT_MATIC_CONTRACT,
              false,
              amount,
              nft.tokenId,
              nft.Copies,
              nonce,
              sighash,
            ];
            const res =
              nft.Blockchain == "Ethereum"
                ? await market.methods
                    .executeOrder(signtuple)
                    .send({ from: address })
                : blockchain == "BSC SmartChain"
                ? await BNB_market.methods
                    .executeOrder(signtuple)
                    .send({ from: address })
                : await MATIC_market.methods
                    .executeOrder(signtuple)
                    .send({ from: address });
            if (res.status) {
              let nftdata = NftResult;
              nftdata.pinataContent.Status = "Buy";
              nftdata.pinataContent.Selleraddress = address;
              const s3Bucket = "indigena"; // replace with your bucket name
              const objectName = tokenId.toString() + ".json"; // File name which you want to put in s3 bucket
              const objectData = JSON.stringify(nftdata); // file data you want to put
              const objectType = "application/json";
              const params = {
                Bucket: s3Bucket,
                Key: objectName,
                Body: objectData,
                ContentType: objectType,
                ACL: "public-read",
              };
              // const result1 =await s3.putObject(params).promise();
              const result1 = await s3Client.send(new PutObjectCommand(params));
              let result = await axios.put(
                process.env.REACT_APP_API_URL.toString() + "/updatenftprice",
                {
                  tokenId: tokenId,
                  price: bitdata[index].Price.toString(),
                  status: "Buy",
                }
              );
              let idNo = tokenId.split("-");
              let data = idNo[1];
              let newaddress = address.toLowerCase();
              let newaddress2 = ownerDetails.WalletAddress.toLowerCase();
              let Activity;
              if (newaddress == newaddress2) {
                Activity = await axios.post(
                  process.env.REACT_APP_API_URL.toString() + "/createActivity",
                  [
                    {
                      WalletAddress: newaddress,
                      TokenId: tokenId,
                      Token: data,
                      Blockchain: nft.Blockchain,
                      from: "-",
                      to: address,
                      Type: "Transfer",
                      price: bitdata[index].Price.toString(),
                      quantity: 1,
                    },
                  ]
                );
              } else {
                Activity = await axios.post(
                  process.env.REACT_APP_API_URL.toString() + "/createActivity",
                  [
                    {
                      WalletAddress: newaddress,
                      TokenId: tokenId,
                      Token: data,
                      Blockchain: nft.Blockchain,
                      from: ownerDetails.WalletAddress,
                      to: address,
                      Type: "Transfer",
                      price: bitdata[index].Price.toString(),
                      quantity: 1,
                    },
                    {
                      WalletAddress: newaddress2,
                      TokenId: tokenId,
                      Token: data,
                      Blockchain: nft.Blockchain,
                      from: ownerDetails.WalletAddress,
                      to: address,
                      Type: "Transfer",
                      price: bitdata[index].Price.toString(),
                      quantity: 1,
                    },
                  ]
                );
              }
              if (result.status) {
                toast("You are the owner of this nft");
                history("/user-profile");
              } else {
                toast("Something Went wrong");
              }
            }
          } else {
            try {
              const name = await tokenInstance.methods.name().call();
              toast("You don’t have enough " + name + " to claim");
              setloading(false);
            } catch (err) {
              toast(
                "You don’t have enough " + nft.Blockchain == "Ethereum"
                  ? "WETH"
                  : nft.Blockchain == "BSC SmartChain"
                  ? "WBNB"
                  : "WMATIC" + " to claim"
              );
              setloading(false);
            }
          }
        });
    } catch (e) {
      setloading(false);
    }
  };
  const buynfthandle = async () => {
    if (wallet.connected) {
      if (nft.Blockchain == "Ethereum") {
        if (
          window.ethereum &&
          window.ethereum.networkVersion !== process.env.REACT_APP_ETH_Chain_ID
        ) {
          await addNetwork(process.env.REACT_APP_ETH_Chain_ID);
          setbuymodal(true);
        } else {
          setbuymodal(true);
        }
      } else if (nft.Blockchain == "BSC SmartChain") {
        if (
          window.ethereum &&
          window.ethereum.networkVersion !== process.env.REACT_APP_BSC_Chain_ID
        ) {
          await addNetwork(process.env.REACT_APP_BSC_Chain_ID);
          //window.location.reload(false);
          //  connectWallet();
          setbuymodal(true);
        } else {
          setbuymodal(true);
        }
      } else {
        if (
          window.ethereum &&
          window.ethereum.networkVersion !==
            process.env.REACT_APP_MATIC_Chain_ID
        ) {
          await addNetwork(process.env.REACT_APP_MATIC_Chain_ID);
          // connectWallet();
          setbuymodal(true);
          //window.location.reload(false);
        } else {
          setbuymodal(true);
        }
      }
    } else {
      toast("Please connect the wallet");
      setloading(false);
    }
  };
  const claimnfthandle = async () => {
    if (wallet.connected) {
      if (nft.Blockchain == "Ethereum") {
        if (
          window.ethereum &&
          window.ethereum.networkVersion !== process.env.REACT_APP_ETH_Chain_ID
        ) {
          await addNetwork(process.env.REACT_APP_ETH_Chain_ID);
        }
      } else if (nft.Blockchain == "BSC SmartChain") {
        if (
          window.ethereum &&
          window.ethereum.networkVersion !== process.env.REACT_APP_BSC_Chain_ID
        ) {
          await addNetwork(process.env.REACT_APP_BSC_Chain_ID);
        }
      } else {
        if (
          window.ethereum &&
          window.ethereum.networkVersion !==
            process.env.REACT_APP_MATIC_Chain_ID
        ) {
          await addNetwork(process.env.REACT_APP_MATIC_Chain_ID);
        }
      }
    } else {
      toast("Please connect the wallet");
      setloading(false);
    }
  };
  const proprtieshandle = (value, value1) => {
    history("/marketplace?character=" + value + "&name=" + value1 + "");
  };
  const errorDiv = () => {
    return <p>Wallet Disconnected!</p>;
  };
  const logoutclicked = () => {
    const { web3Modal } = wallet;
    web3Modal.clearCachedProvider();
    dispatch(connectFailed(errorDiv()));
    history("/");
  };
  const Putonsale = () => {
    let url = decodeURIComponent(window.location.href);
    url = url.split("/");
    let tokenid = url[url.length - 1];
    // if (nft.Status == "Mint") {
    localStorage.setItem("ImageUrl", nft.ImageUrl);
    localStorage.setItem("nft-data", JSON.stringify(nft));
    history(`/list-item-sale/${tokenid}`);
    
    // } else {
    //   toast("Already on sale");
    // }
  };
  const MakeOfferaccept = async (i, id, buyeraddress, Price) => {
    setloadingindex(i);
    setloading(true);
    try {
      await claimnfthandle();
      let url = decodeURIComponent(window.location.href);
      url = url.split("/");
      let tokenId = url[url.length - 1];

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
      const alreadyapproved = await nftInstance.methods
        .isApprovedForAll(
          address,
          nft.Blockchain == "Ethereum"
            ? process.env.REACT_APP_NFT_TRADE_ETH
            : nft.Blockchain == "BSC SmartChain"
            ? process.env.REACT_APP_NFT_TRADE_BNB
            : process.env.REACT_APP_NFT_TRADE_MATIC
        )
        .call();
      if (!alreadyapproved) {
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
      }

      const tokenInstance = new web3.eth.Contract(
        tokenAbi,
        nft.Blockchain == "Ethereum"
          ? process.env.REACT_APP_WETH_TOKEN
          : nft.Blockchain == "BSC SmartChain"
          ? process.env.REACT_APP_WBNB_TOKEN
          : process.env.REACT_APP_WMATIC_TOKEN
      );
      const allowance = await tokenInstance.methods
        .allowance(
          buyeraddress,
          nft.Blockchain == "Ethereum"
            ? process.env.REACT_APP_NFT_TRADE_ETH
            : nft.Blockchain == "BSC SmartChain"
            ? process.env.REACT_APP_NFT_TRADE_BNB
            : process.env.REACT_APP_NFT_TRADE_MATIC
        )
        .call();
      const amount = web3.utils.toWei(Price.toString(), "ether");
      if (web3.utils.fromWei(allowance) < parseFloat(Price.toString())) {
        try {
          const approveRes = await tokenInstance.methods
            .approve(
              nft.Blockchain == "Ethereum"
                ? process.env.REACT_APP_NFT_TRADE_ETH
                : nft.Blockchain == "BSC SmartChain"
                ? process.env.REACT_APP_NFT_TRADE_BNB
                : process.env.REACT_APP_NFT_TRADE_MATIC,
              "9999999999999999999"
            )
            .send({ from: address });
        } catch (e) {
          setloading(false);
        }
      }
      const walletBalance = tokenInstance.methods
        .balanceOf(buyeraddress)
        .call()
        .then(async (result) => {
          var amt1 = await web3.utils.fromWei(result.toString(), "ether");
          var amt2 = await web3.utils.fromWei(amount.toString(), "ether");
          if (parseFloat(amt1) > parseFloat(amt2)) {
            const nonce = Date.now();
            nft.Copies = 1;
            let signaturehash = await axios.post(
              process.env.REACT_APP_API_URL.toString() + "/getsignature",
              {
                seller: nft.Selleraddress,
                buyer: buyeraddress,
                nftAddress:
                  nft.Blockchain == "Ethereum"
                    ? process.env.REACT_APP_NFT_ETH_CONTRACT
                    : nft.Blockchain == "BSC SmartChain"
                    ? process.env.REACT_APP_NFT_BNB_CONTRACT
                    : process.env.REACT_APP_NFT_MATIC_CONTRACT,
                inEth: false,
                _orderType: 0,
                amount: amount,
                tokenId: nft.tokenId,
                qty: nft.Copies,
                timestamp: nonce,
                Blockchain: nft.Blockchain,
              }
            );
            var sighash = signaturehash.data.result;
            var signtuple = [
              nft.Selleraddress,
              buyeraddress,
              nft.Blockchain == "Ethereum"
                ? process.env.REACT_APP_NFT_ETH_CONTRACT
                : nft.Blockchain == "BSC SmartChain"
                ? process.env.REACT_APP_NFT_BNB_CONTRACT
                : process.env.REACT_APP_NFT_MATIC_CONTRACT,
              false,
              amount,
              nft.tokenId,
              nft.Copies,
              nonce,
              sighash,
            ];
            try {
              const res =
                nft.Blockchain == "Ethereum"
                  ? await market.methods
                      .executeOrder(signtuple)
                      .send({ from: address })
                  : nft.Blockchain == "BSC SmartChain"
                  ? await BNB_market.methods
                      .executeOrder(signtuple)
                      .send({ from: address })
                  : await MATIC_market.methods
                      .executeOrder(signtuple)
                      .send({ from: address });

              if (res.status) {
                let nftdata = NftResult;
                nftdata.pinataContent.Selleraddress = buyeraddress;
                const s3Bucket = "indigena"; // replace with your bucket name
                const objectName = tokenId.toString() + ".json"; // File name which you want to put in s3 bucket
                const objectData = JSON.stringify(nftdata); // file data you want to put
                const objectType = "application/json";
                const params = {
                  Bucket: s3Bucket,
                  Key: objectName,
                  Body: objectData,
                  ContentType: objectType,
                  ACL: "public-read",
                };
                // const result1 =await s3.putObject(params).promise();
                const result1 = await s3Client.send(
                  new PutObjectCommand(params)
                );
                let result = await axios.put(
                  process.env.REACT_APP_API_URL.toString() + "/updatenftprice",
                  { tokenId: tokenId, price: Price.toString(), status: "Buy" }
                );
                let idNo = tokenId.split("-");
                let data = idNo[1];
                let newaddress = address.toLowerCase();
                let newaddress2 = buyeraddress.toLowerCase();
                let Activity = await axios.post(
                  process.env.REACT_APP_API_URL.toString() + "/createActivity",
                  [
                    {
                      WalletAddress: newaddress2,
                      TokenId: tokenId,
                      Token: data,
                      Blockchain: nft.Blockchain,
                      from: address,
                      to: buyeraddress,
                      Type: "Transfer",
                      price: Price,
                      quantity: 1,
                    },
                    {
                      WalletAddress: newaddress,
                      TokenId: tokenId,
                      Token: data,
                      Blockchain: nft.Blockchain,
                      from: address,
                      to: buyeraddress,
                      Type: "Transfer",
                      price: Price,
                      quantity: 1,
                    },
                  ]
                );
                if (result.status) {
                  //history('/user-profile');
                  let tokensresult = await axios.put(
                    process.env.REACT_APP_API_URL.toString() + "/updateOffer",
                    {
                      WalletAddress: buyeraddress,
                      _id: id,
                      tokenId: tokenId,
                      status: "Accepted",
                    }
                  );
                  if (tokensresult.data.status) {
                    history(-1);
                    setloading(false);
                    toast("Ownership Transffered");
                  } else {
                    toast("Something went wrong");
                    setloading(false);
                  }
                } else {
                  setloading(false);
                  toast("Something Went wrong");
                }
              }
            } catch (e) {
              setloading(false);
            }
          } else {
            try {
              const name = await tokenInstance.methods.name().call();
              toast("You don’t have enough " + name + " to accept");
              setloading(false);
            } catch (err) {
              toast(
                "You don’t have enough " + nft.Blockchain == "Ethereum"
                  ? "WETH"
                  : nft.Blockchain == "BSC SmartChain"
                  ? "WBNB"
                  : "WMATIC" + " to accept"
              );
              setloading(false);
            }
          }
        });
    } catch (e) {
      setloading(false);
    }
  };

  const burnClick = async()=>{
    Swal.fire({
      // title: 'Are you sure?',
      text: "Are you sure want to Burn this?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Burn it!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        let url = decodeURIComponent(window.location.href);
        url = url.split("/");
        let tokenId = url[url.length - 1];
        let token = tokenId.split("-")
        let tokenParam = token.pop();
        if(address){
          try {
            await claimnfthandle();
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
            const res = await nftInstance.methods
                  .burn(address,parseInt(tokenParam),1)
                  .send({ from: address })
              let result = await axios.post(
                process.env.REACT_APP_API_URL.toString() + "/burnNFT",
                { tokenId: tokenId }
              );
              if(result.status == 200) {
                history(-1)
              }
        } catch (e) {
          // console.log(e);
        }
        }else {
          toast("Please connect the wallet");
        }
      }
    })
    
  }
  const revokeNft = async()=>{
    Swal.fire({
      // title: 'Are you sure?',
      text: "Are you sure want to delist this?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delist it!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        let url = decodeURIComponent(window.location.href);
        url = url.split("/");
        let tokenId = url[url.length - 1];
        if(address){
          try {
            let newData = NftResult
            newData.pinataContent.Status = "Mint";
            const objectName = tokenId.toString() + '.json'; // File name which you want to put in s3 bucket
            const objectData = JSON.stringify(newData); // file data you want to put
            const objectType = 'application/json';
            const params = {
              Bucket: "indigena",
              Key: objectName,
              Body: objectData,
              ContentType: objectType,
              ACL: 'public-read'
            };
            // let holder = {"pinataMetadata":{"name":"Blue ted","description":"The visual symbol of the Break the Silence action research project is a blue teddy bear. This image has come to symbolize security, love, care, comfort and relationships. The plaster across the teddy bear's heart was designed to offer a sense ofhope\n","image":"ipfs://QmYwMjSY66WatCAsauPKNhsXwcXjgqpfEkFPajYJj5m7Se","CID":"QmYwMjSY66WatCAsauPKNhsXwcXjgqpfEkFPajYJj5m7Se"},"pinataContent":{"itemname":"QmYwMjSY66WatCAsauPKNhsXwcXjgqpfEkFPajYJj5m7Se","Name":"Blue ted","Description":"The visual symbol of the Break the Silence action research project is a blue teddy bear. This image has come to symbolize security, love, care, comfort and relationships. The plaster across the teddy bear's heart was designed to offer a sense ofhope\n","Collection":"Future Techno Collections","Properties":[{"trait_type":"Background","index":"Accessories","value":"blue"},{"trait_type":"color","index":"Background","value":"white"}],"Levels":[],"Stats":[],"Unlock":false,"MintingAccept":true,"RoyalityAccept":true,"Blockchain":"Polygon","ImageUrl":"https://indigena.nyc3.digitaloceanspaces.com/nft1659348260013.jpg","Selleraddress":"0xeBA41eAa32841629B1d4F64852d0dadf70b0c665","Copies":"1","unlockabletext":[],"Status":"Buy","Type":"image","Royality":"20","tokenId":"5","Price":"0.0001","AuctionEndDate":"2022-08-01T11:15:44.000Z","Auctionstartprice":"0.0001"}}
            const result1 = await s3Client.send(new PutObjectCommand(params));
              let result = await axios.put(
                process.env.REACT_APP_API_URL.toString() + "/updatenftprice",
                { tokenId: tokenId, status: "Mint" }
              ); 
              if(result.status == 200) {
                history(-1)
              }
        } catch (e) {
          // console.log(e);
        }
        }else {
          toast("Please connect the wallet");
        }
      }
    })
   
  }
  return (
    <div className="menuBoard_page">
      <div className="container-fluid">
        <div className=" row row1">
          <div className="col-lg-1 col-2">
            <img src={Logout} onClick={() => logoutclicked()} />
          </div>
          <div className="col-lg-8 col-4"></div>
          <div className="col-lg-3 col-6 menu_btn_grp">
            {/* {AdminStatus?<div className="edit_btn_div">
              <button className="edit_btn">Edit</button>
            </div> :""} */}
            {AdminStatus ? (
              <div className="list_btn_div">
                <button
                  className="list_btn"
                  onClick={() => setRemovemodal(true)}
                >
                  Remove
                </button>
              </div>
            ) : (
              ""
            )}
            {AdminStatus ? (
              <div className="list_btn_div">
                <button
                  className="list_btn"
                  onClick={() => setBlockModal(true)}
                >
                  Block
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="row row2">
          <div className="container-fluid">
            <div className="row">
              {
                width > 600 && <div className="col-lg-1 "></div>
              }
              <div className="col-lg-4 col-12 pcNFTContainer">
                <div className="menuNFTConainer">
                  <img
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "19px",
                    }}
                    src={nft.ImageUrl}
                  />
                </div>
              </div>
              <div className="col-lg-5 col-12">
                <div className="row nftTitleHeadingContainer detailsRow">
                  <div className="d-flex  align-items-center">
                    <h3
                      className="NFTHeading m-0"
                      style={{ textTransform: "capitalize", textAlign: "left" }}
                    >
                      {nft.Name}
                    </h3>
                  </div>
                  <div className="ratings">
                    <span
                      style={{
                        cursor: "pointer",
                        color: "rgba(0,0,0,0.3)",
                        marginRight: "20px",
                      }}
                      onClick={() => {
                        localStorage.setItem("collectionname", nft.Collection);
                        history(`/UserCollection/${nft.Collection}`);
                      }}
                    >
                      {"Owned by "}
                      <span style={{ color: "rgb(45, 45, 45)" }}>
                        {nft.Collection}
                      </span>
                    </span>
                    <span
                      style={{ color: "rgba(0,0,0,0.3)", marginRight: "20px" }}
                    >
                      <VisibilityIcon
                        style={{ height: "20px", width: "20px" }}
                      />
                      {Viewscount ? "  " + parseInt(Viewscount) : "  0"}
                    </span>
                    <div className="ratingsIcon">
                      {alreadyLiked ? (
                        <span style={{ color: "rgba(0,0,0,0.3)" }}>
                          <i class="bi bi-suit-heart-fill"></i>
                          {favouritescount + " Likes"}
                        </span>
                      ) : (
                        <span style={{ color: "rgba(0,0,0,0.3)" }}>
                          <i
                            class="bi bi-suit-heart"
                            onClick={() => addFavourites()}
                          ></i>{" "}
                          {favouritescount + " Likes"}{" "}
                        </span>
                      )}
                      {/* <span><StarBorderIcon/></span>
                      <span><StarBorderIcon/></span>
                      <span><StarBorderIcon/></span>
                      <span><StarBorderIcon/></span>
                      <span><StarBorderIcon/></span> */}
                    </div>
                  </div>
                </div>
                {nft.Unlock && (
                  <div
                    className="row unclockContainer detailsRow"
                    onClick={() => setunlockcontent(!unlockcontent)}
                  >
                    <div className="col-lg-12 col-12">
                      {unlockcontent != true && (
                        <div>
                          <span className="unlockIcon">
                            <LockIcon />
                          </span>
                          <span className="proContentHeading">
                            Includes Unlockable Content
                          </span>
                        </div>
                      )}
                      {unlockcontent && (
                        <span
                          className="proContentHeading"
                          onClick={() => setunlockcontent(false)}
                        >
                          {nft.unlockabletext}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {nft.Status == "Auction" ? (
                  timer ? null : (
                    <div className="row saleContainer2 mt-3">
                      <div className=" saleTitle2 mt-1">
                        <MyTimer
                          expiryTimestamp={nft.AuctionEndDate}
                          timeover={timeover}
                        />
                      </div>
                    </div>
                  )
                ) : null}
                <div className="d-flex">
                {isNftOwner ? (
                  nft.Status == "Mint" ? (
                    <div className="placeBid_btn2 mt-3">
                      <button className="" onClick={() => Putonsale()}>
                        Put on sale
                      </button>
                    </div>
                  ) : nft.Status == "Fixed price" ? (
                    <div className="placeBid_btn2 mt-3">
                      <button className="" disabled={true}>
                        on sale
                      </button>
                    </div>
                  ) : nft.Status == "Buy" ? (
                    <div className="placeBid_btn2 mt-3">
                      <button className="" onClick={() => Putonsale()}>
                        Put on sale
                      </button>
                    </div>
                  ) : //   nft.Status == "Auction"?
                  //   new Date(nft.AuctionEndDate)<new Date()?
                  //   <div className="placeBid_btn2 mt-3">
                  //   <button
                  //     className=""
                  //     onClick={() => Putonsale()}
                  //   >
                  //     Put on sale
                  //   </button>
                  // </div>:null:
                  null
                ) : nft.Status == "Auction" ? (
                  <div className="placeBid_btn2 mt-3">
                    <button
                      className=""
                      onClick={() => setmodalshow(true)}
                      disabled={timer}
                    >
                      Place Bid
                    </button>
                  </div>
                ) : nft.Status == "Mint" ? (
                  <div className="placeBid_btn2 mt-3">
                    <button
                      className=""
                      onClick={() => setofferModel(true)}
                      disabled={MakeOfferDisable}
                    >
                      Make Offer
                    </button>
                  </div>
                ) : nft.Status == "Fixed price" ? (
                  <div className="placeBid_btn2 mt-3">
                    <button className="" onClick={() => buynfthandle()}>
                      Buy
                    </button>
                  </div>
                ) : (
                  <div className="placeBid_btn2 mt-3">
                    <button className="" onClick={() => setofferModel(true)}>
                      Make Offer
                    </button>
                  </div>
                )}
                {
                  isNftOwner ?
                  <div className="placeBid_btn2 mt-3 mx-4">
                    <button className="" onClick={burnClick}>
                      Burn
                    </button>
                  </div> : null
                }
                {
                  isNftOwner && nft.Status !== "Mint" ?
                  <div className="placeBid_btn2 mt-3">
                    <button className="" onClick={revokeNft}>
                      Delist
                    </button>
                  </div> : null
                }
                </div>
                {nft.Status == "Fixed price" ? (
                  <>
                    <div className="row">
                      <div className="col-8 NFTPRiceContainer2  d-flex justify-content-start">
                        <span className="currentPrice">
                          <span className="currentPrice2">
                            {nft.Price != undefined ? "Current Price" : ""}
                          </span>
                          <br />
                          <span className="fixedNFTPrice">
                            {nft.Price == undefined ? null : nft.Blockchain ? (
                              <img
                                src={
                                  nft.Blockchain == "Ethereum"
                                    ? require("../../Assets/currency/eth.svg")
                                    : nft.Blockchain == "BSC SmartChain"
                                    ? require("../../Assets/currency/bnb.svg")
                                    : nft.Blockchain == "Polygon"
                                    ? require("../../Assets/currency/matic2.svg")
                                    : require("../../Assets/currency/eth.svg")
                                }
                                style={{ height: "20px", width: "20px" }}
                                alt=""
                              />
                            ) : (
                              ""
                            )}
                            {nft.Price == undefined
                              ? null
                              : nft.Blockchain
                              ? "  " + nft.Price
                              : ""}
                            {nft.Price == undefined
                              ? null
                              : nft.Blockchain
                              ? nft.Blockchain == "Ethereum"
                                ? " ETH "
                                : nft.Blockchain == "BSC SmartChain"
                                ? " BNB "
                                : nft.Blockchain == "Polygon"
                                ? " MATIC "
                                : ""
                              : ""}
                          </span>
                          <span className="dollar">
                            {nft.Price == undefined
                              ? null
                              : nft.Blockchain
                              ? "($" + getdollar(nft.Blockchain) + " )"
                              : ""}
                          </span>
                        </span>
                      </div>

                      <div className=" col-4 mt-4 placeBid_btn">
                        {/* {isNftOwner ? null : (
                          <button
                            className="makeOffer_btn"
                            onClick={() => buynfthandle()}
                          >
                            Buy
                          </button>
                        )} */}
                      </div>
                      <div className="col-12 NFTPRiceContainer  d-flex justify-content-start">
                        <span className="fixedcurrentPrice">
                          <span className="currentPrice2">Royalties</span>
                          <br />
                          <span className="fixedNFTPrice">
                            {nft.Royality ? nft.Royality + "%" : " 0%"}
                          </span>
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="row NFTPRiceContainer2">
                    <div className="col-12 d-flex justify-content-start">
                      <span className="currentPrice">
                        <span className="currentPrice2">
                          {nft.Price != undefined ? "Current Price" : ""}
                        </span>
                        <br />
                        <span className="fixedNFTPrice">
                          {nft.Price == undefined ? null : nft.Blockchain ? (
                            <img
                              src={
                                nft.Blockchain == "Ethereum"
                                  ? require("../../Assets/currency/eth.svg")
                                  : nft.Blockchain == "BSC SmartChain"
                                  ? require("../../Assets/currency/bnb.svg")
                                  : nft.Blockchain == "Polygon"
                                  ? require("../../Assets/currency/matic2.svg")
                                  : require("../../Assets/currency/eth.svg")
                              }
                              style={{ height: "20px", width: "20px" }}
                              alt=""
                            />
                          ) : (
                            ""
                          )}
                          {nft.Price == undefined
                            ? null
                            : nft.Blockchain
                            ? "  " + nft.Price
                            : ""}
                          {nft.Price == undefined
                            ? null
                            : nft.Blockchain
                            ? nft.Blockchain == "Ethereum"
                              ? " ETH "
                              : nft.Blockchain == "BSC SmartChain"
                              ? " BNB "
                              : nft.Blockchain == "Polygon"
                              ? " MATIC "
                              : ""
                            : ""}
                        </span>
                        <span className="dollar">
                          {nft.Price == undefined
                            ? null
                            : nft.Blockchain
                            ? "($" + getdollar(nft.Blockchain) + ")"
                            : ""}
                        </span>
                      </span>
                    </div>
                    <div className="col-12 d-flex justify-content-start mt-1">
                      <span className="currentPrice">
                        <span className="currentPrice2">Royalties</span>
                        <br />
                        <span className=" NFTPrice">
                          {nft.Royality ? nft.Royality + "%" : "0%"}
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-lg-2"></div>
            </div>
          </div>
        </div>
        {nft.Status == "Auction" ? (
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-9">
              <div class="cardListing mb-2 mt-3 ">
                <div
                  class="card-header bg-light"
                  onClick={() => {
                    setShowBidActivity(!showBidActivity);
                  }}
                >
                  <div className="row">
                    <div className="col-2 col-lg-1 menuIcon">
                      <HistoryIcon style={{ color: "rgb(84, 84, 84)" }} />
                    </div>
                    <div className="col-8 col-lg-10 menuText">
                      {" "}
                      <span className="card_title2">Bid Activity</span>
                    </div>
                    <div className="col-2 col-lg-1 menuDownIcon">
                      <img
                        src={dropDownIcon}
                        style={{ color: "rgb(84, 84, 84)" }}
                      />
                    </div>
                  </div>
                </div>
                {!showBidActivity ? null : (
                  <div class="cardListingMenu">
                    <div className="row border-bottom" style={{}}>
                      <div className="col-6 col-lg-6 col-sm-6   d-flex justify-content-center border-end ">
                        <h6 className="my-3">Wallet Address</h6>
                      </div>
                      <div className="col-3 col-lg-3 col-sm-3 d-flex justify-content-center border-end ">
                        <h6 className="my-3">Price</h6>
                      </div>
                      <div className="col-3 col-lg-3 col-sm-3 d-flex justify-content-center border-end "></div>
                    </div>
                    <div className="empty">
                      {timer
                        ? tempdata.map((data, i) => {
                            let url =
                              nft.Blockchain == "Ethereum"
                                ? process.env.REACT_APP_ETH_SCAN_URL +
                                  "/address/" +
                                  data.WalletAddress.toString()
                                : nft.Blockchain == "BSC SmartChain"
                                ? process.env.REACT_APP_BSC_SCAN_URL +
                                  "/address/" +
                                  data.WalletAddress.toString()
                                : process.env.REACT_APP_MATIC_SCAN_URL +
                                  "/address/" +
                                  data.WalletAddress.toString();

                            // let url =

                            //   process.env.REACT_APP_ETH_SCAN_URL +
                            //   "/address/" +
                            //   data.WalletAddress.toString();
                            return (
                              <div className="row border-bottom ">
                                <div
                                  className="col-6 col-lg-6 col-sm-6 d-flex justify-content-center  border-end"
                                  style={{ color: "blue" }}
                                >
                                  <a
                                    className="link  my-2 linkText"
                                    target={"_blank"}
                                    href={url}
                                  >
                                    <span>{Slicer(data.WalletAddress)}</span>
                                  </a>
                                </div>
                                <div className="col-3 col-lg-3 col-sm-3 d-flex justify-content-center  border-end">
                                  <p className="my-2 linkText">{data.Price}</p>
                                </div>
                                <div className="col-3 col-lg-3 col-sm-3 my-1  d-flex justify-content-center  border-end">
                                  {timer &&
                                  i == 0 &&
                                  address.toString().toLowerCase() ==
                                    data.WalletAddress.toLowerCase() ? (
                                    <button
                                      className="claim_btn my-2"
                                      onClick={() =>
                                        clickClaimButton(i, data.WalletAddress)
                                      }
                                    >
                                      {loading ? (
                                        <div className="loading-buy"></div>
                                      ) : (
                                        "Claim"
                                      )}
                                    </button>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })
                        : bitdata.map((data, i) => {
                            let url =
                              nft.Blockchain == "Ethereum"
                                ? process.env.REACT_APP_ETH_SCAN_URL +
                                  "/address/" +
                                  data.WalletAddress.toString()
                                : nft.Blockchain == "BSC SmartChain"
                                ? process.env.REACT_APP_BSC_SCAN_URL +
                                  "/address/" +
                                  data.WalletAddress.toString()
                                : process.env.REACT_APP_MATIC_SCAN_URL +
                                  "/address/" +
                                  data.WalletAddress.toString();
                            // let url =
                            //   process.env.REACT_APP_ETH_SCAN_URL +
                            //   "/address/" +
                            //   data.WalletAddress.toString();
                            return (
                              <div className="row border-bottom  border-end">
                                <div
                                  className="col-6 col-lg-6 col-sm-6  d-flex justify-content-center  border-end"
                                  style={{ color: "blue" }}
                                >
                                  <a
                                    className="link my-2 linkText"
                                    target={"_blank"}
                                    href={url}
                                  >
                                    <span>{Slicer(data.WalletAddress)}</span>
                                  </a>
                                </div>
                                <div className="col-3 col-lg-3 col-sm-3  d-flex justify-content-center  border-end">
                                  <p className="my-2 linkText">{data.Price}</p>
                                </div>
                                <div className="col-3 col-lg-3 col-sm-3  my-1 d-flex justify-content-center  border-end">
                                  {/* <button
                                    className="claim_btn my-2"
                                    onClick={() =>
                                      clickClaimButton(i, data.WalletAddress)
                                    }
                                  >
                                 {
                                      "Claim"}
                                
                                  </button> */}
                                </div>
                              </div>
                            );
                          })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-2"></div>
          </div>
        ) : (
          " "
        )}
        <div className="row row3">
          <div className="col-lg-1"></div>
          <div
            className="col-lg-4 menuBoardFilterContainer  "
            //  style={{backgroundColor:"red"}}
          >
            {/* <MenuBoardDropDown/> */}
            {/* <Accordion nft={nft}  /> */}
            <div>
              <div
                class="accordion accordion-flush MenuboardAccordion"
                id="accordionFlushExample"
              >
                <div class="accordion-item MenuboardAccordion-item">
                  <h2 class="accordion-header " id="flush-headingOne">
                    <button
                      class="accordion-button collapsed first"
                      style={{ height: "60px" }}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      <div className="row">
                        <div className="col-2 icon">
                          <InsertDriveFileIcon />
                        </div>
                        <div className="col-8 text">Description</div>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    class="accordion-collapse collapse "
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body MenuboardAccordion_body">
                      {nft.Description}
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingTwo">
                    <button
                      class="accordion-button collapsed "
                      style={{ height: "60px" }}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseTwo"
                      aria-expanded="false"
                      aria-controls="flush-collapseTwo"
                    >
                      <div className="row">
                        <div className="col-2 icon">
                          <FormatListBulletedIcon />
                        </div>
                        <div className="col-8 text">Properties</div>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingTwo"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                      <div className="row">
                        {properties.map((data, i) => {
                          return (
                            <div className="col-4 col-md-4 col-lg-4">
                              <div className="nftContainer2">
                                <div
                                  className="esyMuQ"
                                  onClick={() =>
                                    proprtieshandle(data.trait_type, data.value)
                                  }
                                >
                                  <span
                                    style={{
                                      fontSize: "12px",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {data.trait_type}
                                  </span>
                                  <br></br>
                                  <span
                                    style={{ fontSize: "13px", color: "blue" }}
                                  >
                                    {data.value}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingThree">
                    <button
                      class="accordion-button collapsed"
                      style={{ height: "60px" }}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseThree"
                      aria-expanded="false"
                      aria-controls="flush-collapseThree"
                    >
                      <div className="row">
                        <div className="col-2 icon">
                          <GridViewIcon />
                        </div>
                        <div className="col-8 text">NFT Type</div>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseThree"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingThree"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                      {nft.Type ? nft.Type : "Image"}
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingFour">
                    <button
                      class="accordion-button collapsed"
                      style={{ height: "60px" }}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseFour"
                      aria-expanded="false"
                      aria-controls="flush-collapseFour"
                    >
                      <div className="row">
                        <div className="col-2 icon">
                          <ShowChartIcon />
                        </div>
                        <div className="col-8 text">About Creator</div>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseFour"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingFour"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                      {/* <a href={"https://rinkeby.etherscan.io/address/"+nft.Selleraddress}>{nft.Selleraddress}</a> */}
                      <div className="row">
                        <div className="row mb-2">
                          <div className="col-6">Wallet Address</div>
                          <div className="col-6 d-flex justify-content-end">
                            {creatordetails.WalletAddress !== undefined ? (
                              <a
                                target={"_blank"}
                                href={
                                  nft.Blockchain == "Ethereum"
                                    ? process.env.REACT_APP_ETH_SCAN_URL +
                                      "/address/" +
                                      creatordetails.WalletAddress
                                    : nft.Blockchain == "BSC SmartChain"
                                    ? process.env.REACT_APP_BSC_SCAN_URL +
                                      "/address/" +
                                      creatordetails.WalletAddress
                                    : process.env.REACT_APP_MATIC_SCAN_URL +
                                      "/address/" +
                                      creatordetails.WalletAddress

                                  // process.env.REACT_APP_ETH_SCAN_URL +
                                  // "/address/" +
                                  // creatordetails.WalletAddress
                                }
                              >
                                {Slicer(creatordetails.WalletAddress)}
                              </a>
                            ) : (
                              " "
                            )}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-6">UserName</div>
                          <div className="col-6 d-flex justify-content-end">
                            {creatordetails.UserName !== undefined
                              ? creatordetails.UserName
                              : "User"}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-6">FaceBookURL</div>
                          <div className="col-6 d-flex justify-content-end">
                            {creatordetails.FaceBook !== undefined ? (
                              <a
                                target={"_blank"}
                                href={creatordetails.FaceBook}
                              >
                                {creatordetails.FaceBook.slice(0, 4) +
                                  creatordetails.FaceBook.slice(
                                    creatordetails.FaceBook.length - 5
                                  )}
                              </a>
                            ) : (
                              "-"
                            )}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-6">TwitterURL</div>
                          <div className="col-6 d-flex justify-content-end">
                            {creatordetails.Twitter !== undefined ? (
                              <a
                                target={"_blank"}
                                href={creatordetails.Twitter}
                              >
                                {creatordetails.Twitter.slice(0, 4) +
                                  creatordetails.Twitter.slice(
                                    creatordetails.Twitter.length - 5
                                  )}
                              </a>
                            ) : (
                              "-"
                            )}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-6">About</div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-12">
                            {creatordetails.UserName !== undefined
                              ? creatordetails?.About != undefined
                                ? creatordetails?.About
                                : ""
                              : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingFive">
                    <button
                      class="accordion-button collapsed last"
                      style={{ height: "60px" }}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseFive"
                      aria-expanded="false"
                      aria-controls="flush-collapseFive"
                    >
                      <div className="row">
                        <div className="col-2 icon">
                          <InsertDriveFileIcon />
                        </div>
                        <div className="col-8 text">Details</div>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseFive"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingFive"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                      <div className="row">
                        <div className="row mb-2">
                          <div className="col-6">Contract Address</div>
                          {nft.Blockchain == "Ethereum" ? (
                            <div className="col-6 d-flex justify-content-end">
                              {
                                <a
                                  target={"_blank"}
                                  href={
                                    nft.Blockchain == "Ethereum"
                                      ? process.env.REACT_APP_ETH_SCAN_URL +
                                        "/address/" +
                                        process.env.REACT_APP_NFT_ETH_CONTRACT
                                      : nft.Blockchain == "BSC SmartChain"
                                      ? process.env.REACT_APP_BSC_SCAN_URL +
                                        "/address/" +
                                        process.env.REACT_APP_NFT_ETH_CONTRACT
                                      : process.env.REACT_APP_MATIC_SCAN_URL +
                                        "/address/" +
                                        process.env.REACT_APP_NFT_ETH_CONTRACT
                                  }
                                >
                                  {Slicer(
                                    process.env.REACT_APP_NFT_ETH_CONTRACT
                                  )}
                                </a>
                              }
                            </div>
                          ) : nft.Blockchain == "BSC SmartChain" ? (
                            <div className="col-6 d-flex justify-content-end">
                              {
                                <a
                                  target={"_blank"}
                                  href={
                                    nft.Blockchain == "Ethereum"
                                      ? process.env.REACT_APP_ETH_SCAN_URL +
                                        "/address/" +
                                        process.env.REACT_APP_NFT_BNB_CONTRACT
                                      : nft.Blockchain == "BSC SmartChain"
                                      ? process.env.REACT_APP_BSC_SCAN_URL +
                                        "/address/" +
                                        process.env.REACT_APP_NFT_BNB_CONTRACT
                                      : process.env.REACT_APP_MATIC_SCAN_URL +
                                        "/address/" +
                                        process.env.REACT_APP_NFT_BNB_CONTRACT

                                    // process.env.REACT_APP_ETH_SCAN_URL +
                                    // "/address/" +
                                    // process.env.REACT_APP_NFT_BNB_CONTRACT
                                  }
                                >
                                  {Slicer(
                                    process.env.REACT_APP_NFT_BNB_CONTRACT
                                  )}
                                </a>
                              }
                            </div>
                          ) : (
                            <div className="col-6 d-flex justify-content-end">
                              {
                                <a
                                  target={"_blank"}
                                  href={
                                    process.env.REACT_APP_MATIC_SCAN_URL +
                                    "/address/" +
                                    process.env.REACT_APP_NFT_MATIC_CONTRACT
                                  }
                                >
                                  {Slicer(
                                    process.env.REACT_APP_NFT_MATIC_CONTRACT
                                  )}
                                </a>
                              }
                            </div>
                          )}
                        </div>
                        <div className="row mb-2">
                          <div className="col-6">TokenId</div>
                          <div className="col-6 d-flex justify-content-end">
                            {nft.tokenId}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-6">Token Standard</div>
                          <div className="col-6 d-flex justify-content-end">
                            {"ERC-1155"}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-6">Network</div>
                          <div className="col-6 d-flex justify-content-end">
                            {nft.Blockchain == "Ethereum"
                              ? "Etherium"
                              : nft.Blockchain == "BSC SmartChain"
                              ? "BSC"
                              : "Polygon"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-12">
            <div className="price_history_container">
              {/* <div className="priceBox"></div> */}
              <div class="cardListing mt-3">
                <div
                  class="card-header bg-light"
                  onClick={() => {
                    setShowPriceListing(!showPriceListing);
                  }}
                >
                  <div className="row">
                    <div className="col-2 col-lg-1 menuIcon">
                      <ShowChartIcon />
                    </div>
                    <div className="col-8 col-lg-10 menuText">
                      <span className="card_title2">Price History</span>
                    </div>
                    <div className="col-2 col-lg-1 menuDownIcon">
                      {/* <KeyboardArrowDownIcon/> */}
                      <img
                        src={dropDownIcon}
                        style={{ color: "rgb(84, 84, 84)" }}
                      />
                    </div>
                  </div>
                </div>
                {!showPriceListing ? null : pricehistorydata.length == 0 ? (
                  <div class="cardListingMenu align-items-center justify-content-center mt-5">
                    New
                  </div>
                ) : (
                  <div
                    class="cardListingMenu card-body"
                    style={{
                      // justifyContent: "center",
                      alignItems: "flex-end",
                      padding: "30px",
                    }}
                  >
                    <ResponsiveContainer width="80%" height={"100%"}>
                      <AreaChart data={pricehistorydata} syncId="anyId">
                        <XAxis
                          dataKey="Date"
                          tick={{ fontSize: "12px" }}
                          interval={"preserveStartEnd"}
                        />
                        <YAxis
                          dataKey="Price"
                          tick={{ fontSize: "12px" }}
                          interval={"preserveStartEnd"}
                        />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="Price"
                          strokeWidth={1}
                          stroke="red"
                          // cursor="red"
                          fill="transparent"
                        />
                      </AreaChart>
                      {/* <LineChart data={pricehistorydata}>
                      <CartesianGrid />
                      <XAxis dataKey="Date" interval={"preserveStartEnd"} />
                      <YAxis></YAxis>
                      <Legend />
                      <Tooltip />

                      <Line dataKey="Price" stroke="red" activeDot={{ r: 8 }} />
                    </LineChart>
                     */}
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
            <div className="Listings_container">
              {/* <div className="priceBox"></div> */}
              <div class="cardListing mt-3 ">
                <div
                  class="card-header bg-light"
                  onClick={() => {
                    setShowListing(!showListing);
                  }}
                >
                  <div className="row">
                    <div className="col-2 col-lg-1  menuIcon">
                      <SellIcon />
                    </div>
                    <div className="col-8 col-lg-10 menuText">
                      <span className="card_title2">Listings</span>
                    </div>
                    <div className="col-2 col-lg-1 menuDownIcon">
                      {/* <KeyboardArrowDownIcon/> */}
                      <img
                        src={dropDownIcon}
                        style={{ color: "rgb(84, 84, 84)" }}
                      />
                    </div>
                  </div>
                </div>
                {!showListing ? null : offerdata.length == 0 ? (
                  <div class="cardListingMenu2 align-items-center justify-content-center mt-5">
                    New
                  </div>
                ) : (
                  <div class="cardListingMenu2">
                    <div className="row  border-bottom">
                      <div className="col-4 col-lg-4 col-sm-4 d-flex justify-content-center border-end ">
                        <h6 className="my-2">Wallet Address</h6>
                      </div>
                      <div className="col-4 col-lg-4 col-sm-4 d-flex justify-content-center border-end ">
                        <h6 className="my-2">Price</h6>
                      </div>
                      <div className="col-4 col-lg-4 col-sm-4  d-flex justify-content-center border-end ">
                        <h6 className="my-2">Status</h6>
                      </div>
                    </div>
                    {creatorAddress == address.toString().toLowerCase() &&
                    creatorAddress.length !== 0 &&
                    creatorAddress.length != 0
                      ? offerdata.map((data, i) => {
                          let url =
                            nft.Blockchain == "Ethereum"
                              ? process.env.REACT_APP_ETH_SCAN_URL +
                                "/address/" +
                                data.WalletAddress.toString()
                              : nft.Blockchain == "BSC SmartChain"
                              ? process.env.REACT_APP_BSC_SCAN_URL +
                                "/address/" +
                                data.WalletAddress.toString()
                              : process.env.REACT_APP_MATIC_SCAN_URL +
                                "/address/" +
                                data.WalletAddress.toString();
                          return (
                            <div className="row border-bottom">
                              <div
                                className="col-4 col-lg-4 col-sm-4 d-flex justify-content-center border-end "
                                style={{ color: "blue" }}
                              >
                                <a
                                  className="link my-2 linkText"
                                  target={"_blank"}
                                  href={url}
                                >
                                  <span>{Slicer(data.WalletAddress)}</span>
                                </a>
                              </div>
                              <div className="col-4 col-lg-4 col-sm-4 d-flex justify-content-center border-end ">
                                <p className="my-2 linkText">{data.Price}</p>
                              </div>
                              <div className="col-4 col-lg-4 col-sm-4 d-flex justify-content-center border-end ">
                                {data.Status == "Pending" ? (
                                  <div
                                    className="row my-2"
                                    style={{ justifyContent: "space-between" }}
                                  >
                                    <div className="col-6">
                                      <button
                                        className="claim_btn"
                                        onClick={() =>
                                          MakeOfferaccept(
                                            i,
                                            data._id,
                                            data.WalletAddress,
                                            data.Price
                                          )
                                        }
                                      >
                                        {loading ? (
                                          i == loadingindex ? (
                                            <div className="loading-buy"></div>
                                          ) : (
                                            "Accept"
                                          )
                                        ) : (
                                          "Accept"
                                        )}
                                      </button>
                                    </div>
                                    <div className="col-6">
                                      <button
                                        className="claim_btn"
                                        onClick={() =>
                                          offerReject(
                                            data._id,
                                            data.WalletAddress,
                                            data.NftId
                                          )
                                        }
                                      >
                                        Reject
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <span>{data.Status}</span>
                                )}
                              </div>
                            </div>
                          );
                        })
                      : offerdata.map((data, i) => {
                          let url =
                            nft.Blockchain == "Ethereum"
                              ? process.env.REACT_APP_ETH_SCAN_URL +
                                "/address/" +
                                data.WalletAddress.toString()
                              : nft.Blockchain == "BSC SmartChain"
                              ? process.env.REACT_APP_BSC_SCAN_URL +
                                "/address/" +
                                data.WalletAddress.toString()
                              : process.env.REACT_APP_MATIC_SCAN_URL +
                                "/address/" +
                                data.WalletAddress.toString();

                          return (
                            <div className="row border-bottom">
                              <div
                                className="col-4 col-lg-4 col-sm-4 d-flex justify-content-center border-end  "
                                style={{ color: "blue" }}
                              >
                                <a
                                  className="link my-2 linkText"
                                  target={"_blank"}
                                  href={url}
                                >
                                  <span>{Slicer(data.WalletAddress)}</span>
                                </a>
                              </div>
                              <div className="col-4 col-lg-4 col-sm-4 d-flex justify-content-center border-end ">
                                <p className="my-2 linkText">{data.Price}</p>
                              </div>
                              <div className="col-4 col-lg-4 col-sm-4 d-flex justify-content-center border-end ">
                                <span className="my-2 linkText">
                                  {data.Status}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-9">
            {/* <div className="priceBox"></div> */}
            <div class="cardListing mb-2 mt-3  ">
              <div
                class="card-header bg-light "
                onClick={() => {
                  setShowRecentActivity(!showRecentActivity);
                }}
              >
                <div className="row my-2">
                  <div className="col-2 col-lg-1 menuIcon">
                    <HistoryIcon style={{ color: "rgb(84, 84, 84)" }} />
                  </div>
                  <div className="col-8 col-lg-10 menuText">
                    {" "}
                    <span className="card_title2">Recent Activity</span>
                  </div>
                  <div className="col-2 col-lg-1 menuDownIcon">
                    {/* <KeyboardArrowDownIcon/> */}
                    <img
                      src={dropDownIcon}
                      style={{ color: "rgb(84, 84, 84)" }}
                    />
                  </div>
                </div>
              </div>
              <div>
                {!showRecentActivity ? null : historydata.length == 0 ? (
                  <div class="cardListingMenu align-items-center justify-content-center mt-5">
                    New
                  </div>
                ) : (
                  <>
                    <div className=" row border-bottom">
                      <div className="col-3 col-lg-3 col-sm-3  d-flex justify-content-center border-end ">
                        <h6 className="my-2">Type</h6>
                      </div>
                      <div className="col-3 col-lg-3 col-sm-3 d-flex justify-content-center border-end ">
                        <h6 className="my-2">From</h6>
                      </div>
                      <div className="col-3 col-lg-3 col-sm-3 d-flex justify-content-center border-end ">
                        <h6 className="my-2">To</h6>
                      </div>
                      <div className="col-3 col-lg-3 col-sm-3 d-flex justify-content-center border-end ">
                        <h6 className="my-2">Date</h6>
                      </div>
                    </div>
                    <div className="empty">
                      {historydata.map((data, i) => {
                        let date = new Date(data.block_timestamp);
                        //toast(date.)
                        return (
                          <div className="row d-flex border-bottom  border-end">
                            <div
                              className="col-3 col-lg-3 col-sm-3 d-flex justify-content-center  border-end "
                              style={{ color: "blue" }}
                            >
                              <span className="my-2 linkText">
                                {data.from_address ==
                                "0x0000000000000000000000000000000000000000"
                                  ? "Minting"
                                  : "Sale"}
                              </span>
                            </div>
                            <div className="col-3 col-lg-3 col-sm-3 d-flex justify-content-center border-end ">
                              {data.from_address ==
                              "0x0000000000000000000000000000000000000000" ? (
                                <a
                                  className="link my-2 linkText"
                                  target={"_blank"}
                                  href={
                                    nft.Blockchain == "Ethereum"
                                      ? process.env.REACT_APP_ETH_SCAN_URL +
                                        "/address/" +
                                        process.env.REACT_APP_NFT_ETH_CONTRACT.toString()
                                      : nft.Blockchain == "BSC SmartChain"
                                      ? process.env.REACT_APP_BSC_SCAN_URL +
                                        "/address/" +
                                        process.env.REACT_APP_NFT_ETH_CONTRACT.toString()
                                      : process.env.REACT_APP_MATIC_SCAN_URL +
                                        "/address/" +
                                        process.env.REACT_APP_NFT_ETH_CONTRACT.toString()
                                  }
                                >
                                  -
                                </a>
                              ) : (
                                <a
                                  className="link my-2 linkText"
                                  target={"_blank"}
                                  href={
                                    nft.Blockchain == "Ethereum"
                                      ? process.env.REACT_APP_ETH_SCAN_URL +
                                        "/address/" +
                                        data.from_address
                                      : nft.Blockchain == "BSC SmartChain"
                                      ? process.env.REACT_APP_BSC_SCAN_URL +
                                        "/address/" +
                                        data.from_address
                                      : process.env.REACT_APP_MATIC_SCAN_URL +
                                        "/address/" +
                                        data.from_address

                                    // process.env.REACT_APP_ETH_SCAN_URL +
                                    // "/address/" +
                                    // data.from_address
                                  }
                                >
                                  {Slicer(data.from_address)}
                                </a>
                              )}
                            </div>
                            <div className="col-3 col-lg-3 col-sm-3 d-flex justify-content-center border-end ">
                              {data.to_address == address ? (
                                <a
                                  className="link my-2 linkText"
                                  target={"_blank"}
                                  href={
                                    nft.Blockchain == "Ethereum"
                                      ? process.env.REACT_APP_ETH_SCAN_URL +
                                        "/address/" +
                                        data.to_address
                                      : nft.Blockchain == "BSC SmartChain"
                                      ? process.env.REACT_APP_BSC_SCAN_URL +
                                        "/address/" +
                                        data.to_address
                                      : process.env.REACT_APP_MATIC_SCAN_URL +
                                        "/address/" +
                                        data.to_address

                                    // process.env.REACT_APP_ETH_SCAN_URL +
                                    // "/address/" +
                                    // data.to_address
                                  }
                                >
                                  You
                                </a>
                              ) : (
                                <a
                                  className="link my-2 linkText"
                                  target={"_blank"}
                                  href={
                                    nft.Blockchain == "Ethereum"
                                      ? process.env.REACT_APP_ETH_SCAN_URL +
                                        "/address/" +
                                        data.to_address
                                      : nft.Blockchain == "BSC SmartChain"
                                      ? process.env.REACT_APP_BSC_SCAN_URL +
                                        "/address/" +
                                        data.to_address
                                      : process.env.REACT_APP_MATIC_SCAN_URL +
                                        "/address/" +
                                        data.to_address
                                    // process.env.REACT_APP_ETH_SCAN_URL +
                                    // "/address/" +
                                    // data.to_address
                                  }
                                >
                                  {Slicer(data.to_address)}
                                </a>
                              )}
                            </div>
                            <div className="col-3 col-lg-3 col-sm-3 d-flex justify-content-center border-end">
                              <span className="my-2 linkText">
                                {" "}
                                {FormatDate1(date)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>

        <Modal
          show={modalshow}
          onHide={() => {
            setmodalshow(false);
            setloading(false);
          }}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Place Bid</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-6 col-md-6">
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="INDI"
                  value={nft.Blockchain}
                  style={{ height: "45px" }}
                  disabled={true}
                />
              </div>
              <div className="col-6 col-md-6">
                <input
                  type="number"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Value"
                  style={{ height: "45px" }}
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="remove_btn1"
              onClick={() => {
                setmodalshow(false);
                setloading(false);
              }}
            >
              Close
            </button>
            <button className="editremove1" onClick={() => placebid()}>
              {loading ? <div className="loading-place"></div> : "Place Bid"}
            </button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={offerModel}
          onHide={() => {
            setofferModel(false);
            setloading(false);
          }}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Make Offer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-6 col-md-6">
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="INDI"
                  value={nft.Blockchain}
                  style={{ height: "45px" }}
                  disabled={true}
                />
              </div>
              <div className="col-6 col-md-6">
                <input
                  type="number"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Value"
                  style={{ height: "45px" }}
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="remove_btn1"
              onClick={() => {
                setofferModel(false);
                setloading(false);
              }}
            >
              Close
            </button>
            <button className="editremove1" onClick={() => MakeOffer()}>
              {loading ? <div className="loading-buy"></div> : "Confirm"}
            </button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={Removemodal}
          onHide={() => {
            setRemovemodal(false);
            setloading(false);
          }}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Remove NFT</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure want to remove this?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => RemoveNft()}>
              Yes
            </Button>
            <Button variant="primary" onClick={() => setRemovemodal(false)}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={BlockModal}
          onHide={() => {
            setBlockModal(false);
            setloading(false);
          }}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Block user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure want to remove this?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => blockUser()}>
              Yes
            </Button>
            <Button variant="primary" onClick={() => setBlockModal(false)}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={buymodal}
          onHide={() => {
            // setbuymodal(false);
            // setloading(false);
          }}
          style={{ marginTop: "5%" }}
          centered
        >
          <Modal.Header>
            <Modal.Title>Preview</Modal.Title>
          </Modal.Header>
          <Modal.Body scrollable={true} style={{ height: "60%" }}>
            <img
              src="https://static.opensea.io/review-collection.png"
              style={{ height: "5%", width: "20%", marginLeft: "40%" }}
            ></img>
            <br></br>
            <span style={{ fontSize: "14px" }}>
              Review this information to ensure it’s what you want to buy
            </span>
            <br></br>

            <ul className="table-Buy mt-3">
              <li>
                <div className="row">
                  <div className="col-md-6 col-6">
                    <span>Collection name</span>
                  </div>
                  <div className="col-md-6 col-6">
                    <span>{nft.Collection}</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-md-6 col-6">
                    <span>Creater address</span>
                  </div>
                  <div className="col-md-6 col-6">
                    <span style={{ color: "blue" }}>
                      {" "}
                      {historydata.length > 0 ? (
                        <a
                          target={"_blank"}
                          href={
                            nft.Blockchain == "Ethereum"
                              ? process.env.REACT_APP_ETH_SCAN_URL +
                                "/address/" +
                                historydata[0].to_address.toString()
                              : nft.Blockchain == "BSC SmartChain"
                              ? process.env.REACT_APP_BSC_SCAN_URL +
                                "/address/" +
                                historydata[0].to_address.toString()
                              : process.env.REACT_APP_MATIC_SCAN_URL +
                                "/address/" +
                                historydata[0].to_address.toString()
                            // process.env.REACT_APP_ETH_SCAN_URL +
                            // "/address/" +
                            // historydata[0].to_address.toString()
                          }
                        >
                          {Slicer(historydata[0].to_address)}
                          {/* {historydata[0].to_address.slice(0, 3) +
                            historydata[0].to_address.slice(23)} */}
                        </a>
                      ) : (
                        " "
                      )}{" "}
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-md-6 col-6">
                    <span>Sales</span>
                  </div>
                  <div className="col-md-6 col-6">
                    <span>
                      {historydata.length > 0 ? historydata.length - 1 : "0"}
                    </span>
                  </div>
                </div>
              </li>
              <div className="row">
                <div className="col-md-6 col-6">
                  <span>Contract address</span>
                </div>
                <div className="col-md-6 col-6">
                  <span>
                    <a
                      target={"_blank"}
                      href={
                        nft.Blockchain == "Ethereum"
                          ? process.env.REACT_APP_ETH_SCAN_URL +
                            "/address/" +
                            process.env.REACT_APP_NFT_ETH_CONTRACT.toString()
                          : nft.Blockchain == "BSC SmartChain"
                          ? process.env.REACT_APP_BSC_SCAN_URL +
                            "/address/" +
                            process.env.REACT_APP_NFT_BNB_CONTRACT.toString()
                          : process.env.REACT_APP_MATIC_SCAN_URL +
                            "/address/" +
                            process.env.REACT_APP_NFT_MATIC_CONTRACT.toString()
                      }
                    >
                      {nft.Blockchain == "Ethereum"
                        ? Slicer(
                            process.env.REACT_APP_NFT_ETH_CONTRACT.toString()
                          )
                        : nft.Blockchain == "BSC SmartChain"
                        ? Slicer(
                            process.env.REACT_APP_NFT_BNB_CONTRACT.toString()
                          )
                        : Slicer(
                            process.env.REACT_APP_NFT_MATIC_CONTRACT.toString()
                          )}
                    </a>
                  </span>
                </div>
              </div>
            </ul>
            <div className="row">
              <div className="col-1">
                <input
                  type="checkbox"
                  style={{ height: "16px", width: "16px" }}
                  onClick={(e) =>
                    e.target.checked == true
                      ? setBuybuttonenable(false)
                      : setBuybuttonenable(true)
                  }
                ></input>{" "}
              </div>
              <div className="col-11">
                <p>
                  I understand that Indegena has not reviewed this collection
                  and blockchain transactions are irreversible.
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setbuymodal(false);
                setloading(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="secondary"
              disabled={Buybuttonenable}
              onClick={() => buyNft()}
            >
              {loading ? <div className="loading-buy"></div> : "Buy"}
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    </div>
  );
}

export default MenuBoard;
