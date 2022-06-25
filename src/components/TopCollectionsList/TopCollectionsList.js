import React,{useState,useEffect} from 'react';
import ListItem from './ListItem';
import "./TopCollectionsList.css";
import TopCollectionsListData from '../SampleData/TopCollectionsList';
import { Link } from 'react-router-dom';
import axios from 'axios';
function TopCollectionsList() {
  const[nftdata,setnftdata]=useState([]);
  const getNftData = async() => {
    let tokensresult=await axios.get(process.env.REACT_APP_API_URL.toString()+"/Top7Collection");
    console.log("Top collection list ",tokensresult.data.result);
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
          <div className="row"  >
              <div className='col-1'></div>
              <div className='col-10 topCollectionsListContainer'>
                  <div className='row'>
                    <div className='col-md-4 col-lg-4 col-12' style={{marginRgiht:'10%'}}>
                    {nftdata.slice(0,5).map((e,index)=>
                  <ListItem collectionName={e.CollectionName} userName={e.FloorPrice} profileImage={e.LogoImage} rating={e.TokenId.length} index={index}/>
                  )}
                    </div>
                    <div className='col-md-4 col-lg-4 col-12' style={{marginRgiht:'10%'}}>
                    {nftdata.slice(4,9).map((e,index)=>
                  <ListItem collectionName={e.CollectionName} userName={e.FloorPrice} profileImage={e.LogoImage} rating={e.TokenId.length} index={5+index}/>
                  )}
                    </div>
                    <div className='col-md-4 col-lg-4 col-12' style={{marginRgiht:'10%'}}>
                    {nftdata.slice(9,14).map((e,index)=>
                  <ListItem collectionName={e.CollectionName} userName={e.FloorPrice} profileImage={e.LogoImage} rating={e.TokenId.length} index={10+index}/>
                  )}
                    </div>
                  
                  </div>
              </div>
         
              <div className='col-1'></div>
        </div>
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