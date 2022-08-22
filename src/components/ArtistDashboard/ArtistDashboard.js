import React from 'react';
import './ArtistDashboard.css';
import ImageIcon from '../../Assets/image-file-icon.png';
import FileCopyIcon from '../../Assets/file-explore-icon.png';
import AudiotrackIcon from '../../Assets/speaker-icon.png';
import CopyRightFooter from '../CopyRightFooter/CopyRightFooter';

function ArtistDashboard() {
    return (
        <>
            <div className=' container-fluid ArtistDashboard_page' >
                <div className="row">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8 ArtistDashboard_container container-fluid ">
                        <div className="row">
                            <div className='ArtistDashboard_title'>
                                <span>Artist Dashboard</span>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="container-fluid artistDashboard_iconGrp">
                                <div className="">
                                    <img src={ImageIcon} alt='image-gallery' /><h6>Image</h6>
                                </div>
                                <div className="">
                                    <img src={FileCopyIcon} alt='FileCopyIcon' /><h6 className='filesHeading'>Files</h6>
                                </div>
                                <div className="">
                                    <img src={AudiotrackIcon} alt='AudiotrackIcon' /><h6>Audio</h6>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className='dashboard_btns'>
                                <button className='dashboard_create_btn'>Create NFTs</button>
                                <button className='dashboard_create_btn'>Create my Collection</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2"></div>
                </div>
            </div>
            <CopyRightFooter />
        </>
    )
}

export default ArtistDashboard