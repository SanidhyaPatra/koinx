import React from "react";
import { Link } from "react-router-dom";

export default function ListItems({ coin }) {
  return (
    <div className="home-cryptos">
      <Link to={`/${coin.id}`}>{coin.name}</Link>
    </div>
  );
}
