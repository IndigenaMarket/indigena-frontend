import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useState } from "react";
import CopyRightFooter from "../CopyRightFooter/CopyRightFooter";
import "./EditUser.css";
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
// import S3 from 'react-aws-s3';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../s3client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormatDate1 } from "../Helper/index";
import CountryData from "../../Assets/country/countries.json"
import useWindowDimensions from "../../Utils/useWindowDimensions";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function EditUser() {
  const {width} = useWindowDimensions()
  const wallet = useSelector((state) => state.WalletConnect);
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [banner, setbanner] = useState(null);
  const fileInput = useRef();
  const bannerInput = useRef();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [userName, setuserName] = useState("");
  const [profileImage, setprofileImage] = useState("");
  const [bannerImage, setbannerImage] = useState("");
  const [about, setabout] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [country, setcountry] = useState("");
  const [twitter, settwitter] = useState("");
  const [facebook, setfacebook] = useState("");
  const [other, setother] = useState("");
  const [createdAt, setcreatedAt] = useState("");
  const history = useNavigate();
  const { web3, address, market } = wallet;
  const profileImageHandle = async (file) => {
    const currenttimestamp = new Date().getTime();
    const contentType = file.type;
    const fPath = file.uri;
    let name = file.name;
    let extension = "." + name.split(".").pop();
    const bucketParams = {
      Bucket: "indigena",
      Key: "profilepic" + currenttimestamp + extension,
      Body: file,
      ContentType: contentType,
      ACL: "public-read",
    };
    setFile(file);
    const filename =
      process.env.REACT_APP_INDIGENA_BUCKETNAME +
      "profilepic" +
      currenttimestamp +
      extension;
    try {
      const res = await s3Client.send(new PutObjectCommand(bucketParams));

      setprofileImage(filename);
    } catch (e) {
      // console.log("Error", e);
    }
  };
  const bannerImageHandle = async (file) => {
    const currenttimestamp = new Date().getTime();
    const contentType = file.type;
    const fPath = file.uri;
    let name = file.name;
    let extension = "." + name.split(".").pop();
    const bucketParams = {
      Bucket: "indigena",
      Key: "bannerpic" + currenttimestamp + extension,
      Body: file,
      ContentType: contentType,
      ACL: "public-read",
    };
    setbanner(file);
    const filename =
      process.env.REACT_APP_INDIGENA_BUCKETNAME +
      "bannerpic" +
      currenttimestamp +
      extension;

    try {
      const res1 = await s3Client.send(new PutObjectCommand(bucketParams));
    
      setbannerImage(filename);
    } catch (e) {
      // console.log("Error", e);
    }
  };

  const Updateprofile = async () => {
    let data = {};
    if (address == "") {
      toast("Connect your wallet");
      return;
    }
    if (userName != "") {
      data["UserName"] = userName;
    }
    if (email != "") {
      data["Email"] = email;
    }
    if (phoneNumber != "") {
      data["PhoneNumber"] = phoneNumber;
    }
    if (country != "") {
      data["Country"] = country;
    }
    if (firstName != "") {
      data["FirstName"] = firstName;
    }
    if (lastName != "") {
      data["LastName"] = lastName;
    }
    if (profileImage != "") {
      data["PrifileUrl"] = profileImage;
    } else {
      data["PrifileUrl"] =
        "https://indigena.nyc3.digitaloceanspaces.com/profilepic1657865457220nft.png";
    }
    if (bannerImage != "") {
      data["BannerImage"] = bannerImage;
    } else {
      data["BannerImage"] =
        "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202005/keyboard-5017973_1920.jpeg?NxXWUVUGjpEzDYZAbAUmrfWMvpSA0qPE&size=770:433";
    }

    if (about != "") {
      data["About"] = about;
    }
    if (facebook != "") {
      data["FaceBook"] = facebook;
    }
    if (twitter != "") {
      data["Twitter"] = twitter;
    }
    if (other != "") {
      data["Other"] = other;
    }
    if (address != "") {
      data["WalletAddress"] = address;
    }

    if (
      wallet.connected &&
      userName &&
      // email &&
      // address &&
      // phoneNumber &&
      // country &&
      firstName &&
      lastName
    ) {
      let result = await axios.put(
        process.env.REACT_APP_API_URL.toString() + "/editprofile",
        data
      );
      if (result.status) {
        toast("Updated success");
        history("/user-profile");
      }
    } else {
      if (!wallet.connected) {
        toast("Please connect your wallet");
      } else if (userName == "") {
        toast("Please enter the username");
      }
      //  else if (email == "") {
      //   toast("Please enter the email");
      // } else if (phoneNumber == "") {
      //   toast("Please enter the phone number");
      // } else if (country == "") {
      //   toast("Please select the country");
      // }
      else if (firstName == "") {
        toast("Please select the firstname");
      } else if (lastName == "") {
        toast("Please select the lastname");
      }
    }
  };
  useEffect(() => {
    if (wallet.connected) {
      getNftData();
    }
  }, [wallet.connected]);
  const getNftData = async () => {
    let nftdataarray = [];
    let data = { WalletAddress: address };
    let tokensresult = await axios.post(
      process.env.REACT_APP_API_URL.toString() + "/getnft",
      data
    );
    setfirstName(tokensresult.data.result[0].FirstName);
    setlastName(tokensresult.data.result[0].LastName);
    setuserName(tokensresult.data.result[0].UserName);
    setprofileImage(tokensresult.data.result[0].PrifileUrl);
    setFile(tokensresult.data.result[0].PrifileUrl);
    setbannerImage(tokensresult.data.result[0].BannerImage);
    setbanner(tokensresult.data.result[0].BannerImage);
    setabout(tokensresult.data.result[0].About);
    setemail(tokensresult.data.result[0].Email);
    setphoneNumber(tokensresult.data.result[0].PhoneNumber);
    setcountry(tokensresult.data.result[0].Country);
    settwitter(tokensresult.data.result[0].Twitter);
    setfacebook(tokensresult.data.result[0].FaceBook);
    setother(tokensresult.data.result[0].Other);
    setcreatedAt(tokensresult.data.result[0].createdAt);
  };
  const logoutclicked = () => {
    history("/");
  };
  return (
    <>
      <div className="EditUser_page" >
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2 col-2 col-md-2">
              <LogoutIcon onClick={() => logoutclicked()} />
            </div>
            <div className="col-lg-10"></div>
          </div>
          <div className="row">
            <div className="col-0 col-md-3 "></div>
            <div className="col-12 col-md-6">
              <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6 headingContainer">
                  <span className="EditUser_Heading">Account</span>
                </div>
                <div className="col-lg-3"></div>
              </div>
              <form>
                <div class="form-group ">
                  <div className="col-lg-12 collection_input_label">
                    <span>{"Profile" + " *"}</span>
                  </div>
                  <small
                    id="exampleFormControlSelect1"
                    class="form-text text-muted collectionSmallText"
                  >
                    Profile Details can be edited here.
                  </small>
                  <input
                    type="text"
                    class="form-control user-name-input"
                    id="exampleInputEmail1"
                    placeholder="First name"
                    style={{ height: "45px" }}
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    class="form-control user-name-input"
                    id="exampleInputEmail1"
                    placeholder="Last name"
                    style={{ height: "45px" }}
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  />
                  <input
                    type="text"
                    class="form-control user-name-input"
                    id="exampleInputEmail1"
                    placeholder="User name"
                    style={{ height: "45px" }}
                    value={userName}
                    onChange={(e) => setuserName(e.target.value)}
                  />
                </div>
                <div className="form-group ">
                  <div className="col-lg-12 collection_input_label">
                    <span>Profile Image</span>
                  </div>
                  <div className="profileImage_container">
                    <div className="container col-lg-3">
                      <label htmlFor="fileInput">
                        <span className="writeIcon">
                          {profileImage == "" ? (
                            <div
                              className="imgUpload"
                              style={{
                                backgroundColor: "rgba(0,0,0,0.05)",
                                color: "rgba(0,0,0,0.1)",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              upload
                            </div>
                          ) : (
                            <img
                              className="imgUpload"
                              src={profileImage}
                              alt=""
                            />
                          )}
                        </span>
                      </label>

                      <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e) => profileImageHandle(e.target.files[0])}
                        accept="image/*"
                      />
                    </div>

                    <div
                      className="container  col-lg-9"
                      style={{
                        display: "flex",
                        flexDirection: width > 600 ? "row" : "column",
                        justifyContent:"center",
                        alignItems: width > 600 ? "center" : "flex-end",
                      }}
                    >
                      <div>
                        <label className="editremove1" htmlFor="fileInput2">
                          <input
                            type="file"
                            id="fileInput2"
                            style={{ display: "none" }}
                            onChange={(e) =>
                              profileImageHandle(e.target.files[0])
                            }
                            accept="image/*"
                          />
                          {profileImage == "" ? "Upload" : "Change"}
                        </label>
                      </div>
                      <div style={{ paddingLeft: "10px" }}>
                        <div
                          className="remove_btn2"
                          onClick={() => {
                            // setFile(null);
                            setprofileImage("");
                          }}
                        >
                          <span>Remove</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-lg-12 collection_input_label">
                    <span>Banner Image</span>
                  </div>
                  <div className="profileImage_container">
                    <div className="container col-lg-3">
                      <label htmlFor="bannerInput" style={{}}>
                        <span className="writeIcon">
                          {bannerImage == "" ? (
                            <div
                              className="imgUpload"
                              style={{
                                backgroundColor: "rgba(0,0,0,0.05)",
                                color: "rgba(0,0,0,0.1)",
                                justifyContent: "center",
                                alignItems: "flex-end",
                              }}
                            >
                              upload
                            </div>
                          ) : (
                            <img
                              className="imgUpload"
                              src={bannerImage}
                              alt=""
                            />
                          )}
                        </span>
                      </label>

                      <input
                        type="file"
                        id="bannerInput"
                        style={{ display: "none" }}
                        onChange={(e) => bannerImageHandle(e.target.files[0])}
                        accept="image/*"
                      />
                    </div>

                    <div
                      className="container  col-lg-9"
                      style={{
                        display: "flex",
                        flexDirection: width > 600 ? "row" : "column",
                        justifyContent:"center",
                        alignItems: width > 600 ? "center" : "flex-end",
                      }}
                    >
                      <div>
                        <label className="editremove1" htmlFor="bannerInput2">
                          <input
                            type="file"
                            id="bannerInput2"
                            style={{ display: "none" }}
                            onChange={(e) =>
                              bannerImageHandle(e.target.files[0])
                            }
                            accept="image/*"
                          />
                          {bannerImage == "" ? "Upload" : "Change"}
                        </label>
                      </div>
                      <div style={{ paddingLeft: "10px" }}>
                        <div
                          className="remove_btn2"
                          onClick={() => {
                            // setbanner(null);
                            setbannerImage("");
                          }}
                        >
                          <span>Remove</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <div className="col-lg-12 collection_input_label">
                    <span>About</span>
                  </div>

                  <small
                    id="emailHelp"
                    class="form-text text-muted collectionSmallText"
                  >
                    Describe about yourself here.
                  </small>
                  <textarea
                    //name="user-message"
                    id="user-message"
                    class="form-control"
                    cols="20"
                    rows="3"
                    minlength="25"
                    maxlength="250"
                    placeholder="Provide a detailed description of yourself."
                    value={about}
                    style={{ height: "90px" }}
                    onChange={(e) => setabout(e.target.value)}
                  ></textarea>
                </div>

                <div class="form-group">
                  <div className="col-lg-12 collection_input_label">
                    <span>{"Personal Information" + " *"}</span>
                  </div>
                  <small
                    id="exampleFormControlSelect1"
                    class="form-text text-muted collectionSmallText"
                  >
                    Profile Details can be edited here.
                  </small>
                  <input
                    type="text"
                    class="form-control user-name-input"
                    id="exampleInputEmail1"
                    placeholder="Email address"
                    value={email}
                    style={{ height: "45px" }}
                    onChange={(e) => setemail(e.target.value)}
                  />
                  <input
                    type="number"
                    class="form-control user-name-input"
                    id="exampleInputEmail1"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    style={{ height: "45px" }}
                    onChange={(e) => setphoneNumber(e.target.value)}
                  />
                  <select
                    class="form-select"
                    id="exampleFormControlSelect1"
                    style={{ height: "45px" }}
                    onChange={(e) => setcountry(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Country
                    </option>
                    <option value={"USA"}>USA</option>
                    {
                        CountryData.map((x)=>{
                          return(
                            <option value={x.country}>{x.country}</option>
                          )
                        })
                    }
                  </select>
                </div>
                <div class="form-group">
                  <div className="col-lg-12 collection_input_label">
                    <span>Social Links</span>
                  </div>
                  <small
                    id="exampleFormControlSelect1"
                    class="form-text text-muted collectionSmallText"
                  >
                    Add your Social profile links here.
                  </small>
                  <input
                    type="text"
                    class="form-control user-name-input"
                    id="exampleInputEmail1"
                    placeholder="Facebook"
                    value={facebook}
                    style={{ height: "45px" }}
                    onChange={(e) => setfacebook(e.target.value)}
                  />
                  <input
                    type="text"
                    class="form-control user-name-input"
                    id="exampleInputEmail1"
                    placeholder="Twitter"
                    value={twitter}
                    style={{ height: "45px" }}
                    onChange={(e) => settwitter(e.target.value)}
                  />
                  <input
                    type="text"
                    class="form-control user-name-input"
                    id="exampleInputEmail1"
                    placeholder="Other"
                    value={other}
                    style={{ height: "45px" }}
                    onChange={(e) => setother(e.target.value)}
                  />
                </div>
              </form>
              <div className="row">
                <small
                  id="exampleFormControlSelect1"
                  class="form-text text-muted AccountCreation"
                >
                  {createdAt == ""
                    ? ""
                    : createdAt == undefined
                    ? ""
                    : "The account was created on " + FormatDate1(createdAt)}
                </small>
              </div>
              <button className="mintNFT_btn1" onClick={() => Updateprofile()}>
                Update
              </button>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
      </div>
      <CopyRightFooter />
    </>
  );
}

export default EditUser;
