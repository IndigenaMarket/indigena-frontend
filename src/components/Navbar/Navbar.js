import React, { useContext,useRef,useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { connectWallet, connectFailed } from "../../redux/WalletAction";
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import userIcon from '../../Assets/user.svg'
import walletImage from '../../Assets/wallet.png'
import WalletConnectProvider from "@walletconnect/web3-provider";
import brandLogo from '../../Assets/logo.png'
import './Navbar.css'
import { Link, NavLink ,useNavigate} from "react-router-dom";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';



const Navbar = () => {
    
    
    let history=useNavigate();
    const[balance,setbalance]=useState(null);
    const[searchoption,setsearchoption]=useState([]);
    const[areaExpanded,setAreaEapanded]=useState(false)
    const[walletshow,setwalletshow]=useState(true);
    const dispatch = useDispatch();
    const wallet = useSelector((state) => state.WalletConnect);
    console.log(wallet);
    const {web3, address} = wallet;
    let options=[];
    const connect = () => { 
        console.log('connect');
        dispatch(connectWallet());
    }

    const errorDiv = () => {
        return (
            <p>Wallet Disconnected!</p>
        )
    }

    const disconnect = async() => {
        const { web3Modal } = wallet;
        web3Modal.clearCachedProvider();
        // if(WalletConnectProvider.close) {
        //     await WalletConnectProvider.close();
        //     await web3Modal.clearCachedProvider();
        //     WalletConnectProvider = null;
        //   }
         dispatch(connectFailed(errorDiv()));
    }
    const getsearchdata=async()=>{
        let tokensresult=await axios.get(process.env.REACT_APP_API_URL.toString()+"/Homesearch");
        
        if(tokensresult.status)
        {
           await tokensresult.data.collection.map((e,i)=>{
                e.label=e.CollectionName;
                e.type="Collection";
                options.push(e);
                // if(i==tokensresult.data.collection.length-1)
                // {
                //        setsearchoption(options) 
                // }
           })
           await tokensresult.data.allnfts.map((e,i)=>{
                e.label=e.ItemName;
                e.type="NFT";
                options.push(e);
                // if(i==tokensresult.data.allnfts.length-1)
                // {
                //     setsearchoption(options) 
                // }
            })
            await tokensresult.data.profiles.map((e,i)=>{
                
                if(e.UserName!==undefined&&e.UserName!=null&&e.UserName!=' ')
                {
                    console.log(e.UserName);
                    e.label=e.UserName;
                    e.type="Profile";
                    options.push(e);
                }
                // if(i==tokensresult.data.profiles.length-1)
                // {
                //     setsearchoption(options); 
                // }
            })
        }
    }
    const screennavigation=(value)=>{
        if(value)
        {

       
       if(value.type=="Profile")
       {
        history(`/collectionprofile/${value.WalletAddress}`);
        window.location.reload(false);
       }
       else if(value.type=="NFT"){
        history(`/collection/${process.env.REACT_APP_NFT_CONTRACT_ADDRESS}/${value.NftId}`);
        window.location.reload(false);
       }
       else if(value.type=="Collection")
       {
        localStorage.setItem("collectionname",value.CollectionName);
        history(`/UserCollection/${value.CollectionName}`);
        window.location.reload(false);
       }
    }
    }

    useEffect(() => {

        const getbalance=async()=>
        {
            if(web3)
            {
             
             web3.eth.getBalance(address)
             .then(async(balance)=>{
                 var amt1 = await web3.utils.fromWei(balance.toString(),'ether')
                //  alert(amt1);
                 setbalance(amt1);
             });
           console.log("Wallet web3",web3);
            }
        }
        getbalance();
        getsearchdata();
       
      }, [wallet]);
      useEffect(() => {

        getdataglobaldata()
        
       
      }, []);

      const getdataglobaldata=async()=>{
        await getsearchdata();
        setsearchoption(options); 

      }
    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light' role="navigation">
            <div className=" container-fluid navbar_mobile" style={{margin:0}}>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <Link className="nav-link"  to='/'>
                 <img src={brandLogo} className='brand_logo_img'/></Link> 
                { !wallet.connected &&  
                                <button className='navbar-toggler mr-auto ml-auto connect_btn_mobile' onClick={connect}>Connect Wallet</button> 
                            }
                        { wallet.connected && 
                            <button className='navbar-toggler mr-auto ml-auto btn btn-danger' onClick={disconnect} >Disconnect: {wallet.address.slice(0, 5) + '...' + wallet.address.slice(-5)}</button>
                        }
                        {/* <div className="searchbar_container">
                            <div className="search">
                        <input className="searchbar" placeholder="Search" type="text" name="txtBox" />
                        <button className="search_btn">
                        <SearchIcon color="action" class="search_icon"></SearchIcon>
                        </button>
                        </div>
                        </div> */}
                        
                        <ul class=" collapse navbar-collapse navbar-nav me-auto mb-2 mb-lg-0 nav_list_container" id="navbarTogglerDemo01">
                        
        <li class="nav-item" className='explore'><a>Explore</a>
        <ul className='explore-list'>
            <li ><NavLink activeClassName="active" style={{color:"black !important"}}to='/allnft'>NFT'S </NavLink></li>
            <li><NavLink activeClassName="active" style={{color:"black !important"}} to='/allcollection'>COLLECTION </NavLink></li>
        </ul>
        </li>
        {/* <NavLink activeClassName="active" className="nav-link"   to='/collections'> 
         Explore
        </NavLink> */}
        <li class="nav-item">
        <NavLink activeClassName="active" className="nav-link"    to='/mint'>
          Create
        </NavLink>
        </li>
        <li class="nav-item">
        <NavLink activeClassName="active" className="nav-link"    to='/stats'> 
          Stats
        </NavLink>
        </li>
        <li class="nav-item">
        <NavLink activeClassName="active" className="nav-link"    to='/resources'> Resources</NavLink>
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
                        <Autocomplete style={{background:"white",zIndex: "1100000 !important",borderRadius:"160px",border:"none"}}
                        onChange={(event, value) => screennavigation(value)}
                        popupIcon={<SearchIcon />}
      id="grouped-demo"
      options={searchoption}
      groupBy={(option) => option.type}
      getOptionLabel={(option) => option.label}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} style={{borderRadius:"160px"}} placeholder="Search" />}
    />
      <div className="account_icons_container">
      <div className="navbar navbar-collapse d-none d-md-block">
          <NavLink className="nav-link "    to='/user-profile'>
          <img src={userIcon}/> 
      </NavLink>
      {/* <img src={walletImage} class="wallet_icon"/> */}
      {walletshow?<i style={{fontSize:'32px',color:'white',marginRight:'30px'}} class="bi bi-wallet2" onClick={()=>setwalletshow(false)}></i>:<span style={{fontSize:'32px',color:'white',marginRight:'30px'}} onClick={()=>setwalletshow(true)}>{balance?parseFloat(balance).toFixed(2):""}</span>}
                    <div className="nav navbar-nav ms-auto ml-auto">
                        { !wallet.connected &&  
                                <button className='btn connect_btn_pc' onClick={connect}>Connect Wallet</button> 
                            }
                        { wallet.connected && 
                            <button className='btn btn-danger'onClick={disconnect} >Disconnect: {wallet.address.slice(0, 5) + '...' + wallet.address.slice(-5)}</button>
                        }
                    </div>
                </div>
      </div>
                
            </div>
        </nav>
    );
}

export default Navbar;