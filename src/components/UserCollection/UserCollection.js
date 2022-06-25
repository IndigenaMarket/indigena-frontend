import React, { useEffect, useState } from 'react'
import FilterNav from '../FilterNav/FilterNav'
import NFTCard from '../NFTCard/NFTCard'
import UserProfileCard from '../UserProfileCard/UserProfileCard';
import NFTCardData from '../SampleData/TopTrendingList';
import CopyRightFooter from '../CopyRightFooter/CopyRightFooter';
import './UserCol.css';
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
function UserCollection({ showFilter , setShowFilter }) {
  const history = useNavigate ();
  const wallet = useSelector(state => state.WalletConnect);
  console.log(wallet);
  const {web3, address, market} = wallet;

  const[nftdata,setNftData]=useState([]);
  const[profileimage,setprofileimage]=useState('');
  const[bannerimage,setbannerimage]=useState('');


  const getNftData = async() => {
    // let data1 = [];

    // const fetchDetails = async(id) => {
    //   const contractAddress = '0xaE8DbaB8A4818D25f02d7920fa9c5F0fdB1a9c1a';
    //   const instance = new web3.eth.Contract(nftAbi, contractAddress);
    //   const uri = await instance.methods.tokenURI(id).call();
    //   const res = await axios.get(uri);
    //   res.data.price = '0.01';
    //   res.data.contractAddress = contractAddress;
    //   res.data.tokenId = id;
    //   res.data.seller = address;
    //   res.data.buyer = '0x0724b4e1B19BEAfDBc812597FDac138D26d79D98';
    //   res.data.orderType = 0;
    //   res.data.qty = 1;
    //   res.data.tokenAddress = '0xD99b4BB049a6Dd490901CDfa33F15C4fAc097EF0';

    //   return res.data;
    // }

    // for(let i = 1; i < 6; i++) {
    //     data1.push(await fetchDetails(i));
    // }

    // await Promise.all(data);
    // console.log("quanti",data1);

    // setNftData(data);
    let url=window.location.href
    url=url.split('/')
    let CollectionName=url[url.length-1]
    let nftdataarray=[];
    let data={WalletAddress:address,CollectionName:CollectionName,from:"profile-collection"}
    let tokensresult=await axios.post(process.env.REACT_APP_API_URL.toString()+"/getcollections",data);
    console.log(tokensresult.data.result)
    if(tokensresult.data.result.length>0){
      const nftcount=tokensresult.data.result[0].TokenId.length;
      console.log(tokensresult.data.result[0]);
      if(tokensresult.data.result[0].BannerImage)
      {
        console.log("welcome",tokensresult.data.result[0].PrifileUrl);
        setprofileimage(tokensresult.data.result[0].PrifileUrl)
        setbannerimage(tokensresult.data.result[0].BannerImage)
      }
     
      await tokensresult.data.result[0].TokenId.map(async(tokenid)=>
      {
        let nftresult=await axios.get("https:/indigenanft.s3.amazonaws.com/"+tokenid+".json")
        console.log(nftresult.data.pinataContent);
         nftdataarray.push(nftresult.data.pinataContent);
        if(nftcount==nftdataarray.length)
        {
          console.log('Hi')
          console.log("nftdataarray",nftdataarray);
          setNftData(nftdataarray);
        }
      })
    }
   
    
    
  }

   const Putonsale=(nft)=>
  {
    console.log(nft)
    // alert(id);
    localStorage.setItem('ImageUrl',nft.ImageUrl)
    localStorage.setItem('nft-data',JSON.stringify(nft))
    history(`/list-item-sale/${nft.tokenId}`);
  }
  useEffect(() => {

    if(wallet.connected) {

      getNftData();

    }

   

  }, [wallet.connected]);

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
          <a href="/edit">
            <div class="profile-block-thumb cover-container" style={{ backgroundImage:bannerimage!==''?`url(${bannerimage})`:`url(https://akm-img-a-in.tosshub.com/indiatoday/images/story/202005/keyboard-5017973_1920.jpeg?NxXWUVUGjpEzDYZAbAUmrfWMvpSA0qPE&size=770:433)`}}>
              {/* <img
                src={banner}
                alt=""
                title=""
              /> */}
            </div>
            </a>
            <div class="profile-img">
              <a href="/edit">
                <img
                  src={profileimage!==''?profileimage:nft}
                  alt=""
                  title=""
                />
              </a>
            </div>
            <div className="profile-Contact">
              <div className="row CollectionSocialIcon_Container">
                <div className="col-lg-9"></div>
                <div className="col-lg-3 ">
                  <div className="row">
                    <div className="col-lg-3">
                      <img  src={fb} alt='social-fb' className="social-img" />
                    </div>
                    <div className="col-lg-3">
                      <img src={twitter} alt='social-fb' className="social-img"/>
                    </div>
                    <div className="col-lg-3">
                      <img src={youtube} alt='social-fb' className="social-img"/>
                    </div>
                    <div className="col-lg-3">
                      <img src={email} alt='social-fb' className="social-img"/>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-name">
              <h2>Kai</h2>
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
                          <div className="asset-value">{nftdata.length}</div>
                        </div>

                        <div className="asset-key user">
                          <span>Sales</span>
                          <div className="asset-value">xxxxxxx</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 ">
                      <div className="profile-details-columns">
                        <div className="asset-key user">
                          <span>Floor</span>
                          <div className="asset-value">xxxxxxx</div>
                        </div>

                        <div className="asset-key user">
                          <span>Volume</span>
                          <div className="asset-value">xxxxxxx</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-1"></div>
              </div>
            </div>
            <div className=" container-fluid profile-slogan">
                <div className="row">
                <div className="col-lg-12 profile-slogan-container">
                    <h2>Slogan</h2>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
            </div>
            <div className='col-1'></div>
        </div>
        <div className='row'>
        <FilterNav showFilter={showFilter}  setShowFilter={setShowFilter}/>
        </div>
        <div className="row" >
            <div className='col-1'></div> 
            <div className='col-10'>
              <div className='row'> 
              {nftdata !== [] ? nftdata.map((e, i)=>

<NFTCard key={i} nft={e} execute={Putonsale} />

) : ''}
          </div>
            </div>
            <div className='col-1'></div>
        
        
            </div>
    </div>
    <CopyRightFooter/>
    </>
  )
}

export default UserCollection