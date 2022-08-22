import React, { useRef } from "react";
import NFT from "../../Assets/NFT-5.png";
import OurCollectionsList from "../SampleData/OurCollectionsList";
import CollectionCard from "../CollectionCard/CollectionCard";
import "./UserCollectionPage.css";
import CopyRightFooter from "../CopyRightFooter/CopyRightFooter";
import { useState } from "react";
import Tilt from "react-parallax-tilt";
import useWindowDimensions from "../../Utils/useWindowDimensions";

function UserCollectionPage() {
  const [file, setFile] = useState(null);
  const fileInput = useRef();
  const {width} = useWindowDimensions()
  return (
    <>
      <div className="UserCollectionPage_page"
       >
        <div className="container-fluid">
          <div className="row UserCollectionPageRow1">
            <Tilt
              className="parallax-effect-img"
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              perspective={800}
              transitionSpeed={900}
              gyroscope={true}
            >
              <div className="col-lg-2 user-details_container">
                <div className="userProfile_card">
                  <div className="profileImage_container">
                    <img className="User-profile-image" src={NFT} alt="" />
                    <div className="user-details">
                      <div>
                        <span className="user-details-name">
                          It_tariz.wallet
                        </span>
                      </div>
                      <div className="view-ProfileContainer">
                        <span className="user-details-view">
                          (View Profile)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
            <div className="col-lg-10 UserCollectionPage_heading_container"></div>
          </div>
          <div className="row collection_heading_container">
            <h1 className="our_collections_heading">Our Collections</h1>
          </div>
          <div className="row">
            <div className="col-1"></div>
            <div className="col-10">
              <div className="row ">
                {OurCollectionsList.map((e) => (
                  <CollectionCard
                    collectionName={e.collectionName}
                    desc={e.desc}
                    collectionImage={e.collectionImage}
                  />
                ))}
              </div>
            </div>
            <div className="col-1"></div>
          </div>
        </div>
      </div>
      <CopyRightFooter />
    </>
  );
}

export default UserCollectionPage;
