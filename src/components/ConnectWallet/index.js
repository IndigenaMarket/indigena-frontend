import React from "react";
import {
  Button,
  Box,
  CardMedia,
  Typography,
  Modal,
  Radio
} from "@mui/material";
import useStyles from "./styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet, connectFailed,addNetwork } from "../../redux/WalletAction";
import useWindowDimensions from "../../Utils/useWindowDimensions";


function ConnectWallet({ openWallet, setOpenWallet }) {
  const wallet = useSelector((state) => state.WalletConnect);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = React.useState("Metamask");
  const [selectedwallet, setSelectedwallet] = React.useState("metamask");

  const handleChange = (event) => {
    setSelectedValue(event.title);
    setSelectedwallet(event.wallet)
  };
const {width} = useWindowDimensions()
  const walletData = [
    {
      title: "Metamask",
      icon: require("./wallet/metamask.png"),
      wallet:'metamask'
    },
    {
      title: "Coinbase Wallet",
      icon: require("./wallet/coinbase.png"),
      wallet:'coinbasewallet'
    },
    {
      title: "WalletConnect",
      icon: require("./wallet/wallet.png"),
      wallet:'walletconnect'
    },
    {
      title: "Fortmatic",
      icon: require("./wallet/fortmatic.png"),
      wallet:'fortmatic'
    },
    // {
    //   title: "Portis",
    //   icon: Images.PortisIcon
    // }
  ];
  const connect= (walletname) =>{
    setOpenWallet(false)
    dispatch( connectWallet(walletname));
  } 
  return (
    <Box>
      <Modal open={openWallet} onClose={() => setOpenWallet(false)}>
        <Box className={classes.walletContainer}>
          <Typography variant="h5" className={classes.walletTitle}>
            Connect your wallet
          </Typography>
          <Box className={classes.divider} />
          <Box className={classes.itemContainer}>
            {walletData.map((item, index) =>
              <Box className={classes.radioContainer} key={index}>
                <Box className={classes.radioTitle}>
                  <Radio
                    checked={selectedValue === item.title}
                    onChange={()=>handleChange(item)}
                    value={item.title}
                    name="radio-buttons"
                    sx={{
                      "&.Mui-checked": {
                        color:"#b22222",
                      },
                    }}
                    inputProps={{ "aria-label": item.title }}
                  />
                  <Typography variant="body1" className={classes.title}>
                    {item.title}
                  </Typography>
                </Box>
                <CardMedia
                  component="img"
                  image={item?.icon}
                  className={classes.icon}
                />
              </Box>
            )}
          </Box>
          <Box className={classes.btnContainer}>
            <Button
              className={classes.btnNext}
              onClick={() => connect(selectedwallet)
                // selectedValue && 
                // navigate(`/token?wallet=${selectedValue}`)
              }
            >
              {"Connect"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default ConnectWallet;
