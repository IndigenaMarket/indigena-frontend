import React from "react";
import "./ResourcesStarted.css";
import ResourcesStartedCard from "./ResourcesStartedCard";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import resourceCardData from "../SampleData/ResourcesStarted";
import resourceImage1 from '../../Assets/resource-card-1.png'
import resourceImage2 from '../../Assets/resource-card-2.png'
import resourceImage3 from '../../Assets/resource-card-3.png'

function ResourcesStarted() {
  return (
    <div className="ResourcesStarted_page">
      <div className="container-fluid ResourcesStarted_container">
        <div className="row resources_heading_container">
          <h1 className="resources_heading">Resources for getting started</h1>
        </div>
        <div className="row " style={{marginBottom:'5%'}}>
            <div className="col-1"></div>
            <div className="col-10">
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-10">
                    <div className="row pcCardResourceStartedContainer">
                    <div className="row pc_resourceCard">
                      {resourceCardData.map((e)=>
                    <ResourcesStartedCard image={e.image} url={e.url}/>
                    )}</div>
                    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                      <div className="row">
                      <div class="carousel-item active">
                        <img class="d-block w-70" src={resourceImage1} alt="First slide" />
                      </div>
                      <div class="carousel-item">
                        <img class="d-block w-70" src={resourceImage2} alt="Second slide" />
                      </div>
                      <div class="carousel-item">
                        <img class="d-block w-70" src={resourceImage3} alt="Third slide" />
                      </div>
                      </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                    
                    </div>
                  </div>
                  <div className="col-1"></div>
           
          </div>
            </div>
            <div className="col-1">
            {/* <KeyboardDoubleArrowUpIcon className="go_to_top_btn"/> */}
            </div>
        </div>
      </div>
    </div>
  );
}

export default ResourcesStarted;
