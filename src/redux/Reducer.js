import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

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

const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions: getProviderOptions() // required
});


const initialState = {
    loading: false,
    address: "",
    connected: false,
    web3: null,
    provider: null,
    token: null,
    errorMsg: null,
    reward: null,
    market: null,
    BNB_market:null,
    MATIC_market:null,
    web3Modal
}

const walletConnectReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CONNECTION_REQUEST":
            return {
                ...initialState,
                loading: true,
            };
        case "CONNECTION_SUCCESS":
            return {
                ...state,
                loading: false,
                address: action.payload.address,
                token: action.payload.token,
                reward: action.payload.reward,
                web3: action.payload.web3,
                provider: action.payload.provider,
                market: action.payload.market,
                BNB_market:action.payload.BNB_market,
                MATIC_market:action.payload.MATIC_market,
                connected: action.payload.connected
            };
        case "CONNECTION_FAILED":
            return {
                ...initialState,
                loading: false,
                errorMsg: action.payload,
            };
        case "UPDATE_ADDRESS":
            return {
                ...state,
                address: action.payload.address,
            };
        default:
            return state;
    }
};

export default walletConnectReducer;
  