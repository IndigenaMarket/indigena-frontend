import React, { useEffect, useState } from 'react'
import artcard1 from "../../Assets/rounded-rectangle-card-2.png";
import artcard2 from "../../Assets/rounded-rectangle-card-1.png";
import Hand from "../../Assets/Indi-lab-card-hand.png";
import fireIcon from "../../Assets/fire-icon.png";
import TodayIcon from '@mui/icons-material/Today';
import EditIcon from '@mui/icons-material/Edit';
import "./ArtReflection.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {Fade} from "react-reveal";
import useWindowDimensions from '../../Utils/useWindowDimensions';

function ArtReflection() {
  const {width} = useWindowDimensions()
  const [showGallery, setShowGallery] = useState(false);
  const [nftdata, setNftData] = useState([]);
  const history = useNavigate();
  const hanldeShowGallery = () => {

    setShowGallery(!showGallery)
  }
  const collectionpageswitch = (collectionName) => {
    localStorage.setItem("collectionname", collectionName);
    history(`/UserCollection/${collectionName}`);
  }
  const getNftData = async () => {
    let tokensresult = await axios.get(process.env.REACT_APP_API_URL.toString() + "/getAll");
    if (tokensresult.status == 200) {
      setNftData(tokensresult.data.result);
    }
  }
  useEffect(() => {
    getNftData();
  }, []);
  return (
    <div className="artReflection_section">
      <div className="container-fluid">
        <div className="row" style={{ margin: 0, padding:width > 600 ? "0 0 0 5%"  : "0" }}>
          {/* <div className="col-md-1 col-lg-1"></div> */}
          <Fade left>
          <div className="col-12 col-md-6 col-lg-6 " style={{ marginTop: '5%', padding: 0 }}>
            <div className="row artCard"  >
              <div class="card art_reflection_card col-12" >
                <img class="card-img-top" src={nftdata.length > 0 ? nftdata[nftdata.length - 1].Imageurl : artcard1} onClick={() => collectionpageswitch(nftdata[nftdata.length - 1].CollectionName)} alt="Card image cap" />
                <div class="row card-body">
                  <div className='col-2 col-md-2'>
                    <img
                      src={nftdata.length > 0 ? nftdata[nftdata.length - 1].Imageurl : "data:image/jpeg;base64,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"}
                      className="profileImg"
                    ></img>
                  </div>
                  <div className='col-10 col-md-9'>
                    <div className="userDetails">
                      <div className='row' style={{ whiteSpace: " pre-wrap" }}>
                        <span class="card-title nftTitle">{nftdata.length > 0 ? nftdata[nftdata.length - 1].ItemName : "Pixel Art"}</span>
                      </div>
                      <div className='row'>
                        <span className="usernmae">{nftdata.length > 0 ? "@" + nftdata[nftdata.length - 1].CollectionName : "@Amy2833"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card art_reflection_card col-12 mt-5" >
                <img class="card-img-top" src={nftdata.length > 1 ? nftdata[nftdata.length - 2].Imageurl : artcard2} onClick={() => collectionpageswitch(nftdata[nftdata.length - 2].CollectionName)} alt="Card image cap" />
                <div class="row card-body">
                  <div className='col-2 col-md-2'>
                    <img
                      src={nftdata.length > 1 ? nftdata[nftdata.length - 2].Imageurl : "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"}
                      className="profileImg"
                    ></img></div>
                  <div className='col-10 col-md-9'>
                    <div className="userDetails">
                      <div className='row' style={{ whiteSpace: " pre-wrap" }}>
                          <span class="card-title nftTitle">{nftdata.length > 1 ? nftdata[nftdata.length - 2].ItemName : "Pixel Art"}</span>
                      </div>
                      <div className='row' style={{ whiteSpace: " pre-wrap" }}>
                        <span className="usernmae">{nftdata.length > 1 ? "@" + nftdata[nftdata.length - 2].CollectionName : "@KanyeWe "}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </Fade>
          <Fade right>
          <div className="col-12 col-md-6 col-lg-6 right_side_main_content" style={{ marginTop: width > 600 && '5%',padding: width < 600 && 0 }}>
            <div className={showGallery ? 'right_side_content_not_active' : 'right_side_content'}>
              <h4 className="ourArtHeading">Our Art is Our Reflection</h4>
              <p className="right_side_desc">
                Our art tells our story and as indigenous people this has been
                passed down from generation to generation. Our art is our
                expression of our cultural being.<br /> <p className="powerToArtist"> Power to the Artist</p>
              </p>
              <img className="section-2-hand-img" onClick={hanldeShowGallery} src={Hand} alt='handPng' />
            </div>
            <div className={showGallery ? 'right_side_content_active' : 'right_side_content_not_active'}>
              <button className="showGallery_btn" onClick={() => history('/marketplace')}>Gallery</button>
              <img className="section-2-hand-img" onClick={hanldeShowGallery} src={Hand} alt='handPng' />
            </div>
          </div>
          </Fade>
        </div>

        <div className="row speedBar">
          <div className="col-4 col-lg-4 col-md-4 iconRed ml-0" style={{ cursor: "pointer" }}>
            <img src={fireIcon} onClick={() => window.scrollTo(0, 2700)} alt='fire-icon' height={18} width={18}/>
          </div>
          <div onClick={() => window.scrollTo(0, 3300)} className="col-4 col-lg-4 col-md-4 iconRed" style={{ cursor: "pointer" }}>
            <TodayIcon />
          </div>
          <div onClick={() => window.scrollTo(0, 4800)} className="col-4 col-lg-4 col-md-4 iconRed" style={{ cursor: "pointer" }}>
            <EditIcon />
          </div>

        </div>
      </div>
    </div>
  );
}

export default ArtReflection;
