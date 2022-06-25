import React from "react";
import "./CreateCollection.css"
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
import S3 from 'react-aws-s3'
import axios from "axios";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function CreateCollection() {
  const [files, setFiles] = useState([]);
  const[logo,setlogo]=useState('');
  const[fetured,setfetured]=useState('');
  const[banner,setBanner]=useState();
  const[collectionname,setcollectionname]=useState('');
  const[description,setdescription]=useState('');
  const[royality,setroyality]=useState('0');
  const[category,setcategory]=useState();
  const[blockchain,setBlockChain]=useState('');
  const[floorprice,setfloorprice]=useState('0');
  const[logopreview,setlogopreview]=useState(false);
  const[feturedpreview,setfeturedpreview]=useState(false);
  const[bannerpreview,setbannerpreview]=useState(false);
  const[duplicate,setduplicate]=useState(false);
  const[minvalueboolean, setminvalueboolean]=useState(false);
  const wallet = useSelector(state => state.WalletConnect);
  const {web3, address, market} = wallet;
  console.log(wallet);
  console.log(files);
 const history = useNavigate ();
 

const config = {
  bucketName: "indigenanft",
  dirName: 'collections',
  region: "ap-southeast-2",
  accessKeyId: "AKIAQMYT3V5MLRXZJTI2",
  secretAccessKey: "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",
};
const ReactS3Client = new S3(config);
 const handleChange=(file,type)=>
 {
   
  switch (type) {
    case "logo":
      ReactS3Client.uploadFile(file).then(data=> {
        console.log(data);
        if(data.status === 204) {
   
          //console.log('success')
          setlogo(data.location);
          setlogopreview(true);
   
        } else {
   
          console.log('fail')
   
        }
   
      })
      break;
    case "fetured":
      ReactS3Client.uploadFile(file).then(data=> {

        console.log(data);
   
        if(data.status === 204) {
   
          console.log('success');
          setfetured(data.location);
          setfeturedpreview(true);
   
        } else {
   
          console.log('fail')
   
        }
   
      })
      break;
    case "banner":
      ReactS3Client.uploadFile(file).then(data=> {

        console.log(data);
   
        if(data.status === 204) {
   
          console.log('success');
          setBanner(data.location);
          setbannerpreview(true);
          
        } else {
   
          console.log('fail')
   
        }
   
      })
      break;
    default:
				break;
  }  
 }

 const checkCollectionName=async(value)=>
 {
  let data={CollectionName:value}
  let tokensresult=await axios.post(process.env.REACT_APP_API_URL.toString()+"/checkcollection",data);
  console.log(tokensresult.data);
  if(tokensresult.data.result)
  {
     setduplicate(true)
  }
  else{
    setduplicate(false);
    setcollectionname(value)
  }
 }
 const checkDescription=async(value)=>
 {
     if(value.length>6)
     {
       setminvalueboolean(false);
       setdescription(value);
       
     }
     else{
      
       setminvalueboolean(true);
     }
 }
 const createCollection=async()=>
 {

  console.log("wallet.connected",wallet.connected);
  console.log("blockchain",blockchain);
  console.log("category",category);
  console.log("collectionname",collectionname);
  console.log("royality",royality);
  console.log("floorprice",floorprice);
  console.log("duplicate",duplicate);

  if(wallet.connected&&blockchain!=''&&category!=''&&collectionname!=''&&royality!=''&&floorprice!=''&&duplicate!=true)
  {
    
  const result=await axios.post(process.env.REACT_APP_API_URL.toString()+"/createCollection",{WalletAddress:address,
  "LogoImage":logo,
  "FeaturedImage":fetured,
  "BannerImage":banner,
  "CollectionName":collectionname,
  "Description":description,
  "Royality":royality,
  "Categery":category,"Blockchain":blockchain,"FloorPrice":floorprice})
  if(result.status)
  {
     alert("Collection created")   
     history("/mint");
  }
  else{
    alert("Something went wrong")
  }


 }
 else{
  
   if(wallet.connected)
   {
      alert("Please fill the all details");
   }
   else{
      alert("Please connect Wallet")
   }

 }
}
const previewclosehandle=(value)=>
{
    if(value=='logo')
    {
      setlogo('');
      setlogopreview(false)
    }
    else if(value=='fetured')
    {
      setfetured('');
      setfeturedpreview(false)
    }
    else if(value=='banner')
    {
      setBanner('');
      setbannerpreview(false);
    }
}
const logoutclicked=()=>{
  history('/');
}
  return (
      <>
    <div className="CreateCollection_page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 col-2 col-md-2">
            <LogoutIcon onClick={()=>logoutclicked()} />
          </div>
          <div className="col-lg-10"></div>
        </div>
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-3"></div>
              <div className="col-lg-6 headingContainer">
                <span className="createNFT_Heading">Create my Collections</span>
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
                {/* <FilePond
                  files={files}
                  onupdatefiles={setFiles}
                  allowMultiple={true}
                  maxFiles={3}
                  server="/api"
                  name="files"
                  labelIdle='Drag & Drop your files <br/>or <span class="filepond--label-action"><br/>Browse Files</span>'
                  className="logoUpload"
                /> */}
                  {(logopreview!=true)&&<input type="file" onChange={(e)=>handleChange(e.target.files[0],'logo')}/> }
                  
                    {(logopreview)&&
                    <div style={{position:"relative"}}>
                    <button type="button" class="close AClass" onClick={()=>previewclosehandle('logo')}>
                       <span>&times;</span>
                    </button>
                    <img src={logo} style={{height:300,width:400}}></img>
                </div>
                    }
                  
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
                {/* <FilePond
                  files={files}
                  onupdatefiles={setFiles}
                  allowMultiple={true}
                  maxFiles={3}
                  server="/api"
                  name="files"
                  labelIdle='Drag & Drop your files <br/>or <span class="filepond--label-action"><br/>Browse Files</span>'
                /> */}
                 {(feturedpreview!=true)&& <input type="file" onChange={(e)=>handleChange(e.target.files[0],'fetured')}/> }
                  {(feturedpreview)&&
                    <div style={{position:"relative"}}>
                    <button type="button" class="close AClass" onClick={()=>previewclosehandle('fetured')}>
                       <span>&times;</span>
                    </button>
                    <img src={fetured} style={{height:300,width:400}}></img>
                </div>
                    }
                  
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
                {/* <FilePond
                  files={files}
                  onupdatefiles={setFiles}
                  allowMultiple={true}
                  maxFiles={3}
                  server="/api"
                  name="files"
                  labelIdle='Drag & Drop your files <br/>or <span class="filepond--label-action"><br/>Browse Files</span>'
                /> */}
                  
                  {(bannerpreview!=true)&& <input type="file" onChange={(e)=>handleChange(e.target.files[0],'banner')}/>  }
                  {(bannerpreview)&&
                    <div style={{position:"relative"}}>
                    <button type="button" class="close AClass" onClick={()=>previewclosehandle('banner')}>
                       <span>&times;</span>
                    </button>
                    <img src={banner} style={{height:300,width:400}}></img>
                </div>
                    }
              </div>
              <div class="form-group">
                <div className="col-lg-12 collection_input_label">
                  <span>{"Name "+" *"}</span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  placeholder="Item name"
         
                  onBlur={(e)=>checkCollectionName(e.target.value)}
                
                  //onFocusCapture={()=>alert('hi')}
                  //onChange={(e)=>setcollectionname(e.target.value)}
                />
                {duplicate&&<p style={{color:'red'}}>This name already taken</p>}
              </div>
              <div class="form-group">
                <div className="col-lg-12 collection_input_label">
                  <span>{"Description"+" *"}</span>
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
                  
                  placeholder="Provide a detailed description of your item."
                  onBlur={(e)=>checkDescription(e.target.value)}
                ></textarea>
                {minvalueboolean&&<p style={{color:'red'}}>Description length should minimum 25 and maximum 250</p>}
              </div>
              <div class="form-group">
                <div className="col-lg-12 collection_input_label">
                  <span>{"Royalties"+" *"}</span>
                </div>
                <small
                  id="exampleFormControlSelect1"
                  class="form-text text-muted collectionSmallText"
                >
                  Determine your royalties 
                </small>
              
                <input
                  type="number"
                  class="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter royality"
                  min="0"
                  onChange={(e)=>setroyality(e.target.value)}
                />
              </div>
              
              
              <div class="form-group">
                              <div className="col-lg-12 input_label">
                <span >{"Blockchain "+"*"}</span>
            </div>                    
                            <select
                              class="form-select"
                              id="exampleFormControlSelect1"
                              onChange={((e)=>setBlockChain(e.target.value))}
                            >
                              <option value="" selected disabled>Select Chain</option>
                              <option value={'Ethereum'}>Ethereum</option>
                              <option value={'BSC SmartChain'}>BSC Smart Chain</option>
                              <option value={'Polygon'}>Polygon</option>
                            </select>
                            
                          </div>
                          {/* <div class="form-group">
                <div className="col-lg-12 collection_input_label">
                  <span>{"Floor  Price"+" *"}</span>
                </div>
               
              
                <input
                  type="number"
                  class="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter floor price"
                  min="0"
                  onChange={(e)=>setfloorprice(e.target.value)}
                />
              </div> */}
                          <div class="form-group">
                              <div className="col-lg-12 input_label">
                <span >{"Category"+" *"}</span>
            </div>                    
                            <select
                              class="form-select"
                              id="exampleFormControlSelect1"
                              onChange={((e)=>setcategory(e.target.value))}
                            >
                              <option value="" selected disabled>Select Category</option>
                              <option value={'Art'}>Art</option>
                              <option value={'Collectibles'}>Collectibles</option>
                              <option value={'Music'}>Music</option>
                              <option value={'Photography'}>Photography</option>
                              <option value={'Sports'}>Sports</option>
                              <option value={'Games'}>Games</option>
                              <option value={'Metaverses'}>Metaverses</option>
                              <option value={'DeFi'}>DeFi</option>
                            </select>
                            
                          </div>
              {/* <div className="form-group">
                <div className="row ">
                  <div className="col-lg-1"></div>
                  <div className="col-lg-10">
                    <ul>
                      <li>
                        <span>
                          <div className="row">
                            <div className="col-lg-10 col-10 col-md-10 NFTDetailsList">
                              <h4>Explicit and Sensitive Content</h4>
                              <p>
                                See tis item as explicit and sensitive content
                              </p>
                            </div>
                            <div className="col-lg-2 col-2 col-md-2">
                              <div class="form-check form-switch">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="flexSwitchCheckDefault"
                                />
                              </div>
                            </div>
                          </div>
                        </span>
                      </li>

                      <li>
                        <span>
                          <div className="row">
                            <div className="col-lg-10 col-10 col-md-10 NFTDetailsList">
                              <h4>Mystery Prize</h4>
                              <p>Includes mystery prizes, etc tokens,NFTs.</p>
                            </div>
                            <div className="col-lg-2 col-2 col-md-2">
                              <div class="form-check form-switch">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="flexSwitchCheckDefault"
                                />
                              </div>
                            </div>
                          </div>
                        </span>
                      </li>

                      <li>
                        <span>
                          <div className="row">
                            <div className="col-lg-10 col-10 col-md-10 NFTDetailsList">
                              <h4>Add Collaborator</h4>
                              <p>
                                Collaborators can modify collection settings,
                                receive payments for items they created, change
                                the collection's royalty payout address, and
                                create new items.
                              </p>
                            </div>
                            <div className="col-lg-2 col-2 col-md-2">
                              <div class="form-check form-switch">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="flexSwitchCheckDefault"
                                />
                              </div>
                            </div>
                          </div>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-1"></div>
                </div>
              </div> */}
            </form>
            <button className="mintNFT_btn" onClick={()=>createCollection()}>Create</button>
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
    <CopyRightFooter/>
    </>
  );
}

export default CreateCollection;
