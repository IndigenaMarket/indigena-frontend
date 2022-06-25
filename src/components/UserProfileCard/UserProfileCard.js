import React from "react";
import './UserProfileCard.css'
import nft from '../../Assets/nft.png'
import fb from '../../Assets/user-profile-fb.png'
import email from '../../Assets/user-profile-email.png'
import twitter from '../../Assets/user-profile-twitter.png'
import youtube from '../../Assets/user-profile-youtube.png'
import profilePic from '../../Assets/rectangle-11.png'

function UserProfileCard() {
  
  return (
    <div class="container UserProfile_card">
      <div class="row">
        <div class="col-md-12 col-sm-12 col-sm-12">
          <div class="profile-block">
            <div class="profile-block-thumb cover-container">
              {/* <img
                src={banner}
                alt=""
                title=""
              /> */}
            </div>
            <div class="profile-img">
              <a href="#">
                <img
                  src={nft}
                  alt=""
                  title=""
                />
              </a>
            </div>
            <div className="profile-Contact">
              <div className="row CollectionSocialIcon_Container ">
                <div className="col-lg-6"></div>
                <div className="col-lg-6 ">
                  <div className="row ml-1">
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
                          <div className="asset-value">xxxxxxx</div>
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
  );
}

export default UserProfileCard;