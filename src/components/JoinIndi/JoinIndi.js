import React from "react";
import "./JoinIndi.css";
import IndiLabCard from "../../Assets/Indi-lab-card-without-hand.png";
import HandImage from "../../Assets/Indi-lab-card-hand.png";
import TwitterIcon from "../../Assets/twitter-button.png";
import DiscordIcon from "../../Assets/discord-button.png";
import RedditIcon from "../../Assets/discord-button2.png";
import FacebookIcon from "../../Assets/facebook-button.png";
import TwitterIconHover from "../../Assets/twitter-button-hover.png";
import DiscordIconHover from "../../Assets/discord-button-hover.png";
import RedditIconHover from "../../Assets/discord-button2-hover.png";
import FacebookIconHover from "../../Assets/facebook-button-hover.png";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { useState } from "react";
import { Fade, Flip } from "react-reveal";
function JoinIndi() {
  const [showContactDetails, setShowContactDetails] = useState(false);

  const hanldeShowContactDetails = () => {
    setShowContactDetails(!showContactDetails);
  };

  const handleScroll = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="join_Indi_page">
      <Flip bottom>
        <div className="container-fluid">
          <div className="row join_Indi_heading_container">
            <h3 className="join_Indi_heading">
              Join INDI Labs Developers Program
            </h3>
          </div>
          <div className="row joinIndi_image">
            <div
              className={
                showContactDetails
                  ? "contact_Details_not_active"
                  : "contact_Details_content"
              }
            >
              <img className="IndiCardLab_Img" src={IndiLabCard} />
              <img
                className={
                  showContactDetails ? "hand_img_not_active" : "hand_img_active"
                }
                onClick={hanldeShowContactDetails}
                src={HandImage}
              />
            </div>
            <div
              className={
                showContactDetails
                  ? "contact_Details_active"
                  : "contact_Details_not_active"
              }
            >
              <div className="contactDetails_contianer container-fluid">
                <div className="row">
                  <div className="col-12">
                    <p className="indiLabsDesc">
                      {" "}
                      INDI Labs (not for profit) ae committed to building the
                      infrastructure required for large-scale adoption of NFTs
                      &#9400; Cryptocurrencies on the Indigena market
                      Eco-System. INDI Labs Developer Program, funded by the the
                      INDI Labs allows developers to get involved in the
                      Indigena ecosystem while taking on technological
                      challenges to enhance their skills.Developers around the
                      world are encouraged to join the INDI Labs Developer
                      Program to help create exciting new projects on the
                      ecosystem
                    </p>
                  </div>
                </div>
                <div className="row mobile_contact_us_row">
                  <div className="col-6" style={{ margin: 0, padding: 0 }}>
                    <span className="tojoin">
                      To join the Indi Labs Developers Program <br /> Fill out
                      this form
                    </span>
                  </div>
                  <div
                    className="col-6"
                    style={{ display: "inline-block", position: "relative" }}
                  >
                    <button
                      className="contact_us_btn"
                      onClick={hanldeShowContactDetails}
                    >
                      Contact us
                    </button>
                    <button className="wrk_tgthr_btn">
                      Let's work together!
                    </button>
                  </div>
                </div>
              </div>
              <img
                className={
                  showContactDetails ? "hand_img_not_active" : "hand_img_active"
                }
                onClick={hanldeShowContactDetails}
                src={HandImage}
              />
            </div>
          </div>
          <div className="row" style={{ marginTop: "10%" }}>
            <div className="col-1"></div>
            <div className="col-6"></div>
            <div className="col-5">
              <div className="row">
                <div className="col-6 joinComunity_rightSide">
                  <div className="row mb-3">
                    <h6 className="join_community_heading">
                      Join Our Community
                    </h6>
                  </div>
                  <div className="row">
                    <div className="join_community_icons_container">
                      <div className="img-box1">
                        <a
                          href="https://www.facebook.com/Indigenamarket"
                          target="_blank"
                        >
                          <img
                            className="socialIcon_img1"
                            src={FacebookIcon}
                            alt="socialIcon"
                          />
                        </a>
                        <a
                          href="https://www.facebook.com/Indigenamarket"
                          target="_blank"
                        >
                          <img
                            className="socialIcon_hover_img1"
                            src={FacebookIconHover}
                            alt="socialIcon"
                          />
                        </a>
                      </div>
                      <div className="img-box2">
                        <a
                          href="https://discord.com/invite/Zxn2kmaMEM"
                          target="_blank"
                        >
                          <img
                            className="socialIcon_img2"
                            src={DiscordIcon}
                            alt="socialIcon"
                          />
                        </a>
                        <a
                          href="https://discord.com/invite/Zxn2kmaMEM"
                          target="_blank"
                        >
                          <img
                            className="socialIcon_hover_img2"
                            src={DiscordIconHover}
                            alt="socialIcon"
                          />
                        </a>
                      </div>
                      <div className="img-box3">
                        <a href="https://twitter.com/INDICoin2" target="_blank">
                          <img
                            className="socialIcon_img3"
                            src={TwitterIcon}
                            alt="socialIcon"
                          />
                        </a>
                        <a href="https://twitter.com/INDICoin2" target="_blank">
                          <img
                            className="socialIcon_hover_img3"
                            src={TwitterIconHover}
                            alt="socialIcon"
                          />
                        </a>
                      </div>
                      <div className="img-box4">
                        <a
                          href="https://www.reddit.com/r/IndigenaMarket/?utm_medium=android_app&utm_source=share"
                          target="_blank"
                        >
                          <img
                            className="socialIcon_img4"
                            src={RedditIcon}
                            alt="socialIcon"
                          />
                        </a>
                        <a
                          href="https://www.reddit.com/r/IndigenaMarket/?utm_medium=android_app&utm_source=share"
                          target="_blank"
                        >
                          {" "}
                          <img
                            className="socialIcon_hover_img4"
                            src={RedditIconHover}
                            alt="socialIcon"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="join_community_icons_container_mobile">
                      <img
                        className="socialIcon_img1"
                        src={FacebookIcon}
                        alt="socialIcon"
                      />

                      <img
                        className="socialIcon_img2"
                        src={DiscordIcon}
                        alt="socialIcon"
                      />

                      <img
                        className="socialIcon_img3"
                        src={TwitterIcon}
                        alt="socialIcon"
                      />

                      <img
                        className="socialIcon_img4"
                        src={RedditIcon}
                        alt="socialIcon"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6 scrollToTop" onClick={handleScroll}>
                  <KeyboardDoubleArrowUpIcon className="go_to_top_btn" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Flip>
    </div>
  );
}

export default JoinIndi;
