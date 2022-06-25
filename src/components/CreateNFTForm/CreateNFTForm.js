import React, { useContext,useRef,useEffect } from 'react';
import './CreateNFTForm.css'
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import './CreateNFTForm.css'
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import "filepond/dist/filepond.min.css";
//import { create } from 'ipfs-http-client';
import S3 from 'react-aws-s3'
import { useNavigate } from "react-router-dom";
//import S3FileUpload from "react-s3";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useState } from 'react';
import plusIcon from '../../Assets/plus-icon.png';
import CopyRightFooter from '../CopyRightFooter/CopyRightFooter';
import PropertiesContext from '../../Utils/PropertiesContext';
import { useDispatch, useSelector } from "react-redux";
import { connectWallet, connectFailed  } from "../../redux/WalletAction";
// import { useSelector } from 'react-redux';
//import { NftProvider } from 'use-nft';
const axios = require('axios');
const IPFSClient = require('ipfs-http-client');


//window.Buffer = window.Buffer || require("buffer").Buffer;

const FormData = require('form-data');
const AWS = require('aws-sdk');
registerPlugin(FilePondPluginFileEncode)

const projectId = 'aff83c11e6fe46969cec57044dc2d28a';
    const projectSecret = '0445bdf6ce094cb08d6ec90a9950ff70';
    const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
    const ipfsClient =  IPFSClient.create(
    {
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https'

    }

);

