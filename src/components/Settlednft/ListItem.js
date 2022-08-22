import React from 'react';
import "./SettledNftList.css";

function ListItem({ nft, execute, index, loading, selectedid }) {

    return (

        <div className='listItem_container'>
            <div className='container-fluid'>
                <div className='row'>

                    <div className='col-2 d-flex align-items-center justify-content-center'  >{index + 1}</div>
                    <div className='col-10'>
                        <div className='row'>
                            <div className='col-2' >
                                <img src={nft.Imageurl} className='listItem_img' />
                            </div>
                            <div className='col-10'>
                                <div className='row'><span className='collectionName'>{nft.ItemName}</span></div>
                                <div className='row floorpricecontainer'>
                                    <div className='col-9'>
                                        <span className='userName'>{nft.NftId}</span>
                                    </div>
                                    <div className='col-3'>
                                        {/* <span className='userName'>{userName}</span> */}
                                        <button className="claim_btn" onClick={() => execute(nft)}>{loading ? selectedid == nft.NftId ? <div className='loading-buy'></div> : "Settle" : "Settle"}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListItem