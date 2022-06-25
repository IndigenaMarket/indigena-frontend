 import React,{useState,useEffect} from 'react';
 import Logout from "../../Assets/exit.png";
 import Collectioncard from '../ProfileCollection/Profilecard'
 import { useNavigate } from "react-router-dom";
 import CollectionCard from "../CollectionCard/CollectionCard";
 import { useDispatch, useSelector } from "react-redux";
import { connectWallet, connectFailed } from "../../redux/WalletAction";
 import './MarketPlaceCollection.css'
 import axios from 'axios';

 import tokenAbi from'../../contracts/token.json'
import CopyRightFooter from '../CopyRightFooter/CopyRightFooter';
import FilterNav from '../FilterNav/AllcollectionfilterNav';
const AWS = require('aws-sdk');
 function Allcollection({ showFilter , setShowFilter }) {
  let history=useNavigate();
  const[loading,setloading]=useState(false) 
  const[nftcollectiondata,setNftcollectionData]=useState([]);
  const[collectiondata,setcollectiondata]=useState([]);
  // const wallet = useSelector(state => state.WalletConnect);
  // console.log(wallet);
  const dispatch = useDispatch();
    const wallet = useSelector((state) => state.WalletConnect);
    console.log(wallet);
  const {web3, address, market} = wallet;
  const [allcollectiondata,setallcollectiondata]=useState([]);
  const[nftdata,setNftData]=useState([]);
  const getcollection = async() => {
    
 
    let tokensresult=await axios.get(process.env.REACT_APP_API_URL.toString()+"/getAllcollection");
    console.log(tokensresult.data.result)
 

    setcollectiondata(tokensresult.data.result);
    
    
    
  }
  const getNftData = async() => {
    
    let tokensresult=await axios.get(process.env.REACT_APP_API_URL.toString()+"/getAll");
    console.log(tokensresult.data.result);
    setNftData(tokensresult.data.result);
    setallcollectiondata(tokensresult.data.result);
  }
  useEffect(() => {
getcollection();
getNftData();
}, []);

const Collections=(nft)=>
{
  console.log(nft)
  localStorage.setItem("collectionname",nft.CollectionName);
  history(`/UserCollection/${nft.CollectionName}`);
}
const buyNft=async(nft)=>
{
     history(`/collection/${process.env.REACT_APP_NFT_CONTRACT_ADDRESS}/${nft.NftId}`);
}
const searchInputhandle=async(searchInput,value,min,max)=>
  {
    
      // alert(value);
      // alert(searchInput);
        let tokensresult=await axios.post(process.env.REACT_APP_API_URL.toString()+"/Searchcollection",{searchInput:searchInput,value:value,min:min,max:max});
        setcollectiondata(tokensresult.data.result)
     
    

       
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

 
   return (
       <>
    <div className="MarketPlaceCollection_page"> 
      <div className="container-fluid"> 
        <div className="row MarketPlaceCollectionRow1">
          <div className="col-lg-2 logoutIcon_container">
            <img src={Logout} onClick={()=>logoutclicked()}/>
          </div>
          <div className="col-lg-10 MarketPlaceCollection_heading_container">
          
          </div>
        </div>
        <FilterNav showFilter={showFilter} execute={searchInputhandle} setShowFilter={setShowFilter}/>
        <div className="row collection_heading_container">
          <h1 className="our_collections_heading">Our Collections</h1>
        </div>
        {/* <div className='row'> 
        <div className='col-1'></div>
        <div className='col-10'>
        <div className="row ">
        {collectiondata !== [] ? collectiondata.map((e, i)=>

<Collectioncard key={i} nft={e} execute={Collections} />

) : ''}
              </div>
        </div>
        <div className='col-1'></div>

        </div> */}
        <div className="row nftcard-body" >
            <div className='col-1'></div> 
            <div className='col-10'>
              
            <div className='container'>
              <div  className='row' style={{justifyContent:"space-around",marginLeft:"1%"}}>
              {collectiondata !== [] ? collectiondata.map((e, i)=>

<Collectioncard key={i} nft={e} execute={Collections} />

) : ''}
              </div>
              </div>
              {/* <div className="row collection_heading_container">
          <h1 className="our_collections_heading">Our Collections NFT</h1>
        </div>
              <div className='container'>
              <div  className='row'>
              {nftdata.map((e,i) => (
                  e!==undefined?
                  <CollectionCard 
                    
                    key={i} nft={e} loading={ loading}
                    execute={buyNft}
                  />:""
                ))}
              </div>
              </div> */}
           

         
          
            </div>
            <div className='col-1'></div>
        
        
            </div>
      </div>
    </div>
    <CopyRightFooter/>
    </>
   )
 }
 
 export default Allcollection