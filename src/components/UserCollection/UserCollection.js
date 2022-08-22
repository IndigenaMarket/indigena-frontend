import React, { useEffect, useState } from 'react'
import FilterNav from '../FilterNav/FilterNav'
import NFTCard from '../NFTCard/NFTCard'
import UserProfileCard from '../UserProfileCard/UserProfileCard';
import NFTCardData from '../SampleData/TopTrendingList';
import CopyRightFooter from '../CopyRightFooter/CopyRightFooter';
import './UserCol.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
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
  const {web3, address, market} = wallet;

  const[nftdata,setNftData]=useState([]);
  const[profileimage,setprofileimage]=useState('');
  const[bannerimage,setbannerimage]=useState('');


  const getNftData = async() => {
    let url=window.location.href
    url=url.split('/')
    let CollectionName=url[url.length-1]
    let nftdataarray=[];
    let data={WalletAddress:address,CollectionName:CollectionName,from:"profile-collection"}
    let tokensresult=await axios.post(process.env.REACT_APP_API_URL.toString()+"/getcollections",data);
    if(tokensresult.data.result.length>0){
      const nftcount=tokensresult.data.result[0].TokenId.length;
      if(tokensresult.data.result[0].BannerImage)
      {
        setprofileimage(tokensresult.data.result[0].PrifileUrl)
        setbannerimage(tokensresult.data.result[0].BannerImage)
      }
      await tokensresult.data.result[0].TokenId.map(async(tokenid)=>
      {
        let nftresult=await axios.get(process.env.REACT_APP_INDIGENA_BUCKETNAME+tokenid+".json") 
         nftdataarray.push(nftresult.data.pinataContent);
        if(nftcount==nftdataarray.length)
        {
          setNftData(nftdataarray);
        }
      })
    }
  }

   const Putonsale=(nft)=>
  {
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
    <div className='container-fluid ProfilePage_page' >
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

<NFTCard key={i} nft={e} execute={Putonsale} address={address} />

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