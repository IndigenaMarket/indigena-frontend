// constants
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import store from "./store";
import marketContract from "../contracts/TradeContract_Eth.json";
import marketContractBNB from "../contracts/TradeContract_BSC.json";
import marketContractMATIC from "../contracts/TradeContract_MATIC.json";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

export const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

export const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const getProviderOptions = () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          //infuraId: process.env.REACT_APP_INFURA_ID
          rpc: {
            56: "https://bsc-dataseed.binance.org",
            97: "https://data-seed-prebsc-1-s1.binance.org:8545/"
          }
        }
      }
    }
    return providerOptions;
}

export const connectWallet = (walletname) => {
    return async(dispatch) => {
        dispatch(connectRequest());
        try {
            const web3Modal = new Web3Modal({
                cacheProvider: true,
                providerOptions: getProviderOptions() // required
            });
    
            var provider = '';
            if(walletname === "coinbasewallet"){
              var provider = await web3Modal.connectTo('coinbasewallet')
             }else if(walletname === "walletconnect" ){
              var provider =await web3Modal.connectTo("walletconnect")
             }else if(walletname === "fortmatic" ){
               var provider =await web3Modal.connectTo("fortmatic")
             }else if(walletname === "metamask"){
               const web3Modal = new Web3Modal({
                 cacheProvider: true,
                 providerOptions: getProviderOptions().walletconnect // required
               });
               var provider =await web3Modal.connect()
             }else{
               const web3Modal = new Web3Modal({
                 cacheProvider: true,
                 providerOptions: getProviderOptions().walletconnect // required
               });
               var provider = await web3Modal.connect()
             }
            const marketContractAddress = process.env.REACT_APP_NFT_TRADE_ETH;

            await subscribeProvider(provider);
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            const address = accounts[0];
        
            const market = new web3.eth.Contract(
              marketContract,
              process.env.REACT_APP_NFT_TRADE_ETH
            );

            const BNB_market = new web3.eth.Contract(
              marketContractBNB,
              process.env.REACT_APP_NFT_TRADE_BNB
            );

            const MATIC_market = new web3.eth.Contract(
              marketContractMATIC,
              process.env.REACT_APP_NFT_TRADE_MATIC
            );
            dispatch(
                connectSuccess({
                    address,
                    web3,
                    market,
                    BNB_market,
                    MATIC_market,
                    provider,
                    connected: true,
                    web3Modal
                })
            );
        } catch (e) {
            dispatch(connectFailed(e));
        }
    }
}

const subscribeProvider = async(provider) => {
    if (!provider.on) {
      return;
    }
    provider.on('connect', async(id) => {
    });
    provider.on("networkChanged", async (networkId) => {
      if(networkId==1)
      {
        if(networkId !== '1') {
          store.dispatch(connectFailed('Please switch to proper mainnet'));
        } else {
          store.dispatch(connectWallet());
        }
      }
      else if(networkId==56)
      {
        if(networkId !== '56') {
          store.dispatch(connectFailed('Please switch to proper mainnet'));
        } else {
          store.dispatch(connectWallet());
        }
      }
      else 
      {
        if(networkId !== '137') {
          store.dispatch(connectFailed('Please switch to proper mainnet'));
        } else {
          store.dispatch(connectWallet());
        }
      }
      
    });
}

export const addNetwork=async(id) =>{
  const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions: getProviderOptions() // required
});

const provider = await web3Modal.connect();
await subscribeProvider(provider);

const web3 = new Web3(provider);
  let networkData;
  switch (Number(id)) {
   
    case 56:
      networkData = [

        {
        chainId: "0x61",
        chainName: "BNB Smart Chain Mainnet",
        rpcUrls: ["https://bsc-dataseed1.binance.org/"],
        nativeCurrency: {
        name: "BINANCE COIN",
        symbol: "BNB",
        decimals: 18,
        },
        blockExplorerUrls: ["https://bscscan.com/"],
        },
        
        ];
        connectWallet();
      break;
    case 1:
      networkData = [
        {
          chainId: '0x1'
        }
      ]
      break;
    case 137:
      
      networkData=JSON.stringify(networkData)
      networkData = [
        {
          chainId: web3.utils.toHex('137'),
          chainName: "Polygon",
          rpcUrls: ["https://polygon-rpc.com/"],
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
          blockExplorerUrls: ["https://polygonscan.com/"],
        },
      ];
  
        break;    
    default:
      break;
  }

  if(Number(id)!=1)
    {
      return window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: networkData,
        });
    }
    else
    {
      return window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: networkData,
        });
    }
}

(() => {
  if(window.ethereum) {
    window.ethereum.on('networkChanged', function(networkId){
      if(networkId !== '1') {
        store.dispatch(connectFailed('Please switch to mainnet'));
      } else {
        store.dispatch(connectWallet());
      }
    });
  }
})();



