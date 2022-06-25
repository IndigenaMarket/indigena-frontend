// constants
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import store from "./store";
import marketContract from "../contracts/market.json";
import marketContractBNB from "../contracts/BNBmarket.json";
import marketContractMATIC from "../contracts/MaticMarket.json";

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

// const updateAccountRequest = (payload) => {
//   return {
//     type: "UPDATE_ADDRESS",
//     payload: payload,
//   };
// };

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

export const connectWallet = () => {
    return async(dispatch) => {
        dispatch(connectRequest());
        try {
            const web3Modal = new Web3Modal({
                cacheProvider: true,
                providerOptions: getProviderOptions() // required
            });
    
            const provider = await web3Modal.connect();
            const marketContractAddress = process.env.REACT_APP_NFT_ADDRESS
;
    
            await subscribeProvider(provider);
            
            const web3 = new Web3(provider);
        
            const accounts = await web3.eth.getAccounts();
            const address = accounts[0];
        
            const market = new web3.eth.Contract(
              marketContract,
              //tokenContract.output.abi,
              process.env.REACT_APP_NFT_ADDRESS
            );

            const BNB_market = new web3.eth.Contract(
              marketContractBNB,
              //tokenContract.output.abi,
              process.env.REACT_APP_NFT_TRADE_BNB
            );

            const MATIC_market = new web3.eth.Contract(
              marketContractMATIC,
              //tokenContract.output.abi,
              process.env.REACT_APP_NFT_TRADE_MATIC
            );

            


            // if((window.ethereum && window.ethereum.networkVersion !== '97')||(window.ethereum && window.ethereum.networkVersion !== '8001')) {
            //   await addNetwork(4);
            // }
            // else if(window.ethereum && window.ethereum.networkVersion == '80001') {
            //   await addNetwork(80001);
            // }
            // else{
            
            //   await addNetwork(4);
            // }

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
      console.log(id);
    });

    provider.on("networkChanged", async (networkId) => {
      if(networkId==4)
      {
        if(networkId !== '4') {
          console.log(networkId);
          store.dispatch(connectFailed('Please switch to proper mainnet'));
        } else {
          store.dispatch(connectWallet());
        }
      }
      else if(networkId==97)
      {
        if(networkId !== '97') {
          console.log(networkId);
          store.dispatch(connectFailed('Please switch to proper mainnet'));
        } else {
          store.dispatch(connectWallet());
        }
      }
      else 
      {
        if(networkId !== '80001') {
          console.log(networkId);
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
  switch (id) {
   
    case 97:
      networkData = [

        {
        
        chainId: "0x61",
        
        chainName: "BSCTESTNET",
        
        rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
        
        nativeCurrency: {
        
        name: "BINANCE COIN",
        
        symbol: "BNB",
        
        decimals: 18,
        
        },
        
        blockExplorerUrls: ["https://testnet.bscscan.com/"],
        
        },
        
        ];
        connectWallet();
      break;
    case 4:
      networkData = [
        {
          chainId: '0x4'
         
        }
      ]
      break;
    case 80001:
      
      networkData=JSON.stringify(networkData)
      networkData = [
        {
          chainId: web3.utils.toHex('80001'),
          chainName: "Mumbai Testnet",
          rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
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

  console.log(networkData)
  if(id!=4)
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
      if(networkId !== '4') {
        console.log(networkId);
        store.dispatch(connectFailed('Please switch to mainnet'));
      } else {
        store.dispatch(connectWallet());
      }
    });
  }
})();



