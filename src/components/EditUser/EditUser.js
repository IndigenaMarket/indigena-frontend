import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useState } from "react";
import CopyRightFooter from "../CopyRightFooter/CopyRightFooter";
import './EditUser.css'
import { useRef,useEffect } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import S3 from 'react-aws-s3'
import { useNavigate } from "react-router-dom";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function EditUser() {
  const wallet = useSelector(state => state.WalletConnect);
  const [files, setFiles] = useState([]);
  const[file,setFile] = useState(null);
  const[banner,setbanner] = useState(null);
  const fileInput=useRef();
  const bannerInput=useRef();
  const[firstName,setfirstName]=useState('');
  const[lastName,setlastName]=useState('');
  const[userName,setuserName]=useState('');
  const[profileImage,setprofileImage]=useState('');
  const[bannerImage,setbannerImage]=useState('');
  const[about,setabout]=useState('');
  const[email,setemail]=useState('');
  const[phoneNumber,setphoneNumber]=useState('');
  const[country,setcountry]=useState('');
  const[twitter,settwitter]=useState('');
  const[facebook,setfacebook]=useState('');
  const[other,setother]=useState('');
  const[createdAt,setcreatedAt]=useState('');
  const history = useNavigate ();
  const {web3, address, market,} = wallet;
  console.log(wallet);
  
  const profileImageHandle=(file)=>
  {
      setFile(file);
      ReactS3Client.uploadFile(file).then(data=> {

        console.log(data);
   
        if(data.status === 204) {
   
          //console.log('success')
          setprofileImage(data.location)
   
        } else {
   
          console.log('fail')
   
        }
   
      })
  }
  const bannerImageHandle=(file)=>
  {
   
      setbanner(file);
      ReactS3Client.uploadFile(file).then(data=> {

        console.log(data);
   
        if(data.status === 204) {
   
          console.log('success')
          setbannerImage(data.location)
   
        } else {
   
          console.log('fail')
   
        }
   
      })
  }
  const config = {
    bucketName: "indigenanft",
    dirName: 'collections',
    region: "ap-southeast-2",
    accessKeyId: "AKIAQMYT3V5MLRXZJTI2",
    secretAccessKey: "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",
  };
  const ReactS3Client = new S3(config);
  const Updateprofile=async()=>
  {
    let data={};
    data['UserName']=userName
    data['PrifileUrl']=profileImage
    data['FirstName']=firstName
    data['LastName']=lastName
    data['BannerImage']=bannerImage
    data['About']=about
    data['Email']=email
    data['PhoneNumber']=phoneNumber
    data['Country']=country
    data['FaceBook']=facebook
    data['Twitter']=twitter
    data['Other']=other
    data['WalletAddress']=address
    console.log(data)
    if(wallet.connected&&userName&&email&&address&&phoneNumber&&country&&firstName&&lastName)
    {
        let result=await axios.put(process.env.REACT_APP_API_URL.toString()+"/editprofile",data);
        console.log(result);
        if(result.status)
        {
          alert("Updated successfully");
          history('/user-profile');
        }
    }
    else{
      if(!wallet.connected)
      {
        alert("Please connect your wallet")
      }
      else if(userName=='')
      {
        alert("Please enter the username")
      }
      else if(email=='')
      {
        alert("Please enter the email")
      }
      else if(phoneNumber=='')
      {
        alert("Please enter the phone number")
      }
      else if(country=='')
      {
        alert("Please select the country")
      }
      else if(firstName=='')
      {
        alert("Please select the firstname")
      }
      else if(lastName=='')
      {
        alert("Please select the lastname")
      }
      
    }

  }
  useEffect(() => {

    if(wallet.connected) {

      getNftData();

    }

   

  }, [wallet.connected]);
  const getNftData = async() => {
   
    let nftdataarray=[];
    let data={WalletAddress:address}
    let tokensresult=await axios.post(process.env.REACT_APP_API_URL.toString()+"/getnft",data);
    console.log(tokensresult.data.result[0])
    setfirstName(tokensresult.data.result[0].FirstName)
    setlastName(tokensresult.data.result[0].LastName)
    setuserName(tokensresult.data.result[0].UserName)
    setprofileImage(tokensresult.data.result[0].PrifileUrl);
    setbannerImage(tokensresult.data.result[0].BannerImage);
    setabout(tokensresult.data.result[0].About);
    setemail(tokensresult.data.result[0].Email);
    setphoneNumber(tokensresult.data.result[0].PhoneNumber);
    setcountry(tokensresult.data.result[0].Country);
    settwitter(tokensresult.data.result[0].Twitter);
    setfacebook(tokensresult.data.result[0].FaceBook);
    setother(tokensresult.data.result[0].Other);
    setcreatedAt(tokensresult.data.result[0].createdAt)
  }
  const logoutclicked=()=>{
    history('/');
  }
  return (
    <>
      <div className="EditUser_page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2 col-2 col-md-2">
              <LogoutIcon onClick={()=>logoutclicked()}/>
            </div>
            <div className="col-lg-10"></div>
          </div>
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6 headingContainer">
                  <span className="EditUser_Heading">
                    Account
                  </span>
                </div>
                <div className="col-lg-3"></div>
              </div>
              <form>
              <div class="form-group">
                  <div className="col-lg-12 collection_input_label">
                    <span>{"Profile"+" *"}</span>
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
                    value={firstName}
                    onChange={(e)=>setfirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    class="form-control user-name-input"
                    id="exampleInputEmail1"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e)=>setlastName(e.target.value)}
                  />
                  <input
                    type="text"
                    class="form-control user-name-input"
                    id="exampleInputEmail1"
                    placeholder="User name"
                    value={userName}
                    onChange={(e)=>setuserName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                <div className="col-lg-12 collection_input_label">
                    <span>Profile Image</span>
                  </div>
                  <div className="profileImage_container">
                  <label className="imglabel" htmlFor="fileInput">
      
      <span className='writeIcon'>{file && ( 
      <img className="imgUpload" src={profileImage!=='' ? (profileImage):(URL.createObjectURL(file))} alt="" />
      )}
            </span>
          </label>
         
            <input type='file' id="fileInput" style={{ display: "none" }}  onChange={(e) => profileImageHandle(e.target.files[0])} ref={fileInput} accept='image/*' />
                <div className=" container editImg_btn">
                        <div >
                        <button onClick={()=> fileInput.current.click()} >Change</button>
                        </div>
                        <div > 
                        <button className="remove_btn" onClick={()=>setprofileImage(' ')}>Remove</button>
                        </div>
                      </div>
                  </div>
                </div>
                <div className="form-group">
                {/* <div className="col-lg-12 collection_input_label">
                  <span>Banner Image</span>
                </div>

                <small
                  id="exampleFormControlSelect1"
                  class="form-text text-muted collectionSmallText"
                >
                  This image will appear at the top of your collection page
                </small>
                <FilePond
                  files={files}
                  onupdatefiles={setFiles}
                  allowMultiple={true}
                  maxFiles={3}
                  server="/api"
                  name="files"
                  labelIdle='Drag & Drop your files <br/>or <span class="filepond--label-action"><br/>Browse Files</span>'
                />
                 <div className="row">
                  <div className=" container editUser_btn">
                        <div >
                        <button >Change</button>
                        </div>
                        <div > 
                        <button className="remove_btn">Remove</button>
                        </div>
                      </div>
                  </div> */}
                  <div className="col-lg-12 collection_input_label">
                    <span>Banner Image</span>
                  </div>
                  <div className="profileImage_container">
                  <label className="imglabel" htmlFor="bannerInput">
      
      <span className='Writebanner'>{banner && ( 
      <img className="imgUpload" src={URL.createObjectURL(banner)} alt="" />
      )}
            </span>
          </label>
         
            <input type='file' id="bannerInput" style={{ display: "none" }} onChange={(e) => bannerImageHandle(e.target.files[0])} ref={bannerInput} accept='image/*' />
                <div className=" container editImg_btn">
                        <div >
                        <button onClick={()=> bannerInput.current.click()}>Change</button>
                        </div>
                        <div > 
                        <button className="remove_btn" onClick={()=>setbannerImage(' ')}>Remove</button>
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
                    onChange={(e)=>setabout(e.target.value)}
                  ></textarea>
                </div>

                <div class="form-group">
                  <div className="col-lg-12 collection_input_label">
                    <span>{"Personal Information"+" *"}</span>
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
                    onChange={(e)=>setemail(e.target.value)}
                  />
                  <input
                    type="text"
                    class="form-control user-name-input"
                    id="exampleInputEmail1"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e)=>setphoneNumber(e.target.value)}
                  />
                   <select class="form-select" id="exampleFormControlSelect1" onChange={(e)=>setcountry(e.target.value)}>
                    <option value="" selected disabled>
                      Country
                    </option>
                    <option value={"USA"}>USA</option>
                    <option value={"India"}>India</option>
                    <option value={"Japan"}>Japan</option>
                    <option value={"Australia"}>Australia</option>
                    <option value={"United Kingdom"}>United Kingdom</option>
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
                    onChange={(e)=>setfacebook(e.target.value)}
                  />
                  <input
                    type="text"
                    class="form-control user-name-input"
                    id="exampleInputEmail1"
                    placeholder="Twitter"
                    value={twitter}
                    onChange={(e)=>settwitter(e.target.value)}
                  />
                  <input
                    type="text"
                    class="form-control user-name-input"
                    id="exampleInputEmail1"
                    placeholder="Other"
                    value={other}
                    onChange={(e)=>setother(e.target.value)}
                  />
                </div>
              </form>
              <div className="row">
              <small
                    id="exampleFormControlSelect1"
                    class="form-text text-muted AccountCreation"
                  >
                   { "The account was created on " + createdAt.toString()}
                  </small>
              </div>
              <button className="mintNFT_btn" onClick={()=>Updateprofile()}>Create</button>
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>
      </div>
      <CopyRightFooter />
    </>
  );
}

export default EditUser;
