import React,{useEffect,useState} from "react";
import Logout from "../../Assets/exit.png";
import "./ListItem.css";
import NFT from "../../Assets/NFT-9.png";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet, connectFailed } from "../../redux/WalletAction";
import Card2 from "../../Assets/listitem-card-1-edited.png";
import Card1 from "../../Assets/listitem-card-2-edited.png";
import { useNavigate } from "react-router-dom";

function ListItem() {
  const history = useNavigate ();
  const [code,setCode] = useState("")
  const [NftResult,setNftResult]=useState({})
  const[tokenId,settokenId]=useState('');
  const dispatch = useDispatch();
    const wallet = useSelector((state) => state.WalletConnect);
    console.log(wallet);
  useEffect(() => {     
        
    let url=window.location.href
    url=url.split('/')
    let code=url[url.length-1]
    console.log(url)
    setCode(code)
 }, [])

 const errorDiv = () => {
  return (
      <p>Wallet Disconnected!</p>
  )
}
const logoutclicked=()=>{
  
      const { web3Modal } = wallet;
      web3Modal.clearCachedProvider();
      dispatch(connectFailed(errorDiv()));
      history('/');
}
  return (
    <div className="listItem_page">
      <div className="container-fluid">
        <div className="row listItemRow1">
          <div className="col-lg-2 logoutIcon_container">
            <img src={Logout} onClick={()=>logoutclicked()} />
          </div>
          <div className="col-lg-10 listItem_heading_container">
            <h2>List Item for Sale</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-1"></div>
          
          <div className="col-lg-7 col-12 auctionContainer">
          
                <img className="fixedContainer" src={Card1}  onClick={()=>history(`/fixed-price/${code}`)}/>
               
                
            <img className="fixedContainer smallImg" src={Card2} onClick={()=>history(`/auction/${code}`)}/>
           
          </div>
          <div className="col-lg-3 previeewContainer">
          <div className="col-lg-10 listItem_heading_container previewHeading">
            <h2 className="previewHeading">Preview</h2>
          </div>
            <div className="listItemNFTConainer">
              <img src={localStorage.getItem('ImageUrl')?localStorage.getItem('ImageUrl'):NFT} />
            </div>
          </div>
          <div className="col-lg-1"></div>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
