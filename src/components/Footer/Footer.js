import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
function Footer() {
  const year = new Date().getFullYear();
  //const history = useNavigate ();
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.WalletConnect);
  const { web3, address, provider } = wallet;
  return (
    <div className="footer_Page">
      <div className="row">
        <div className="col-md-1"></div>

        <div className="col-md-6 col-12">
          <div className="row mobile_footer">
            <div className="col-3 listItem_content">
              <ul className="footer_list">
                <li className="footer_list_item">Resources</li>
                <li className="footer_list_item">
                  <a
                    href="https://indi-academy.com/courses-list/"
                    target={"_blank"}
                  >
                    Learning Tools
                  </a>
                </li>
                <li className="footer_list_item">
                  <a href="http://indi-academy.com/" target={"_blank"}>
                    Academy
                  </a>
                </li>
                <li className="footer_list_item">
                  <a href="/resources">Partners</a>
                </li>
                <li className="footer_list_item">
                  <a
                    href="https://indi-academy.com/newsletter/"
                    target={"_blank"}
                  >
                    Newsletters
                  </a>
                </li>
                <li className="footer_list_item">
                  <a
                    href="https://indi-academy.com/about-us/"
                    target={"_blank"}
                  >
                    Our story
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-3 listItem_content">
              <ul className="footer_list">
                <li className="footer_list_item">Marketplace</li>
                <li className="footer_list_item">
                  <a href="/allnft">Explore</a>
                </li>
                <li className="footer_list_item">
                  <a href="/allcollection">Collections</a>
                </li>
              </ul>
            </div>

            <div className="col-3 listItem_content">
              <ul className="footer_list">
                <li className="footer_list_item">My Account</li>
                <li className="footer_list_item">
                  {address==""?<span onClick={()=>{toast("Connect your wallet")}}>Profile</span>:  <a href="/user-profile">Profile</a>}  
             
                </li>
                <li className="footer_list_item">
               {address==""?<span onClick={()=>{toast("Connect your wallet")}}>Favourites</span>: <a href="/likednft">Favourites</a>}  
                </li>
                <li className="footer_list_item">
                 
                  {address==""?<span onClick={()=>{toast("Connect your wallet")}}>My Collections</span>:  <a href="/user-profile">My Collections</a>}  
             
                </li>
                <li className="footer_list_item">
                  <a href="/edit">Settings</a>
                </li>
              </ul>
            </div>

            <div className="col-3 listItem_content">
              <ul className="footer_list">
                <li className="footer_list_item">Legal</li>
                <li className="footer_list_item">
                  <a
                    target={"_blank"}
                    href="https://indigena.nyc3.digitaloceanspaces.com/documents/termsofusepdf.pdf"
                  >
                    Terms &#x26; Conditions
                  </a>
                </li>
                <li className="footer_list_item">
                  <a
                    target={"_blank"}
                    href="https://indigena.nyc3.digitaloceanspaces.com/documents/privacypolicypdf.pdf"
                  >
                    Privacy Policy
                  </a>
                </li>
                {/* <li className='footer_list_item'>Available Countries</li> */}
                <li className="footer_list_item">
                  <a
                    target={"_blank"}
                    href="https://indigena.nyc3.digitaloceanspaces.com/documents/brandguidelinesspdf.pdf"
                  >
                    Brand Guidelines
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6 "></div>
      </div>
      <div className="row footer_copyRight_container">
        <span>Copyright &#9400; {year}. All Rights Reserved.</span>
      </div>
    </div>
  );
}

export default Footer;
