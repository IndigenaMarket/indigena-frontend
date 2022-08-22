import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ArtReflection from "../ArtReflection/ArtReflection";
import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import JoinIndi from "../JoinIndi/JoinIndi";
import OurCollections from "../OurCollections/OurCollections";
import ResourcesStarted from "../ResourcesStarted/ResourcesStarted";
import SellNFTs from "../SellNFTs/SellNFTs";
import TodaysPick from "../TodaysPick/TodaysPick";

import TopCollectionsList from "../TopCollectionsList/TopCollectionsList";
import SettledNftList from "../Settlednft/SettledNftList";
import TodayMinted from "../TodayMinted/TodayMinted";
import TopTrending from "../TopTrending/TopTrending";
import "./Home.css";

function Home() {
  const [isAdmin, setisAdmin] = useState(false);
  const wallet = useSelector((state) => state.WalletConnect);
  const { web3, address } = wallet;

  useEffect(async () => {
    getUserType();
  }, [address]);
  useEffect(async () => {
    getdollarprice();
  }, []);

  const getdollarprice = async () => {
    let tokensresult = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    if (tokensresult.data) {
      tokensresult.data.map((e) => {
        if (e.id == "ethereum") {
          localStorage.setItem("Eth-price", e.current_price);
        } else if (e.id == "binancecoin") {
          localStorage.setItem("Bnb-price", e.current_price);
        } else if (e.id == "matic-network") {
          localStorage.setItem("Matic-price", e.current_price);
        }
      });
    }
  };
  const getUserType = async () => {
    if (address) {
      let tokensresult = await axios.post(
        process.env.REACT_APP_API_URL.toString() + "/getnft",
        { WalletAddress: address }
      );
      if (tokensresult.data.result[0].IsAdmin) {
        setisAdmin(true);
      }
    }
  };

  return (
    <div className="home_page">
      <section>
        <Banner />
      </section>
      <section>
        <ArtReflection />
      </section>
      <section>
        <OurCollections />
      </section>
      <section>
        <TopTrending />
      </section>
      <section>
        <TodaysPick />
      </section>
      <section>
        <TopCollectionsList />
      </section>
      {isAdmin && (
        <section>
          <SettledNftList />
        </section>
      )}

      {isAdmin && (
        <section>
          <TodayMinted />
        </section>
      )}
      <section>
        <SellNFTs />
      </section>
      <section>
        <ResourcesStarted />
      </section>
      <div className="Background">
        <section>
          <JoinIndi />
        </section>
        <section>
          <Footer />
        </section>
      </div>
    </div>
  );
}

export default Home;