function CreateNFTForm() {
  const history = useNavigate ();
 const propertiesContext = useContext(PropertiesContext) 
  let [files, setFiles] = useState([])
  const [userLevel1, setUserLevel1] = useState([1])
  const [usersetLevel, setUsersetLevel1] = useState([1])
  const [userStats1, setUserStats1] = useState([1])
  const [usersetStats, setUsersetStats1] = useState([1])
  const [ipfsHash, setipfsHash] = useState([1])
  const [pond, setPond] = useState({});
  const[itemName,setitemName]=useState('');
  const previousInputValue = useRef("");
  const[description,setdescription]=useState('');
  const[collection,setcollection]=useState('');
  const[properties,setproperties]=useState([]);
  const[levels,setlevels]=useState([]);
  const[stats,setstats]=useState([]);
  const[unlock,setunlock]=useState(false);
  const[mystery,setmystery]=useState(false);
  const[explicit,setexplicit]=useState(false);
  const[copies,setcopies]=useState('1');
  const[blockchain,setblockchain]=useState('');
  const[loading,setloading]=useState(false)
  const dispatch = useDispatch();
  const wallet = useSelector(state => state.WalletConnect);
  
  const[unlockcontent,setunlockcontent]=useState('');
  const {web3, address, market,BNB_market,
    MATIC_market} = wallet;
  console.log(wallet);
  const ref=useRef({});
  const[collectionData,setCollectionData]=useState([]);
  const[unlockabletext,setunlockabletext]=useState([]);
  const[dummy,setdummy]=useState(false);
  const[filetype,setfiletype]=useState('');
  const[previewfile,setpreviewfile]=useState('')
  const[showpreview,setshowpreview]=useState(false);
  const[mediafile,setmediafile]=useState('');
  const[pinatafile,setpinnatafile]=useState('');
  const[previwimagefile,setpreviewimagefile]=useState(' ');
  const[royality,setroyality]=useState('')
  const[descriptionenable,setdescriptionenable]=useState(true);
  const[collectionenable,setcollectionenable]=useState(true);
  const[propertiesenable,setpropertiesenable]=useState(true);
  const[levelsSavedata,setlevelsSavedata]=useState([])
  const[previewhide,setpreviewhide]=useState(false)
  const[statsSavedata,setstatsSavedata]=useState([])
  const[duplicate, setduplicate]=useState(false);
  const[minvalueboolean, setminvalueboolean]=useState(false)
  const[proptext1,setproptext1]=useState(true);
  const[proptext2,setproptext2]=useState(true);
  const[proptext3,setproptext3]=useState(true);
  const[proptext4,setproptext4]=useState(true);
  const[proptext5,setproptext5]=useState(true);
  const[proptext6,setproptext6]=useState(true);
  const[proptext7,setproptext7]=useState(true);
  const[proptext8,setproptext8]=useState(true);
  const[proptext9,setproptext9]=useState(true);
  const[proptext10,setproptext10]=useState(true);
  const[mintiingfee,setmintiingfee]=useState(0)
  
  const propertiesdata=(index,value,type)=>
  {
   
    let propertiesarray=properties;
    var checkBool;
    switch (type) {
			case "character":
        if (propertiesarray.length !== 0){
          propertiesarray.forEach(element => {
          if (element.index === index ){
            element.trait_type = value;
            checkBool = true;
            }

          });
          
        }
          if (checkBool){
         
            setproperties(propertiesarray)
          }
          else {
            propertiesarray.push({'trait_type':value,'index':index});
            setproperties(propertiesarray);
          }
        
        break;
      case "name":
        if (propertiesarray.length !== 0){
          propertiesarray.forEach(element => {
          if (element.index === index ){
            element.value = value;
            checkBool = true;
            }

          });
          if (checkBool){
            setproperties(propertiesarray)
          }
          else {
            propertiesarray.push({'value':value,'index':index});
            setproperties(propertiesarray);
          }
        }
        break;
			default:
				break;
		}
    
  }
  const getcollection=async()=>
  {
   if(address)
   {
    let result=await axios.post(process.env.REACT_APP_API_URL.toString()+"/getcollections",{WalletAddress:address.toString().toLowerCase()})
    
    if(result.status==200)
    {
      
        setCollectionData(result.data.result);
        console.log("Collection",result.data.result);
        if(result.data.result.length>0)
        {
          // setcollection(result.data.result[0].CollectionName);
        }
        else{
          history('/create-collection')
        }
        
        
      
    }
  }
  }
  // const handlemintiingfee=async()=>{
  //   // if(web3)
  //   // {
  //   const price = blockchain=="Ethereum"?await market.methods.mintFee().call():blockchain=="BSC SmartChain"?await BNB_market.methods.mintFee().call():await MATIC_market.methods.mintFee().call();
  //   alert(price)
  //   setmintiingfee(price)
    
  // }
  useEffect(() => {     
    checkuserStatus();
      getcollection();
      // handlemintiingfee()
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
     
     
    
 }, [wallet.connected]);
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
  const awsdata=async()=>
  {
    const s3 = new AWS.S3({
      accessKeyId: 'AKIAQMYT3V5MLRXZJTI2', // replace with your access key
      secretAccessKey: '4fv1xAlOmHUcPuDTBI15KOCReJ/c/viB2f+gt9xA', // replace with your secret   key
    });
    const config = {
      bucketName: "indigenanft",
      dirName: 'nftCollections',
      region: "ap-southeast-2",
      accessKeyId: "AKIAQMYT3V5MLRXZJTI2",
      secretAccessKey: "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",
    };
    console.log("files",files)
    let tokenId=2
    let newFileName =tokenId.toString();
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(files,newFileName).then(data=> {

      console.log(data);
 
      if(data.status === 204) {
 
        console.log('success')
 
      } else {
 
        console.log('fail')
 
      }
 
    })
    //console.log("Uploadimage",Uploadimage)
 
    // const s3imageData = await S3FileUpload.uploadFile(files, config);
    // console.log("s3imageData",s3imageData.location);
    //let tokenId=9
  //   const JsonMetadata={
  //     "itemname": "QmWMJoHMXyNoyZiwZ6XgsPKPw5FQKt9jUUWJDbbWYmHity",
  //     "Name": "er",
  //     "Description": "er",
  //     "Collection": "1",
  //     "Properties": [
  //         {
  //             "character": "12",
  //             "index": 0,
  //             "name": "22"
  //         },
  //         {
  //             "character": "22",
  //             "index": 1,
  //             "name": "22"
  //         }
  //     ],
  //     "Levels": [
  //         {
  //             "character": "12",
  //             "index": 0,
  //             "setlevel": "4",
  //             "level": "1"
  //         }
  //     ],
  //     "Stats": [],
  //     "Unlock": true,
  //     "Mystery": true,
  //     "Explicit": true,
  //     "ImageUrl": "https://gateway.pinata.cloud/ipfs/QmWMJoHMXyNoyZiwZ6XgsPKPw5FQKt9jUUWJDbbWYmHity"
  // }; 
  //   console.log()
  //    const s3Bucket = 'indigenanft'; // replace with your bucket name
  //   const objectName = tokenId.toString()+'.png'; // File name which you want to put in s3 bucket
  //   const objectData = files; // file data you want to put
  //   const objectType = 'application/file'; // type of file
  //   try {
  //     // setup params for putObject
  //     const params = {
  //        Bucket: s3Bucket,
  //        Key: objectName,
  //        Body: objectData,
  //        ContentType: objectType,
  //     };
  //     const image=await s3.putObject(params).promise();
    
  //     console.log(image)
  //     const result = await s3.putObject(params).promise();
  //     console.log(`File uploaded successfully at https:/` + s3Bucket +   `.s3.amazonaws.com/` + objectName);
  //   } catch (error) {
  //     console.log(error);
  //   }
  }
  const filehandle=(files)=>
  {
    setpinnatafile(files);
    const config = {
      bucketName: "indigenanft",
      dirName: 'nftCollections',
      region: "ap-southeast-2",
      accessKeyId: "AKIAQMYT3V5MLRXZJTI2",
      secretAccessKey: "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",
    };
    const ReactS3Client = new S3(config);
    var reader = new FileReader();
    var url = reader.readAsDataURL(files);

		reader.onloadend = function (e) {
      console.log("tpye",reader.result)
      setFiles(reader.result) 
			console.log("tpye", typeof reader.result)
      if(reader.result.includes('audio'))
      {
        console.log("audio");
        setfiletype('audio');
        setshowpreview(true);
        setpreviewhide(true);
        ReactS3Client.uploadFile(files).then(async(data)=> {
        console.log(data);
        if(data.status === 204) {
               setmediafile(data.location)
          }
        });
        
      }
      else if(reader.result.includes('video'))
      {
        console.log("video");
        setfiletype('video');
        setshowpreview(true);
        setpreviewhide(true);
        ReactS3Client.uploadFile(files).then(async(data)=> {
          console.log(data);
          if(data.status === 204) {
                 setmediafile(data.location)
            }
          });
      }
      else
      {
        console.log('image');
        setfiletype('image');
        setpreviewhide(true);
      }
		}.bind(this);
  }
  const previewfilehandle=(files)=>
  {
    setpreviewimagefile(files);
    var reader = new FileReader();
    var url = reader.readAsDataURL(files);

		reader.onloadend = function (e) {
      setpreviewfile(reader.result) 
		}.bind(this);
  }

  const previewclosehandle=()=>
  {
    setpreviewhide(false);
    setFiles('');
  }

  const levelsdata=(index,value,type)=>
  {
   
    let levelsarray=levels;
    var checkBool;
    switch (type) {
			case "character":
        if (levelsarray.length !== 0){
          levelsarray.forEach(element => {
          if (element.index === index ){
            element.character = value;
            checkBool = true;
            }

          });
        }
          if (checkBool){
            setlevels(levelsarray)
          }
          else {
            levelsarray.push({'character':value,'index':index});
            setlevels(levelsarray)
          }
        
        break;
      case "val1":
        if (levelsarray.length !== 0){
          levelsarray.forEach(element => {
          if (element.index === index ){
            element.level = value;
            checkBool = true;
            }

          });
          if (checkBool){
            setlevels(levelsarray)
          }
          else {
            levelsarray.push({'level':value,'index':index});
            setlevels(levelsarray)
          }
        }
        setUserLevel1(value)
        break;
      case "val2":
        if (levelsarray.length !== 0){
          levelsarray.forEach(element => {
          if (element.index === index ){
            element.setlevel = value;
            checkBool = true;
            }

          });
          if (checkBool){
            setlevels(levelsarray)
          }
          else {
            levelsarray.push({'setlevel':value,'index':index});
            setlevels(levelsarray)
          }
        }
      
        setUsersetLevel1(value)
        break;
			default:
				break;
		}
    console.log("levelsarray",levelsarray)
  }
  const leavelsavehandle=()=>{
        var levelvalidation=true
        levels.map((e,i)=> {
          if(e.level&&e.setlevel&&e.character)
          {
             console.log('true')
          }
          else{
              levelvalidation=false 
              alert('Please fill the all levels details');
              return 1;
          }
    })
    if(levelvalidation)
    {
      setlevelsSavedata(levels);
    }
       
  }
  const statssavehandle=()=>{
   var statsvalidation=true
   stats.map((e,i)=> {
          if(e.level&&e.setlevel&&e.character)
          {
            console.log('true')
          }
          else{
            statsvalidation=false; 
              alert('Please fill the all stats details');
              return 1;
          }
    })
    if(statsvalidation)
    {
      setstatsSavedata(stats);
    }

  }
  const statsdata=(index,value,type)=>
  {
   
    let statsarray=stats;
    var checkBool;
    switch (type) {
			case "character":
        if (statsarray.length !== 0){
          statsarray.forEach(element => {
          if (element.index === index ){
            element.character = value;
            checkBool = true;
            }

          });
        }
          if (checkBool){
            setstats(statsarray)
          }
          else {
            statsarray.push({'character':value,'index':index});
            setstats(statsarray)
          }
        
        break;
      case "val1":
        if (statsarray.length !== 0){
          statsarray.forEach(element => {
          if (element.index === index ){
            element.level = value;
            checkBool = true;
            }

          });
          if (checkBool){
            setstats(statsarray)
          }
          else {
            statsarray.push({'level':value,'index':index});
            setstats(statsarray)
          }
        }
        setUserStats1(value)
        break;
      case "val2":
        if (statsarray.length !== 0){
          statsarray.forEach(element => {
          if (element.index === index ){
            element.setlevel = value;
            checkBool = true;
            }

          });
          if (checkBool){
            setstats(statsarray)
          }
          else {
            statsarray.push({'setlevel':value,'index':index});
            setstats(statsarray)
          }
        }
      
        setUsersetStats1(value)
        break;
			default:
				break;
		}
    console.log("statsarray",statsarray)
  }
 
  let handleAdd = () => {
    propertiesContext.setPropertiesList([...propertiesContext.propertiesList + 1])
  }

  let handleDelete = (i) => { 

    if(i != 1){

        propertiesContext.propertiesList.splice(i-1,1);
        propertiesContext.setPropertiesList([...propertiesContext.propertiesList])
    }
  }
  let handleLevelAdd = () => {
    propertiesContext.setLevelsList([...propertiesContext.levelsList + 1])
  }

  let handleLevelDelete = (i) => { 

    if(i != 1){

        propertiesContext.levelsList.splice(i-1,1);
        propertiesContext.setLevelsList([...propertiesContext.levelsList])
    }
  }
  let handleStatsAdd= () => {
    setUserStats1('');
    setUsersetStats1('')
    propertiesContext.setStatsList([...propertiesContext.statsList + 1])
 
  }

 const addNetwork=(id) =>{
    
    let networkData;
    switch (id) {

      case 97:
        networkData = [

          {
          
          chainId: "0x61",
          
          chainName: "BSCTESTNET",
          
          rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
          
          nativeCurrency: {
          
          name: "BINANCE COIN",
          
          symbol: "BNB",
          
          decimals: 18,
          
          },
          
          blockExplorerUrls: ["https://testnet.bscscan.com/"],
          
          },
          
          ];
  
        break;
      case 4:
          networkData = [
            {
              chainId: '0x4'
            }
          ]
          break;
      case 80001:
        
        networkData=JSON.stringify(networkData)
          networkData = [
            {
              chainId: web3.utils.toHex('80001'),
              chainName: "Mumbai Testnet",
              rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
              },
              blockExplorerUrls: ["https://polygonscan.com/"],
            },
          ];
    
          break;    
      default:
        break;
    }
  
    console.log(networkData)
   
    if(id!=4)
      {
        return window.ethereum.request({
  
          method: "wallet_addEthereumChain",
          
          params: networkData,
          
          });
          //dispatch(connectWallet());
      }
      else
      {
        
        return window.ethereum.request({
  
          method: "wallet_switchEthereumChain",
          
          params: networkData,
          
          });
      }
  }
  let handleStatsDelete = (i) => { 

    if(i != 1){

        propertiesContext.statsList.splice(i-1,1);
        propertiesContext.setStatsList([...propertiesContext.statsList])
    }
  }

  const handleCollectionDropdown=async(index)=>
  {
   
    setcollection(collectionData[index].CollectionName);
    //alert(collectionData[index].CollectionName);
    setroyality(collectionData[index].Royality);
    setblockchain(collectionData[index].Blockchain);
    setpropertiesenable(false);
    // if(web3)
    // {
     
    // }
    console.log(collectionData[index].CollectionName);
    console.log(collectionData[index].Royality);
    console.log(collectionData[index].Blockchain);
    
    if(collectionData[index].Blockchain=="Ethereum")
{
  if(window.ethereum && window.ethereum.networkVersion !== '4') {
    let data=await addNetwork(4);
    const price =await market.methods.mintFee().call();;
    var amt2 =await web3.utils.fromWei(price.toString(),'ether')
    setmintiingfee(parseFloat(amt2).toFixed(2))
    
  }
  else{
    const price =await market.methods.mintFee().call();;
    var amt2 =await web3.utils.fromWei(price.toString(),'ether')
    setmintiingfee(parseFloat(amt2).toFixed(2))
  }
}
else if(collectionData[index].Blockchain=="Polygon")
{
  if(window.ethereum && window.ethereum.networkVersion !== '80001') {
    let data=await addNetwork(80001);
    const price =await MATIC_market.methods.mintFee().call();
    var amt2 =await web3.utils.fromWei(price.toString(),'ether');
    setmintiingfee(parseFloat(amt2).toFixed(2))
  }
  else{
    const price =await market.methods.mintFee().call();;
    var amt2 =await web3.utils.fromWei(price.toString(),'ether')
    setmintiingfee(parseFloat(amt2).toFixed(2))
  }
}
else{
  let data=await addNetwork(97);
  const price = await BNB_market.methods.mintFee().call();
  var amt2 =await web3.utils.fromWei(price.toString(),'ether')
  setmintiingfee(parseFloat(amt2).toFixed(2))
    
}
  }

  const handleChange =async()=>
  {
    if(wallet.connected)
    {
      web3.eth.getBalance(address)
      .then(async(balance)=>{console.log("getbalance",balance);
     
      var amt1 = await web3.utils.fromWei(balance.toString(),'ether')
  
      
    
      if(parseFloat(amt1)>parseFloat(mintiingfee))
      {
        handleChangeprocess();
      }
      else{
        alert("Not Enough Balance");
      }
     
    });
     
    }
    else
    {
      alert("Please connect the wallet")
    }
  }
  const checkNftName=async(value)=>
 {
   if(!address)
   {
     alert("Please connect your wallet")
   }
   else
   {
    let data={ItemName:value}
    if(value.length>0)
    {
      let tokensresult=await axios.post(process.env.REACT_APP_API_URL.toString()+"/checkname",data);
      console.log(tokensresult.data);
      if(tokensresult.data.result)
      {
         setduplicate(true);
         
      }
      else{
        setitemName(value);
        setdescriptionenable(false); 
        setduplicate(false);
        localStorage.setItem('Itemname',value);
      }
    }
    else
    {
      setdescriptionenable(true); 
      setduplicate(false);
    }
   }
  
  
 }
  const checkDescription=async(value)=>
  {
      if(value.length>6)
      {
        setminvalueboolean(false);
        setdescription(value);
        setcollectionenable(false);
      }
      else{
        setcollectionenable(true);
        setminvalueboolean(true);
      }
  }
  // const getdollar=(network)=>{
  //   var price=0;
  //   if(network=="Ethereum")
  //   {
  //       price=nft.Price?parseFloat(nft.Price)*parseFloat(localStorage.getItem("Eth-price")):0
  //   }
  //   else if(network=="BSC SmartChain")
  //   {
  //      price=nft.Price?parseFloat(nft.Price)*parseFloat(localStorage.getItem("Bnb-price")):0
  //   }
  //   else if(network=="Polygon"){
  //      price=nft.Price?parseFloat(nft.Price)*parseFloat(localStorage.getItem("Matic-price")):0
  //   }

  //   return price.toFixed(3)
  // }

  const handleChangeprocess=async()=>
  {
    
    if(itemName!==''&&description!==''&&mystery&&explicit&&blockchain!==''&&pinatafile&&previwimagefile&&collection!=='')
    {
      setloading(true);
      //console.log(e)
     // console.log("files",ree.current.getFiles()[0]);
      const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
      const jsonUrl = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  
      let file=pinatafile;
      console.log("FIle",file) 
      //we gather a local file for this example, but any valid readStream source will work here.
      let data = new FormData();
      data.append('file', file);
  
      //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
      //metadata is optional
      const metadata = JSON.stringify({
          name: 'testname',
          keyvalues: {
              exampleKey: 'exampleValue'
          }
      });
      data.append('pinataMetadata', metadata);
  
      //pinataOptions are optional
      const pinataOptions = JSON.stringify({
          cidVersion: 0,
          customPinPolicy: {
              regions: [
                  {
                      id: 'FRA1',
                      desiredReplicationCount: 1
                  },
                  {
                      id: 'NYC1',
                      desiredReplicationCount: 2
                  }
              ]
          }
      });
      data.append('pinataOptions', pinataOptions);
      console.log("data",data); 
      let result= await axios
          .post(url, data, {
              maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
              headers: {
                  'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                  pinata_api_key: '27d287aee44f8a2bf9cd',
                  pinata_secret_api_key: 'ab8ead67f13e15f9b9a0abdeeaf2faefdc0aa25eaa1da36186faafa5b021c36c'
              }
          })
      console.log("result",result);
      if(!result.data.isDuplicate)
      {
        const hashPrefix = 'https://gateway.pinata.cloud/ipfs/'
      
        const imagehash = hashPrefix + result.data.IpfsHash;
    
        // let metadata1 = {
        //   image: imagehash,
        //   attributes: [],
        //   name: 'test-img'
        // }
       let pinataMetadata={
        "description": description, 
        "image": "ipfs://"+result.data.IpfsHash, 
        "name": itemName,
        "attributes":properties,
       }
      // pinataMetadata=JSON.parse(pinataMetadata);
      console.log("pinataMetadata",pinataMetadata);
        // const addedMetaData = await ipfsClient.add(JSON.stringify(metadata1));
        // const ipfsBaseUrl = "https://ipfs.infura.io/ipfs/";
        // const ipfsinhash = addedMetaData.path;
        // console.log(ipfshash);
       let JsonMetadata= {
      
        "pinataMetadata": {
            "name": itemName,
            "description":description,
            "image": imagehash,
            "CID":result.data.IpfsHash
        },
        "pinataContent": {
          "itemname":result.data.IpfsHash,
          "Name": itemName,
          "Description":description,
          "Collection":collection,
          "Properties":properties,
          "Levels":levels,
          "Stats":stats,
          "Unlock":unlock,
          "MintingAccept":mystery,
          "RoyalityAccept":explicit,
          "Blockchain":blockchain,
          "ImageUrl": imagehash,
          "Selleraddress":address,
          "Copies":copies,
          "unlockabletext":unlockabletext,
          "Status":"Mint",
          "Type":filetype,
          "Royality":royality
        },
    }
    let JsonResuslt= await axios
          .post("https://api.pinata.cloud/pinning/pinJSONToIPFS", pinataMetadata, {
              maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
              headers: {
                  'Content-Type': 'application/json',
                  pinata_api_key: '27d287aee44f8a2bf9cd',
                  pinata_secret_api_key: 'ab8ead67f13e15f9b9a0abdeeaf2faefdc0aa25eaa1da36186faafa5b021c36c'
              },
              body:JSON.stringify(pinataMetadata)
              
          })
  
  
  
    console.log("JsonResuslt",JsonResuslt);      
    const ipfshash = "https://gateway.pinata.cloud/ipfs/"+JsonResuslt.data.IpfsHash;   
    console.log("ipfshash",ipfshash);
    
    const nonce = Date.now();
    // const signMsgHash = web3.utils.soliditySha3({t: 'address', v: blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC},
    //       {t: 'address', v:blockchain=="Ethereum"?process.env.REACT_APP_NFT_CONTRACT_ADDRESS:blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS:process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS},
    //       {t: 'string', v:ipfshash},
    //       {t: 'address', v:address},
    //       {t: 'uint256', v: nonce}
    // )
    // console.log(signMsgHash);
    // let sig1 = await web3.eth.accounts.sign(signMsgHash,blockchain=="Ethereum"?process.env.REACT_APP_SIGNER_PRIVATEKEY:process.env.REACT_APP_SIGNER_TEMPKEY);
    // console.log(sig1);
    console.log("market.methods",market.methods)
    const price = blockchain=="Ethereum"?await market.methods.mintFee().call():blockchain=="BSC SmartChain"?await BNB_market.methods.mintFee().call():await MATIC_market.methods.mintFee().call();
   
    // let price=getdollar(blockchain);
    //web3.utils.toWei('0.02', 'ether');
    // const signature = [sig1.v, sig1.r, sig1.s, nonce];
    //console.log(signature);
    let signaturehash=await axios.post(process.env.REACT_APP_API_URL.toString()+"/getsignature",
    {
                "seller":blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC,
                "buyer": blockchain=="Ethereum"?process.env.REACT_APP_NFT_CONTRACT_ADDRESS:blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS:process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS,
                "nftAddress": blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC,
                "inEth": true,
                //"_orderType":0 ,
                "amount": price,
                "tokenId": 0,
                "qty": 1,
                "timestamp": nonce,
                "Blockchain":blockchain
    })
    var sighash = signaturehash.data.result
    var signtuple=[blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC,blockchain=="Ethereum"?process.env.REACT_APP_NFT_CONTRACT_ADDRESS:blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS:process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS,blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC,true,price,0,1,nonce,sighash];
    console.log("signtuple",[blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC,blockchain=="Ethereum"?process.env.REACT_APP_NFT_CONTRACT_ADDRESS:blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS:process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS,blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC,true,price,0,1,nonce,sighash])
    console.log([blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC,blockchain=="Ethereum"?process.env.REACT_APP_NFT_CONTRACT_ADDRESS:blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS:process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS,blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC,true,price,0,1,nonce,sighash])
    console.log(blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC,blockchain=="Ethereum"?process.env.REACT_APP_NFT_CONTRACT_ADDRESS:blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS:process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS,blockchain=="Ethereum"?process.env.REACT_APP_NFT_ADDRESS:blockchain=="BSC SmartChain"?process.env.REACT_APP_NFT_TRADE_BNB:process.env.REACT_APP_NFT_TRADE_MATIC,true,0,price,0,1,nonce,sighash);
    //console.log([])
    //alert(ipfshash)
    var res;
    console.log("price",price);
    try{
    res = blockchain=="Ethereum"?
    await market.methods.createNFT(
                process.env.REACT_APP_NFT_CONTRACT_ADDRESS,
                ipfshash,
                1,
                parseInt(royality)*100,
                signtuple ).send({value: price, from: address,maxPriorityFeePerGas: null,
                maxFeePerGas: null })
                :blockchain=="BSC SmartChain"?await BNB_market.methods.createNFT(process.env.REACT_APP_NFT_BNB_CONTRACT_ADDRESS,
                ipfshash,
                1,
                parseInt(royality)*100,
                signtuple ).send({value: price, from: address,maxPriorityFeePerGas: null,
                maxFeePerGas: null })
                :await MATIC_market.methods.createNFT(
                process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS,
                ipfshash,
                1,
                parseInt(royality)*100,
                signtuple ).send({value: price, from: address,maxPriorityFeePerGas: null,
                maxFeePerGas: null })
             
      // console.log("signtuple",signtuple);
      // console.log("royality",royality);
      // console.log("ipfshash",ipfshash);
      // console.log("address",address);
      // console.log("REACT_APP_NFT_MATIC_CONTRACT_ADDRESS",process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS);
      // const res=await MATIC_market.methods.createNFT(
      //               process.env.REACT_APP_NFT_MATIC_CONTRACT_ADDRESS,
      //               ipfshash,
      //               1,
      //               (parseInt(royality)*100),
      //               signtuple ).send({
      //                 from: address,
      //                 value: price
      //              })
      console.log(res.events.Minted.returnValues.tokenId);
      let tokenId=res.events.Minted.returnValues.tokenId
      console.log("tokenId",tokenId);
      if(tokenId)
      {
        const s3 = new AWS.S3({
          accessKeyId: 'AKIAQMYT3V5MLRXZJTI2', // replace with your access key
          secretAccessKey: '4fv1xAlOmHUcPuDTBI15KOCReJ/c/viB2f+gt9xA', // replace with your secret   key
        });
       
         // type of file
        const config = {
          bucketName: "indigenanft",
          dirName: 'nftCollections',
          region: "ap-southeast-2",
          accessKeyId: "AKIAQMYT3V5MLRXZJTI2",
          secretAccessKey: "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",
        };
       
        files=showpreview?previwimagefile:pinatafile
        console.log("files",files)
        let newFileName =blockchain+"-"+tokenId.toString();
        const ReactS3Client = new S3(config);
        ReactS3Client.uploadFile(files,newFileName).then(async(data)=> {
    
          console.log(data);
     
          if(data.status === 204) {
     
            try {
              // setup params for putObject
              JsonMetadata.pinataContent.ImageUrl=data.location;
              JsonMetadata.pinataContent.tokenId=tokenId;
  
              const s3Bucket = 'indigenanft'; // replace with your bucket name
              const objectName = blockchain+"-"+tokenId.toString()+'.json'; // File name which you want to put in s3 bucket
              const objectData = JSON.stringify(JsonMetadata); // file data you want to put
              const objectType = 'application/json';
              const params = {
                 Bucket: s3Bucket,
                 Key: objectName,
                 Body: objectData,
                 ContentType: objectType,
              };
              const result =await s3.putObject(params).promise();
              let frontenddata={};
              frontenddata['WalletAddress']=address;
              frontenddata['TokenId']=blockchain+"-"+tokenId;
              frontenddata['Jsondataurl']="https:/" + s3Bucket +   ".s3.amazonaws.com/"+ objectName;
              frontenddata['CollectionName']=collection;
              frontenddata['AwsUrl']=JsonMetadata.pinataContent.ImageUrl;
              frontenddata['ItemName']=JsonMetadata.pinataContent.Name;
              frontenddata['Status']='Mint';
              frontenddata['Poperties']=properties;
              frontenddata['Levels']=levels;
              frontenddata['Stats']=stats;
              frontenddata['Blockchain']=blockchain;
              frontenddata['Type']=filetype;
              frontenddata['Royality']=royality;
              console.log("frontenddata",frontenddata)
              //alert(JSON.stringify(frontenddata));
              console.log(`File uploaded successfully at https:/` + s3Bucket +   `.s3.amazonaws.com/` + objectName);
              let BackendResuslt= await axios.post(process.env.REACT_APP_API_URL.toString()+"/create-nft", frontenddata)
              console.log(BackendResuslt);
              setloading(true)
              history('/user-profile')
            } catch (error) {
              console.log(error);
            }
     
          } else {
     
            console.log('fail');
            
     
          }
     
        })
      
      
      }
    }          
    catch(e){
      setloading(false)
    }
      }
     
       else{
         alert("This file already minted");
         setloading(false);
         return;
       }
      
      

    }
    else{
     
     
      if(itemName=='')
      {
        alert("Please fill the Name");
        setloading(false);
      }
      else if(description=='')
      {
        alert("Please fill the description");
        setloading(false);
      }
      else if(!mystery)
      {
        alert("Please accept the mintiing fees");
        setloading(false);
      }
      else if(!explicit)
      {
        alert("Please accept the royality feess");
        setloading(false);
      }
      else if(!collection)
      {
        alert("Please select the collection name");
        setloading(false);
      }

      else
      {
        alert("Someting went wrong");
        setloading(false);
      }
    }
    
};


