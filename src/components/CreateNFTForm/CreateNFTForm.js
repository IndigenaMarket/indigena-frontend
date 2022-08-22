import React, { useContext, useRef, useEffect } from "react";
import "./CreateNFTForm.css";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import "./CreateNFTForm.css";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import "filepond/dist/filepond.min.css";
import { useNavigate } from "react-router-dom";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useState } from "react";
import plusIcon from "../../Assets/plus-icon.png";
import CopyRightFooter from "../CopyRightFooter/CopyRightFooter";
import PropertiesContext from "../../Utils/PropertiesContext";
import { useDispatch, useSelector } from "react-redux";
import {
  connectWallet,
  connectFailed,
  addNetwork,
} from "../../redux/WalletAction";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../s3client";
import { toast } from "react-toastify";
import useWindowDimensions from "../../Utils/useWindowDimensions";
const axios = require("axios");
const IPFSClient = require("ipfs-http-client");
const FormData = require("form-data");
const AWS = require("aws-sdk");
registerPlugin(FilePondPluginFileEncode);

function CreateNFTForm() {
  const {width} = useWindowDimensions()
  const history = useNavigate();
  const propertiesContext = useContext(PropertiesContext);
  let [files, setFiles] = useState([]);
  const [userLevel1, setUserLevel1] = useState([1]);
  const [usersetLevel, setUsersetLevel1] = useState([1]);
  const [userStats1, setUserStats1] = useState([1]);
  const [usersetStats, setUsersetStats1] = useState([1]);
  const [ipfsHash, setipfsHash] = useState([1]);
  const [pond, setPond] = useState({});
  const [itemName, setitemName] = useState("");
  const previousInputValue = useRef("");
  const [description, setdescription] = useState("");
  const [collection, setcollection] = useState("");
  const [properties, setproperties] = useState([]);
  const [levels, setlevels] = useState([]);
  const [stats, setstats] = useState([]);
  const [unlock, setunlock] = useState(false);
  const [mystery, setmystery] = useState(true);
  const [explicit, setexplicit] = useState(false);
  const [copies, setcopies] = useState("1");
  const [blockchain, setblockchain] = useState("");
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.WalletConnect);

  const [unlockcontent, setunlockcontent] = useState("");
  const { web3, address, market, BNB_market, MATIC_market } = wallet;
  const ref = useRef({});
  const [collectionData, setCollectionData] = useState([]);
  const [unlockabletext, setunlockabletext] = useState([]);
  const [dummy, setdummy] = useState(false);
  const [filetype, setfiletype] = useState("");
  const [previewfile, setpreviewfile] = useState("");
  const [showpreview, setshowpreview] = useState(false);
  const [mediafile, setmediafile] = useState("");
  const [pinatafile, setpinnatafile] = useState("");
  const [previwimagefile, setpreviewimagefile] = useState(" ");
  const [royality, setroyality] = useState("");
  const [descriptionenable, setdescriptionenable] = useState(true);
  const [collectionenable, setcollectionenable] = useState(true);
  const [propertiesenable, setpropertiesenable] = useState(true);
  const [levelsSavedata, setlevelsSavedata] = useState([]);
  const [previewhide, setpreviewhide] = useState(false);
  const [statsSavedata, setstatsSavedata] = useState([]);
  const [duplicate, setduplicate] = useState(false);
  const [minvalueboolean, setminvalueboolean] = useState(false);
  const [proptext1, setproptext1] = useState(true);
  const [proptext2, setproptext2] = useState(true);
  const [proptext3, setproptext3] = useState(true);
  const [proptext4, setproptext4] = useState(true);
  const [proptext5, setproptext5] = useState(true);
  const [proptext6, setproptext6] = useState(true);
  const [proptext7, setproptext7] = useState(true);
  const [proptext8, setproptext8] = useState(true);
  const [proptext9, setproptext9] = useState(true);
  const [proptext10, setproptext10] = useState(true);
  const [mintiingfee, setmintiingfee] = useState(0);

  const propertiesdata = (index, value, type) => {
    let propertiesarray = properties;
    var checkBool;
    switch (type) {
      case "character":
        if (propertiesarray.length !== 0) {
          propertiesarray.forEach((element) => {
            if (element.index === index) {
              element.trait_type = value;
              checkBool = true;
            }
          });
        }
        if (checkBool) {
          setproperties(propertiesarray);
        } else {
          propertiesarray.push({ trait_type: value, index: index });
          setproperties(propertiesarray);
        }

        break;
      case "name":
        if (propertiesarray.length !== 0) {
          propertiesarray.forEach((element) => {
            if (element.index === index) {
              element.value = value;
              checkBool = true;
            }
          });
          if (checkBool) {
            setproperties(propertiesarray);
          } else {
            propertiesarray.push({ value: value, index: index });
            setproperties(propertiesarray);
          }
        }
        break;
      default:
        break;
    }
  };
  const getcollection = async () => {
    if (address) {
      let result = await axios.post(
        process.env.REACT_APP_API_URL.toString() + "/getcollections",
        { WalletAddress: address.toString().toLowerCase() }
      );

      if (result.status == 200) {
        setCollectionData(result.data.result);
        if (result.data.result.length > 0) {
          // setcollection(result.data.result[0].CollectionName);
        } else {
          history("/create-collection");
        }
      }
    }
  };
  // const handlemintiingfee=async()=>{
  //   // if(web3)
  //   // {
  //   const price = blockchain=="Ethereum"?await market.methods.mintFee().call():blockchain=="BSC SmartChain"?await BNB_market.methods.mintFee().call():await MATIC_market.methods.mintFee().call();
  //   toast(price)
  //   setmintiingfee(price)

  // }
  useEffect(() => {
    checkuserStatus();
    getcollection();
    // handlemintiingfee()
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [wallet.connected]);
  const checkuserStatus = async () => {
    if (address) {
      let tokensresult = await axios.post(
        process.env.REACT_APP_API_URL.toString() + "/checkUserStatus",
        { WalletAddress: address }
      );
      if (tokensresult.data.result) {
        toast("You are blocked by admin.Please contact our admin team");
        history("/resources");
      } else {
        return;
      }
    }
  };
  const awsdata = async () => {
    let tokenId = 2;
    let newFileName = tokenId.toString();
    const currenttimestamp = new Date().getTime();
    const contentType = files.type;
    const fPath = files.uri;
    let name = files.name;
    let extension = "." + name.split(".").pop();
    const bucketParams = {
      Bucket: "indigena",
      Key: "nft" + currenttimestamp + extension,
      Body: files,
      ContentType: contentType,
      ACL: "public-read",
    };

    const filename =
      process.env.REACT_APP_INDIGENA_BUCKETNAME +
      "nft" +
      currenttimestamp +
      extension;
    try {
      const res = await s3Client.send(new PutObjectCommand(bucketParams));
    } catch (e) {
      // console.log("Error", e);
    }
  };
  const filehandle = (files) => {
    setpinnatafile(files);
    var reader = new FileReader();
    var url = reader.readAsDataURL(files);
    const currenttimestamp = new Date().getTime();
    const contentType = files.type;
    const fPath = files.uri;
    let name = files.name;
    let extension = "." + name.split(".").pop();
    const bucketParams = {
      Bucket: "indigena",
      Key: "nft" + currenttimestamp + extension,
      Body: files,
      ContentType: contentType,
      ACL: "public-read",
    };
    const filename =
      process.env.REACT_APP_INDIGENA_BUCKETNAME +
      "nft" +
      currenttimestamp +
      extension;
    reader.onloadend = function (e) {
      setFiles(reader.result);
      if (reader.result.includes("audio")) {
        setfiletype("audio");
        setshowpreview(true);
        setpreviewhide(true);
        try {
          const res = s3Client.send(new PutObjectCommand(bucketParams));
          setmediafile(filename);
        } catch (e) {
          // console.log("Error", e);
        }
      } else if (reader.result.includes("video")) {
        setfiletype("video");
        setshowpreview(true);
        setpreviewhide(true);
        try {
          const res = s3Client.send(new PutObjectCommand(bucketParams));
          setmediafile(filename);
        } catch (e) {
          // console.log("Error", e);
        }
      } else {
        setfiletype("image");
        setpreviewhide(true);
      }
    }.bind(this);
  };
  const previewfilehandle = (files) => {
    setpreviewimagefile(files);
    var reader = new FileReader();
    var url = reader.readAsDataURL(files);

    reader.onloadend = function (e) {
      setpreviewfile(reader.result);
    }.bind(this);
  };

  const previewclosehandle = () => {
    setpreviewhide(false);
    setFiles("");
  };

  const levelsdata = (index, value, type) => {
    let levelsarray = levels;
    var checkBool;
    switch (type) {
      case "character":
        if (levelsarray.length !== 0) {
          levelsarray.forEach((element) => {
            if (element.index === index) {
              element.character = value;
              checkBool = true;
            }
          });
        }
        if (checkBool) {
          setlevels(levelsarray);
        } else {
          levelsarray.push({ character: value, index: index });
          setlevels(levelsarray);
        }

        break;
      case "val1":
        if (levelsarray.length !== 0) {
          levelsarray.forEach((element) => {
            if (element.index === index) {
              element.level = value;
              checkBool = true;
            }
          });
          if (checkBool) {
            setlevels(levelsarray);
          } else {
            levelsarray.push({ level: value, index: index });
            setlevels(levelsarray);
          }
        }
        setUserLevel1(value);
        break;
      case "val2":
        if (levelsarray.length !== 0) {
          levelsarray.forEach((element) => {
            if (element.index === index) {
              element.setlevel = value;
              checkBool = true;
            }
          });
          if (checkBool) {
            setlevels(levelsarray);
          } else {
            levelsarray.push({ setlevel: value, index: index });
            setlevels(levelsarray);
          }
        }

        setUsersetLevel1(value);
        break;
      default:
        break;
    }
  };
  const leavelsavehandle = () => {
    var levelvalidation = true;
    levels.map((e, i) => {
      if (e.level && e.setlevel && e.character) {
      } else {
        levelvalidation = false;
        toast("Please fill the all levels details");
        return 1;
      }
    });
    if (levelvalidation) {
      setlevelsSavedata(levels);
    }
  };
  const statssavehandle = () => {
    var statsvalidation = true;
    stats.map((e, i) => {
      if (e.level && e.setlevel && e.character) {
      } else {
        statsvalidation = false;
        toast("Please fill the all stats details");
        return 1;
      }
    });
    if (statsvalidation) {
      setstatsSavedata(stats);
    }
  };
  const statsdata = (index, value, type) => {
    let statsarray = stats;
    var checkBool;
    switch (type) {
      case "character":
        if (statsarray.length !== 0) {
          statsarray.forEach((element) => {
            if (element.index === index) {
              element.character = value;
              checkBool = true;
            }
          });
        }
        if (checkBool) {
          setstats(statsarray);
        } else {
          statsarray.push({ character: value, index: index });
          setstats(statsarray);
        }

        break;
      case "val1":
        if (statsarray.length !== 0) {
          statsarray.forEach((element) => {
            if (element.index === index) {
              element.level = value;
              checkBool = true;
            }
          });
          if (checkBool) {
            setstats(statsarray);
          } else {
            statsarray.push({ level: value, index: index });
            setstats(statsarray);
          }
        }
        setUserStats1(value);
        break;
      case "val2":
        if (statsarray.length !== 0) {
          statsarray.forEach((element) => {
            if (element.index === index) {
              element.setlevel = value;
              checkBool = true;
            }
          });
          if (checkBool) {
            setstats(statsarray);
          } else {
            statsarray.push({ setlevel: value, index: index });
            setstats(statsarray);
          }
        }

        setUsersetStats1(value);
        break;
      default:
        break;
    }
  };

  let handleAdd = () => {
    propertiesContext.setPropertiesList([
      ...(propertiesContext.propertiesList + 1),
    ]);
  };

  let handleDelete = (i) => {
    if (i != 1) {
      propertiesContext.propertiesList.splice(i - 1, 1);
      propertiesContext.setPropertiesList([
        ...propertiesContext.propertiesList,
      ]);
    }
  };
  let handleLevelAdd = () => {
    propertiesContext.setLevelsList([
      ...propertiesContext.levelsList,
      propertiesContext.levelsList.length + 1,
    ]);
  };

  let handleLevelDelete = (i) => {
    let arr = [...propertiesContext.levelsList];
    if (arr.length == 1) {
      return;
    }
    let data = arr.filter((x, n) => n + 1 !== i);

    propertiesContext.setLevelsList(data);
  };
  let handleStatsAdd = () => {
    setUserStats1("");
    setUsersetStats1("");
    propertiesContext.setStatsList([
      ...propertiesContext.statsList,
      propertiesContext.statsList.length + 1,
    ]);
  };
  let handleStatsDelete = (i) => {
    let arr = [...propertiesContext.statsList];
    if (arr.length == 1) {
      return;
    }
    let data = arr.filter((x, n) => n + 1 !== i);
    propertiesContext.setStatsList(data);
  };
  const handleCollectionDropdown = async (index) => {
    setcollection(collectionData[index].CollectionName);
    //toast(collectionData[index].CollectionName);
    setroyality(collectionData[index].Royality);
    setblockchain(collectionData[index].Blockchain);
    setpropertiesenable(false);
    if (collectionData[index].Blockchain == "Ethereum") {
      if (
        window.ethereum &&
        window.ethereum.networkVersion !== process.env.REACT_APP_ETH_Chain_ID
      ) {
        let data = await addNetwork(process.env.REACT_APP_ETH_Chain_ID);
        // const price = await market.methods.mintFee().call();
        const price = 0;
        var amt2 = await web3.utils.fromWei(price.toString(), "ether");
        setmintiingfee(parseFloat(amt2).toFixed(2));
      } else {
        // const price = await market.methods.mintFee().call();
        const price = 0;
        var amt2 = await web3.utils.fromWei(price.toString(), "ether");
        setmintiingfee(parseFloat(amt2).toFixed(2));
      }
    } else if (collectionData[index].Blockchain == "Polygon") {
      if (
        window.ethereum &&
        window.ethereum.networkVersion !== process.env.REACT_APP_MATIC_Chain_ID
      ) {
        let data = await addNetwork(process.env.REACT_APP_MATIC_Chain_ID);
        // const price = await MATIC_market.methods.mintFee().call();
        const price = 0;
        var amt2 = await web3.utils.fromWei(price.toString(), "ether");
        setmintiingfee(parseFloat(amt2).toFixed(2));
      } else {
        // const price = await market.methods.mintFee().call();
        const price = 0;
        var amt2 = await web3.utils.fromWei(price.toString(), "ether");
        setmintiingfee(parseFloat(amt2).toFixed(2));
      }
    } else {
      let data = await addNetwork(process.env.REACT_APP_BSC_Chain_ID);
      // const price = await BNB_market.methods.mintFee().call();
      const price = 0;
      var amt2 = await web3.utils.fromWei(price.toString(), "ether");
      setmintiingfee(parseFloat(amt2).toFixed(2));
    }
  };
  const handleChange = async () => {
    handleChangeprocess();
    // if (wallet.connected) {
    //   web3.eth.getBalance(address).then(async (balance) => {
    //     var amt1 = await web3.utils.fromWei(balance.toString(), "ether");
    //     if (parseFloat(amt1) > parseFloat(mintiingfee)) {
    //       handleChangeprocess();
    //     } else {
    //       toast(
    //         "You don’t have enough in " + blockchain == "Ethereum"
    //           ? "ETH"
    //           : blockchain == "BSC SmartChain"
    //           ? "BNB"
    //           : "MATIC"
    //       );
    //     }
    //   });
    // } else {
    //   toast("Please connect the wallet");
    // }
  };
  const networkChange = async () => {
    if (!wallet.connected) {
      toast("Please connect the wallet");
      return;
    }
 
    if (blockchain == "Ethereum") {
      if (
        window.ethereum &&
        window.ethereum.networkVersion !== process.env.REACT_APP_ETH_Chain_ID
      ) {
        await addNetwork(process.env.REACT_APP_ETH_Chain_ID);
        handleChange();
      } else {
        handleChange();
      }
    } else if (blockchain == "BSC SmartChain") {
      if (
        window.ethereum &&
        window.ethereum.networkVersion !== process.env.REACT_APP_BSC_Chain_ID
      ) {
        await addNetwork(process.env.REACT_APP_BSC_Chain_ID);
        handleChange();
      } else {
        handleChange();
      }
    } else {
      if (
        window.ethereum &&
        window.ethereum.networkVersion !== process.env.REACT_APP_MATIC_Chain_ID
      ) {
        await addNetwork(process.env.REACT_APP_MATIC_Chain_ID);
        handleChange();
      } else {
        handleChange();
      }
    }
  };
  const checkNftName = async (value) => {
    if (!address) {
      toast("Please connect your wallet");
    } else {
      let data = { ItemName: value };
      if (value.length > 0) {
        let tokensresult = await axios.post(
          process.env.REACT_APP_API_URL.toString() + "/checkname",
          data
        );
        if (tokensresult.data.result) {
          setduplicate(true);
        } else {
          setitemName(value);
          setdescriptionenable(false);
          setduplicate(false);
          localStorage.setItem("Itemname", value);
        }
      } else {
        setdescriptionenable(true);
        setduplicate(false);
      }
    }
  };
  const checkDescription = async (value) => {
    if (value.length > 6) {
      setminvalueboolean(false);
      setdescription(value);
      setcollectionenable(false);
    } else {
      setcollectionenable(true);
      setminvalueboolean(true);
    }
  };
  const getbalance = async () => {
    return true;
    if (web3) {
      const Check =
        blockchain == "Ethereum"
          ? await market.methods.mintFee().call()
          : blockchain == "BSC SmartChain"
          ? await BNB_market.methods.mintFee().call()
          : await MATIC_market.methods.mintFee().call();

      web3.eth.getBalance(address).then(async (balance) => {
        var amt1 = await web3.utils.fromWei(balance.toString(), "ether");

        if (Check < balance) {
          return true;
        } else {
          return false;
        }
      });
    }
  };
  const handleChangeprocess = async () => {
    if (
      itemName !== "" &&
      description !== "" &&
      mystery &&
      explicit &&
      blockchain !== "" &&
      pinatafile &&
      previwimagefile &&
      collection !== ""
    ) {
      setloading(true);

      const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
      const jsonUrl = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

      let file = pinatafile;
      let data = new FormData();
      data.append("file", file);

      //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
      //metadata is optional
      const metadata = JSON.stringify({
        name: "testname",
        keyvalues: {
          exampleKey: "exampleValue",
        },
      });
      data.append("pinataMetadata", metadata);

      //pinataOptions are optional
      const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
          regions: [
            {
              id: "FRA1",
              desiredReplicationCount: 1,
            },
            {
              id: "NYC1",
              desiredReplicationCount: 2,
            },
          ],
        },
      });
      data.append("pinataOptions", pinataOptions);
      let result = await axios.post(url, data, {
        maxBodyLength: "Infinity", //this is needed to prevent axios from erroring out with large files
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
          pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY,
        },
      });
      if (result?.data?.isDuplicate) {
        try {
          let dublicate = await axios.post(
            process.env.REACT_APP_API_URL.toString() + "/checkdublicate",
            {
              Pinatahash: result.data.IpfsHash,
            }
          );
       
          if (dublicate.data.status) {
            if (dublicate.data.isDublicate) {
              toast("Already minted");
              setloading(false);
              return;
            }
          } else {
            toast("Something went wrong");
            setloading(false);
            return;
          }
        } catch (err) {
          toast("Something went wrong");
          setloading(false);
          return;
        }
      }
      var imgHash=result.data.IpfsHash;
      if (result.data) {
        const hashPrefix = "https://gateway.pinata.cloud/ipfs/";
        const imagehash = hashPrefix + result.data.IpfsHash;
        var attributes = [];
        let data = properties.map((x) => {
          if (x.trait_type != "") {
            if (x.value != undefined) {
              attributes.push({ trait_type: x.trait_type, value: x.value });
            }
          }
        });
        let data2 = levels.map((x) => {
          if (!isNaN(x.level)) {
            attributes.push({
              trait_type: x.character,
              value: (parseInt(x.level) / parseInt(x.setlevel)) * 100,
            });
          }
        });
        let data3 = stats.map((x) => {
          if (!isNaN(x.level)) {
            attributes.push({
              display_type: "number",
              trait_type: x.character,
              value: (parseInt(x.level) / parseInt(x.setlevel)) * 100,
            });
          }
        });
        let pinataMetadata = {
          description: description,
          image: "ipfs://" + result.data.IpfsHash,
          name: itemName,
          attributes: properties,
        };
        let JsonMetadata = {
          pinataMetadata: {
            name: itemName,
            description: description,
            image: "ipfs://" + result.data.IpfsHash,
            CID: result.data.IpfsHash,
          },
          pinataContent: {
            itemname: result.data.IpfsHash,
            Name: itemName,
            Description: description,
            Collection: collection,
            Properties: properties,
            Levels: levels,
            Stats: stats,
            Unlock: unlock,
            MintingAccept: mystery,
            RoyalityAccept: explicit,
            Blockchain: blockchain,
            ImageUrl: imagehash,
            Selleraddress: address,
            Copies: copies,
            unlockabletext: unlockabletext,
            Status: "Mint",
            Type: filetype,
            Royality: royality,
          },
        };
        let JsonMetadata3 = {
          name: itemName,
          description: description,
          image: "ipfs://" + result.data.IpfsHash,
          attributes: attributes,
          // pinataMetadata: {
          // name: itemName,
          // description: description,
          // image: "ipfs://" + result.data.IpfsHash,
          // CID: result.data.IpfsHash,
          // attributes: attributes,
          // },
          // pinataContent: {
          // itemname: result.data.IpfsHash,
          // Name: itemName,
          // Description: description,
          // Collection: collection,
          // Properties: properties,
          // Levels: levels,
          // Stats: stats,
          // Unlock: unlock,
          // MintingAccept: mystery,
          // RoyalityAccept: explicit,
          // Blockchain: blockchain,
          // ImageUrl: imagehash,
          // Selleraddress: address,
          // Copies: copies,
          // unlockabletext: unlockabletext,
          // Status: "Mint",
          // Type: filetype,
          // Royality: royality,
          // },
        };

        let JsonResuslt = await axios.post(
          "https://api.pinata.cloud/pinning/pinJSONToIPFS",
          // pinataMetadata,
          JsonMetadata3,
          {
            maxBodyLength: "Infinity", //this is needed to prevent axios from erroring out with large files
            headers: {
              "Content-Type": "application/json",
              pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
              pinata_secret_api_key:
                process.env.REACT_APP_PINATA_SECRET_API_KEY,
            },
            // body: JSON.stringify(pinataMetadata),
            body: JSON.stringify(JsonMetadata3),
          }
        );
     
        const ipfshash =
          "https://gateway.pinata.cloud/ipfs/" + JsonResuslt.data.IpfsHash;

        const nonce = Date.now();

        // const price =
        //   blockchain == "Ethereum"
        //     ? await market.methods.mintFee().call()
        //     : blockchain == "BSC SmartChain"
        //     ? await BNB_market.methods.mintFee().call()
        //     : await MATIC_market.methods.mintFee().call();

        let signaturehash = await axios.post(
          process.env.REACT_APP_API_URL.toString() + "/getsignature",
          {
            seller:
              blockchain == "Ethereum"
                ? process.env.REACT_APP_NFT_TRADE_ETH
                : blockchain == "BSC SmartChain"
                ? process.env.REACT_APP_NFT_TRADE_BNB
                : process.env.REACT_APP_NFT_TRADE_MATIC,
            buyer:
              blockchain == "Ethereum"
                ? process.env.REACT_APP_NFT_ETH_CONTRACT
                : blockchain == "BSC SmartChain"
                ? process.env.REACT_APP_NFT_BNB_CONTRACT
                : process.env.REACT_APP_NFT_MATIC_CONTRACT,
            nftAddress:
              blockchain == "Ethereum"
                ? process.env.REACT_APP_NFT_ETH_CONTRACT
                : blockchain == "BSC SmartChain"
                ? process.env.REACT_APP_NFT_BNB_CONTRACT
                : process.env.REACT_APP_NFT_MATIC_CONTRACT,
            inEth: true,
            //"_orderType":0 ,
            amount: 0,
            tokenId: 0,
            qty: 1,
            timestamp: nonce,
            Blockchain: blockchain,
          }
        );

        var sighash = signaturehash.data.result;
        var signtuple = [
          blockchain == "Ethereum"
            ? process.env.REACT_APP_NFT_TRADE_ETH
            : blockchain == "BSC SmartChain"
            ? process.env.REACT_APP_NFT_TRADE_BNB
            : process.env.REACT_APP_NFT_TRADE_MATIC,
          blockchain == "Ethereum"
            ? process.env.REACT_APP_NFT_ETH_CONTRACT
            : blockchain == "BSC SmartChain"
            ? process.env.REACT_APP_NFT_BNB_CONTRACT
            : process.env.REACT_APP_NFT_MATIC_CONTRACT,
          blockchain == "Ethereum"
            ? process.env.REACT_APP_NFT_ETH_CONTRACT
            : blockchain == "BSC SmartChain"
            ? process.env.REACT_APP_NFT_BNB_CONTRACT
            : process.env.REACT_APP_NFT_MATIC_CONTRACT,
          true,
          0,
          0,
          1,
          nonce,
          sighash,
        ];
        var res;
        try {
          res =
            blockchain == "Ethereum"
              ? await market.methods
                  .createNFT(ipfshash, 1, parseInt(royality) * 100, signtuple)
                  .send({
                    from: address,
                    maxPriorityFeePerGas: null,
                    maxFeePerGas: null,
                  })
              : blockchain == "BSC SmartChain"
              ? await BNB_market.methods
                  .createNFT(ipfshash, 1, parseInt(royality) * 100, signtuple)
                  .send({
                    from: address,
                    maxPriorityFeePerGas: null,
                    maxFeePerGas: null,
                  })
              : await MATIC_market.methods
                  .createNFT(ipfshash, 1, parseInt(royality) * 100, signtuple)
                  .send({
                    from: address,
                    maxPriorityFeePerGas: null,
                    maxFeePerGas: null,
                  });
          let tokenId = res.events.Minted.returnValues.tokenId;
          if (tokenId) {
            files = showpreview ? previwimagefile : pinatafile;
            const currenttimestamp = new Date().getTime();
            const contentType = files.type;
            let name = files.name;
            let extension = "." + name.split(".").pop();
            const fPath = "nft" + currenttimestamp + extension; //files.uri;
   
            const bucketParams = {
              Bucket: "indigena",
              Key: "nft" + currenttimestamp + extension,
              Body: files,
              ContentType: contentType,
              ACL: "public-read",
            };
            let newFileName = blockchain + "-" + tokenId.toString();
            try {
              const data = await s3Client.send(
                new PutObjectCommand(bucketParams)
              );
              
              const currenttimestamp = new Date().getTime();
              const Imageurl =
                process.env.REACT_APP_INDIGENA_BUCKETNAME + fPath;
              try {
                JsonMetadata.pinataContent.ImageUrl = Imageurl; //data.location;
                JsonMetadata.pinataContent.tokenId = tokenId;
                const s3Bucket = "indigena"; // replace with your bucket name
                const objectName =
                  blockchain + "-" + tokenId.toString() + ".json"; // File name which you want to put in s3 bucket
                const objectData = JSON.stringify(JsonMetadata); // file data you want to put
                const objectType = "application/json";
                const params = {
                  Bucket: s3Bucket,
                  Key: objectName,
                  Body: objectData,
                  ContentType: objectType,
                  ACL: "public-read",
                };
                const result = await s3Client.send(
                  new PutObjectCommand(params)
                );
               
                let frontenddata = {};
                frontenddata["WalletAddress"] = address;
                frontenddata["TokenId"] = blockchain + "-" + tokenId;
                frontenddata["Jsondataurl"] =
                  "https:/" +
                  s3Bucket +
                  ".nyc3.digitaloceanspaces.com/" +
                  objectName;
                frontenddata["CollectionName"] = collection;
                frontenddata["AwsUrl"] = JsonMetadata.pinataContent.ImageUrl;
                frontenddata["Imageurl"] = Imageurl;
                frontenddata["ItemName"] = JsonMetadata.pinataContent.Name;
                frontenddata["Status"] = "Mint";
                frontenddata["Poperties"] = properties;
                frontenddata["Levels"] = levels;
                frontenddata["Stats"] = stats;
                frontenddata["Blockchain"] = blockchain;
                frontenddata["Type"] = filetype;
                frontenddata["Royality"] = royality;
                frontenddata["Pinatahash"] =imgHash;
                let BackendResuslt = await axios.post(
                  process.env.REACT_APP_API_URL.toString() + "/create-nft",
                  frontenddata
                );
                let newaddress = address.toLowerCase();
                let Activity = await axios.post(
                  process.env.REACT_APP_API_URL.toString() + "/createActivity",
                  {
                    WalletAddress: newaddress,
                    TokenId: blockchain + "-" + tokenId,
                    Token: tokenId,
                    Blockchain: blockchain,
                    from: "-",
                    to: address,
                    Type: "Minted",
                    price: "-",
                    quantity: 1,
                  }
                );
                setloading(true);
                history("/user-profile");
              } catch (error) {
                // console.log(error);
              }
            } catch (e) {
              //  console.log("Error", e);
               setloading(false);
            }
          }else{
            // console.log("no token iddddd");
          }
        } catch (e) {
          setloading(false);
        }
      }

      // else {
      //   try {
      //     let dublicate = await axios.post(
      //       process.env.REACT_APP_API_URL.toString() + "/create-nft",
      //       {
      //         Pinatahash: result.data.IpfsHash,
      //       }
      //     );
      //     toast("Already minted");
      //     setloading(false);
      //     return;
      //   } catch (err) {
      //     toast("Something went wrong");
      //     setloading(false);
      //     return;
      //   }
      // }
    } else {
      if (itemName == "") {
        toast("Please fill the Name");
        setloading(false);
      } else if (description == "") {
        toast("Please fill the description");
        setloading(false);
      } else if (!mystery) {
        toast("Please accept the minting fees");
        setloading(false);
      } else if (!explicit) {
        toast("Please accept the royality feess");
        setloading(false);
      } else if (!collection) {
        toast("Please select the collection name");
        setloading(false);
      } else {
        toast("Someting went wrong");
        setloading(false);
      }
    }
  };

  const logoutclicked = () => {
    const { web3Modal } = wallet;
    web3Modal.clearCachedProvider();
    dispatch(connectFailed(errorDiv()));
    history("/");
  };

  const errorDiv = () => {
    return <p>Wallet Disconnected!</p>;
  };
  return (
    <>
      <div className="createNFTForm_page" 
      >
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
                  <span className="createNFT_Heading">Create NFTs</span>
                </div>
                <div className="col-lg-3"></div>
              </div>
              <form>
                <div class="form-group">
                  <div className="col-lg-12 input_label">
                    <span>{"Name" + "  * "}</span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    style={{ height: "45px" }}
                    id="exampleInputEmail1"
                    onBlur={(e) => checkNftName(e.target.value)}
                    placeholder="Item name"
                  />
                  {duplicate && (
                    <p style={{ color: "red" }}>This name already taken</p>
                  )}
                </div>
                <div class="form-group">
                  <div className="col-lg-12 input_label">
                    <span>{"Description" + "  *"}</span>
                  </div>

                  <small
                    id="emailHelp"
                    class="form-text text-muted uploadSmallText"
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
                    disabled={descriptionenable}
                    placeholder="Provide a detailed description of your item."
                    style={{ height: "90px" }}
                    onBlur={(e) => checkDescription(e.target.value)}
                  ></textarea>
                  {minvalueboolean && (
                    <p style={{ color: "red" }}>
                      Description length should minimum 25 and maximum 250
                    </p>
                  )}
                </div>
                <div class="form-group">
                  <div className="col-lg-12 input_label">
                    <div className="row">
                      <div className="col-6">
                        <span>{"Collection" + "  *"}</span>
                      </div>
                      <div className="col-6"></div>
                    </div>
                  </div>
                  <small
                    id="exampleFormControlSelect1"
                    class="form-text text-muted uploadSmallText"
                  >
                    This is the collection where your item will appear.
                  </small>
                  <select
                    class="form-select"
                    style={{ height: "45px" }}
                    id="exampleFormControlSelect1"
                    disabled={collectionenable}
                    onChange={(e) => handleCollectionDropdown(e.target.value)}
                  >
                    <option>Select collection</option>
                    {collectionData.map((e, i) => {
                      return <option value={i}>{e.CollectionName}</option>;
                    })}
                  </select>
                </div>

                <div className="col-lg-12 d-flex">
                  <span style={{ color: "rgba(0,0,0,0.2)" }}>or</span>
                </div>
                <div className="col-lg-12 d-flex">
                  <button
                    type="button"
                    class="btn mr-0 my-3"
                    style={{ borderColor: "firebrick", color: "#b22222" }}
                    onClick={() => history("/create-collection")}
                  >
                    Add New Collection
                  </button>
                </div>

                <div className="form-group">
                  <div className="row ">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-10">
                      <ul className={propertiesenable ? "modalList" : " "}>
                        <li>
                          <span>
                            <div className="row ">
                              <div className="col-lg-10 col-10 col-md-10 NFTDetailsList ">
                                <h4>Properties</h4>
                                <p>Textual traits that show up as rectangles</p>
                              </div>
                              <div className="col-lg-2 col-2 col-md-2">
                                <img
                                  data-toggle="modal"
                                  data-target="#PropertiesModal"
                                  className="addIcon"
                                  src={plusIcon}
                                  alt="add-icon"
                                />
                              </div>
                              <div className="row">
                                {properties.map((e, i) => {
                                  return (
                                    <div className="esyMuQ ml-2">
                                      <span style={{ fontSize: "16px" }}>
                                        {e.trait_type}
                                      </span>
                                      <br></br>
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          color: "blue",
                                        }}
                                      >
                                        {e.value}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </span>
                        </li>

                        <li>
                          <span>
                            <div className="row">
                              <div className="col-lg-10 col-10 col-md-10 NFTDetailsList">
                                <h4>Levels</h4>
                                <p>
                                  Numerical traits that show up as progreebar
                                </p>
                              </div>
                              <div className="col-lg-2 col-2 col-md-2">
                                <img
                                  data-toggle="modal"
                                  data-target="#LevelsModal"
                                  className="addIcon"
                                  src={plusIcon}
                                  alt="add-icon"
                                />
                              </div>
                            </div>
                          </span>

                          {levelsSavedata.map((e, i) => {
                            return (
                              <div className="row stats mt-2">
                                <div className="row">
                                  <div className="col-6 col-lg-6">
                                    <span style={{ textAlign: "left" }}>
                                      {e.character}
                                    </span>
                                  </div>
                                  <div className="col-6 col-lg-6">
                                    <span style={{ textAlign: "right" }}>
                                      {e.level + " of " + e.setlevel}
                                    </span>
                                  </div>
                                </div>
                                <div class="row progress">
                                  <div
                                    class="progress-bar"
                                    role="progressbar"
                                    style={{
                                      width:
                                        (
                                          (parseInt(e.level) /
                                            parseInt(e.setlevel)) *
                                          100
                                        ).toString() + "%",
                                    }}
                                    aria-valuenow={e.level}
                                    aria-valuemin="0"
                                    aria-valuemax={e.setlevel}
                                  ></div>
                                </div>
                                <br></br>
                              </div>
                            );
                          })}
                        </li>
                        <li>
                          <span>
                            <div className="row">
                              <div className="col-lg-10 col-10 col-md-10 NFTDetailsList">
                                <h4>Stats</h4>
                                <p>Numerical traits that show up as numbers</p>
                              </div>
                              <div className="col-lg-2 col-2 col-md-2">
                                <img
                                  data-toggle="modal"
                                  data-target="#StatsModal"
                                  className="addIcon"
                                  src={plusIcon}
                                  alt="add-icon"
                                />
                              </div>
                            </div>
                          </span>
                          {statsSavedata.map((e, i) => {
                            return (
                              <div>
                                <div className="row stats">
                                  <div className="col-6">
                                    <span>{e.character}</span>
                                  </div>
                                  <div className="col-6">
                                    <span>{e.level + " of " + e.setlevel}</span>
                                  </div>
                                  {/* <div class="row progress">
                                    <div
                                      class="progress-bar"
                                      role="progressbar"
                                      style={{
                                        width:
                                          (
                                            (parseInt(e.level) /
                                              parseInt(e.setlevel)) *
                                            100
                                          ).toString() + "%",
                                      }}
                                      aria-valuenow={e.level}
                                      aria-valuemin="0"
                                      aria-valuemax={e.setlevel}
                                    ></div>
                                  </div> */}
                                </div>

                                <br></br>
                              </div>
                            );
                          })}
                        </li>
                        <li>
                          <span>
                            <div className="row">
                              <div className="col-lg-10 col-10 col-md-10 NFTDetailsList">
                                <h4>Unlockable Contents</h4>
                                <p>
                                  Includes unlockable content that can only be
                                  revealed by the owner of ther item.
                                </p>
                              </div>
                              <div className="col-lg-2 col-2 col-md-2">
                                <div class="form-check form-switch">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheckDefault"
                                    onChange={() =>{
                                      if(unlock){
                                        setunlock(false)
                                      }else{
                                        setunlock(true)
                                      }
                                      }}
                                  />
                                </div>
                              </div>
                            </div>
                          </span>
                          {unlock && (
                            <textarea
                              name="user-message"
                              id="user-message"
                              class="form-control"
                              cols="20"
                              rows="10"
                              placeholder="Type unlockable Content"
                              onChange={(e) =>
                                setunlockabletext(e.target.value)
                              }
                            ></textarea>
                          )}
                        </li>

                        {/* <li>
                          <span>
                            <div className="row">
                              <div className="col-lg-10 col-10 col-md-10 NFTDetailsList">
                                <h4>
                                  {"Are you accept minting fees " +
                                    // mintiingfee.toString() +
                                    // (blockchain == "Polygon"
                                    //   ? "Matic "
                                    //   : blockchain == "BSC SmartChain"
                                    //   ? "BNB "
                                    //   : "ETH "
                                    // ).toString() +
                                    "?" +
                                    "  *"}
                                </h4>
                              </div>
                              <div className="col-lg-2 col-2 col-md-2">
                                <div class="form-check form-switch">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheckDefault"
                                    onChange={(e) =>
                                      setmystery(e.target.checked)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </span>
                        </li> */}
                        <li>
                          <span>
                            <div className="row">
                              <div className="col-lg-10 col-10 col-md-10 NFTDetailsList">
                                <h4>
                                  {"Are you accept royalties fees?" + "  *"}
                                </h4>
                              </div>
                              <div className="col-lg-2 col-2 col-md-2">
                                <div class="form-check form-switch">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheckDefault"
                                    onChange={(e) =>
                                      setexplicit(e.target.checked)
                                    }
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
                </div>
                {/* <div class="form-group">
                          <div className="col-lg-12 input_label">
                <span >Supply</span>
            </div>
                <small
                              id="exampleInputEmail1"
                              class="form-text text-muted uploadSmallText"
                            >
                              The number of copies that can be minted.
                            </small>
                <input
                                type="text"
                                class="form-control"
                                id="exampleInputEmail1"
                                //onChange={(e)=>setcopies(e.target.value)}
                                placeholder="Quantity"
                                value={1}
                                disabled={true}

                                
                              />
                              </div> */}
                {/* <div class="form-group">
                              <div className="col-lg-12 input_label">
                <span >Blockchain</span>
            </div>                    
                            <select
                              class="form-select"
                              id="exampleFormControlSelect1"
                              onChange={((e)=>networkhandle(e.target.value))}
                            >
                              <option value="" selected disabled>Select Chain</option>
                              <option value={'Ethereum'}>Ethereum</option>
                              <option value={'BSC'}>BSC Smart Chain</option>
                            </select>
                            
                          </div> */}

                <div className="form-group">
                  <div className="col-lg-12 input_label">
                    <span>{"Image, Video, Audio" + "  *"}</span>
                  </div>

                  <small
                    id="exampleFormControlSelect1"
                    class="form-text text-muted uploadSmallText"
                  >
                    File type supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3. Max
                    size 100MB
                  </small>
                  {/* <FilePond
                ref={ref}          
        files={files}
        onupdatefiles={(fileItems) => { setFiles(fileItems)}}
        allowMultiple={false}
        maxFiles={3}
        //server="/api"
        onChange={(e)=>handleChange(e)}
        name="files" 
        labelIdle='Drag & Drop your files <br/>or <span class="filepond--label-action"><br/>Browse Files</span>'
      /> */}
                  {files == "" && (
                    <input
                      type="file"
                      onChange={(e) => filehandle(e.target.files[0])}
                      disabled={propertiesenable}
                    />
                  )}
                  {filetype == "image" && previewhide && (
                    <div style={{ position: "relative" }}>
                      <button
                        type="button"
                        class="close AClass"
                        onClick={() => previewclosehandle()}
                      >
                        <span>&times;</span>
                      </button>
                      <img
                        src={files}
                        style={{ height: 300, width: 400 }}
                      ></img>
                    </div>
                  )}
                  {filetype == "audio" && previewhide && (
                    <div style={{ position: "relative" }}>
                      <button
                        type="button"
                        class="close AClass"
                        onClick={() => previewclosehandle()}
                      >
                        <span>&times;</span>
                      </button>
                      <audio controls>
                        <source src={files} type="audio/ogg" />
                        <source src={files} type="audio/mpeg" />
                      </audio>
                    </div>
                  )}
                  {filetype == "video" && previewhide && (
                    <div style={{ position: "relative" }}>
                      <button
                        type="button"
                        class="close AClass"
                        onClick={() => previewclosehandle()}
                      >
                        <span>&times;</span>
                      </button>
                      <video width="400" controls>
                        <source src={files} type="video/mp4" />
                        <source src={files} type="video/ogg" />
                      </video>
                    </div>
                  )}
                </div>

                {showpreview && (
                  <div className="form-group">
                    <div className="col-lg-12 input_label">
                      <span>Preview image</span>
                    </div>

                    {previewfile == "" && (
                      <input
                        type="file"
                        onChange={(e) => previewfilehandle(e.target.files[0])}
                      />
                    )}
                    {previewfile !== "" && (
                      <img
                        src={previewfile}
                        style={{ height: 300, width: 400 }}
                      ></img>
                    )}
                  </div>
                )}
              </form>

              <button
                className="mintNFT_btn1"
                disabled={propertiesenable}
                onClick={() => networkChange()}
              >
                {loading ? <div className="loading"></div> : "Create"}
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
          style={{ marginTop: "5%" }}
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
                  Add Properties
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
                <p>
                  Properties show up underneath your item, are clickable, and
                  can be filtered in your collection's sidebar.
                </p>
                <table className="PropertiesModalTable">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {propertiesContext.propertiesList.map((e,i)=>{
                    return (
                      <tr className='inputRow' key={i+1}>
                     
                      <td><div className='charInput'>
                      <button className='delProp_btn' onClick={() =>{handleDelete(i+1)}}><i class="bi bi-x-lg"></i></button><input type='text'  className='form-control characterInput' onChange={(e)=> propertiesdata(i,e.target.value,'character')} placeholder='Character'/>
                      </div>
                      </td>
                      <td><input type='text' className='form-control' onChange={(e)=> propertiesdata(i,e.target.value,'name')} placeholder='Male'/></td>
                    </tr>
                    )
                  })}
                 <tr className='add_btn_row'>
                   <td ><button className='add_btn' onClick={handleAdd}>Add</button></td>
                 </tr> */}
                    {proptext1 && (
                      <tr className="inputRow">
                        <td>
                          <div className="charInput">
                            <button
                              className="delProp_btn"
                              onClick={() => setproptext1(false)}
                            >
                              <i class="bi bi-x-lg"></i>
                            </button>{" "}
                            <input
                              type="text"
                              className="form-control characterInput"
                              onChange={(e) =>
                                propertiesdata(
                                  "Accessories",
                                  e.target.value,
                                  "character"
                                )
                              }
                              placeholder="Accessories"
                            />
                          </div>
                        </td>

                        <td>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                              propertiesdata(
                                "Accessories",
                                e.target.value,
                                "name"
                              )
                            }
                            placeholder="eg:pink"
                          />
                        </td>
                      </tr>
                    )}
                    {proptext2 && (
                      <tr className="inputRow">
                        <td>
                          <div className="charInput">
                            <button
                              className="delProp_btn"
                              onClick={() => setproptext2(false)}
                            >
                              <i class="bi bi-x-lg"></i>
                            </button>{" "}
                            <input
                              type="text"
                              className="form-control characterInput"
                              onChange={(e) =>
                                propertiesdata(
                                  "Background",
                                  e.target.value,
                                  "character"
                                )
                              }
                              placeholder="Background"
                            />
                          </div>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                              propertiesdata(
                                "Background",
                                e.target.value,
                                "name"
                              )
                            }
                            placeholder="eg:pink"
                          />
                        </td>
                      </tr>
                    )}
                    {proptext3 && (
                      <tr className="inputRow">
                        <td>
                          <div className="charInput">
                            <button
                              className="delProp_btn"
                              onClick={() => setproptext3(false)}
                            >
                              <i class="bi bi-x-lg"></i>
                            </button>{" "}
                            <input
                              type="text"
                              className="form-control characterInput"
                              onChange={(e) =>
                                propertiesdata(
                                  "Beak",
                                  e.target.value,
                                  "character"
                                )
                              }
                              placeholder="Beak"
                            />
                          </div>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                              propertiesdata("Beak", e.target.value, "name")
                            }
                            placeholder="eg:pink"
                          />
                        </td>
                      </tr>
                    )}
                    {proptext4 && (
                      <tr className="inputRow">
                        <td>
                          <div className="charInput">
                            <button
                              className="delProp_btn"
                              onClick={() => setproptext4(false)}
                            >
                              <i class="bi bi-x-lg"></i>
                            </button>{" "}
                            <input
                              type="text"
                              className="form-control characterInput"
                              onChange={(e) =>
                                propertiesdata(
                                  "Body",
                                  e.target.value,
                                  "character"
                                )
                              }
                              placeholder="Body"
                            />
                          </div>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                              propertiesdata("Body", e.target.value, "name")
                            }
                            placeholder="eg:pink"
                          />
                        </td>
                      </tr>
                    )}
                    {proptext5 && (
                      <tr className="inputRow">
                        <td>
                          <div className="charInput">
                            <button
                              className="delProp_btn"
                              onClick={() => setproptext5(false)}
                            >
                              <i class="bi bi-x-lg"></i>
                            </button>{" "}
                            <input
                              type="text"
                              className="form-control characterInput"
                              onChange={(e) =>
                                propertiesdata(
                                  "Eyes",
                                  e.target.value,
                                  "character"
                                )
                              }
                              placeholder="Eyes"
                            />
                          </div>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                              propertiesdata("Eyes", e.target.value, "name")
                            }
                            placeholder="eg:pink"
                          />
                        </td>
                      </tr>
                    )}
                    {proptext6 && (
                      <tr className="inputRow">
                        <td>
                          <div className="charInput">
                            <button
                              className="delProp_btn"
                              onClick={() => setproptext6(false)}
                            >
                              <i class="bi bi-x-lg"></i>
                            </button>{" "}
                            <input
                              type="text"
                              className="form-control characterInput"
                              onChange={(e) =>
                                propertiesdata(
                                  "Feet",
                                  e.target.value,
                                  "character"
                                )
                              }
                              placeholder="Feet"
                            />
                          </div>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                              propertiesdata("Feet", e.target.value, "name")
                            }
                            placeholder="eg:pink"
                          />
                        </td>
                      </tr>
                    )}
                    {proptext7 && (
                      <tr className="inputRow">
                        <td>
                          <div className="charInput">
                            <button
                              className="delProp_btn"
                              onClick={() => setproptext7(false)}
                            >
                              <i class="bi bi-x-lg"></i>
                            </button>{" "}
                            <input
                              type="text"
                              className="form-control characterInput"
                              onChange={(e) =>
                                propertiesdata(
                                  "Special",
                                  e.target.value,
                                  "character"
                                )
                              }
                              placeholder="Special"
                            />
                          </div>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                              propertiesdata("Special", e.target.value, "name")
                            }
                            placeholder="eg:pink"
                          />
                        </td>
                      </tr>
                    )}
                    {proptext8 && (
                      <tr className="inputRow">
                        <td>
                          <div className="charInput">
                            <button
                              className="delProp_btn"
                              onClick={() => setproptext8(false)}
                            >
                              <i class="bi bi-x-lg"></i>
                            </button>{" "}
                            <input
                              type="text"
                              className="form-control characterInput"
                              onChange={(e) =>
                                propertiesdata(
                                  "Mouth",
                                  e.target.value,
                                  "character"
                                )
                              }
                              placeholder="Mouth"
                            />
                          </div>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                              propertiesdata("Mouth", e.target.value, "name")
                            }
                            placeholder="eg:pink"
                          />
                        </td>
                      </tr>
                    )}
                    {proptext9 && (
                      <tr className="inputRow">
                        <td>
                          <div className="charInput">
                            <button
                              className="delProp_btn"
                              onClick={() => setproptext9(false)}
                            >
                              <i class="bi bi-x-lg"></i>
                            </button>{" "}
                            <input
                              type="text"
                              className="form-control characterInput"
                              onChange={(e) =>
                                propertiesdata(
                                  "Space",
                                  e.target.value,
                                  "character"
                                )
                              }
                              placeholder="Space"
                            />
                          </div>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                              propertiesdata("Space", e.target.value, "name")
                            }
                            placeholder="eg:pink"
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    setdummy(true);
                  }}
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
          style={{ marginTop: "5%" }}
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
                  Add Levels
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
                <p>
                  Levels show up underneath your item, are clickable, and can be
                  filtered in your collection's sidebar.
                </p>
                <table className="PropertiesModalTable">
                  <thead>
                    <tr>
                      <div className="row">
                        <div className="col-2"></div>
                        <div className="col-5">
                          <th>Name</th>
                        </div>
                        <div className="col-5">
                          <th>Value</th>
                        </div>
                      </div>
                    </tr>
                  </thead>
                  <tbody>
                    {propertiesContext.levelsList.map((e, i) => {
                      return (
                        <tr className="inputRow" key={i + 1}>
                          <div className="row">
                            <div className="col-2"></div>
                            <div className="col-5">
                              <td>
                                <div className="charInput">
                                  <button
                                    className="delProp_btn"
                                    onClick={() => {
                                      handleLevelDelete(i + 1);
                                    }}
                                  >
                                    <i class="bi bi-x-lg"></i>
                                  </button>
                                  <input
                                    type="text"
                                    className="form-control characterInput"
                                    onChange={(e) =>
                                      levelsdata(i, e.target.value, "character")
                                    }
                                    placeholder="Character"
                                  />
                                </div>
                              </td>
                            </div>
                            <div className="col-5">
                              <td>
                                <div className="row">
                                  <div className="col-5">
                                    <input
                                      onChange={(e) =>
                                        levelsdata(i, e.target.value, "val1")
                                      }
                                      type="text"
                                      className="form-control"
                                      min="1"
                                      max={usersetLevel}
                                    />
                                  </div>
                                  <div className="col-2">
                                    <span>of</span>
                                  </div>
                                  <div className="col-5">
                                    <input
                                      onChange={(e) =>
                                        levelsdata(i, e.target.value, "val2")
                                      }
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </td>
                            </div>
                          </div>
                        </tr>
                      );
                    })}
                    <tr className="add_btn_row">
                      <td>
                        <button className="add_btn" onClick={handleLevelAdd}>
                          Add
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => leavelsavehandle()}
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
          style={{ marginTop: "5%" }}
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
                  Add Stats
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
                <p>
                  Stats show up underneath your item, are clickable, and can be
                  filtered in your collection's sidebar.
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {propertiesContext.statsList.map((e, i) => {
                      return (
                        <tr className="inputRow" key={i + 1}>
                          <div className="row">
                            <div className="col-2"></div>
                            <div className="col-5">
                              <td>
                                <div className="charInput">
                                  <button
                                    className="delProp_btn"
                                    onClick={() => {
                                      handleStatsDelete(i + 1);
                                    }}
                                  >
                                    <i class="bi bi-x-lg"></i>
                                  </button>
                                  <input
                                    type="text"
                                    className="form-control characterInput"
                                    onChange={(e) =>
                                      statsdata(i, e.target.value, "character")
                                    }
                                    placeholder="Character"
                                  />
                                </div>
                              </td>
                            </div>
                            <div className="col-5">
                              <td>
                                <div className="row">
                                  <div className="col-5">
                                    <input
                                      onChange={(e) =>
                                        statsdata(i, e.target.value, "val1")
                                      }
                                      type="text"
                                      className="form-control"
                                      min="1"
                                      max={usersetStats}
                                    />
                                  </div>
                                  <div className="col-2">
                                    <span>of</span>
                                  </div>
                                  <div className="col-5">
                                    <input
                                      onChange={(e) =>
                                        statsdata(i, e.target.value, "val2")
                                      }
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </td>
                            </div>
                          </div>
                        </tr>
                      );
                    })}
                    <tr className="add_btn_row">
                      <td>
                        <button className="add_btn" onClick={handleStatsAdd}>
                          Add
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => statssavehandle()}
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

export default CreateNFTForm;
