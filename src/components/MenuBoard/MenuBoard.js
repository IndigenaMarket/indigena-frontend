import React,{useState,useEffect}from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import Logout from '../../Assets/exit.png'
import NFT from '../../Assets/NFT-9.png'
import Filters from "../FilterNav/Filters";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HistoryIcon from '@mui/icons-material/History';
import LockIcon from '@mui/icons-material/Lock';
import SellIcon from '@mui/icons-material/Sell';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import dropDownIcon from '../../Assets/Icon-arrow-dropdown.png'
import './MenuBoard.css'
import MenuBoardDropDown from "./MenuBoardDropDown";
import ColoredLine from "../ColoredLine/ColoredLine";
import Accordion from "./Accordion";

import tokenAbi from'../../contracts/token.json'
import tokenBNBAbi from'../../contracts/Wbnb.json'
import tokenMaticAbi from'../../contracts/Wmatic.json'
import axios from 'axios';
import { useTimer } from 'react-timer-hook';
import { Form ,Modal,Button} from "react-bootstrap";
import { useNavigate  } from "react-router-dom";
import { useDispatch, useSelector  } from "react-redux";
import { connectWallet, connectFailed ,addNetwork } from "../../redux/WalletAction";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import GridViewIcon from '@mui/icons-material/GridView';
//import ShowChartIcon from '@mui/icons-material/ShowChart';
import './MenuBoardDropDown.css'
import { Block } from "@mui/icons-material";
import {
  LineChart,
  ResponsiveContainer,
  Legend, Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { truncateSync } from "fs";
import { getProviderInfoByCheck } from "web3modal";
const AWS = require('aws-sdk');




function MyTimer({expiryTimestamp,timeover}) {
  
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


  useEffect(async() => {
        let url=window.location.href
        url=url.split('/')
        let tokenid=url[url.length-1]
        let nftresult=await axios.get("https:/indigenanft.s3.amazonaws.com/"+tokenid+".json")
        console.log("Auctiondat", nftresult.data.pinataContent.AuctionEndDate);
        
        const time =new Date(nftresult.data.pinataContent.AuctionEndDate);
        console.log("expiryTimestamp",time)
        time.setSeconds(time.getSeconds())
        //time.setSeconds(30);
        //alert(time);
        restart(time)
  }, []);


  return (
    <div className="row" style={{textAlign: 'center',marginTop:"-5%"}}>
      <div  className="col-12"style={{fontSize: '20px'}}>
        <span>{"Days:"}</span>{days +"-"}<span>{"Hours:"}</span>{hours+"-"}<span>{"Minutes:"}</span>{minutes+"-"}<span>{"Seconds:"}</span>{seconds}
      </div>
    </div>
  );
}

function MenuBoard() {
  const[nft,setnft]=useState({});
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.WalletConnect);
  console.log(wallet);
  const history = useNavigate ();
  const {web3, address, market,BNB_market,MATIC_market} = wallet;
  console.log("web3",web3);
  // if(wallet.connected)
  // {
  //   getFavourites();
  // }
  const [NftResult,setNftResult]=useState({})
  const[tokenId,setTokenId]=useState('')
  const[price,setprice]=useState('')
  const[expiryTimestamp,setexpiryTimestamp]=useState('');

  const[timer,settimer]=useState(false)
  const[bitdata,setbitdata]=useState([]);
  const[offerdata,setofferdata]=useState([]);
  const[modalshow,setmodalshow]=useState(false);
  const[offerModel,setofferModel]=useState(false);
  const[currentPrice,setcurrentPrice]=useState('')
  const[properties,setproperties]=useState([]);
  const[index,setindex]=useState(0);
  const[unlockcontent,setunlockcontent]=useState(false);
  const[historydata,sethistorydata]=useState([]);
  const[creatordetails,setcreatordetails]=useState({});
  const[buymodal,setbuymodal]=useState(false);
  const[pricehistorydata,setpricehistorydata]=useState([]);
  const[Views,setViews]=useState(true);
  const[Buybuttonenable,setBuybuttonenable]=useState(true);
  const[Viewscount,setViewscount]=useState('');
  const[AdminStatus,setAdminStatus]=useState(false);
  const[Removemodal,setRemovemodal]=useState(false);
  const[BlockModal,setBlockModal]=useState(false);
  const[blockchain,setblockchain]=useState(false);
  const[favouritescount,setfavouritescount]=useState(0);
  const[alreadyLiked,setalreadyLiked]=useState(false);
  const[bitstatus,setbitstatus]=useState(false);
  const[creatorAddress,setcreatorwalletAddress]=useState('');
  const[MakeOfferDisable,setMakeOfferDisable]=useState(false)
  const[loadingindex,setloadingindex]=useState(null)
  const[loading,setloading]=useState(false);
  const[tempdata,settempdata]=useState([])
  const getdata=async()=>
  {
    
    let url=window.location.href
    url=url.split('/')
    let tokenid=url[url.length-1]
    
    //alert("https:/indigenanft.s3.amazonaws.com/"+tokenid+".json");
    let nftresult=await axios.get("https:/indigenanft.s3.amazonaws.com/"+tokenid+".json")
    console.log("Status cheked1",nftresult);
    setNftResult(nftresult.data);
    let propertiesdataarray=[];
    let propertiesdata=Object.entries(nftresult.data.pinataContent.Properties);
    console.log("data",propertiesdata)
 
  for(var i=0;i<propertiesdata.length;i++)
  {
    
    propertiesdataarray.push(propertiesdata[i][1])
  }
  setproperties(propertiesdataarray);
     console.log("Status checked", nftresult.data.pinataContent);

    setnft(nftresult.data.pinataContent);
    //setproperties(nftresult.data.pinataContent.Properties)
    //nftresult.data.pinataContent.Properties.map((e,i)=>console.log(e));
    getbitdata(tokenid);
   
    getOffer(decodeURIComponent(tokenid));
    setblockchain(nftresult.data.pinataContent.Blockchain)
    setTokenId(tokenid)
    
   
    //console.log("bitdata",bitdata.data.result[0].Price);
    //alert(bitdata.data.result[0].Price.$numberDecimal);
  }
  const getbitdata=async (tokenId)=>
  {
    //alert("Get"+tokenId)

    let bitdata = await axios.post(process.env.REACT_APP_API_URL.toString()+"/maxbid",{TokenId:tokenId})
    console.log(bitdata.data)
    console.log(bitdata.data.result);
    let biddata=[];
    
    if(bitdata.data.result.length>0)
    {
      bitdata.data.result.map(async(data,i)=>{
        data.Price=data.Price.$numberDecimal
        biddata.push(data)
      })
      console.log('bit data',biddata);
      setbitdata(biddata);
      setcurrentPrice(biddata[0].Price);
    }
    
    //alert(JSON.stringify(biddata[0].Price))
  }

  const getOffer=async (tokenId)=>
  {
    //alert("Get"+tokenId)

    let bitdata = await axios.post(process.env.REACT_APP_API_URL.toString()+"/getOffer",{TokenId:tokenId})
    console.log(bitdata.data)
    console.log(bitdata.data.result);
    let biddata=[];
    
    if(bitdata.data.result.length>0)
    {
      
      bitdata.data.result.map(async(data,i)=>{
        if(data.WalletAddress==address&&data.Status=='Pending')
        {
            setMakeOfferDisable(true)
        }
        data.Price=data.Price.$numberDecimal
        biddata.push(data)
      })
      console.log('bit data',biddata);
      setofferdata(biddata);
      
    }
    
    //alert(JSON.stringify(biddata[0].Price))
  }
  // const getwinnerindex=()=>
  // {
  //   console.log(nft)
  //   console.log(typeof(nft.AuctionEndDate));
  // }
const executeorder=async ()=>
{
 
  let url=window.location.href
  url=url.split('/')
  let tokenid=url[url.length-1]
  let bitdata = await axios.post(process.env.REACT_APP_API_URL.toString()+"/maxbid",{TokenId:tokenid});
 
  
if(web3!=null) {
  if(nft.Blockchain=='Ethereum')
  {
    if(window.ethereum && window.ethereum.networkVersion !== '4') {
      await addNetwork(4);
    }
  }
  else if(blockchain=='BSC SmartChain')
  {
    if(window.ethereum && window.ethereum.networkVersion !== '97') {
      await addNetwork(97);
    }
  }
  else{
    if(window.ethereum && window.ethereum.networkVersion !== '80001') {
      await addNetwork(80001);
    }
  }
const tokenInstance = new web3.eth.Contract(nft.Blockchain=="Ethereum"?tokenAbi:nft.Blockchain=="BSC SmartChain"?tokenBNBAbi:tokenMaticAbi,nft.Blockchain=="Ethereum"?process.env.REACT_APP_TOKEN_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_WBNB_TOKEN_ADDRESS:process.env.REACT_APP_WMATIC_TOKEN_ADDRESS);
var status=false;
let tempdata=[];
let count=0;

await bitdata.data.result.map(async(data,i)=>{
  //alert(JSON.stringify(data.WalletAddress));
  count=count+1;
  const Balance = await tokenInstance.methods.balanceOf(data.WalletAddress).call();
  // alert(Balance);
  const price= await web3.utils.toWei(data.Price.$numberDecimal.toString(), 'ether');
  
  
  var amt1 = await web3.utils.fromWei(Balance.toString(),'ether')
  var amt2 =await web3.utils.fromWei(price.toString(),'ether')
  if(parseFloat(amt1)>parseFloat(amt2))
  {
    //  if(!status)
    //  {
      
      
      data.Price=data.Price.$numberDecimal
      setindex(i);
      tempdata.push(data);
      // alert(i);
      // alert(timer);
    //   status=true;
    //   console.log("set index",i);
    //  }
     console.log("normal index",i);
      
  }
  if(i==bitdata.data.result.length-1)
{
  // let searchdata=await tempdata.sort(function(a, b) {
  //   if (a['Price'] < b['Price']) {    
  //       return 1;    
  //   } else if (a['Price'] > b['Price']) {    
  //       return -1;    
  //   } 
  // });
  let searchdata= tempdata.sort(function(a, b) {
    if (parseFloat(a['Price']) <parseFloat( b['Price'])) {    
        return 1;    
    } else if (parseFloat(a['Price'] )>parseFloat( b['Price'])) {    
        return -1;    
    }    
    return 0;  
   
  });
  settempdata(searchdata);
}
})


}
}

const offerReject=async(id,walletaddress,tokenId)=>{
 
  let tokensresult=await axios.put(process.env.REACT_APP_API_URL.toString()+"/updateOffer",{WalletAddress:walletaddress,tokenId:tokenId,status:"Rejected",_id:id});
  if(tokensresult.data.status)
  {
      alert("Rejected sucessfully");
      getOffer(tokenId);
  }
  else{
     alert("Something went wrong")
  }
}

const getsaleshistory=async()=>
{
  let url=decodeURIComponent(window.location.href)
  url=url.split('/')
  let tokenid=url[url.length-1];
  let nftresult=await axios.get("https:/indigenanft.s3.amazonaws.com/"+tokenid+".json");
  var moralis_url;
  tokenid=url[url.length-1].split('-');
  tokenid=tokenid[tokenid.length-1];
  if(nftresult.data.pinataContent.Blockchain=="Ethereum")
  {
    moralis_url="https://deep-index.moralis.io/api/v2/nft/"+ process.env.REACT_APP_NFT_CONTRACT_ADDRESS.toString()+"/"+tokenid+"/transfers?chain=rinkeby&format=decimal"
  }
  else if(nftresult.data.pinataContent.Blockchain=="BSC SmartChain")
  {
    moralis_url="https://deep-index.moralis.io/api/v2/nft/"+ process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS.toString()+"/"+tokenid+"/transfers?chain=bsc testnet&format=decimal"
  }
  else{
    moralis_url="https://deep-index.moralis.io/api/v2/nft/"+ process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS.toString()+"/"+tokenid+"/transfers?chain=mumbai&format=decimal"
  }
  
  //alert(moralis_url)
  let salesdata=await axios.get(moralis_url, {
    headers: {
      "X-API-Key":"nH1SY2Sfny0GmXdJaHit8W6zwkdMLkgeYOrZNaVt1PKXCLFMcGwftINngekNZyil"
    }
  });
  //alert("Result",salesdata.data.result[0]);
  console.log("Result sales history",salesdata);
  sethistorydata(salesdata.data.result);
  if(salesdata.data.result.length>0)
  {
    
  
  
  setcreatorwalletAddress(salesdata.data.result[0].to_address);
  let data={WalletAddress:salesdata.data.result[0].to_address};
  let tokensresult=await axios.post(process.env.REACT_APP_API_URL.toString()+"/getnft",data);
  console.log(tokensresult.data.result[0])
  setcreatordetails(tokensresult.data.result[0])
  console.log("saleshistory",salesdata.data.result); 
  if(wallet.connected)
  {
     
     let pricechartdata=[];
    salesdata.data.result.map((data,i)=>{
        let pricehistory={};
        pricehistory['Price']=web3.utils.fromWei(data.value);
        pricehistory['Date']=data.block_timestamp.slice(0,10);
        pricechartdata.push(pricehistory);
        
        if((i+1)==salesdata.data.result.length)
        {
          
          setpricehistorydata(pricechartdata)
        }
    })
  }
  
}
}

  const getdollar=(network)=>{
    var price=0;
    if(network=="Ethereum")
    {
        price=nft.Price?parseFloat(nft.Price)*parseFloat(localStorage.getItem("Eth-price")):0
    }
    else if(network=="BSC SmartChain")
    {
       price=nft.Price?parseFloat(nft.Price)*parseFloat(localStorage.getItem("Bnb-price")):0
    }
    else if(network=="Polygon"){
       price=nft.Price?parseFloat(nft.Price)*parseFloat(localStorage.getItem("Matic-price")):0
    }

    return price.toFixed(3)
  }
  useEffect(async() => {
    checkuserStatus();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
     getUserType();
     await getdata();
     getsaleshistory();
     getFavourites();
    if(Views)
    {
       getReview();
       
    }
   
    //await getbitdata()
  }, [wallet.connected]);

 

  // const addNetwork=(id) =>{
   
  //   let networkData;
  //   switch (id) {
     
  //     case 97:
  //       networkData = [

  //         {
          
  //         chainId: "0x61",
          
  //         chainName: "BSCTESTNET",
          
  //         rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
          
  //         nativeCurrency: {
          
  //         name: "BINANCE COIN",
          
  //         symbol: "BNB",
          
  //         decimals: 18,
          
  //         },
          
  //         blockExplorerUrls: ["https://testnet.bscscan.com/"],
          
  //         },
          
  //         ];
  
  //       break;
  //     case 4:
  //       networkData = [
  //         {
  //           chainId: '0x4'
           
  //         }
  //       ]
  //       break;
  //     case 80001:
        
  //       networkData=JSON.stringify(networkData)
  //       networkData = [
  //         {
  //           chainId: web3.utils.toHex('80001'),
  //           chainName: "Mumbai Testnet",
  //           rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
  //           nativeCurrency: {
  //             name: "MATIC",
  //             symbol: "MATIC",
  //             decimals: 18,
  //           },
  //           blockExplorerUrls: ["https://polygonscan.com/"],
  //         },
  //       ];
    
  //         break;    
  //     default:
  //       break;
  //   }
  
  //   console.log(networkData)
  //   if(id!=4)
  //     {
  //       return window.ethereum.request({
  
  //         method: "wallet_addEthereumChain",
          
  //         params: networkData,
          
  //         });
  //         //dispatch(connectWallet());
  //     }
  //     else
  //     {
        
  //       return window.ethereum.request({
  
  //         method: "wallet_switchEthereumChain",
          
  //         params: networkData,
          
  //         });
  //     }
  // }
  const checkuserStatus=async()=>
 {
   if(address)
   {
    let tokensresult=await axios.post(process.env.REACT_APP_API_URL.toString()+"/checkUserStatus",{WalletAddress:address});
    if(tokensresult.data.result)
    {
       alert('You are blocked by admin.Please contact our admin team');
       history('/resources');
    }
    else{
      
      return
    }
   }
 
 }
  const getUserType=async()=>
  {
    let tokensresult=await axios.post(process.env.REACT_APP_API_URL.toString()+"/getnft",{WalletAddress:address});
    if(tokensresult.data.result[0].IsAdmin)
    {
      
      setAdminStatus(true);
    }
  }
  const RemoveNft=async()=>{
    let tokensresult=await axios.put(process.env.REACT_APP_API_URL.toString()+"/updatenftprice",{tokenId:tokenId,status:"Block"});
    if(tokensresult.data.status)
    {
        alert("Updated sucessfully");
        history("/marketplace");
    }
    else{
       alert("Something went wrong")
    }
  }
  const blockUser=async()=>
  {
    //alert(creatordetails.WalletAddress)
    let tokensresult=await axios.put(process.env.REACT_APP_API_URL.toString()+"/updateCollection",{WalletAddress:creatordetails.WalletAddress});
    if(tokensresult.data.status)
    {
        alert("Updated sucessfully");
        history("/marketplace");
    }
    else{
       alert("Something went wrong")
    }
  }
  const getReview=async()=>
  {
    setViews(false);
  let url=decodeURIComponent(window.location.href)
  url=url.split('/')
  let tokenid=url[url.length-1];
    
    let tokensresult=await axios.post(process.env.REACT_APP_API_URL.toString()+"/GetViews",{NftId:tokenid});
    console.log("Views",tokensresult)
    
    setViewscount(tokensresult.data.result[0].Views);
  }

  const getFavourites=async()=>
  {
    
  let url=decodeURIComponent(window.location.href)
  url=url.split('/')
  let tokenid=url[url.length-1];
    
    let tokensresult=await axios.post(process.env.REACT_APP_API_URL.toString()+"/getFavourites",{NftId:tokenid,WalletAddress:address});
    console.log("Views",tokensresult)
    setfavouritescount(tokensresult.data.result);
    
    if(tokensresult.data.alreadyLiked)
    {
      setalreadyLiked(true)
    }
    
  }
  const addFavourites=async()=>
  {
  let url=decodeURIComponent(window.location.href)
  url=url.split('/')
  let tokenid=url[url.length-1];
    if(address)
    {
      let tokensresult=await axios.post(process.env.REACT_APP_API_URL.toString()+"/AddFavourites",{NftId:tokenid,WalletAddress:address});
    
    setalreadyLiked(true)
    setfavouritescount(tokensresult.data.result);
    
    }
    else{
      alert("Please connect wallet");
      setloading(false);
    }
    
    
  }
  const buyNft=async()=>
  {
    setloading(true);
    let url=decodeURIComponent(window.location.href)
    url=url.split('/')
    let tokenId=url[url.length-1];
    //alert(tokenId);
    if(address)
    {
     // const tokenInstance = new web3.eth.Contract(nft.Blockchain=="Ethereum"?tokenAbi:nft.Blockchain=="BSC SmartChain"?tokenBNBAbi:tokenMaticAbi,nft.Blockchain=="Ethereum"?process.env.REACT_APP_TOKEN_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_WBNB_TOKEN_ADDRESS:process.env.REACT_APP_WMATIC_TOKEN_ADDRESS);
      //        const nftApproveRes = await nftInstance.methods.setApprovalForAll(blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC
      // , true).send({from: address});
      //     const tokenInstance = new web3.eth.Contract(tokenAbi, process.env.REACT_APP_TOKEN_ADDRESS);
          //const allowance =await tokenInstance.methods.allowance(address,nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC).call();
          try{
           const amount = web3.utils.toWei(nft.Price, 'ether');
          // if(web3.utils.fromWei(allowance) < parseFloat(nft.Price)) {
          //   const approveRes = await tokenInstance.methods.approve(nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC, '9999999999999999999').send({from: address});
          // console.log(approveRes);
          // }
          
          // const walletBalance=tokenInstance.methods.balanceOf(address).call().then(async(result)=>
          // {
          // if(web3.utils.fromWei(result)>web3.utils.fromWei(amount))
          // {
            web3.eth.getBalance(address)
      .then(async(balance)=>{console.log("getbalance",balance);
      //const price = web3.utils.toWei('0.01', 'ether');
      if(balance>=amount)
      {
            // const order = [
            //   nft.Selleraddress,
            //  address,
            //  nft.Blockchain=="Ethereum"?process.env.REACT_APP_TOKEN_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_WBNB_TOKEN_ADDRESS:process.env.REACT_APP_WMATIC_TOKEN_ADDRESS,
            //  nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_CONTRACT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS:process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS,
            //   0,
            //   amount,
            //   nft.tokenId,
            //   1
            //   ];
            //   console.log(order);
              const nonce = Date.now();
              // const signMsgHash = web3.utils.soliditySha3( {t: 'address', v:'0xaAF4E6E72183a382657a7fE26B72e6a2Ba694DF7' },
              //     {t: 'address', v:nft.Selleraddress},
              //     {t: 'address', v:address},
              //     {t: 'address', v: nft.Blockchain=="Ethereum"?process.env.REACT_APP_TOKEN_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_WBNB_TOKEN_ADDRESS:process.env.REACT_APP_WMATIC_TOKEN_ADDRESS},
              //     {t: 'address', v:nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_CONTRACT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS:process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS},
              //     {t: 'uint256', v:amount},
              //     {t: 'uint256', v:nft.tokenId},
              //     {t: 'uint256', v:nft.Copies},
              //     {t: 'uint256', v: nonce});
              //     let sig1 = await web3.eth.accounts.sign(signMsgHash,nft.Blockchain=="Ethereum"?process.env.REACT_APP_SIGNER_PRIVATEKEY:process.env.REACT_APP_SIGNER_TEMPKEY);
              // const signature = [sig1.v, sig1.r, sig1.s, nonce];
              let signaturehash=await axios.post(process.env.REACT_APP_API_URL.toString()+"/getsignature",
                  {
                              "seller": nft.Selleraddress,
                              "buyer":address,
                              "nftAddress": nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_CONTRACT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS:process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS,
                              "inEth": true,
                              "_orderType":0 ,
                              "amount": amount,
                              "tokenId": nft.tokenId,
                              "qty": nft.Copies,
                              "timestamp": nonce,
                              "Blockchain":nft.Blockchain
                  })
                var sighash = signaturehash.data.result
                var signtuple=[nft.Selleraddress,address,nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_CONTRACT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS:process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS,true,amount,nft.tokenId,nft.Copies,nonce,sighash]    
              //const res = await market.methods.excuteOrder(order, signature).send({from: address});
          
              const res = nft.Blockchain=="Ethereum"?await market.methods.executeOrder(signtuple).send({from: address, value :amount})
                :blockchain=="BSC SmartChain"?await BNB_market.methods.executeOrder(signtuple).send({from: address, value :amount})
                :await MATIC_market.methods.executeOrder(signtuple).send({from: address, value :amount});
              if(res.status)
              {
                NftResult.pinataContent.Status="Buy";
                NftResult.pinataContent.Selleraddress=address;
                console.log(NftResult)
                const s3 = new AWS.S3({
                  accessKeyId: 'AKIAQMYT3V5MLRXZJTI2', 
                  secretAccessKey: '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', 
                });

                const s3Bucket = 'indigenanft'; 
                const objectName = tokenId.toString()+'.json'; 
                //alert(objectName);
                const objectData = JSON.stringify(NftResult); 
                const objectType = 'application/json';
                const params = {
                  Bucket: s3Bucket,
                  Key: objectName,
                  Body: objectData,
                  ContentType: objectType,
                };
                const result1 =await s3.putObject(params).promise();
                let result=await axios.put(process.env.REACT_APP_API_URL.toString()+"/updatenftprice",{tokenId:tokenId,price:nft.Price,status:"Buy"})
                if(result.status)
                {
                  setloading(false);
                  alert("You are the owner of this nft")
                  history('/user-profile');
                }
                else{
                  alert("Something Went wrong")
                }
              }
              else{
      
              }
          }
          else
          {
            setloading(false);
            alert("Not enough balance")
          }
      
        });
      }
      catch(e){
        setloading(false)
      }
    }
    else{
      alert("Please connect the wallet");
      setloading(false);
    }
   
  }
  const placebid=async()=>{
    if(parseFloat(nft.Auctionstartprice) < parseFloat(price))
    {
    setloading(true);
    await claimnfthandle();
    console.log(1);
    try{
    //const wethbalance= new web3.eth.Contract(,'0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')
    const tokenInstance = new web3.eth.Contract(nft.Blockchain=="Ethereum"?tokenAbi:nft.Blockchain=="BSC SmartChain"?tokenBNBAbi:tokenMaticAbi,nft.Blockchain=="Ethereum"?process.env.REACT_APP_TOKEN_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_WBNB_TOKEN_ADDRESS:process.env.REACT_APP_WMATIC_TOKEN_ADDRESS)
    const allowance =await tokenInstance.methods.allowance(address, nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC).call();
    console.log(2);
    console.log(allowance);
    const Balance = await tokenInstance.methods.balanceOf(address).call();
    console.log(Balance)
    const amount = web3.utils.toWei(price, 'ether');
    console.log(3)
    
    // if(web3.utils.fromWei(allowance) < parseFloat(price)) {
    //   const approveRes = await tokenInstance.methods.approve(nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC, '99999999999999999999999999').send({from: address});
    //   console.log(approveRes);
    // }
    // alert(web3.utils.fromWei(Balance.toString(),'ether'));
     
     var amt1 = await web3.utils.fromWei(Balance.toString(),'ether')
     var amt2 =await web3.utils.fromWei(amount.toString(),'ether')
     
    if(parseFloat(amt1)>parseFloat(amt2))
    {
    const approveRes = await tokenInstance.methods.approve(nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC, amount).send({from: address});
    console.log(new Date(nft.AuctionEndDate));
    if(new Date(nft.AuctionEndDate)>new Date())
    {
      console.log(true)
    }
    let result=await axios.post(process.env.REACT_APP_API_URL.toString()+"/createbid",{WalletAddress:address,TokenId:tokenId,Price:price})
    console.log(result)
    if(result.data.status)
    {
      alert("Bidded Sucessfully");
      setloading(false);
      setmodalshow(false);
      getbitdata(tokenId)
      ///$("#exampleModal").modal("hide");
    }
    else{
      alert("Something Went Wrong")
    }
  }
  else
  {
    alert("Not enough balance");
    setloading(false);
  }
    }
    catch(e)
    {
      setloading(false)
    }

  }
  else{
    alert("Please bid more than "+nft.Auctionstartprice);
    setloading(false)
  }

  }
  
  const MakeOffer=async()=>{
    try{
    if(price)
    {
    setloading(true);
    await claimnfthandle();
    console.log(1)
    //const wethbalance= new web3.eth.Contract(,'0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')
    const tokenInstance = new web3.eth.Contract(nft.Blockchain=="Ethereum"?tokenAbi:nft.Blockchain=="BSC SmartChain"?tokenBNBAbi:tokenMaticAbi,nft.Blockchain=="Ethereum"?process.env.REACT_APP_TOKEN_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_WBNB_TOKEN_ADDRESS:process.env.REACT_APP_WMATIC_TOKEN_ADDRESS)
    const allowance =await tokenInstance.methods.allowance(address, nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC
   ).call();
    console.log(2)
    console.log(allowance);
    const Balance = await tokenInstance.methods.balanceOf(address).call();
    console.log(Balance)
    const amount = web3.utils.toWei(price, 'ether');
    console.log(3)
    const approveRes = await tokenInstance.methods.approve(nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC, amount).send({from: address});
    // if(web3.utils.fromWei(allowance) < parseFloat(price)) {
    //   const approveRes = await tokenInstance.methods.approve(nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC, amount).send({from: address});
    //   console.log(approveRes);
    // }
    console.log(new Date(nft.AuctionEndDate));
    if(new Date(nft.AuctionEndDate)>new Date())
    {
      console.log(true)
    }
    let result=await axios.post(process.env.REACT_APP_API_URL.toString()+"/createOffer",{WalletAddress:address,TokenId:decodeURIComponent(tokenId),Price:price,status:"Pending"})
    console.log(result);
    if(result.data.status)
    {
      alert("Added Sucessfully");
      setofferModel(false);
      setloading(false);
      getOffer(decodeURIComponent(tokenId));
      ///$("#exampleModal").modal("hide");
    }
    else{
      alert("Something Went Wrong")
    }



    }


    else{
      alert("Please Enter amount");
      setloading(false)
    }
  }
  catch(e)
  {
    setloading(false)
  }


  }



  const timeover=async()=>
  {
    let url=window.location.href
    url=url.split('/')
    let tokenid=url[url.length-1]
    
    //alert("https:/indigenanft.s3.amazonaws.com/"+tokenid+".json");
  
    let nftresult=await axios.get("https:/indigenanft.s3.amazonaws.com/"+tokenid+".json")
    if(new Date(nftresult.data.pinataContent.AuctionEndDate)<new Date())
    {
      //alert("Timer called");
      settimer(true);
      AuctionExpired();
      executeorder();
    }
    

  }

  const AuctionExpired=async()=>{
    let url=window.location.href
    url=url.split('/')
    let tokenid=url[url.length-1]
    let bitdata = await axios.post(process.env.REACT_APP_API_URL.toString()+"/maxbid",{TokenId:tokenid});
    
    if(bitdata.data.result.length==0)
    {
      let NftResult=await axios.get("https:/indigenanft.s3.amazonaws.com/"+tokenid+".json")
      NftResult.data.pinataContent.Status="Buy";
    
      const s3 = new AWS.S3({
        accessKeyId: 'AKIAQMYT3V5MLRXZJTI2', 
        secretAccessKey: '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', 
      });

      const s3Bucket = 'indigenanft'; 
      const objectName = decodeURIComponent(tokenId).toString()+'.json'; 
      //alert(objectName);
      const objectData = JSON.stringify(NftResult.data); 
      const objectType = 'application/json';
      const params = {
        Bucket: s3Bucket,
        Key: objectName,
        Body: objectData,
        ContentType: objectType,
      };
      const result1 =await s3.putObject(params).promise();
        let result=await axios.put(process.env.REACT_APP_API_URL.toString()+"/updatenftprice",{tokenId:tokenId,status:"Auction Expired"})
        if(result.status)
        {
          
          history("/collections")
        } 
      }
    
  }
 
  const clickClaimButton=async (index,nftid)=>
  {
    setloading(true)
    try{
    await claimnfthandle();
    let url=decodeURIComponent(window.location.href)
    url=url.split('/')
    let tokenId=url[url.length-1];
    const tokenInstance = new web3.eth.Contract(tokenAbi, nft.Blockchain=="Ethereum"?process.env.REACT_APP_TOKEN_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_WBNB_TOKEN_ADDRESS:process.env.REACT_APP_WMATIC_TOKEN_ADDRESS);
    const allowance =await tokenInstance.methods.allowance(address,nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC).call();
    const amount = web3.utils.toWei(tempdata[index].Price.toString(), 'ether');
    if(web3.utils.fromWei(allowance) < parseFloat(tempdata[index].Price.toString())) {
      const approveRes = await tokenInstance.methods.approve(nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC, '99999999999999999999999999').send({from: address});
    console.log(approveRes);
    }
    const walletBalance=tokenInstance.methods.balanceOf(address).call().then(async(result)=>
    {
      var amt1 = await web3.utils.fromWei(result.toString(),'ether')
      var amt2 =await web3.utils.fromWei(amount.toString(),'ether')
      if(parseFloat(amt1)>parseFloat(amt2))

      {
     
      // let deivided=(nft.Price*1000)
      // alert(deivided)
    //   const order = [
    //     nft.Selleraddress,
    //    address,
    //    nft.Blockchain=="Ethereum"?process.env.REACT_APP_TOKEN_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_WBNB_TOKEN_ADDRESS:process.env.REACT_APP_WMATIC_TOKEN_ADDRESS,
    //    nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_CONTRACT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS:process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS,
    //     0,
    //     amount,
    //     nft.tokenId,
    //     1
    //     ];
  
    // console.log(order)
    const nonce = Date.now();
    nft.Copies=1;
    // const signMsgHash = web3.utils.soliditySha3( {t: 'address', v:process.env.REACT_APP_NFT_ADDRESS},
    //   {t: 'address', v:nft.Selleraddress},
    //   {t: 'address', v:address},
    //   {t: 'address', v: nft.Blockchain=="Ethereum"?process.env.REACT_APP_TOKEN_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_WBNB_TOKEN_ADDRESS:process.env.REACT_APP_WMATIC_TOKEN_ADDRESS},
    //   {t: 'address', v:nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_CONTRACT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS:process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS},
    //   {t: 'uint256', v:amount},
    //   {t: 'uint256', v:nft.tokenId},
    //   {t: 'uint256', v:1},
    //   {t: 'uint256', v: nonce});
    //   let sig1 = await web3.eth.accounts.sign(signMsgHash,nft.Blockchain=="Ethereum"?process.env.REACT_APP_SIGNER_PRIVATEKEY:process.env.REACT_APP_SIGNER_TEMPKEY);
    //   const signature = [sig1.v, sig1.r, sig1.s, nonce];
    //   console.log(signature)
    //   //alert(signature)
    // const res = await market.methods.excuteOrder(order, signature).send({from: address});
    let signaturehash=await axios.post(process.env.REACT_APP_API_URL.toString()+"/getsignature",
                  {
                              "seller": nft.Selleraddress,
                              "buyer":address,
                              "nftAddress": nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_CONTRACT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS:process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS,
                              "inEth": false,
                              "_orderType":0 ,
                              "amount": amount,
                              "tokenId": nft.tokenId,
                              "qty": nft.Copies,
                              "timestamp": nonce,
                              "Blockchain":nft.Blockchain
                  })
    var sighash = signaturehash.data.result
    var signtuple=[nft.Selleraddress,address,nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_CONTRACT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS:process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS,false,amount,nft.tokenId,nft.Copies,nonce,sighash]
    console.log("signtuple",signtuple);
    //console.log("BNB_market",BNB_market);
    const res = nft.Blockchain=="Ethereum"?await market.methods.executeOrder(signtuple).send({from: address})
                :blockchain=="BSC SmartChain"?await BNB_market.methods.executeOrder(signtuple).send({from: address})
                :await MATIC_market.methods.executeOrder(signtuple).send({from: address});
    if(res.status)
    {  
    let nftdata=NftResult
    nftdata.pinataContent.Status='Buy'
    nftdata.pinataContent.Selleraddress=address
    console.log(nftdata);
    const s3 = new AWS.S3({
      accessKeyId: 'AKIAQMYT3V5MLRXZJTI2', // replace with your access key
      secretAccessKey: '4fv1xAlOmHUcPuDTBI15KOCReJ/c/viB2f+gt9xA', // replace with your secret   key
    });
    const s3Bucket = 'indigenanft'; // replace with your bucket name
    const objectName = tokenId.toString()+'.json'; // File name which you want to put in s3 bucket
    const objectData = JSON.stringify(nftdata); // file data you want to put
    const objectType = 'application/json';
    const params = {
      Bucket: s3Bucket,
      Key: objectName,
      Body: objectData,
      ContentType: objectType,
    };
    const result1 =await s3.putObject(params).promise();
    let result=await axios.put(process.env.REACT_APP_API_URL.toString()+"/updatenftprice",{tokenId:tokenId,price:bitdata[index].Price.toString(),status:"Buy"})
          if(result.status)
          {
            alert("You are the owner of this nft")
            history('/user-profile');
          }
          else{
            alert("Something Went wrong")
          }
    }
  }

    else
    {
          alert("Not enough balance")
    }
    
      });

    }
    catch(e)
    {
      setloading(false)
    }

  }
  const buynfthandle=async()=>{
    
    if(wallet.connected)
    {
      
      
        if(blockchain=='Ethereum')
        {
          if(window.ethereum && window.ethereum.networkVersion !== '4') {
            await addNetwork(4);
            setbuymodal(true);
          }
          else{
            setbuymodal(true);
          }
            
        }
        else if(blockchain=='BSC SmartChain')
        {
          if(window.ethereum && window.ethereum.networkVersion !== '97') {
           await addNetwork(97);
           //window.location.reload(false);
         //  connectWallet();
           setbuymodal(true);
           
          }
          else{
            setbuymodal(true);
          }
          
        }
        else{
          if(window.ethereum && window.ethereum.networkVersion !== '80001') {
            await addNetwork(80001);
            connectWallet();
            setbuymodal(true);
            //window.location.reload(false);
          }
          else{
            setbuymodal(true);
            
          }
        }
      
    }
    else{
      alert("Please connect the wallet");
      setloading(false);
    }
  }
  const claimnfthandle=async()=>{
    
    if(wallet.connected)
    {
      
      
        if(blockchain=='Ethereum')
        {
          if(window.ethereum && window.ethereum.networkVersion !== '4') {
            await addNetwork(4);
            
          }
          
            
        }
        else if(blockchain=='BSC SmartChain')
        {
          if(window.ethereum && window.ethereum.networkVersion !== '97') {
           await addNetwork(97);
           
          
          
        }
      }
        else{
          if(window.ethereum && window.ethereum.networkVersion !== '80001') {
            await addNetwork(80001);
            
          }
          
        }
      
    }
    else{
      alert("Please connect the wallet");
      setloading(false);
    }
  }
  const proprtieshandle=(value,value1)=>
  {
     history("/marketplace?character="+value+"&name="+value1+"")
  }
  const errorDiv = () => {
    return (
        <p>Wallet Disconnected!</p>
    )
  }
  const logoutclicked=()=>{
        const { web3Modal } = wallet;
        web3Modal.clearCachedProvider();
        dispatch(connectFailed(errorDiv()));
        history('/');
  }

  const MakeOfferaccept=async(i,id,buyeraddress,Price)=>
  {
    setloadingindex(i)
    setloading(true)
    try{
    await claimnfthandle();
    let url=decodeURIComponent(window.location.href)
    url=url.split('/')
    let tokenId=url[url.length-1];
   
    const tokenInstance = new web3.eth.Contract(tokenAbi, nft.Blockchain=="Ethereum"?process.env.REACT_APP_TOKEN_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_WBNB_TOKEN_ADDRESS:process.env.REACT_APP_WMATIC_TOKEN_ADDRESS);
    const allowance =await tokenInstance.methods.allowance(buyeraddress,nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC).call();
    const amount = web3.utils.toWei(Price.toString(), 'ether');
    if(web3.utils.fromWei(allowance) < parseFloat(Price.toString())) {
      try{
      const approveRes = await tokenInstance.methods.approve(nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC, '9999999999999999999').send({from: address});
      console.log(approveRes);  
    }
      catch(e){
        setloading(false);
      }  
     
    }
    const walletBalance=tokenInstance.methods.balanceOf(buyeraddress).call().then(async(result)=>
    {
      var amt1 = await web3.utils.fromWei(result.toString(),'ether')
      var amt2 =await web3.utils.fromWei(amount.toString(),'ether')
      if(parseFloat(amt1)>parseFloat(amt2))

      {
     
    const nonce = Date.now();
    nft.Copies=1;
    let signaturehash=await axios.post(process.env.REACT_APP_API_URL.toString()+"/getsignature",
                  {
                              "seller": nft.Selleraddress,
                              "buyer":buyeraddress,
                              "nftAddress": nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_CONTRACT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS:process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS,
                              "inEth": false,
                              "_orderType":0 ,
                              "amount": amount,
                              "tokenId": nft.tokenId,
                              "qty": nft.Copies,
                              "timestamp": nonce,
                              "Blockchain":nft.Blockchain
                  })
    var sighash = signaturehash.data.result
    var signtuple=[nft.Selleraddress,buyeraddress,nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_CONTRACT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS:process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS,false,amount,nft.tokenId,nft.Copies,nonce,sighash]
    console.log("signtuple",signtuple);
    try{
    const res = nft.Blockchain=="Ethereum"?await market.methods.executeOrder(signtuple).send({from: address})
                :blockchain=="BSC SmartChain"?await BNB_market.methods.executeOrder(signtuple).send({from: address})
                :await MATIC_market.methods.executeOrder(signtuple).send({from: address});
            
    if(res.status)
    {  
    let nftdata=NftResult
    nftdata.pinataContent.Selleraddress=buyeraddress;
    console.log(nftdata);
    const s3 = new AWS.S3({
      accessKeyId: 'AKIAQMYT3V5MLRXZJTI2', // replace with your access key
      secretAccessKey: '4fv1xAlOmHUcPuDTBI15KOCReJ/c/viB2f+gt9xA', // replace with your secret   key
    });
    const s3Bucket = 'indigenanft'; // replace with your bucket name
    const objectName = tokenId.toString()+'.json'; // File name which you want to put in s3 bucket
    const objectData = JSON.stringify(nftdata); // file data you want to put
    const objectType = 'application/json';
    const params = {
      Bucket: s3Bucket,
      Key: objectName,
      Body: objectData,
      ContentType: objectType,
    };
    const result1 =await s3.putObject(params).promise();
    let result=await axios.put(process.env.REACT_APP_API_URL.toString()+"/updatenftprice",{tokenId:tokenId,price:Price.toString(),status:"Buy"})
          if(result.status)
          {
            
            //history('/user-profile');
            let tokensresult=await axios.put(process.env.REACT_APP_API_URL.toString()+"/updateOffer",{WalletAddress:buyeraddress,_id:id,tokenId:tokenId,status:"Accepted"});
            if(tokensresult.data.status)
            {
                setloading(false);
                alert("Ownership Transffered");
                getOffer(tokenId);
                getsaleshistory();
            }
             else{
              alert("Something went wrong");
              setloading(false);
            }
          }
          else{
            setloading(false);
            alert("Something Went wrong")
          }
     }
    }
    catch(e)
    {
      setloading(false);
    }   
  }

    else
    {
          alert("Not enough balance");
          setloading(false);
    }
    
      });
    }
    catch(e)
    {
      
      setloading(false)
    }
  }
  return (
    <div className="menuBoard_page">
      <div className="container-fluid">
        <div className=" row row1">
          <div className="col-lg-1 col-2">
           <img src={Logout} onClick={()=>logoutclicked()}/>
          </div>
          <div className="col-lg-8 col-4"></div>
          <div className="col-lg-3 col-6 menu_btn_grp">
          {/* {AdminStatus?<div className="edit_btn_div">
              <button className="edit_btn">Edit</button>
            </div> :""} */}
            {AdminStatus?<div className="list_btn_div">
              <button className="list_btn" onClick={()=>setRemovemodal(true)}>Remove</button>
            </div>:""}
            {AdminStatus?<div className="list_btn_div">
              <button className="list_btn" onClick={()=>setBlockModal(true)}>Block</button>
            </div>:""}
          </div> 
        </div>
        <div className="row row2">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-1 "></div>
              <div className="col-lg-4 col-12 pcNFTContainer" >
                <div className="menuNFTConainer">
                  <img  src={nft.ImageUrl} />
                </div>
              </div>
              <div className="col-lg-5 col-12">
                  <div className="row nftTitleHeadingContainer detailsRow" >
                    <div className="heading">
                    <h3 className="NFTHeading">{nft.Name}</h3>
                    </div>
                    <div className="ratings">
                      <span  style={{cursor:"pointer"}} onClick={()=>{localStorage.setItem("collectionname",nft.Collection);
  history(`/UserCollection/${nft.Collection}`);}}>{"Owned by"+nft.Collection}</span>
                      <span><VisibilityIcon />{Viewscount?parseInt(Viewscount)+1:"0"}</span>
                      <div className="ratingsIcon">
                      
                      {alreadyLiked?<span><i class="bi bi-suit-heart-fill"></i>{favouritescount+" Favourites"}</span>:<span><i  class="bi bi-suit-heart" onClick={()=>addFavourites()}></i> {favouritescount+" Favourites"} </span>}
                      {/* <span><StarBorderIcon/></span>
                      <span><StarBorderIcon/></span>
                      <span><StarBorderIcon/></span>
                      <span><StarBorderIcon/></span>
                      <span><StarBorderIcon/></span> */}
        
                      </div>
                    </div>
                  </div>
                  {nft.Unlock&&<div className="row unclockContainer detailsRow" onClick={()=>setunlockcontent(!unlockcontent)}>
                    <div className="col-lg-12 col-12">
                    {(unlockcontent!=true)&& <div><span className="unlockIcon"><LockIcon/></span>
                  <span className="proContentHeading">Includes Unlockable Content</span></div>}
                  {unlockcontent&&<span className="proContentHeading" onClick={()=>setunlockcontent(false)}>{nft.unlockabletext}</span>}
                    </div>
                  </div>}
                  {(nft.Status!=='Fixed price')?<div className="row saleContainer detailsRow">
                    <div className="sale col-12">
                      <span className="saleTitle">{(nft.Status=='Auction')?<MyTimer expiryTimestamp={nft.AuctionEndDate} timeover={timeover} />
                      :<div   style={{textAlign: 'center',marginTop:"-5%"}}>
      <div className="Timer">
        <span>{"Days:"}</span>{0 +"-"}<span>{"Hours:"}</span>{0+"-"}<span>{"Minutes:"}</span>{0+"-"}<span>{"Seconds:"}</span>{0}
      </div>
    </div>}</span>
                      <ColoredLine className='pcLine' color="grey"  />
                      
                    </div>
                   
                      <div className=" container placeBid_btn">
                      {nft.Status=="Auction"?<div >
                          <button  onClick={()=>setmodalshow(true)} disabled={timer} >Place Bid</button>
                        </div>:<div > 
                          <button className="makeOffer_btn" onClick={()=>setofferModel(true) } disabled={MakeOfferDisable}>Make Offer</button>
                        </div>}
                        {/* {nft.Status!=='Fixed price'? <div >
                          <button className="makeOffer_btn" disabled={timer}>Make Offer</button>
                        </div>:" "}
                        {nft.Status=='Fixed price'?<div > 
                          <button className="makeOffer_btn" onClick={()=>buynfthandle()}>Buy</button>
                        </div>:" "} */}
                      </div>
                  </div>: " "}
       
    
                  {nft.Status =='Fixed price'?
                  <div className="row"> 
                  <div className="col-7 NFTPRiceContainer">
                    <span className="fixedcurrentPrice">Current Price  <span className="fixedNFTPrice">{nft.Blockchain?getdollar(nft.Blockchain)+" $":"" }</span></span>
                  </div>
                  <div className="col-3 NFTPRiceContainer">
                  <span className="fixedcurrentPrice">Royalties  <span className="fixedNFTPrice">{nft.Royality?nft.Royality:"10"}</span></span>
                  </div>
                 
                  <div className=" col-2 mt-4 placeBid_btn">
                    <button className="makeOffer_btn"  onClick={()=>buynfthandle()}>Buy</button>
                  </div>
                  </div>
                  :
                  <div className="row NFTPRiceContainer">
                    <div className="col-8">
                    <span className="currentPrice" >Current Price  <span className="NFTPrice">{nft.Blockchain?getdollar(nft.Blockchain)+" $":"" }</span></span>
                    </div>
                    <div className="col-4">
                    <span className="currentPrice">Royalties  <span className=" NFTPrice">{nft.Royality?nft.Royality:"10"}</span></span>
                    </div>
                  
                  </div>
                  } 
                  
              </div>
              <div className="col-lg-2"></div>
            </div>
          </div>
        </div>
        {nft.Status=='Auction'? <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-9">
          
              <div class="card mb-2 mt-3 menuBoard_card">
                          <div class="card-header bg-light">
                            <div className="row">
                            <div className="col-2 col-lg-1 menuIcon">
                            <HistoryIcon/>
                            </div>
                            <div className="col-8 col-lg-10 menuText"> <span className="card_title">Bid Activity</span></div>
                            <div className="col-2 col-lg-1 menuDownIcon">

                            <img src={dropDownIcon} />
                            </div>
                            </div>
                          </div>
                          <div class="card-body bid-card-body">
                              <div className="row biddata">
                                  <div className="col-6 col-lg-6 col-sm-6">
                                      <h4>Wallet Address</h4>
                                  </div>
                                  <div className="col-3 col-lg-3 col-sm-3">
                                      <h4>Price</h4>
                                  </div>
                                  <div className="col-3 col-lg-3 col-sm-3">
                                      
                                  </div>
                                  
                              </div>
                              {
                                timer?tempdata.map((data,i)=>{
                                  
                                  let url="https://rinkeby.etherscan.io/address/"+data.WalletAddress.toString()
                                  return(
                                    <div className="row biddata">
                                  <div className="col-6 col-lg-6 col-sm-6" style={{color:"blue"}}>
                                     <a href={url} ><span> {data.WalletAddress?data.WalletAddress.slice(0,4)+"...."+data.WalletAddress.slice(data.WalletAddress.length-4,data.WalletAddress.length):""}</span></a>
                                  </div>
                                  <div className="col-3 col-lg-3 col-sm-3">
                                      <p>{data.Price}</p>
                                  </div>
                                  <div className="col-3 col-lg-3 col-sm-3">
                                     { (timer&&i==0&&(address.toString().toLowerCase()==data.WalletAddress.toLowerCase()))? <button className="claim_btn" onClick={()=>clickClaimButton(i,data.WalletAddress)}>{loading?<div className='loading-buy'></div>:"Claim"}</button>:""}
                                  </div>
                              </div>
                                  )
                                  

                                }):
                                bitdata.map((data,i)=>{
                                  
                                  let url="https://rinkeby.etherscan.io/address/"+data.WalletAddress.toString()
                                  return(
                                    <div className="row biddata">
                                  <div className="col-6 col-lg-6 col-sm-6" style={{color:"blue"}}>
                                     <a href={url} ><span> {data.WalletAddress?data.WalletAddress.slice(0,4)+"...."+data.WalletAddress.slice(data.WalletAddress.length-4,data.WalletAddress.length):""}</span></a>
                                  </div>
                                  <div className="col-3 col-lg-3 col-sm-3">
                                      <p>{data.Price}</p>
                                  </div>
                                  {/* <div className="col-3 col-lg-3 col-sm-3">
                                     { (timer&&i==0&&(address.toString().toLowerCase()==data.WalletAddress.toLowerCase()))? <button className="claim_btn" onClick={()=>clickClaimButton(data.WalletAddress)}>Claim</button>:""}
                                  </div> */}
                              </div>
                                  )
                                  

                                })
                              }
                             
                   
                          </div>
                        </div>
          </div>
          <div className="col-lg-2"></div>
        
        </div>:" "}
        <div className="row row3">
          <div className="col-lg-1"></div>
          <div className="col-lg-4 menuBoardFilterContainer">
            {/* <MenuBoardDropDown/> */}
            {/* <Accordion nft={nft}  /> */}
            <div>
        <div class="accordion accordion-flush MenuboardAccordion" id="accordionFlushExample">
  <div class="accordion-item MenuboardAccordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed first" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        <div className='row'>
        <div className="col-2 icon">
          <InsertDriveFileIcon/>
          </div>
          <div className="col-8 text">
              Description
          </div>
         
        </div>
      </button> 
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body MenuboardAccordion_body">{nft.Description}</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingTwo">
      <button class="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
      <div className='row'>
        <div className="col-2 icon">
          <FormatListBulletedIcon/>
          </div>
          <div className="col-8 text">
          Properties
          </div>
         
        </div>
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
        <div className="row">
       {properties.map((data,i)=>{
         return(
           
          <div className='col-4 col-md-4 col-lg-4'>
          <div className='nftContainer'>
             
              <div className='esyMuQ' onClick={()=>proprtieshandle(data.trait_type,data.value)}>
                <span style={{fontSize:"16px"}} >{data.trait_type}</span><br></br>
                <span style={{fontSize:"12px",color:"blue"}} >{data.value}</span>
              </div>
          </div>
          </div>
         )
       })}
       </div>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
      <div className='row'>
        <div className="col-2 icon">
          <GridViewIcon/>
          </div>
          <div className="col-8 text">
          NFT Type
          </div>
        </div>
      </button>
    </h2>
    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">{nft.Type?nft.Type:"Image"}</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingFour">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
      <div className='row'>
        <div className="col-2 icon">
          <ShowChartIcon/>
          </div>
          <div className="col-8 text">
          About Creator
          </div>
         
        </div>
      </button>
    </h2>
    <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
      {/* <a href={"https://rinkeby.etherscan.io/address/"+nft.Selleraddress}>{nft.Selleraddress}</a> */}
      <div className="row">
           <div className="row">
              <div className="col-6">
              Wallet Address
              </div>
              <div className="col-6">
              {creatordetails.WalletAddress!==undefined?<a href={"https://rinkeby.etherscan.io/address/"+creatordetails.WalletAddress}>{creatordetails.WalletAddress.slice(0,4)+creatordetails.WalletAddress.slice(creatordetails.WalletAddress.length-15,creatordetails.WalletAddress.length)}</a>:" "}
              </div>
           </div>
           <div className="row">
              <div className="col-6">
               UserName
              </div>
              <div className="col-6">
              {creatordetails.UserName!==undefined?creatordetails.UserName:"User"}
              </div>
           </div>
           <div className="row">
              <div className="col-6">
               FaceBookURL
              </div>
              <div className="col-6">
              {creatordetails.FaceBook!==undefined?<a href={creatordetails.FaceBook}>{creatordetails.FaceBook.slice(0,4)+creatordetails.FaceBook.slice((creatordetails.FaceBook.length-5))}</a>:" "}
              </div>
           </div>
           <div className="row">
              <div className="col-6">
              TwitterURL
              </div>
              <div className="col-6">
              {creatordetails.Twitter!==undefined?<a href={creatordetails.Twitter}>{creatordetails.Twitter.slice(0,4)+creatordetails.Twitter.slice((creatordetails.Twitter.length-5))}</a>:" "}
              </div>
           </div>
           <div className="row">
              <div className="col-6">
                About
              </div>
              
           </div>
           <div className="row">
              <div className="col-12">
               {creatordetails.UserName!==undefined?creatordetails.About:"NFT User"}
              </div>
              
           </div>
        </div>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingFive">
      <button class="accordion-button collapsed last" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
      <div className='row'>
        <div className="col-2 icon">
          <InsertDriveFileIcon/>
          </div>
          <div className="col-8 text">
              Details
          </div>
         
        </div>
      </button>
    </h2>
    <div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
        <div className="row">
           <div className="row">
              <div className="col-6">
              Contract Address
              </div>
              {nft.Blockchain=="Ethereum"?<div className="col-6">
               {<a href={"https://rinkeby.etherscan.io/address/"+process.env.REACT_APP_NFT_CONTRACT_ADDRESS}>{process.env.REACT_APP_NFT_CONTRACT_ADDRESS.slice(0,4)+process.env.REACT_APP_NFT_CONTRACT_ADDRESS.slice(process.env.REACT_APP_NFT_CONTRACT_ADDRESS.length-15,process.env.REACT_APP_NFT_CONTRACT_ADDRESS.length)}</a>}
              </div>:nft.Blockchain=="Ethereum"?<div className="col-6">
               {<a href={"https://rinkeby.etherscan.io/address/"+process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS}>{process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS.slice(0,4)+process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS.slice(process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS.length-15,process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS.length)}</a>}
              </div>:<div className="col-6">
               {<a href={"https://mumbai.polygonscan.com/address/"+process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS}>{process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS.slice(0,4)+process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS.slice(process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS.length-15,process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS.length)}</a>}
              </div>}
           </div>
           <div className="row">
              <div className="col-6">
               TokenId
              </div>
              <div className="col-6">
              {nft.tokenId}
              </div>
           </div>
           <div className="row">
              <div className="col-6">
              Token Standard
              </div>
              <div className="col-6">
               {"ERC-1155"}
              </div>
           </div>
           <div className="row">
              <div className="col-6">
               Network
              </div>
              <div className="col-6">
               {nft.Blockchain=="Ethereum"?"Rinkeby":nft.Blockchain=="BSC SmartChain"?"BSC SmartChain":"Polygon"}
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
              <div class="card mt-3 menuBoard_card">
                          <div class="card-header bg-light">
                            <div className="row">
                            <div className="col-2 col-lg-1 menuIcon">
                            <ShowChartIcon/>
                            </div>
                            <div className="col-8 col-lg-10 menuText"><span className="card_title">Price History</span></div>
                            <div className="col-2 col-lg-1 menuDownIcon">
                            {/* <KeyboardArrowDownIcon/> */}
                            <img src={dropDownIcon} />
                            </div>
                            </div>
                          </div>
                          <div class="card-body">
                          <ResponsiveContainer width="90%" aspect={3}>
                            
                <LineChart data={pricehistorydata} >
                    <CartesianGrid />
                    <XAxis dataKey="Date" 
                        interval={'preserveStartEnd'} />
                    <YAxis></YAxis>
                    <Legend />
                    <Tooltip />
                   
                    <Line dataKey="Price"
                        stroke="red" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
                          </div>
                        </div>
            </div>
            <div className="Listings_container">
            {/* <div className="priceBox"></div> */}
            <div class="card mt-3 menuBoard_card">
                          <div class="card-header bg-light">
                            <div className="row">
                            <div className="col-2 col-lg-1  menuIcon">
                            <SellIcon/>
                            </div>
                            <div className="col-8 col-lg-10 menuText"><span className="card_title">Listings</span></div>
                            <div className="col-2 col-lg-1 menuDownIcon">
                            {/* <KeyboardArrowDownIcon/> */}
                            <img src={dropDownIcon} />
                            </div>
                            </div>
                          </div>
                         
                          <div class="card-body bid-card-body">
                              <div className="row biddata">
                                  <div className="col-6 col-lg-6 col-sm-6">
                                      <h6>Wallet Address</h6>
                                  </div>
                                  <div className="col-2 col-lg-2 col-sm-2">
                                      <h6>Price</h6>
                                  </div>
                                  <div className="col-4 col-lg-4 col-sm-4">
                                      Status
                                  </div>
                                  
                              </div>
                              {
                               
                               (creatorAddress==address.toString().toLowerCase() &&creatorAddress.length!==0&&creatorAddress.length!=0)? offerdata.map((data,i)=>{
                                  let url="https://rinkeby.etherscan.io/address/"+data.WalletAddress.toString()
                                  console.log("creatorAddress",creatorAddress);
                                  //alert(creatorAddress.length)
                                  
                                  return(
                                    
                                    <div className="row biddata">
                                  <div className="col-6 col-lg-6 col-sm-6" style={{color:"blue"}}>
                                     <a href={url} ><span> {data.WalletAddress.slice(0,4)+"...."+data.WalletAddress.slice(data.WalletAddress.length-4,data.WalletAddress.length)}</span></a>
                                  </div>
                                  <div className="col-2 col-lg-2 col-sm-2">
                                      <p>{data.Price}</p>
                                  </div>
                                  <div className="col-4 col-lg-4 col-sm-4">
                                      {data.Status=="Pending"?<div className="row" style={{justifyContent:"space-between"}}>
                                        <div className="col-6">
                                        <button className="claim_btn" onClick={()=>MakeOfferaccept(i,data._id,data.WalletAddress,data.Price)}>{loading?i==loadingindex?<div className='loading-buy'></div>:"Accept":"Accept"}</button>
                                        </div>
                                        <div className="col-6">
                                        <button className="claim_btn" onClick={()=>offerReject(data._id,data.WalletAddress,data.NftId)}>Reject</button>
                                        </div>
                                      </div>:<span>{data.Status}</span>}
                                  </div>
                              </div>
                                  )
                                  

                                }):
                                offerdata.map((data,i)=>{
                                  
                                  let url="https://rinkeby.etherscan.io/address/"+data.WalletAddress.toString()
                                  return(
                                    <div className="row biddata">
                                  <div className="col-6 col-lg-6 col-sm-6" style={{color:"blue"}}>
                                  <a href={url} ><span> {data.WalletAddress.slice(0,4)+"...."+data.WalletAddress.slice(data.WalletAddress.length-4,data.WalletAddress.length)}</span></a>
                                  </div>
                                  <div className="col-2 col-lg-2 col-sm-2">
                                      <p>{data.Price}</p>
                                  </div>
                                  <div className="col-4 col-lg-4 col-sm-4">
                                      <span>{data.Status}</span>
                                  </div>
                              </div>
                                  )
                                  

                                })
                              }
                             
                   
                          </div>
                          
                        </div>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-9">
          {/* <div className="priceBox"></div> */}
          <div class="card mb-2 mt-3 menuBoard_card">
                          <div class="card-header bg-light">
                            <div className="row">
                            <div className="col-2 col-lg-1 menuIcon">
                            <HistoryIcon/>
                            </div>
                            <div className="col-8 col-lg-10 menuText"> <span className="card_title">Recent Activity</span></div>
                            <div className="col-2 col-lg-1 menuDownIcon">
                            {/* <KeyboardArrowDownIcon/> */}
                            <img src={dropDownIcon} />
                            </div>
                            </div>
                          </div>
                          <div class="card-body bid-card-body">
                          <div className="row biddata">
                                  <div className="col-3 col-lg-3 col-sm-3">
                                      <h6>Type</h6>
                                  </div>
                                  <div className="col-3 col-lg-3 col-sm-3">
                                      <h6>From</h6>
                                  </div>
                                  <div className="col-3 col-lg-3 col-sm-3">
                                      <h6>To</h6>
                                  </div>
                                  <div className="col-3 col-lg-3 col-sm-3">
                                      <h6>Date</h6>
                                  </div>

                                  
                              </div>
                              {
                                historydata.map((data,i)=>{
                                  //let url="https://rinkeby.etherscan.io/address/"+data.WalletAddress.toString()

                                  let date=new Date(data.block_timestamp);
                                  //alert(date.)
                                  return(
                                    <div className="row biddata">
                                  <div className="col-3 col-lg-3 col-sm-3" style={{color:"blue"}}>
                                     {data.from_address=="0x0000000000000000000000000000000000000000"?"Minting":"Sale"}
                                  </div>
                                  <div className="col-3 col-lg-3 col-sm-3">
                                      {data.from_address=="0x0000000000000000000000000000000000000000"?<a href={"https://rinkeby.etherscan.io/address/"+process.env.REACT_APP_NFT_CONTRACT_ADDRESS.toString()}>Null Address</a>:<a href={"https://rinkeby.etherscan.io/address/"+data.from_address}>{data.from_address.slice(0,4)+"...."+data.from_address.slice(data.from_address.length-5,data.from_address.length)}</a>}
                                  </div>
                                  <div className="col-3 col-lg-3 col-sm-3">
                                      {data.to_address==address?<a href={"https://rinkeby.etherscan.io/address/"+data.to_address}>You</a>:<a href={"https://rinkeby.etherscan.io/address/"+data.to_address}>{data.to_address.slice(0,4)+"...."+data.to_address.slice(data.to_address.length-5,data.to_address.length)}</a>}
                                  </div>
                                  <div className="col-3 col-lg-3 col-sm-3">
                                      {date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()+"  ,  "+date.getHours()+":"+date.getMinutes()}
                                  </div>
                              </div>
                                  )
                                  

                                })
                              }
                          </div>
                        </div>
          </div>
          <div className="col-lg-2"></div>
        
        </div>
       
        <Modal show={modalshow} onHide={()=>{setmodalshow(false);setloading(false)}} centered>
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
                value={price}
                onChange={(e)=>setprice(e.target.value)}
              />
          </div>
                   
                              
        </div>
                    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setmodalshow(false);setloading(false)}}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>placebid()}>
          {loading?<div className='loading-place'></div>:"Place Bid"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={offerModel} onHide={()=>{setofferModel(false);setloading(false)}} centered>
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
                value={price}
                onChange={(e)=>setprice(e.target.value)}
              />
          </div>
                   
                              
        </div>
                    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setofferModel(false);setloading(false)}}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>MakeOffer()}>
          {loading?<div className='loading-buy'></div>:"Confirm"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={Removemodal} onHide={()=>{setRemovemodal(false);setloading(false)}} centered>
        <Modal.Header closeButton>
          <Modal.Title>Remove NFT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <p>Are you sure want to remove this?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>RemoveNft()} >
            Yes
          </Button>
          <Button variant="primary" onClick={()=>setRemovemodal(false)} >
          No
          </Button>
        </Modal.Footer>
      </Modal>  
      <Modal show={BlockModal} onHide={()=>{setBlockModal(false);setloading(false)}} centered>
        <Modal.Header closeButton>
          <Modal.Title>Block user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <p>Are you sure want to remove this?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>blockUser()} >
            Yes
          </Button>
          <Button variant="primary" onClick={()=>setBlockModal(false)} >
          No
          </Button>
        </Modal.Footer>
      </Modal>  
       <Modal show={buymodal} onHide={()=>{setbuymodal(false);setloading(false)}} style={{marginTop:"5%"}} centered>
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body scrollable={true} style={{height:"60%"}}>
        <img src="https://static.opensea.io/review-collection.png" style={{height:"5%",width:"20%",marginLeft:"40%"}}></img><br></br>
          <span style={{fontSize:"14px"}}>Review this information to ensure it’s what you want to buy</span><br></br>
        {/* <div className="row esyMuQ">
        <div className="col-md-6 col-6">
          <span>Collection name</span>
          </div>
          <div className="col-md-6 col-6"><span>{nft.Collection}</span></div>
          
        </div>
         <div className="row esyMuQ">
          <div className="col-md-6 col-6">
            <span>CreaterAddress</span> 
          </div>
          <div className="col-md-6 col-6">
          <span style={{color:'blue'}}> {historydata.length>0?<a href={"https://rinkeby.etherscan.io/address/"+historydata[0].to_address.toString()}>{historydata[0].to_address.slice(0,3)+historydata[0].to_address.slice(23)}</a>:" "} </span>
          </div>
          
          
        </div> 
        <div className="row esyMuQ">
        <div className="col-md-6 col-6">
          <span>Sales</span>
          </div>
          <div className="col-md-6 col-6"><span>{historydata.length>0?(historydata.length-1):"0"}</span></div>
          
        </div> 
        <div className="row esyMuQ">
        <div className="col-md-6 col-6">
          <span>Contract address</span>
          </div>
          <div className="col-md-6 col-6"><span><a href={"https://rinkeby.etherscan.io/address/"+process.env.REACT_APP_NFT_CONTRACT_ADDRESS.toString()}>{process.env.REACT_APP_NFT_CONTRACT_ADDRESS.slice(0,3)+process.env.REACT_APP_NFT_CONTRACT_ADDRESS.slice(23)}</a></span></div>
          
        </div>  */}
         {/* <table className="table-Buy">

<tr>
  <td>Collection name</td>
  <td>{nft.Collection}</td>

</tr>
<tr>
  <td>CreaterAddress</td>
  <td> {historydata.length>0?<a href={"https://rinkeby.etherscan.io/address/"+historydata[0].to_address.toString()}>{historydata[0].to_address.slice(0,3)+historydata[0].to_address.slice(23)}</a>:" "} </td>

</tr>
<tr>
  <td>Sales</td>
  <td>{historydata.length>0?(historydata.length-1):"0"}</td>

</tr>
<tr>
  <td>Contract address</td>
  <td><a href={"https://rinkeby.etherscan.io/address/"+process.env.REACT_APP_NFT_CONTRACT_ADDRESS.toString()}>{process.env.REACT_APP_NFT_CONTRACT_ADDRESS.slice(0,3)+process.env.REACT_APP_NFT_CONTRACT_ADDRESS.slice(23)}</a></td>
 
</tr>
</table> */}

