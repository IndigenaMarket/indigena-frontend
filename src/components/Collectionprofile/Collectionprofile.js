import React, { useEffect, useState } from 'react'
import Filters from '../FilterNav/Filters'
import Collectioncard from '../ProfileCollection/Profilecard'
import UserProfileCard from '../UserProfileCard/UserProfileCard';
import NFTCardData from '../SampleData/TopTrendingList';
import CopyRightFooter from '../CopyRightFooter/CopyRightFooter';
import './ProfilePage.css';
import ViewCard from '../ViewCard/ViewCard'
import { useSelector } from 'react-redux';
import axios from 'axios';
import nftAbi from '../../contracts/nft.json'
import { useNavigate  } from "react-router-dom";
import '../UserProfileCard/UserProfileCard.css'
import nft from '../../Assets/nft.png'
import fb from '../../Assets/user-profile-fb.png'
import email from '../../Assets/user-profile-email.png'
import twitter from '../../Assets/user-profile-twitter.png'
import youtube from '../../Assets/user-profile-youtube.png'
import profilePic from '../../Assets/rectangle-11.png'
function Collectionprofile({ showFilter , setShowFilter }) {
  const history = useNavigate ();
  // const wallet = useSelector(state => state.WalletConnect);
  // console.log(wallet);
  // const {web3, address, market} = wallet;
  const[address,setaddress]=useState(null);
  const[nftdata,setNftData]=useState([]);
  const[collectiondata,setcollectiondata]=useState([]);
  const[allsearchdata,setallsearchdata]=useState([]);
  const [allcollectiondata,setallcollectiondata]=useState([]);
  const[collectionlength,setcollectionlength]=useState(0);
  const[colectionfloor,setcollectionfloor]=useState(0);
  const[profileInfo,setprofileInfo]=useState({});
  const[collectionenable,setcollectionenable]=useState(false);
  const[nftenable,setnftenable]=useState(true);
  const[hidecollection,sethidecollection]=useState(false)
  const getCollectionData = async(address) => {
    
    let nftdataarray=[];
    let collectionlength=0;
    let collectionfloorprice=0;
    let data={WalletAddress:address,from:"profile"}
    let tokensresult=await axios.post(process.env.REACT_APP_API_URL.toString()+"/getcollections",data);
    console.log(tokensresult.data.result)
    if(tokensresult.data.result.length>0){
      tokensresult.data.result.map((data,i)=>
      {
        collectionlength=collectionlength+data.TokenId.length;
        collectionfloorprice=collectionfloorprice+parseFloat(data.FloorPrice);
        nftdataarray.push(data);
      })
    }
    setcollectiondata(nftdataarray);
    setallsearchdata(nftdataarray);
    setcollectionlength(collectionlength);
    setcollectionfloor((collectionfloorprice/tokensresult.data.result.length).toFixed(2))
  }

   const Collections=(nft)=>
  {
    console.log(nft);
    //alert(JSON.stringify(nft));
    localStorage.setItem('ImageUrl',nft.ImageUrl)
    localStorage.setItem('nft-data',JSON.stringify(nft));
    localStorage.setItem("collectionname",nft.CollectionName);
    history(`/UserCollection/${nft.CollectionName}`);
  }
  const Putonsale=(nft)=>
  {
    console.log(nft)
    if(nft.Status=="Fixedprice"||nft.Status=="Auction")
    {
      history(`/collection/${process.env.REACT_APP_NFT_CONTRACT_ADDRESS}/${nft.NftId}`);
    }
    else{
      localStorage.setItem('ImageUrl',nft.Imageurl)
      localStorage.setItem('nft-data',JSON.stringify(nft))
      history(`/list-item-sale/${nft.NftId}`);
    }
  }

  const getNftData = async(address) => {
    
    let nftdataarray=[];
    let data={WalletAddress:address}
    if(address)
    {
      let tokensresult=await axios.post(process.env.REACT_APP_API_URL.toString()+"/FindNft",data);
      console.log(tokensresult);
      if(tokensresult.status==200)
      { 
        console.log(tokensresult.data.result);
        setNftData(tokensresult.data.result);
        setallcollectiondata(tokensresult.data.result)
      }

      
    }
    
    
  }

  const getprofiledata=async(address)=>{
    let data={WalletAddress:address}
    if(address)
    {
      let tokensresult=await axios.post(process.env.REACT_APP_API_URL.toString()+"/getnft",data);
      console.log(tokensresult.data.result)
      if(tokensresult.data.result.length>0){
        
        if(tokensresult.data.result[0].BannerImage)
        {
          console.log("welcome",tokensresult.data.result[0].PrifileUrl);
          setprofileInfo(tokensresult.data.result[0]);
          // setprofileimage(tokensresult.data.result[0].PrifileUrl);
          // setbannerimage(tokensresult.data.result[0].BannerImage);
          // setuserName(tokensresult.data.result[0].UserName);
          // setprofileabout(tokensresult.data.result[0].About)
        }
      }
    }
  }
  useEffect(() => {
    let url=window.location.href
    url=url.split('/')
    let address=url[url.length-1]
    
    setaddress(address)
    if(address)
    {
      getCollectionData(address);
      getNftData(address);
      getprofiledata(address);
    }
   

   

  }, []);


  const searchInputhandle=async(searchInput,value,min,max)=>
  {
    if(collectionenable)
    {
      if(value)
      {
        let searchdata=collectiondata.filter((e,i)=>{
          return(
            e.CollectionName &&e.CollectionName.toLowerCase().includes(value.toLowerCase())
          )
        })
        setcollectiondata(searchdata)
      }
      else
      {
         setcollectiondata(allsearchdata)
      }
     
    }
    else{
    
   
    if(searchInput=='select')
      {
      
        if(value=='Price Low - High')
          {
            setNftData([]);
            let searchdata=await allcollectiondata.sort(function(a, b) {
            
              
               if (a['Price'] > b['Price']) {    
                return 1;    
            } else if (a['Price'] < b['Price']) {    
                return -1;    
            }    
            return 0;  
           
          });
          console.log(searchdata)
          setNftData(searchdata);
          }
          else if(value=='Price High - Low')
          {
            
            getNftData();
          }
          else if(value=='Recently Listed')
          {
            setNftData([]);
            
            let searchdata=await allcollectiondata.sort(function(a, b) {
            if (a['createdAt'] > b['createdAt']) {    
                return 1;    
            } else if (a['createdAt'] < b['createdAt']) {    
                return -1;    
            }    
            return 0;  
           
          });
          
          console.log(searchdata)
          let length=searchdata.length
           searchdata=searchdata.filter((e,i)=> (i>length-5))
          setNftData(searchdata);
          }
          else if(value=='Ending Soon')
          {
            let auctiondata=allcollectiondata.filter((e,i)=>e.AuctionEndDate!=undefined);
            let searchdata=await auctiondata.sort(function(a, b) {
              if (a['AuctionEndDate'] > b['AuctionEndDate']) {    
                  return 1;    
              } else if (a['AuctionEndDate'] < b['AuctionEndDate']) {    
                  return -1;    
              }    
              return 0;  
             
            });
            let length=searchdata.length
           searchdata=searchdata.filter((e,i)=> (i>length-5))
            setNftData(searchdata);
          }
      }
      else if(searchInput=='type')
      {
        let searchdata=allcollectiondata.filter((e,i)=> e.Type==value);
        setNftData(searchdata);
      }
      else if(searchInput=='button')
      {
        let searchdata=allcollectiondata.filter((e,i)=> e.Status==value);
        setNftData(searchdata);
      }
      else if(searchInput=='usd')
      {
        
        let usdethvalue=parseFloat(value)*0.00029;
        let minethvalue=parseFloat(min)*0.00029;
        let maxethvalue=parseFloat(max)*0.00029;
        let searchdata=allcollectiondata.filter((e,i)=> ((parseFloat(e.Price).toFixed(5)==usdethvalue)||((parseFloat(e.Price).toFixed(5)) > minethvalue&&(parseFloat(e.Price).toFixed(5)) < maxethvalue)));
        setNftData(searchdata);
      }
      else if(searchInput=='onsale')
      {
        
        if(value=='yes')
        {
          let searchdata=allcollectiondata.filter((e,i)=> (e.Status=='Fixedprice'||e.Status=='Auction'));
          setNftData(searchdata);
        }
        else 
        {
          let searchdata=allcollectiondata.filter((e,i)=> e.Status=='Mint');
          setNftData(searchdata);
        }
      }
      else if(searchInput='search'){
        if(value)
       {
        console.log("filterdata",nftdata)
        let serchdata=allcollectiondata.filter((datavalue,i)=>{
          return(
            datavalue.Blockchain && datavalue.Blockchain.toLowerCase().includes(value.toLowerCase()) ||
            datavalue.CollectionName && datavalue.CollectionName.toLowerCase().includes(value.toLowerCase()) ||
            datavalue.Description && datavalue.Description.toLowerCase().includes(value.toLowerCase()) ||
            datavalue.ItemName && datavalue.ItemName.toLowerCase().includes(value.toLowerCase())||
            datavalue.Price && datavalue.Price.toLowerCase().includes(value.toLowerCase())  
          )
        })
        setNftData(serchdata);  
       }
       else{
        getNftData();
       }
      }
    }

       
  }

  const collectionexecute=()=>{
 
    setcollectionenable(!collectionenable);
   
    
  }
    const executeorder=(nft)=>
{
history(`/collection/${process.env.REACT_APP_NFT_CONTRACT_ADDRESS}/${nft.NftId}`);
}
  // globalSearch = () => {
  //   let { searchInput } = this.state;
  //   console.log("valuevaluevalue",this.state.records);
  //   let filteredData = this.state.filterRecords.filter(value => {
  //     return (
  //       value.transactionHash && value.transactionHash.toLowerCase().includes(searchInput.toLowerCase()) ||
  //       value.address && value.address.toLowerCase().includes(searchInput.toLowerCase()) ||
  //       value.usd.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
  //       value.amount.toString().toLowerCase().includes(searchInput.toLowerCase())
  //     );
  //   });
  //   if(this.state.searchInput != ""){
  //     this.setState({ lists: filteredData, });
  //   }else{
  //     this.fetchTransactionHistory();
  //   }
  // };



  return (
    <>
    <div className='container-fluid ProfilePage_page'>
        <div className='row'>
        <div className='col-1'></div>
            <div className='col-10 collction_profile_card_container'>
            {/* <UserProfileCard/>  */}
            <div class="container UserProfile_card">
      <div class="row">
        <div class="col-md-12 col-sm-12 col-sm-12">
          <div class="profile-block">
          <a>
            <div class="profile-block-thumb cover-container" style={{ backgroundImage:profileInfo.BannerImage?`url(${profileInfo.BannerImage})`:`url(https://akm-img-a-in.tosshub.com/indiatoday/images/story/202005/keyboard-5017973_1920.jpeg?NxXWUVUGjpEzDYZAbAUmrfWMvpSA0qPE&size=770:433)`}}>
              {/* <img
                src={banner}
                alt=""
                title=""
              /> */}
            </div>
            </a>
            <div class="profile-img">
              <a >
                <img
                  src={profileInfo.PrifileUrl?profileInfo.PrifileUrl:nft}
                  alt=""
                  title=""
                />
              </a>
            </div>
            <div className='row profile-responsive' >
            
            
              <div className='col-md-4 col-lg-4 col-4'>

              </div>
              <div className='col-md-4 col-lg-4 col-4' >
                <h2 className='Mobile-header'>{profileInfo.UserName?profileInfo.UserName:"User-A"}</h2>
              </div>
              <div className='col-md-4 col-lg-4 col-4' >
                <div className="row " style={{justifyContent:"flex-end"}} >
                  {profileInfo.FaceBook?<div className="col-lg-3">
                      {/* <img  src={fb} alt='social-fb' className="social-img" /> */}
                      <a href={profileInfo.FaceBook} target='_blank'> <img src={fb} alt='social-fb' className="social-img"/></a>
                    </div>:""} 
                    {profileInfo.Twitter? <div className="col-lg-3" >
                    <a href={profileInfo.Twitter} target='_blank' > <img src={twitter} alt='social-fb' className="social-img"/></a>
                    </div>:""} 
                    {profileInfo.Other? <div className="col-lg-3">
                      <a href={profileInfo.Other} target='_blank'> <img src={youtube} alt='social-fb' className="social-img"/></a>
                      {/* <img src={youtube} alt='social-fb' className="social-img"/> */}
                    </div>:""} 
                    {profileInfo.Email? 
                    <div className="col-lg-3">
                      {/* <img src={email} alt='social-fb' className="social-img"/> */}
                      <a href={"mailto:"+profileInfo.Email} target='_blank'> <img src={email} alt='social-fb' className="social-img"/></a>
                    </div>:""} 
                   
                </div>
              </div>
            </div>
            <div className="profile-details">
              <div className="row profile-details-group ">
                <div className="col-lg-1"></div>
                <div className="col-lg-10">
                  <div className="row">
                    <div className="col-lg-6  ">
                      <div className="profile-details-columns">
                        <div className="asset-key user">
                          <span>Items</span>
                          <div className="asset-value">{allcollectiondata.length}</div>
                        </div>

                        <div className="asset-key user">
                          <span>Sales</span>
                          <div className="asset-value">{(collectionlength-nftdata.length)>0?(collectionlength-nftdata.length):0}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 ">
                      <div className="profile-details-columns">
                        <div className="asset-key user">
                          <span>Floor</span>
                          <div className="asset-value">{colectionfloor!=0?colectionfloor:"0"}</div>
                        </div>

                        <div className="asset-key user">
                          <span>Volume</span>
                          <div className="asset-value">0</div>
                        </div>
                      </div>
                    </div>
                  
                  
                  </div>
                  <div className="row  mt-4">
                  <div className='col-4 col-lg-4 col-md-4'></div>
                  <div className='col-4 col-lg-4 col-md-4 '> <h2 style={{color:"#333",opacity: 0.7,fontSize:"40px",fontWeight:"bold",fontStretch:"normal"}}>About</h2></div>
                  <div className='col-4 col-lg-4 col-md-4'></div>
                </div>
                <div className="row">
                  <div className='col-2 col-lg-2 col-md-2'></div>
                  <div className='col-8 col-lg-8 col-md-8'> <p style={{ whiteSpace:"normal"}}>{profileInfo.About?profileInfo.About:""}</p></div>
                  <div className='col-2 col-lg-2 col-md-2'></div>
                </div>    
                </div>

                <div className="col-lg-1"></div>
              </div>
            </div>
            {/* <div className=" container-fluid profile-slogan">
                <div className="row">
                <div className="col-lg-12 profile-slogan-container">
                    <h2>About</h2>
                   
                </div>
                </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
            </div>
            <div className='col-1'></div>
        </div>
        <div className='row'>
        <Filters showFilter={showFilter}  execute={searchInputhandle}  collectionexecute={collectionexecute} setShowFilter={setShowFilter}/>
        </div>
        <div className="row nftcard-body" >
            <div className='col-1'></div> 
            <div className='col-10'>
              
            <div className='container'>
              <div  className='row' style={{justifyContent:"space-around",marginLeft:"1%"}}>
              {(collectiondata !== [] )? collectiondata.map((e, i)=>

<Collectioncard key={i} nft={e} execute={Collections} />

) : ''}
              </div>
              </div>

              <div className='container'>
              <div  className='row'>
              {(nftdata !== [] &&collectionenable!=true) ? nftdata.map((e, i)=>

<ViewCard key={i} nft={e} execute={executeorder} />

) : ''}
              </div>
              </div>
           

         
          
            </div>
            <div className='col-1'></div>
        
        
            </div>
    </div>
    <CopyRightFooter/>
    </>
  )
}

export default Collectionprofile