const logoutclicked=()=>{
  
  const { web3Modal } = wallet;
  web3Modal.clearCachedProvider();
  dispatch(connectFailed(errorDiv()));
  history('/');
}

const errorDiv = () => {
  return (
      <p>Wallet Disconnected!</p>
  )
}
  return ( 
    <>
    <div className='createNFTForm_page'>
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2 col-2 col-md-2">
                    <LogoutIcon onClick={()=>logoutclicked()}/>
                </div> 
                <div className="col-lg-10"></div>
            </div>
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                  <div className='row'>
                    <div className='col-lg-3'></div>
                    <div className='col-lg-6 headingContainer'>
                      <span className='createNFT_Heading'>Create NFTs</span>
                    </div>
                    <div className='col-lg-3'></div>
                  </div>
                <form>
                <div class="form-group">
                <div className="col-lg-12 input_label">
                <span >{"Name"+"  * " }</span>
            </div>
                <input
                                type="text"
                                class="form-control"
                                id="exampleInputEmail1"
                                onBlur={(e)=>checkNftName(e.target.value)}
                                placeholder="Item name"
                                
                              />
                              {duplicate&&<p style={{color:'red'}}>This name already taken</p>}
                              </div>
                              <div class="form-group">
                              <div className="col-lg-12 input_label">
                <span >{"Description"+"  *"}</span>
            </div>
                              
                              <small
                                id="emailHelp"
                                class="form-text text-muted uploadSmallText"
                              >
                                The description will be included  on the item's details page underneath it's image.
                              </small>
                              <textarea name="user-message" id="user-message" class="form-control" cols="20" rows="10" minlength="25"
                  maxlength="250" disabled={descriptionenable} placeholder="Provide a detailed description of your item." onBlur={(e)=>checkDescription(e.target.value)}></textarea>
                              {minvalueboolean&&<p style={{color:'red'}}>Description length should minimum 25 and maximum 250</p>}
                </div>
                <div class="form-group">
                <div className="col-lg-12 input_label">
                  <div className='row'>
                        <div className='col-6'>
                            <span >{"Collection"+"  *"}</span>
                        </div>
                        <div className='col-6'>
                            <button type="button" class="btn btn-primary mr-0" onClick={()=>history('/create-collection')} >Add Collection</button>
                        </div>
                  </div>
                
                
            </div>
                            <small
                              id="exampleFormControlSelect1"
                              class="form-text text-muted uploadSmallText"
                            >
                              This is the collection where your item will appear.
                            </small>
                            <select
                              class="form-select"
                              id="exampleFormControlSelect1"
                              disabled={collectionenable}
                              onChange={(e)=>handleCollectionDropdown(e.target.value)}
                            >
                              <option >Select collection</option>
                              {collectionData.map((e,i)=>{
                                return(
                                  <option value={i}>{e.CollectionName}</option>
                                )
                                  
                              })}
                             
                            </select>
                            {/* <input
                                type="text"
                                class="form-control"
                                id="exampleInputEmail1"
                                onChange={(e)=>setcollection(e.target.value)}
                                placeholder="Collection"
                            /> */}
                            
                          </div>
                          <div className='form-group'>
                              <div className='row '>
                                  <div className="col-lg-1"></div>
                                  <div className="col-lg-10">
                                      <ul className={propertiesenable ? 'modalList':" "} >
                                          <li>
                                              <span>
                                                  <div className="row ">
                                                  <div className="col-lg-10 col-10 col-md-10 NFTDetailsList ">
                                                      <h4>Properties</h4>
                                                      <p>Textual traits that show up as rectangles</p>
                                                  </div>
                                                  <div className="col-lg-2 col-2 col-md-2" >
                                                 
                                                  <img  data-toggle="modal" data-target="#PropertiesModal" className='addIcon' src={plusIcon} alt='add-icon'/>
                                                  
                                                  </div>
                                                  <div className='row'>
                                                       {properties.map((e,i)=>{
                                                         return(
                                                           <div className='esyMuQ ml-2'>
                                                             <span style={{fontSize:"16px"}}>{e.trait_type}</span><br></br>
                                                             <span style={{fontSize:"12px",color:"blue"}}>{e.value}</span>
                                                           </div>
                                                         )
                                                       })}
                                                  </div>
                                                  </div>
                                              </span>
                                          </li>

                                          <li>
                                              <span>
                                                  <div className="row">
                                                  <div className="col-lg-10 col-10 col-md-10 NFTDetailsList">
                                                      <h4>Levels</h4>
                                                      <p>Numerical traits that show up as progreebar</p>
                                                  </div>
                                                  <div className="col-lg-2 col-2 col-md-2">
                                                  
                                                  <img data-toggle="modal" data-target="#LevelsModal" className='addIcon' src={plusIcon} alt='add-icon'/>
                                                  </div>
                                                  </div>
                                              </span>
                                              
                                                {levelsSavedata.map((e,i)=>{
                                                         return(
                                                         

                                                  <div className='row stats mt-2'>
                                                    <div className='row'>
                                                    <div className='col-6 col-lg-6'>
                                                      <span style={{textAlign:"left"}}>{e.character}</span>
                                                    </div>
                                                    <div className='col-6 col-lg-6'>
                                                      <span style={{textAlign:"right"}}>{e.level+" of "+e.setlevel}</span>
       
                                                    </div>
                                                    </div>
                                                    <div class="row progress">
                                                          <div class="progress-bar" role="progressbar" style={{width:((parseInt(e.level)/parseInt(e.setlevel))*100).toString() +"%"}} aria-valuenow={e.level} aria-valuemin="0" aria-valuemax={e.setlevel}></div>
                                                        </div>
                                                        <br></br>
                                                    </div>

                                                         )
                                                       })}
                                          </li>
                                          <li>
                                              <span>
                                                  <div className="row">
                                                  <div className="col-lg-10 col-10 col-md-10 NFTDetailsList">
                                                      <h4>Stats</h4>
                                                      <p>Numerical traits that show up as numbers</p>
                                                  </div>
                                                  <div className="col-lg-2 col-2 col-md-2">
                                                  <img data-toggle="modal" data-target="#StatsModal" className='addIcon' src={plusIcon} alt='add-icon'/>
                                                  </div>
                                                  </div>
                                              </span>
                                              {statsSavedata.map((e,i)=>{
                                                         return(
                                                           <div>
                                                           <div className='row stats'>
                                                             <div className='col-6'>
                                                             <span>{e.character}</span>
                                                             </div>
                                                             <div className='col-6'>
                                                                    <span>{e.level+" of "+e.setlevel}</span>
                                                                    
                                                             </div>
                                                             
                                                           </div><br></br>
                                                           </div>
                                                         )
                                                       })}
                                          </li>
                                          <li>
                                              <span>
                                                  <div className="row">
                                                  <div className="col-lg-10 col-10 col-md-10 NFTDetailsList">
                                                      <h4>Unlockable Contents</h4>
                                                      <p>Includes unlockable content that can only be revealed by the owner of ther item.</p>
                                                  </div>
                                                  <div className="col-lg-2 col-2 col-md-2">
                                                  <div class="form-check form-switch">
                                                  <input
                              class="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="flexSwitchCheckDefault"
                              onChange={()=>setunlock(true)}
                            />
                           
                                                  </div>
                                                  </div>
                                                  </div>
                                              </span>
                                              {unlock && <textarea name="user-message" id="user-message" class="form-control" cols="20" rows="10" placeholder="Type unlockable Content" onChange={(e)=>setunlockabletext(e.target.value)}></textarea>}
                                          </li>
                                          {/* <li>
                                              <span>
                                                  <div className="row">
                                                  <div className="col-lg-10 col-10 col-md-10 NFTDetailsList">
                                                      <h4>Mystery Prize</h4>
                                                      <p>Includes mystery prizes, etc tokens,NFTs.</p>
                                                  </div>
                                                  <div className="col-lg-2 col-2 col-md-2">
                                                  <div class="form-check form-switch">
                                                  <input
                              class="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="flexSwitchCheckDefault"
                              onChange={()=>setmystery(true)}
                            />
                                                  </div>
                                                  </div>
                                                  </div>
                                              </span>
                                          </li> */}
                                          {/* <li>
                                              <span>
                                                  <div className="row">
                                                  <div className="col-lg-10 col-10 col-md-10 NFTDetailsList">
                                                      <h4>Explicit and Sensitive Content</h4>
                                                      <p>See tis item as explicit and sensitive content</p>
                                                  </div>
                                                  <div className="col-lg-2 col-2 col-md-2">
                                                  <div class="form-check form-switch">
                                                  <input
                              class="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="flexSwitchCheckDefault"
                              onChange={()=>setexplicit(true)}
                            />
                                                  </div>
                                                  </div>
                                                  </div>
                                              </span>
                                          </li> */}
                                          <li>
                                              <span>
                                                  <div className="row">
                                                  <div className="col-lg-10 col-10 col-md-10 NFTDetailsList">
                                                     
                                                  <h4>{"Are you accept minting fees "+mintiingfee.toString()+(blockchain=="Polygon"?"Matic ":blockchain=="BSC SmartChain"?"BNB ":"ETH ").toString()+"?"+"  *"}</h4>
                                                  </div>
                                                  <div className="col-lg-2 col-2 col-md-2">
                                                  <div class="form-check form-switch">
                                                  <input
                              class="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="flexSwitchCheckDefault"
                              onChange={(e)=>setmystery(e.target.checked)}
                            />
                                                  </div>
                                                  </div>
                                                  </div>
                                              </span>
                                          </li>
                                          <li>
                                              <span>
                                                  <div className="row">
                                                  <div className="col-lg-10 col-10 col-md-10 NFTDetailsList">
                                                     
                                                  <h4>{"Are you accept royalties fees?"+"  *"}</h4>
                                                  </div>
                                                  <div className="col-lg-2 col-2 col-md-2">
                                                  <div class="form-check form-switch">
                                                  <input
                              class="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="flexSwitchCheckDefault"
                              onChange={(e)=>setexplicit(e.target.checked)}
                            />
                                                  </div>
                                                  </div>
                                                  </div>
                                              </span>
                                          </li>
                                      </ul>
                                  </div>
                                  <div className="col-lg-1"></div>
                              </div>
                          </div>
                          {/* <div class="form-group">
                          <div className="col-lg-12 input_label">
                <span >Supply</span>
            </div>
                <small
                              id="exampleInputEmail1"
                              class="form-text text-muted uploadSmallText"
                            >
                              The number of copies that can be minted.
                            </small>
                <input
                                type="text"
                                class="form-control"
                                id="exampleInputEmail1"
                                //onChange={(e)=>setcopies(e.target.value)}
                                placeholder="Quantity"
                                value={1}
                                disabled={true}

                                
                              />
                              </div> */}
                              {/* <div class="form-group">
                              <div className="col-lg-12 input_label">
                <span >Blockchain</span>
            </div>                    
                            <select
                              class="form-select"
                              id="exampleFormControlSelect1"
                              onChange={((e)=>networkhandle(e.target.value))}
                            >
                              <option value="" selected disabled>Select Chain</option>
                              <option value={'Ethereum'}>Ethereum</option>
                              <option value={'BSC'}>BSC Smart Chain</option>
                            </select>
                            
                          </div> */}
                         
                          <div className="form-group">
                          <div className="col-lg-12 input_label">
                <span >{"Image, Video, Audio"+"  *"}</span>

            </div>  

            <small
                              id="exampleFormControlSelect1"
                              class="form-text text-muted uploadSmallText"
                            >
                              File type supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3. Max size 100MB
                            </small>
                          {/* <FilePond
                ref={ref}          
        files={files}
        onupdatefiles={(fileItems) => { setFiles(fileItems)}}
        allowMultiple={false}
        maxFiles={3}
        //server="/api"
        onChange={(e)=>handleChange(e)}
        name="files" 
        labelIdle='Drag & Drop your files <br/>or <span class="filepond--label-action"><br/>Browse Files</span>'
      /> */}
       {files==''&&<input type="file" onChange={(e)=>filehandle(e.target.files[0])} disabled={propertiesenable}/>}
       {(filetype=='image'&&previewhide)&&
       <div style={{position:"relative"}}>
       <button type="button" class="close AClass" onClick={()=>previewclosehandle()}>
          <span>&times;</span>
       </button>
       <img src={files} style={{height:300,width:400}}></img>
   </div>
       }
       {(filetype=='audio'&&previewhide)&&
       <div style={{position:"relative"}}>
       <button type="button" class="close AClass" onClick={()=>previewclosehandle()}>
          <span>&times;</span>
       </button>
       <audio controls>
  <source src={files} type="audio/ogg"/>
  <source src={files}type="audio/mpeg"/>

</audio>
   </div>
       }
{(filetype=='video'&&previewhide)&&
<div style={{position:"relative"}}>
       <button type="button" class="close AClass" onClick={()=>previewclosehandle()}>
          <span>&times;</span>
       </button>
       <video width="400" controls>
  <source src={files} type="video/mp4"/>
  <source src={files} type="video/ogg"/>

</video>
   </div>
}
    
                          </div>

                          {showpreview&&<div className="form-group">
                          <div className="col-lg-12 input_label">
                <span >Preview image</span>

            </div>  

      
                         
       {previewfile==''&&<input type="file" onChange={(e)=>previewfilehandle(e.target.files[0])}/>}
       {previewfile!==''&&<img src={previewfile} style={{height:300,width:400}}></img>}
   
    
                          </div> }         
                </form>
                
                <button className='mintNFT_btn' disabled={propertiesenable} onClick={()=>handleChange()}>{loading?<div className='loading'></div>:"Create"}</button>
                </div>
                <div className="col-lg-3"></div>
            </div>
        </div>
        <div
          className="modal fade"
          id="PropertiesModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="PropertiesModal"
          aria-hidden="true"
          style={{marginTop:"5%"}}
        >
          <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="exampleModalLabel"
                  style={{ color: "black" }}
                >
                  Add Properties
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Properties show up underneath your item, are clickable, and can be filtered in your collection's sidebar.</p>
              <table className='PropertiesModalTable'> 
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {propertiesContext.propertiesList.map((e,i)=>{
                    return (
                      <tr className='inputRow' key={i+1}>
                     
                      <td><div className='charInput'>
                      <button className='delProp_btn' onClick={() =>{handleDelete(i+1)}}><i class="bi bi-x-lg"></i></button><input type='text'  className='form-control characterInput' onChange={(e)=> propertiesdata(i,e.target.value,'character')} placeholder='Character'/>
                      </div>
                      </td>
                      <td><input type='text' className='form-control' onChange={(e)=> propertiesdata(i,e.target.value,'name')} placeholder='Male'/></td>
                    </tr>
                    )
                  })}
                 <tr className='add_btn_row'>
                   <td ><button className='add_btn' onClick={handleAdd}>Add</button></td>
                 </tr> */}
                  {proptext1&&<tr className='inputRow' >
                  
                    
                     <td><div className='charInput'>
                     <button className='delProp_btn' onClick={() =>setproptext1(false)}><i class="bi bi-x-lg"></i></button> <input type='text'  className='form-control characterInput' onChange={(e)=> propertiesdata('Accessories',e.target.value,'character')} placeholder='Accessories'/>
                     </div>
                     </td>
                    
                     
                     <td><input type='text' className='form-control' onChange={(e)=> propertiesdata('Accessories',e.target.value,'name')} placeholder='eg:pink'/></td>
                    
                  
                   </tr>}
                   {proptext2&& <tr className='inputRow' >
                     
                     <td><div className='charInput'>
                     <button className='delProp_btn' onClick={() =>setproptext2(false)}><i class="bi bi-x-lg"></i></button> <input type='text'  className='form-control characterInput' onChange={(e)=> propertiesdata('Background',e.target.value,'character')} placeholder='Background'/>
                     </div>
                     </td>
                     <td><input type='text' className='form-control' onChange={(e)=> propertiesdata('Background',e.target.value,'name')} placeholder='eg:pink'/></td>
                   </tr>}
                   {proptext3&& <tr className='inputRow' >
                     
                     <td><div className='charInput'>
                     <button className='delProp_btn' onClick={() =>setproptext3(false)}><i class="bi bi-x-lg"></i></button> <input type='text'  className='form-control characterInput' onChange={(e)=> propertiesdata('Beak',e.target.value,'character')} placeholder='Beak'/>
                     </div>
                     </td>
                     <td><input type='text' className='form-control' onChange={(e)=> propertiesdata('Beak',e.target.value,'name')} placeholder='eg:pink'/></td>
                   </tr>}
                   {proptext4&& <tr className='inputRow' >
                     
                     <td><div className='charInput'>
                     <button className='delProp_btn' onClick={() =>setproptext4(false)}><i class="bi bi-x-lg"></i></button> <input type='text'  className='form-control characterInput' onChange={(e)=> propertiesdata('Body',e.target.value,'character')} placeholder='Body'/>
                     </div>
                     </td>
                     <td><input type='text' className='form-control' onChange={(e)=> propertiesdata('Body',e.target.value,'name')} placeholder='eg:pink'/></td>
                   </tr>}
                   {proptext5&&<tr className='inputRow' >
                     
                     <td><div className='charInput'>
                     <button className='delProp_btn' onClick={() =>setproptext5(false)}><i class="bi bi-x-lg"></i></button> <input type='text'  className='form-control characterInput' onChange={(e)=> propertiesdata('Eyes',e.target.value,'character')} placeholder='Eyes'/>
                     </div>
                     </td>
                     <td><input type='text' className='form-control' onChange={(e)=> propertiesdata('Eyes',e.target.value,'name')} placeholder='eg:pink'/></td>
                   </tr>}
                   {proptext6&&<tr className='inputRow' >
                     
                     <td><div className='charInput'>
                     <button className='delProp_btn' onClick={() =>setproptext6(false)}><i class="bi bi-x-lg"></i></button> <input type='text'  className='form-control characterInput' onChange={(e)=> propertiesdata('Feet',e.target.value,'character')} placeholder='Feet'/>
                     </div>
                     </td>
                     <td><input type='text' className='form-control' onChange={(e)=> propertiesdata('Feet',e.target.value,'name')} placeholder='eg:pink'/></td>
                   </tr>}
                   {proptext7&& <tr className='inputRow' >
                     
                     <td><div className='charInput'>
                     <button className='delProp_btn' onClick={() =>setproptext7(false)}><i class="bi bi-x-lg"></i></button> <input type='text'  className='form-control characterInput' onChange={(e)=> propertiesdata('Special',e.target.value,'character')} placeholder='Special'/>
                     </div>
                     </td>
                     <td><input type='text' className='form-control' onChange={(e)=> propertiesdata('Special',e.target.value,'name')} placeholder='eg:pink'/></td>
                   </tr>}
                   {proptext8&&<tr className='inputRow' >
                     
                     <td><div className='charInput'>
                     <button className='delProp_btn' onClick={() =>setproptext8(false)}><i class="bi bi-x-lg"></i></button> <input type='text'  className='form-control characterInput' onChange={(e)=> propertiesdata('Mouth',e.target.value,'character')} placeholder='Mouth'/>
                     </div>
                     </td>
                     <td><input type='text' className='form-control' onChange={(e)=> propertiesdata('Mouth',e.target.value,'name')} placeholder='eg:pink'/></td>
                   </tr>}
                   {proptext9&& <tr className='inputRow' >
                     
                     <td><div className='charInput'>
                     <button className='delProp_btn' onClick={() =>setproptext9(false)}><i class="bi bi-x-lg"></i></button> <input type='text'  className='form-control characterInput' onChange={(e)=> propertiesdata('Space',e.target.value,'character')} placeholder='Space'/>
                     </div>
                     </td>
                     <td><input type='text' className='form-control' onChange={(e)=> propertiesdata('Space',e.target.value,'name')} placeholder='eg:pink'/></td>
                   </tr>}
                   
                </tbody>
              </table>
              </div>
              <div className="modal-footer">
                
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={()=>setdummy(true)}
                  data-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="LevelsModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="LevelsModal"
          aria-hidden="true"
          style={{marginTop:"5%"}}
        >
          <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="exampleModalLabel"
                  style={{ color: "black" }}
                >
                  Add Levels
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Levels show up underneath your item, are clickable, and can be filtered in your collection's sidebar.</p>
              <table className='PropertiesModalTable'> 
                <thead>
                  <tr>
                    <div className='row'>
                      <div className='col-2'></div>
                      <div className='col-5'>
                      <th>Name</th>
                      </div>
                      <div className='col-5'>
                      <th>Value</th>
                      </div>
                    </div>
                    
                    
                  </tr>
                </thead>
                <tbody>
                  {propertiesContext.levelsList.map((e,i)=>{
                    return (
                      <tr className='inputRow' key={i+1}>
                     <div className='row'>
                       <div className='col-2'></div>
                       <div className='col-5'>
                       <td><div className='charInput'>
                      <button className='delProp_btn' onClick={() =>{handleLevelDelete(i+1)}}><i class="bi bi-x-lg"></i></button><input type='text'  className='form-control characterInput' onChange={(e)=>levelsdata(i,e.target.value,'character')} placeholder='Character'/>
                      </div>
                      </td>
                       </div>
                       <div className='col-5'>
                       <td><div className='row'>
                         <div className='col-5'>
                         <input onChange={(e)=>levelsdata(i,e.target.value,'val1')} type='text' className='form-control'   min="1" max={usersetLevel}/>
                         </div>
                         <div className='col-2'>
                         <span>of</span>
                         </div>
                         <div className='col-5'>
                         <input onChange={(e)=>levelsdata(i,e.target.value,'val2')} type='text' className='form-control'  />
                         </div>
                       </div>
                         </td>
                       </div>
                     </div>
                      
                     
                    </tr>
                    )
                  })}
                 <tr className='add_btn_row'>
                   <td ><button className='add_btn' onClick={handleLevelAdd}>Add</button></td>
                 </tr>
                </tbody>
              </table>
              </div>
              <div className="modal-footer">
                
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={()=>leavelsavehandle()} 
                  data-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="StatsModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="StatsModal"
          aria-hidden="true"
          style={{marginTop:"5%"}}
        >
          <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="exampleModalLabel"
                  style={{ color: "Black" }}
                >
                  Add Stats
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Stats show up underneath your item, are clickable, and can be filtered in your collection's sidebar.</p>
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                {propertiesContext.statsList.map((e,i)=>{
                    return (
                      <tr className='inputRow' key={i+1}>
                     <div className='row'>
                       <div className='col-2'></div>
                       <div className='col-5'>
                       <td><div className='charInput'>
                      <button className='delProp_btn' onClick={() =>{handleStatsDelete(i+1)}}><i class="bi bi-x-lg"></i></button><input type='text'  className='form-control characterInput'  onChange={(e)=>statsdata(i,e.target.value,'character')} placeholder='Character'/>
                      </div>
                      </td>
                       </div>
                       <div className='col-5'>
                       <td><div className='row'>
                         <div className='col-5'>
                         <input onChange={(e)=>statsdata(i,e.target.value,'val1')} type='text' className='form-control'  min="1" max={usersetStats}/>
                         </div>
                         <div className='col-2'>
                         <span>of</span>
                         </div>
                         <div className='col-5'>
                         <input onChange={(e)=>statsdata(i,e.target.value,'val2')}  type='text' className='form-control'  />
                         </div>
                       </div>
                         </td>
                       </div>
                     </div>
                      
                     
                    </tr>
                    )
                  })}
                   <tr className='add_btn_row'>
                   <td ><button className='add_btn' onClick={handleStatsAdd}>Add</button></td>
                 </tr>
                </tbody>
              </table>
              </div>
              <div className="modal-footer">
                
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={()=>statssavehandle()}
                  data-dismiss="modal"
                >
                 Save
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
    <CopyRightFooter/>
    </>
  )
}

export default CreateNFTForm