<ul className="table-Buy mt-3">
  <li>
  <div className="row">
        <div className="col-md-6 col-6">
          <span>Collection name</span>
          </div>
          <div className="col-md-6 col-6"><span>{nft.Collection}</span></div>
          
  </div>
 
  </li>
  <li>
  <div className="row">
          <div className="col-md-6 col-6">
            <span>CreaterAddress</span> 
          </div>
          <div className="col-md-6 col-6">
          <span style={{color:'blue'}}> {historydata.length>0?<a href={"https://rinkeby.etherscan.io/address/"+historydata[0].to_address.toString()}>{historydata[0].to_address.slice(0,3)+historydata[0].to_address.slice(23)}</a>:" "} </span>
          </div>
          
          
  </div> 
  </li>
  <li>
  <div className="row">
        <div className="col-md-6 col-6">
          <span>Sales</span>
          </div>
          <div className="col-md-6 col-6"><span>{historydata.length>0?(historydata.length-1):"0"}</span></div>
          
        </div> 
  </li>
 <div className="row">
        <div className="col-md-6 col-6">
          <span>Contract address</span>
          </div>
          <div className="col-md-6 col-6"><span><a href={"https://rinkeby.etherscan.io/address/"+process.env.REACT_APP_NFT_CONTRACT_ADDRESS.toString()}>{process.env.REACT_APP_NFT_CONTRACT_ADDRESS.slice(0,3)+process.env.REACT_APP_NFT_CONTRACT_ADDRESS.slice(23)}</a></span></div>
          
        </div>
</ul>
        <div className="row">
          <div className="col-1">
          <input type="checkbox" style={{height:"16px",width:"16px"}} onClick={(e)=>e.target.checked==true?setBuybuttonenable(false):setBuybuttonenable(true)}></input> </div>
          <div className="col-11"><p>I understand that Indegena  has not reviewed this collection and blockchain transactions are irreversible.</p></div>
         
        </div>
       
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setbuymodal(false);;setloading(false)}}>
            Cancel
          </Button>
          <Button variant="secondary" disabled={Buybuttonenable} onClick={()=>buyNft()}>
          {loading?<div className='loading-buy'></div>:"Buy"}
          </Button>
        </Modal.Footer>
      </Modal> 
      </div>
     
    </div>
  );
}

export default MenuBoard;
