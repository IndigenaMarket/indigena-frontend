import React, { useContext, useRef, useEffect } from "react";
import "./editCollection.css";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useState } from "react";
import plusIcon from "../../Assets/plus-icon.png";
import CopyRightFooter from "../CopyRightFooter/CopyRightFooter";
// import S3 from 'react-aws-s3'
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../s3client";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function Editcollection() {
  const [files, setFiles] = useState([]);
  const [logo, setlogo] = useState("");
  const [fetured, setfetured] = useState("");
  const [banner, setBanner] = useState();
  const [collectionname, setcollectionname] = useState("");
  const [oldcollectionname, setoldcollectionname] = useState("");
  const [description, setdescription] = useState("");
  const [royality, setroyality] = useState("0");
  const [category, setcategory] = useState();
  const [blockchain, setBlockChain] = useState("");
  const [floorprice, setfloorprice] = useState("");
  const [logopreview, setlogopreview] = useState(false);
  const [feturedpreview, setfeturedpreview] = useState(false);
  const [bannerpreview, setbannerpreview] = useState(false);
  const [duplicate, setduplicate] = useState(false);
  const [minvalueboolean, setminvalueboolean] = useState(false);
  const [collectioninfo, setcollectioninfo] = useState({});
  const wallet = useSelector((state) => state.WalletConnect);
  const { web3, address, market } = wallet;
  const history = useNavigate();

  useEffect(() => {
    getCollection();
  }, []);

  const getCollection = async () => {
    let data = {
      CollectionName: localStorage.getItem("collectionname"),
      from: "profile-collection",
    };
    let tokensresult = await axios.post(
      process.env.REACT_APP_API_URL.toString() + "/getcollections",
      data
    );
    if (tokensresult.data.status) {
      setcollectioninfo(tokensresult.data.Collectiondata[0]);
      setlogo(tokensresult.data.Collectiondata[0].LogoImage);
      setlogopreview(true);
      setBanner(tokensresult.data.Collectiondata[0].BannerImage);
      setbannerpreview(true);
      setfetured(tokensresult.data.Collectiondata[0].FeaturedImage);
      setfeturedpreview(true);
      setroyality(tokensresult.data.Collectiondata[0].Royality);
      setBlockChain(tokensresult.data.Collectiondata[0].Blockchain);
      setfloorprice(tokensresult.data.Collectiondata[0].FloorPrice);
      setcategory(tokensresult.data.Collectiondata[0].Categery);
      setcollectionname(tokensresult.data.Collectiondata[0].CollectionName);
      setoldcollectionname(tokensresult.data.Collectiondata[0].CollectionName);
      setdescription(tokensresult.data.Collectiondata[0].Description);
      // setcollectionaddress(tokensresult.data.Collectiondata[0].WalletAddress)
    }
  };

  const handleChange = async (file, type) => {
    switch (type) {
      case "logo":
        try {
          const currenttimestamp = new Date().getTime();
          const contentType = file.type;
          const fPath = file.uri;
          let name = file.name;
          let extension = "." + name.split(".").pop();
          const bucketParams = {
            Bucket: "indigena",
            Key: "logo" + currenttimestamp + extension,
            Body: file,
            ContentType: contentType,
            ACL: "public-read",
          };
          const filename =
            process.env.REACT_APP_INDIGENA_BUCKETNAME +
            "logo" +
            currenttimestamp +
            extension;
          const res = await s3Client.send(new PutObjectCommand(bucketParams));
          setlogo(filename);
          setlogopreview(true);
        } catch (e) {
          // console.log("Error", e);
        }
        break;
      case "fetured":
        try {
          const currenttimestamp = new Date().getTime();
          const contentType = file.type;
          const fPath = file.uri;
          let name = file.name;
          let extension = "." + name.split(".").pop();
          const bucketParams = {
            Bucket: "indigena",
            Key: "featured" + currenttimestamp + extension,
            Body: file,
            ContentType: contentType,
            ACL: "public-read",
          };
          const filename =
            process.env.REACT_APP_INDIGENA_BUCKETNAME +
            "featured" +
            currenttimestamp +
            extension;
          const res = await s3Client.send(new PutObjectCommand(bucketParams));
          setfetured(filename);
          setfeturedpreview(true);
        } catch (e) {
          // console.log("Error", e);
        }
        break;
      case "banner":
        try {
          const currenttimestamp = new Date().getTime();
          const contentType = file.type;
          const fPath = file.uri;
          let name = file.name;
          let extension = "." + name.split(".").pop();
          const bucketParams = {
            Bucket: "indigena",
            Key: "banner" + currenttimestamp + extension,
            Body: file,
            ContentType: contentType,
            ACL: "public-read",
          };
          const filename =
            process.env.REACT_APP_INDIGENA_BUCKETNAME +
            "banner" +
            currenttimestamp +
            extension;
          const res = await s3Client.send(new PutObjectCommand(bucketParams));
          setBanner(filename);
          setbannerpreview(true);
        } catch (e) {
          // console.log("Error", e);
        }
        break;
      default:
        break;
    }
  };

  const checkCollectionName = async (value) => {
    if (oldcollectionname != collectionname) {
      let data = { CollectionName: value };
      let tokensresult = await axios.post(
        process.env.REACT_APP_API_URL.toString() + "/checkcollection",
        data
      );
      if (tokensresult.data.result) {
        setduplicate(true);
      } else {
        setduplicate(false);
        setcollectionname(value);
      }
    }
  };
  const checkDescription = async (value) => {
    if (value.length > 6) {
      setminvalueboolean(false);
      setdescription(value);
    } else {
      setminvalueboolean(true);
    }
  };
  const Updatecollection = async () => {
    if (
      wallet.connected &&
      blockchain != "" &&
      category != "" &&
      collectionname != "" &&
      royality != "" &&
      floorprice != "" &&
      duplicate != true
    ) {
      const result = await axios.put(
        process.env.REACT_APP_API_URL.toString() + "/updateCollection",
        {
          WalletAddress: address.toString().toLowerCase(),
          LogoImage: logo,
          _id: collectioninfo._id,
          type: "updatedatails",
          FeaturedImage: fetured,
          BannerImage: banner,
          CollectionName: collectionname,
          Description: description,
          Royality: royality,
          Categery: category,
          Blockchain: blockchain,
          FloorPrice: floorprice,
        }
      );
      if (result.status) {
        toast("Collection updated");
        history("/mint");
      } else {
        toast("Something went wrong");
      }
    } else {
      if (wallet.connected) {
        toast("Please fill the all details");
      } else {
        toast("Please connect Wallet");
      }
    }
  };
  const previewclosehandle = (value) => {
    if (value == "logo") {
      setlogo("");
      setlogopreview(false);
    } else if (value == "fetured") {
      setfetured("");
      setfeturedpreview(false);
    } else if (value == "banner") {
      setBanner("");
      setbannerpreview(false);
    }
  };
  const logoutclicked = () => {
    history("/");
  };
  return (
    <>
      <div className="CreateCollection_page" >
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2 col-2 col-md-2">
              <LogoutIcon onClick={() => logoutclicked()} />
            </div>
            <div className="col-lg-10"></div>
          </div>
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6 headingContainer">
                  <span className="createNFT_Heading">Edit my Collections</span>
                </div>
                <div className="col-lg-3"></div>
              </div>
              <form>
                <div className="form-group LogoUpload">
                  <div className="col-lg-12 collection_input_label">
                    <span>Logo Image</span>
                  </div>

                  <small
                    id="exampleFormControlSelect1"
                    class="form-text text-muted collectionSmallText"
                  >
                    This image will also be used for Navigation
                  </small>
                  {logopreview != true && (
                    <input
                      type="file"
                      onChange={(e) => handleChange(e.target.files[0], "logo")}
                    />
                  )}

                  {logopreview && (
                       <div className="col-lg-12 collection_input_label2">
                       <button
                         type="button"
                         class="close AClass"
                         onClick={() => previewclosehandle("logo")}
                       >
                         <span>&times;</span>
                       </button>
                       <img
                         src={logo}
                         style={{
                           height: 200,
                           width: 200,
                           borderRadius: "20px",
                         }}
                       />
                     </div>
                  )}
                </div>
                <div className="form-group FeaturedUpload">
                  <div className="col-lg-12 collection_input_label">
                    <span>Featured Image</span>
                  </div>

                  <small
                    id="exampleFormControlSelect1"
                    class="form-text text-muted collectionSmallText"
                  >
                    This Image will be used for featuring your collection on the
                    homepage, category page, or other promotional areas of
                    Indigena Market
                  </small>
                  {feturedpreview != true && (
                    <input
                      type="file"
                      onChange={(e) =>
                        handleChange(e.target.files[0], "fetured")
                      }
                    />
                  )}
                  {feturedpreview && (
                      <div className="col-lg-12 collection_input_label2">
                      <button
                        type="button"
                        class="close AClass"
                        onClick={() => previewclosehandle("fetured")}
                      >
                        <span>&times;</span>
                      </button>
                      <img
                        src={fetured}
                        style={{
                          height: 300,
                          width: 400,
                          borderRadius: "20px",
                        }}
                      ></img>
                    </div>
              
                  )}
                </div>
                <div className="form-group">
                  <div className="col-lg-12 collection_input_label">
                    <span>Banner Image</span>
                  </div>

                  <small
                    id="exampleFormControlSelect1"
                    class="form-text text-muted collectionSmallText"
                  >
                    This image will appear at the top of your collection page
                  </small>
                  {bannerpreview != true && (
                    <input
                      type="file"
                      onChange={(e) =>
                        handleChange(e.target.files[0], "banner")
                      }
                    />
                  )}
                  {bannerpreview && (
               <div className="col-lg-12 collection_input_label2">
               <button
                 type="button"
                 class="close AClass"
                 onClick={() => previewclosehandle("banner")}
               >
                 <span>&times;</span>
               </button>
               <img
                 src={banner}
                 style={{
                   height: 300,
                   width: 600,
                   borderRadius: "20px",
                 }}
               ></img>
             </div>
                  )}
                </div>
                <div class="form-group">
                  <div className="col-lg-12 collection_input_label">
                    <span>{"Name " + " *"}</span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    placeholder="Item name"
                    value={collectionname}
                    style={{ height: "45px" }}
                    onChange={(e) => setcollectionname(e.target.value)}
                    onBlur={(e) => checkCollectionName(e.target.value)}
                  />
                  {duplicate && (
                    <p style={{ color: "red" }}>This name already taken</p>
                  )}
                </div>
                <div class="form-group">
                  <div className="col-lg-12 collection_input_label">
                    <span>{"Description" + " *"}</span>
                  </div>

                  <small
                    id="emailHelp"
                    class="form-text text-muted collectionSmallText"
                  >
                    The description will be included on the item's details page
                    underneath it's image.
                  </small>
                  <textarea
                    name="user-message"
                    id="user-message"
                    class="form-control"
                    cols="20"
                    rows="10"
                    minlength="25"
                    maxlength="250"
                    value={description}
                    style={{ height: "90px" }}
                    placeholder="Provide a detailed description of your item."
                    onChange={(e) => setdescription(e.target.value)}
                    onBlur={(e) => checkDescription(e.target.value)}
                  ></textarea>
                  {minvalueboolean && (
                    <p style={{ color: "red" }}>
                      Description length should minimum 25 and maximum 250
                    </p>
                  )}
                </div>
                <div class="form-group">
                  <div className="col-lg-12 collection_input_label">
                    <span>{"Royalties" + " *"}</span>
                  </div>
                  <small
                    id="exampleFormControlSelect1"
                    class="form-text text-muted collectionSmallText"
                  >
                    Determine your royalties
                  </small>

                  <input
                    type="number"
                    class="form-control my-2"
                    id="exampleInputEmail1"
                    placeholder="Enter royality"
                    min="0"
                    value={royality}
                    style={{ height: "45px" }}
                    onChange={(e) => setroyality(e.target.value)}
                  />
                </div>

                <div class="form-group">
                  <div className="col-lg-12 input_label">
                    <span>{"Blockchain " + "*"}</span>
                  </div>
                  <select
                    class="form-select"
                    id="exampleFormControlSelect1"
                    disabled={true}
                    value={blockchain}
                    style={{ height: "45px" }}
                    onChange={(e) => setBlockChain(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Select Chain
                    </option>
                    <option value={"Ethereum"}>Ethereum</option>
                    <option value={"BSC SmartChain"}>BSC Smart Chain</option>
                    <option value={"Polygon"}>Polygon</option>
                  </select>
                </div>
                <div class="form-group">
                  <div className="col-lg-12 input_label">
                    <span>{"Category" + " *"}</span>
                  </div>
                  <select
                    class="form-select"
                    id="exampleFormControlSelect1"
                    value={category}
                    style={{ height: "45px" }}
                    onChange={(e) => setcategory(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Select Category
                    </option>
                    <option value={"Art"}>Art</option>
                    <option value={"Collectibles"}>Collectibles</option>
                    <option value={"Music"}>Music</option>
                    <option value={"Photography"}>Photography</option>
                    <option value={"Sports"}>Sports</option>
                    <option value={"Games"}>Games</option>
                    <option value={"Metaverses"}>Metaverses</option>
                    <option value={"DeFi"}>DeFi</option>
                  </select>
                </div>
              </form>
              <button
                className="mintNFT_btn1"
                onClick={() => Updatecollection()}
              >
                Update
              </button>
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>
        <div
          className="modal fade"
          id="PropertiesModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="PropertiesModal"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-scrollable modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="exampleModalLabel"
                  style={{ color: "black" }}
                >
                  Properties Modal
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <table>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Character"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Male"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="LevelsModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="LevelsModal"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-scrollable modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="exampleModalLabel"
                  style={{ color: "black" }}
                >
                  Stats Modal
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p style={{ color: "black", textAlign: "left" }}>
                  This is levels modal.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="StatsModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="StatsModal"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-scrollable modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="exampleModalLabel"
                  style={{ color: "Black" }}
                >
                  Stats Modal
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <table>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input type="text" placeholder="Character" />
                      </td>
                      <td>
                        <input type="text" placeholder="Male" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CopyRightFooter />
    </>
  );
}

export default Editcollection;
