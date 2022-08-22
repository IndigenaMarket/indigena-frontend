import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet, connectFailed } from "../../redux/WalletAction";
import ConnectWallet from "../ConnectWallet/index";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import userIcon from "../../Assets/user.svg";
import walletImage from "../../Assets/wallet.png";
import WalletConnectProvider from "@walletconnect/web3-provider";
import brandLogo from "../../Assets/logo.png";
import "./Navbar.css";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Paper } from "@mui/material";

import axios from "axios";
import useWindowDimensions from "../../Utils/useWindowDimensions";

const Navbar = () => {
  let history = useNavigate();
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [balance, setbalance] = useState(null);
  const [searchoption, setsearchoption] = useState([]);
  const [areaExpanded, setAreaEapanded] = useState(false);
  const [walletshow, setwalletshow] = useState(true);
  const [Blockchain, setBlockchain] = useState("");

  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.WalletConnect);
  const { web3, address, provider } = wallet;

  const [newWalletShow, setNewWalletShow] = useState(false);
  const connect = () => {
    setNewWalletShow(true);
    // dispatch(connectWallet());
  };

  const errorDiv = () => {
    return <p>Wallet Disconnected!</p>;
  };

  const disconnect = async () => {
    const { web3Modal } = wallet;
    web3Modal.clearCachedProvider();
    dispatch(connectFailed(errorDiv()));
  };
  const getsearchdata = async () => {
    let options = [];
    let tokensresult = await axios.get(
      process.env.REACT_APP_API_URL.toString() + "/Homesearch"
    );

    if (tokensresult.status) {
      await tokensresult.data.collection.map((e, i) => {
        e.label = e.CollectionName;
        e.type = "Collection";
        options.push(e);
      });
      await tokensresult.data.allnfts.map((e, i) => {
        e.label = e.ItemName;
        e.type = "NFT";
        options.push(e);
      });
      await tokensresult.data.profiles.map((e, i) => {
        if (
          e.UserName !== undefined &&
          e.UserName != null &&
          e.UserName != " "
        ) {
          e.label = e.UserName;
          e.type = "Profile";
          options.push(e);
        }
      });
    }
    setsearchoption(options);
  };
  const screennavigation = (value) => {
    if (value) {
      if (value.type == "Profile") {
        history(`/collectionprofile/${value.WalletAddress}`);
        window.location.reload(false);
      } else if (value.type == "NFT") {
        history(
          `/collection/${process.env.REACT_APP_NFT_ETH_CONTRACT}/${value.NftId}`,
          { state: { owner: value?.WalletAddress == address } }
        );
        window.location.reload(false);
      } else if (value.type == "Collection") {
        localStorage.setItem("collectionname", value.CollectionName);
        history(`/UserCollection/${value.CollectionName}`);
        window.location.reload(false);
      }
    }
  };

  useEffect(() => {
    const getbalance = async () => {
      if (web3) {
        web3.eth.getBalance(address).then(async (balance) => {
          var amt1 = await web3.utils.fromWei(balance.toString(), "ether");
          setbalance(amt1);
        });

        if (
          window.ethereum &&
          window.ethereum.networkVersion === process.env.REACT_APP_ETH_Chain_ID
        ) {
          setBlockchain("Ethereum");
        }

        if (
          window.ethereum &&
          window.ethereum.networkVersion === process.env.REACT_APP_BSC_Chain_ID
        ) {
       
          setBlockchain("BSC SmartChain");
        }

        if (
          window.ethereum &&
          window.ethereum.networkVersion ===
            process.env.REACT_APP_MATIC_Chain_ID
        ) {
     
          setBlockchain("Polygon");
        }
      }
    };
    getbalance();
    getsearchdata();
  }, [wallet]);
  useEffect(() => {
    getdataglobaldata();
  }, []);

  const getdataglobaldata = async () => {
    await getsearchdata();
  };
  const {width} = useWindowDimensions()
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      role="navigation"
    >
      <ConnectWallet
        openWallet={newWalletShow}
        setOpenWallet={setNewWalletShow}
      />
      <div className=" container-fluid navbar_mobile " style={{}}>
        <div className="mob-toggle-logo">
          <button
            class="navbar-toggler "
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{backgroundColor:"rgba(255,255,255,0.5)"}}
          >
            <span class="navbar-toggler-icon " style={{color:"#fff",}}></span>
          </button>
          {
              width < 600 &&
            <div className="nav navbar-nav ms-auto ml-auto">
              {!wallet.connected && (
                <button className="btn connect_btn_pc" onClick={connect}>
                  Connect Wallet
                </button>
              )}
              {wallet.connected && (
                <button className="btn btn-danger" onClick={disconnect} style={{borderRadius:"1em"}}>
                  Disconnect:{" "}
                  {wallet.address.slice(0, 5) +
                    "..." +
                    wallet.address.slice(-5)}
                </button>
              )}
            </div>
            }
          <Link
              // data-toggle="collapse"
              // data-target="#navbarTogglerDemo01"
              // aria-controls="navbarTogglerDemo01"
              // aria-expanded="false"
              className="nav-link " to="/">
            <img src={brandLogo} className="brand_logo_img mobileLogo" />
          </Link>
        </div>
      

        <ul
          class=" collapse navbar-collapse navbar-nav me-auto mb-2 mb-lg-0 nav_list_container"
          id="navbarTogglerDemo01"
        >
          <li class="nav-item" className="explore ">
            <a>Explore</a>
            <ul className="explore-list">
              <li>
                <NavLink
                  data-toggle="collapse"
                  data-target="#navbarTogglerDemo01"
                  aria-controls="navbarTogglerDemo01"
                  aria-expanded="false"

                  activeClassName="active"
                  style={{ color: "black !important" }}
                  to="/allnft"
                >
                  NFTs
                </NavLink>
              </li>
              <li>
                <NavLink
                  data-toggle="collapse"
                  data-target="#navbarTogglerDemo01"
                  aria-controls="navbarTogglerDemo01"
                  aria-expanded="false"

                  activeClassName="active"
                  style={{ color: "black !important" }}
                  to="/allcollection"
                >
                  COLLECTION{" "}
                </NavLink>
              </li>
            </ul>
          </li>
          {/* <NavLink activeClassName="active" className="nav-link"   to='/collections'> 
         Explore
        </NavLink> */}
          <li class="nav-item">
            <NavLink 
              data-toggle="collapse"
              data-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
            activeClassName="active" className="nav-link" to="/mint">
              Create
            </NavLink>
          </li>

          <li class="nav-item" className="explore">
            <a>Stats</a>
            <ul className="explore-list">
              <li>
                <NavLink
                  data-toggle="collapse"
                  data-target="#navbarTogglerDemo01"
                  aria-controls="navbarTogglerDemo01"
                  aria-expanded="false"

                  activeClassName="active"
                  className="nav-link"
                  to="/stats"
                >
                  Top NFTs
                </NavLink>
              </li>
              <li>
                <NavLink
                  data-toggle="collapse"
                  data-target="#navbarTogglerDemo01"
                  aria-controls="navbarTogglerDemo01"
                  aria-expanded="false"

                  activeClassName="active"
                  style={{ color: "black !important" }}
                  to="/allactivities"
                >
                  Activities
                </NavLink>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <NavLink
                    data-toggle="collapse"
                    data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
              activeClassName="active"
              className="nav-link"
              to="/resources"
            >
              {" "}
              Resources
            </NavLink>
          </li>
        </ul>

        {/* <div className="searchbar_container">
                            <div className="search">
                        <input className="searchbar" placeholder="Search" type="text" name="txtBox" />
                        <button className="search_btn">
                        <SearchIcon color="action" class="search_icon"></SearchIcon>
                        </button>
                        </div>
                        </div> */}

        <Autocomplete
          style={{
            background: "white",
            zIndex: "1100000 !important",
            borderRadius: "160px",
            border: "none",
            borderBottom: "1px solid #fff",
          }}
          onChange={(event, value) => screennavigation(value)}
          //   popupIcon={<SearchIcon />}
          id="grouped-demo"
          // id="free-solo-demo"
          freeSolo
          options={searchoption}
          groupBy={(option) => option.type}
          getOptionLabel={(option) => option.label}
          sx={{ width: 300, borderBottom: "1px solid #fff" }}
          renderInput={(params) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                {...params}
                style={{ borderRadius: "160px" }}
                placeholder="Search"
              />
              <SearchIcon style={{ marginRight: "20px" }} />
            </div>
          )}
        />
      
        <div className="account_icons_container mobile">
          <div className="navbar navbar-collapse d-none d-md-block">
            {address == "" ? (
              <img
                src={userIcon}
                onClick={() => {
                  toast("Connect your wallet to check your profile");
                }}
              />
            ) : (
              <NavLink className="nav-link " to={"/user-profile"}>
                <img src={userIcon} />
              </NavLink>
            )}
            {/* <img src={walletImage} class="wallet_icon"/> */}
            {walletshow ? (
              <i
                style={{
                  fontSize: "32px",
                  color: "white",
                  marginRight: "30px",
                  cursor: "pointer",
                }}
                class="bi bi-wallet2 mobile"
                onClick={() => {
                  if (address == "") {
                    toast("Connect your wallet to check your balance");
                    return;
                  }
                  setwalletshow(false);
                }}
              ></i>
            ) : (
              <span
              className="mobile"
                style={{
                  fontSize: "18px",
                  color: "white",
                  marginRight: "30px",
                  border:"1px solid #232323",
                  borderRadius:"5px",
                  boxShadow: "0px 5px 10px -5px rgb(40, 40, 40)"
                }}
                onClick={() => setwalletshow(true)}
              >
                {Blockchain == "" ? 
                "-": (
                  <div className="m-1 px-2">
                    <img
                      style={{ height: "20px", width: "20px" }}
                      src={
                        Blockchain == "Ethereum"
                          ? require("../../Assets/currency/matic.svg")
                          : Blockchain == "BSC SmartChain"
                          ? require("../../Assets/currency/bnb.svg")
                          : require("../../Assets/currency/matic2.svg")
                      }
                      alt=""
                    />
                    {"  "}
                    {balance ? parseFloat(balance).toFixed(2) : ""}
                  </div>
                )}
              </span>
            )}
            {
              width > 600 &&
            <div className="nav navbar-nav ms-auto ml-auto">
              {!wallet.connected && (
                <button className="btn connect_btn_pc" onClick={connect}>
                  Connect Wallet
                </button>
              )}
              {wallet.connected && (
                <button className="btn btn-danger" onClick={disconnect}>
                  Disconnect:{" "}
                  {wallet.address.slice(0, 5) +
                    "..." +
                    wallet.address.slice(-5)}
                </button>
              )}
            </div>
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
