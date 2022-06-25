import React from 'react';
import "./TopCollectionsList.css";
import { useNavigate } from "react-router-dom";
function ListItem({rating,profileImage,userName,collectionName,index}) {
    let history=useNavigate();
    const collectionpageswitch=()=>
    {
        localStorage.setItem("collectionname",collectionName);
  history(`/UserCollection/${collectionName}`);
    }
  return (
      
    <div className='listItem_container'>
        <div className='container-fluid'>
            <div className='row'>
                 
                 <div className='col-2'  >{index+1}</div>
               <div className='col-8'>
<div className='row'>
<div className='col-2' >
                    <img src={profileImage}  style={{cursor: "pointer"}}onClick={()=>collectionpageswitch()} className='listItem_img'/ >
                </div>
                 <div className='col-10'>
                     <div className='row'><span className='collectionName'>{collectionName}</span></div>
                   
                   <div className='row floorpricecontainer'>
                       <div className='col-9'>
                            <span className='userName'>Floor Price</span>
                       </div>
                       <div className='col-3'>
                       <span className='userName'>{userName}</span>
                       </div>
                    </div>    
                 </div>
</div>
               </div>
               <div className='col-2'>
                   <span>{rating}</span>
               </div>
                 

                {/* <div className='col-2'  style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>{index+1}</div>
                <div className='col-2' style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <img src={profileImage} className='listItem_img'/>
                </div>
                <div className='col-6' style={{display:'flex',alignItems:'flex-start',flexDirection:'column'}}>
                    <h4 className='collectionName'>{collectionName}</h4>
                    <span className='userName'>{userName}</span>
                   
                </div>
                <div className='col-2'style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <span className='collection_pts'>+{rating}%</span>
                </div> */}
            </div>
        </div> 
    </div>
   
  )
}

export default ListItem