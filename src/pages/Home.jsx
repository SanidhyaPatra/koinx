import React from "react";
import homeStore from "../stores/homeStore";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ListItems from "../components/ListItems";

export default function Home() {
  const store = homeStore();

  React.useEffect(() => {
    store.fetchCoins();
  }, []);

  return (
    <div>
      <Header />
      <header className="home-search">
        <div className="width">
          <h2>Search for a coin!</h2>
          <input type="text" value={store.query} onChange={store.setQuery} />
        </div>
      </header>
      <div className="home-cryptos">
        <div className="width">
          <h2>Trending Coins</h2>
          {store.coins.map((coin) => {
            return <ListItems key={coin.id} coin={coin} />;
          })}
        </div>
      </div>
    </div>
    
  );
}
