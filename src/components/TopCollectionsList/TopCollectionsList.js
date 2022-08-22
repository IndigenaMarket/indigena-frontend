import React,{useState,useEffect} from 'react';
import ListItem from './ListItem';
import "./TopCollectionsList.css";
import TopCollectionsListData from '../SampleData/TopCollectionsList';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Fade} from "react-reveal";
import useWindowDimensions from '../../Utils/useWindowDimensions';

function TopCollectionsList() {
  const {width} = useWindowDimensions()
  const[nftdata,setnftdata]=useState([]);
  const getNftData = async() => {
    let tokensresult=await axios.get(process.env.REACT_APP_API_URL.toString()+"/Top7Collection");
    setnftdata(tokensresult.data.result);
  }
  useEffect(() => {
getNftData();
}, []);
  return (
    <div className="topCollections_page">
      <div className="container-fluid">
          <div className="row topCollections_heading_container">
              <h1 className="topCollections_heading">Top Collections Over <span className='seven_days'>Last 7 days</span></h1>
          </div>
          <Fade bottom>
          <div className="row"  >
            {
              width > 600 ? <div className='col-1'></div> : null
            }
              
              <div className='col-12 col-md-10 topCollectionsListContainer '>
                  <div className='row '>
                    <div className='col-md-4 col-lg-4 col-sm-4 col-12 ' >
                    {nftdata.slice(0,5).map((e,index)=>
                  <ListItem collectionName={e.CollectionName} userName={e.FloorPrice} profileImage={e.LogoImage} rating={e.TokenId.length} index={index} blockchain={e.Blockchain} />
                  )}
                    </div>
                    <div className='col-md-4 col-lg-4  col-sm-4 col-12 ' >
                    {nftdata.slice(4,9).map((e,index)=>
                  <ListItem collectionName={e.CollectionName} userName={e.FloorPrice} profileImage={e.LogoImage} rating={e.TokenId.length} index={5+index} blockchain={e.Blockchain}/>
                  )}
                    </div>
                    <div className='col-md-4 col-lg-4 col-sm-4 col-12' >
                    {nftdata.slice(9,14).map((e,index)=>
                  <ListItem collectionName={e.CollectionName} userName={e.FloorPrice} profileImage={e.LogoImage} rating={e.TokenId.length} index={10+index} blockchain={e.Blockchain}/>
                  )}
                    </div>
                  
                  </div>
              </div>
              {
              width > 600 ? <div className='col-1'></div> : null
              }
        </div>
        </Fade>
        <div className="row btn_row" >
          <Link to='stats'>
            <button className="section-bottom-button">Stats</button>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default TopCollectionsList