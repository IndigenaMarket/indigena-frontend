import React,{useState,useEffect} from 'react';
import './FixedPrice.css'
import { connectWallet, connectFailed ,addNetwork } from "../../redux/WalletAction";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import nftAbi from '../../contracts/nft.json'
import nftBNB from '../../contracts/nftBNB.json'
import nftMatic from '../../contracts/nftMatic.json'
import axios from 'axios';
const AWS = require('aws-sdk');


function FixedPrice() {
  const history = useNavigate ();
  const wallet = useSelector(state => state.WalletConnect);
  console.log(wallet);
  const {web3, address, market} = wallet;
  const [code,setCode] = useState("")
  const [nft,setnft] = useState("")
  const [Price,setPrice] = useState("")
  const [NftResult,setNftResult]=useState({})
  const[tokenId,settokenId]=useState('')
  const[loading,setloading]=useState(false)
  const[blockchain,setblockchain]=useState('')
  useEffect(async() => {     
    
    
    let url=decodeURIComponent(window.location.href)
 
    url=url.split('/')
    
    let tokenid=url[url.length-1]
    
    let nftresult=await axios.get("https:/indigenanft.s3.amazonaws.com/"+tokenid+".json")
    //alert(nftresult);
    setNftResult(nftresult);
    setnft(nftresult.data.pinataContent);
    settokenId(tokenid);
    setblockchain(nftresult.data.Blockchain);
    
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
           //window.location.reload(false);
          }
          
          
        }
    else{
          if(window.ethereum && window.ethereum.networkVersion !== '80001') {
            await addNetwork(80001);
            //window.location.reload(false);
          }
        }
      

 }, [web3])


    const handleSelection = (e) => {
        const checked = e.target.checked;

        if (checked) {
            console.log('checked')
        } 
        else {
            console.log('Not checked')
        }
    }
    const onchangeprice=(price)=>
    {
       setPrice(price)
    }
    //alert(nft.contractAddress)
    const getApproval=async ()=>
    {
      setloading(true)
      
       //alert(nft.Blockchain);
       //alert(process.env.REACT_APP_NFT_CONTRACT_ADDRESS);
       try{
       const nftInstance = new web3.eth.Contract(nft.Blockchain=="Ethereum"?nftAbi:nft.Blockchain=="BSC SmartChain"?nftBNB:nftMatic,nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_CONTRACT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS:process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS);
       const nftApproveRes = await nftInstance.methods.setApprovalForAll(nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC
, true).send({from: address});
       console.log("nftApproveRes",nftApproveRes);
     
       if(nftApproveRes.status)
       {
        NftResult.data.pinataContent.Price=Price;
        if(Price)
        {
          NftResult.data.pinataContent.Status="Fixed price";
        }
        console.log(NftResult.data)
        const s3 = new AWS.S3({
           accessKeyId: 'AKIAQMYT3V5MLRXZJTI2', 
           secretAccessKey: '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', 
         });
         const s3Bucket = 'indigenanft'; 
         const objectName = tokenId.toString()+'.json'; 
         const objectData = JSON.stringify(NftResult.data); 
         const objectType = 'application/json';
         const params = {
           Bucket: s3Bucket,
           Key: objectName,
           Body: objectData,
           ContentType: objectType,
         };
         const result1 =await s3.putObject(params).promise();
         let result=await axios.put(process.env.REACT_APP_API_URL.toString()+"/updatenftprice",{tokenId:tokenId,price:Price,status:"Fixedprice"})
         if(result.status)
         {
           alert("Price Added Succesfully")
           history('/collections')
         }
         else{
           alert("Something Went wrong")
         }
        
       }
       setloading(false) }
       catch(e)
       {
         setloading(false)
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
    //   {
    //     return window.ethereum.request({
  
    //       method: "wallet_addEthereumChain",
          
    //       params: networkData,
          
    //       });
    //       //dispatch(connectWallet());
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
    <div className=' container-fluid FixedPrice_page'>
<div className='row'>
    <div className="col-lg-4"></div>
    <div className="col-lg-4">
        <form>
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
                                disabled={true}
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
                                type="text"
                                class="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Price"
                                onChange={(e)=>onchangeprice(e.target.value)}
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
                              id="flexSwitchCheckDefa ult"
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

export default FixedPrice