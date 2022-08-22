import React from "react";
import "./ResourcePage.css";
import SearchIcon from "@mui/icons-material/Search";
import resourceData from "../SampleData/ResourcePage";
import ResourcePageCard from "./ResourcePageCard";
import FAQAccordion from "../FAQAccordion/FAQAccordion";
import CopyRightFooter from "../CopyRightFooter/CopyRightFooter";
import FAQHeadings from "../SampleData/FAQHeadings";
import useWindowDimensions from "../../Utils/useWindowDimensions";

function ResourcePage() {
  const {width} = useWindowDimensions();
  return (
    <>
      <div
        className="container-fluid ResourcePage"
      >
        <div className="row resourceRow1">
          <div className="col-lg-12 col-md-12 col-12">
            <div className="resource_banner">
              <div className="resourceSearch_container">
                {/* <div className="resource_search">
                        <input className="resource_searchbar" placeholder="Search" type="text" name="txtBox" />
                        <button className="resource_search_btn">
                        <SearchIcon color="action" class="resource_search_icon"></SearchIcon>
                        </button>
                        </div> */}
                <h1 style={{ color: "white" }}>Help centre</h1>
                <p style={{ color: "white" }}>
                  Read our guides to get you started
                </p>
                <button
                  class="btn btn-success"
                  style={{
                    background: "none",
                    backgroundColor: "#b22222",
                    boxShadow:
                      "0 4px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.002)",
                    color: "white",
                    width: "140px",
                    height: "35px",
                  }}
                  onClick={() =>
                    window.open(
                      "https://indi-academy.com/help-centre/",
                      "_blank"
                    )
                  }
                >
                  Click here
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row resourceRow2">
          {
            width > 600 && <div className="col-lg-1"></div>
          }
          <div className="col-lg-10 col-12">
            <div className="row" style={{padding: width < 600 && "0 5%"}}>
              {resourceData.map((e, i) => (
                <ResourcePageCard
                  heading={e.heading}
                  desc={e.desc}
                  index={i}
                  url={e.url}
                  width={width}
                />
              ))}
            </div>
          </div>
          {
            width > 600 && <div className="col-lg-1"></div>
          }
        </div>

        <div className="row resourceRow3">
          <div className="col-lg-2 col-1"></div>
          <div className="col-lg-8 col-10 faq_accordion_containe">
            <FAQAccordion />
          </div>
          <div className="col-lg-2 col-1"></div>
        </div>
      </div>
      <CopyRightFooter />
    </>
  );
}

export default ResourcePage;
