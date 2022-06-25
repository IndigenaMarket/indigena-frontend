import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { connectWallet, connectFailed ,addNetwork } from "../../redux/WalletAction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import './Auction.css'
import nftAbi from '../../contracts/nft.json';
import nftBNB from '../../contracts/nftBNB.json'
import nftMatic from '../../contracts/nftMatic.json'
const AWS = require('aws-sdk');
function Auction() {
  const history = useNavigate ();
  const [tokenid,settokenId] = useState("");
  const [nft,setnft] = useState("");
  const [NftResult,setNftResult]=useState({});
  const[Price,setPrice]=useState('');
  const[Duration,setDuration]=useState('')
  const[loading,setloading]=useState(false);
  const[blockchain,setblockchain]=useState('');
  const dispatch = useDispatch();
  const wallet = useSelector(state => state.WalletConnect);
  
    
  console.log(wallet);
  const {web3, address, market} = wallet;
  useEffect(async() => {     
    let url=decodeURIComponent(window.location.href)
    url=url.split('/')
    let tokenid=url[url.length-1]
    let nftresult=await axios.get("https:/indigenanft.s3.amazonaws.com/"+tokenid+".json")
    setNftResult(nftresult);
    console.log(nftresult.data.pinataContent)
    setnft(nftresult.data.pinataContent);
    settokenId(tokenid);
    setblockchain(nftresult.data.pinataContent.Blockchain);
    //alert(nftresult.data.pinataContent.Blockchain)
    
    if(nftresult.data.pinataContent.Blockchain=='Ethereum')
    {
      if(window.ethereum && window.ethereum.networkVersion !== '4') {
            await addNetwork(4);
            
        }
 
    }
    else if(nftresult.data.pinataContent.Blockchain=='BSC SmartChain')
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
      
         
 }, [])
    
    const handleSelection = (e) => {
        const checked = e.target.checked;

        if (checked) {
            console.log('checked')

        } 
        else {
            console.log('Not checked')
        }
    }
    const getApproval=async ()=>
    {
      if(address){
      setloading(true)
      NftResult.data.pinataContent.Price=Price;
     
      // var enddate=Duration;    for live

      // below for testing purpose

      let current_time=new Date();
      let minutes=10;
      var enddate=new Date(current_time.getTime() + minutes*30000);
      //ending testing purpose date
      if(Price)
      {
        NftResult.data.pinataContent.AuctionEndDate=enddate;
        NftResult.data.pinataContent.Status='Auction';
        NftResult.data.pinataContent.Auctionstartprice=Price;
      }
      console.log(NftResult.data)
      const s3 = new AWS.S3({
         accessKeyId: 'AKIAQMYT3V5MLRXZJTI2', // replace with your access key
         secretAccessKey: '4fv1xAlOmHUcPuDTBI15KOCReJ/c/viB2f+gt9xA', // replace with your secret   key
       });
       const s3Bucket = 'indigenanft'; // replace with your bucket name
       const objectName = tokenid.toString()+'.json'; // File name which you want to put in s3 bucket
       const objectData = JSON.stringify(NftResult.data); // file data you want to put
       const objectType = 'application/json';
       const params = {
         Bucket: s3Bucket,
         Key: objectName,
         Body: objectData,
         ContentType: objectType,
       };
       
      try{
       const nftInstance = new web3.eth.Contract(blockchain=="Ethereum"?nftAbi:blockchain=="BSC SmartChain"?nftBNB:nftMatic,blockchain=="Ethereum"?process.env.REACT_APP_NFT_CONTRACT_ADDRESS:blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS:process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS);
       const nftApproveRes = await nftInstance.methods.setApprovalForAll(blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC
       , true).send({from: address});
       console.log("nftApproveRes",nftApproveRes);
     
       if(nftApproveRes.status)
       {
        const result1 =await s3.putObject(params).promise();
        console.log("result",result1)
         let result=await axios.put(process.env.REACT_APP_API_URL.toString()+"/updatenftprice",{tokenId:tokenid,price:Price,status:"Auction",enddate:enddate})
         if(result.status)
         {
           alert("Updated Succesfully")
           history('/collections')
         }
         else{
           alert("Something Went wrong")
         }
        
       }
       setloading(false)
      }
      catch(e)
      {
        setloading(false)
      }
      }
      else{
        alert("Please connect wallet")
      }
    }
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
    
    //         break;
    //       case 4:
    //         networkData = [
    //           {
    //             chainId: '0x4'
    //           }
    //         ]
    //         break;
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
      
    //       break;    
    //     default:
    //       break;
    //   }
    
    //   console.log(networkData)
    //   if(id!=4)
    //   {
    //     return window.ethereum.request({
  
    //       method: "wallet_addEthereumChain",
          
    //       params: networkData,
          
    //       });
          
    //   }
    //   else
    //   {
        
    //     return window.ethereum.request({
  
    //       method: "wallet_switchEthereumChain",
          
    //       params: networkData,
          
    //       });
    //   }
      
    // }
  return (
    <div className=' container-fluid Auction_page'>
<div className='row'>
    <div className="col-lg-4"></div>
    <div className="col-lg-4">
        <form>
        <div className="row">
            <div className="col-lg-12 input_label"> 
                <span >Method</span>
            </div>
        </div>
        <div className='row'>
        <div className='col-lg-12'>
        <div class="form-group">
                                  
                                  <select
                                    class="form-control form-select"
                                    id="exampleFormControlSelect1"
                                    disabled={true}
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
                <span >Price</span>
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
                                  </select>
                                  */}
                                  <input
                                type="text"
                                class="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Price"
                                onChange={(e)=>setPrice(e.target.value)}
                              />
                                </div> 
                                
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12 input_label">
                <span >Duration</span>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
            <div class="form-group">
                                  
                                  {/* <select
                                    class="form-control form-select"
                                    id="exampleFormControlSelect1"
                                    onChange={(e)=>setDuration(e.target.value)}
                                  >
                                    <option value={7}>7 days</option>
                                    <option value={14}>14 days</option>
                                    <option value={21}>21 days</option>
                                  </select> */}
                                  <DatePicker selected={Duration} onChange={(date) => setDuration(date)} />
                                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-10 input_label">
                <span className='reservePriceHeading' >Include Reserve Price</span>
            </div>
            <div className="col-lg-2">

<div class="form-check form-switch">
                                                  <input
                              class="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="flexSwitchCheckDefault"
                              onClick={(e)=>handleSelection(e)}
                            />
</div>
            </div>
        </div>
        </form>
        <button className='ListItem_btn' onClick={()=>getApproval()}>{loading?<div className='loading'></div>:"List for sale"}</button>
    </div>
    <div className="col-lg-4"></div>
</div>
    </div>
  )
}

export default Auction