import React,{useState,useEffect} from 'react';
import ListItem from './ListItem';
import "./SettledNftList.css";
import TopCollectionsListData from '../SampleData/TopCollectionsList';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet, connectFailed ,addNetwork } from "../../redux/WalletAction";
import tokenAbi from'../../contracts/token.json'
import tokenBNBAbi from'../../contracts/Wbnb.json'
import tokenMaticAbi from'../../contracts/Wmatic.json'
const AWS = require('aws-sdk');
function SettledNftList() {
  const[nftdata,setnftdata]=useState([]);
  const wallet = useSelector((state) => state.WalletConnect);
  const {web3, address, market,BNB_market,MATIC_market} = wallet;
  const[loading,setloading]=useState(false);
  const[selectedid,setSelectedid]=useState('')
  const history = useNavigate ();
  const getNftData = async() => {
    let tokensresult=await axios.get(process.env.REACT_APP_API_URL.toString()+"/ExipredNft");
    setnftdata(tokensresult.data.result);
  }
  useEffect(() => {
  getNftData();
  }, []);

  const settledNftHandle=async(nft)=>{
    console.log("nft nft nftnft nftnft nftnft",nft);
    setSelectedid(nft.NftId);
    setloading(true);
    let tokenId=encodeURIComponent(nft.NftId);
    
     let bitdata = await axios.post(process.env.REACT_APP_API_URL.toString()+"/maxbid",{TokenId:tokenId});
     console.log(bitdata);
     console.log("tokenAbi",tokenAbi);
     if(bitdata.data.result.length>0)
     {
        await claimnfthandle(nft.Blockchain);
        if(web3!=null) {
        const tokenInstance = new web3.eth.Contract(nft.Blockchain=="Ethereum"?tokenAbi:nft.Blockchain=="BSC SmartChain"?tokenBNBAbi:tokenMaticAbi,nft.Blockchain=="Ethereum"?process.env.REACT_APP_TOKEN_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_WBNB_TOKEN_ADDRESS:process.env.REACT_APP_WMATIC_TOKEN_ADDRESS);
        var status=false;
        bitdata.data.result.map(async(data,i)=>{
          
        const Balance = await tokenInstance.methods.balanceOf(data.WalletAddress).call();
        const price= await web3.utils.toWei(data.Price.$numberDecimal.toString(), 'ether');
        
        if(Balance>price)
        {
          if(!status)
          {
            status=true;
           
            clickClaimButton(nft.Blockchain,nft.NftId,bitdata.data.result[i].WalletAddress,bitdata.data.result[i].Price.$numberDecimal)
          }
        }
    })
  }
     }
     else{
       alert("Nobody bidded for this nft");
       let tokenId=decodeURIComponent(nft.NftId);
       let result=await axios.put(process.env.REACT_APP_API_URL.toString()+"/updatenftprice",{tokenId:tokenId,status:"Auction Expired"})
        if(result.status)
        {
            getNftData();
        } 
     }
  }

  
  const clickClaimButton=async (blockchain,tokenId,address1,Price)=>
  {
    
    try{
    let nftresult=await axios.get("https:/indigenanft.s3.amazonaws.com/"+tokenId+".json")
    let nft=nftresult.data.pinataContent;
    const tokenInstance = new web3.eth.Contract(tokenAbi, nft.Blockchain=="Ethereum"?process.env.REACT_APP_TOKEN_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_WBNB_TOKEN_ADDRESS:process.env.REACT_APP_WMATIC_TOKEN_ADDRESS);
    const allowance =await tokenInstance.methods.allowance(address1,nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC).call();
    const amount = web3.utils.toWei(Price.toString(), 'ether');
    if(web3.utils.fromWei(allowance) < parseFloat(Price.toString())) {
      const approveRes = await tokenInstance.methods.approve(nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC, '9999999999999999999').send({from: address});
      console.log(approveRes);
    }
    const walletBalance=tokenInstance.methods.balanceOf(address1).call().then(async(result)=>
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
                              "buyer":address1,
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
    var signtuple=[nft.Selleraddress,address1,nft.Blockchain=="Ethereum"?process.env.REACT_APP_NFT_CONTRACT_ADDRESS:nft.Blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS:process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS,false,amount,nft.tokenId,nft.Copies,nonce,sighash]
    console.log("signtuple",signtuple);
    //console.log("BNB_market",BNB_market);
    alert(JSON.stringify(address1));
    const res = nft.Blockchain=="Ethereum"?await market.methods.executeOrder(signtuple).send({from: address})
                :blockchain=="BSC SmartChain"?await BNB_market.methods.executeOrder(signtuple).send({from: address})
                :await MATIC_market.methods.executeOrder(signtuple).send({from: address});
    if(res.status)
    {  
    let nftdata=nftresult.data
    nftdata.pinataContent.Status='Buy'
    nftdata.pinataContent.Selleraddress=address1
    //console.log(nftdata);
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
    let result=await axios.put(process.env.REACT_APP_API_URL.toString()+"/updatenftprice",{tokenId:tokenId,price:Price,status:"Buy"})
          if(result.status)
          {
            alert("Ownership transfered")
            getNftData();
            setloading(false);
          }
          else{
            alert("Something Went wrong");
            setloading(false);
          }
    }
  }

    else
    {
          alert("Not enough balance");
          setloading(false);
    }
    
      });

    }
    catch(e){
      setloading(false)
    }

  }
  const claimnfthandle=async(blockchain)=>{
    //alert(blockchain);
    if(wallet.connected)
    {

        if(blockchain=='Ethereum')
        {
          if(window.ethereum && window.ethereum.networkVersion !== '4') {
            await addNetwork(4);
            //setloading(false);
            
          }
          
            
        }
        else if(blockchain=='BSC SmartChain')
        {
          if(window.ethereum && window.ethereum.networkVersion !== '97') {
           await addNetwork(97);
           setloading(false);

        }
      }
        else{
          if(window.ethereum && window.ethereum.networkVersion !== '80001') {
            await addNetwork(80001);
            setloading(false);
          }
        }
      
    }
    else{
      alert("Please connect the wallet")
    }
  }
  // const addNetwork=(id) =>{
  //  //alert(id);
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
    <div className="topCollections_page">
      <div className="container-fluid">
          <div className="row topCollections_heading_container">
              <h1 className="topCollections_heading">Settle NFT's</h1>
          </div>
          <div className="row"  >
              <div className='col-1'></div>
              <div className='col-10 topCollectionsListContainer'>
                  <div className='row'>
                 
                    <div className='col-md-4 col-lg-4 col-12' style={{marginRgiht:'10%'}}>
                    {nftdata.slice(0,5).map((e,index)=>
                  <ListItem  nft={e} execute={settledNftHandle} index={index} loading={loading} selectedid={selectedid}/>
                  )}
                    </div>
                    <div className='col-md-4 col-lg-4 col-12' style={{marginRgiht:'10%'}}>
                    {nftdata.slice(5,10).map((e,index)=>
                  <ListItem  nft={e} execute={settledNftHandle} index={5+index} loading={loading} selectedid={selectedid}/>
                  )}
                    </div>
                    <div className='col-md-4 col-lg-4 col-12' style={{marginRgiht:'10%'}}>
                    {nftdata.slice(10,15).map((e,index)=>
                  <ListItem  nft={e} execute={settledNftHandle} index={10+index} loading={loading} selectedid={selectedid}/>
                  )}
                    </div>
                  
                  </div>
              </div>
         
              <div className='col-1'></div>
        </div>
        {/* <div className="row btn_row" >
          <Link to='stats'>
            <button className="section-bottom-button">Stats</button>
            </Link>
        </div> */}
      </div>
    </div>
  )
}

export default SettledNftList