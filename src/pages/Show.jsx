import React from "react";
import showStore from "../stores/showStore";
import { useParams } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Header from "../components/Header";

export default function Show() {
  const store = showStore();
  const params = useParams();

  React.useEffect(() => {
    store.fetchData(params.id);
  }, []);

  if (!store.data) return <></> 

  return (
    <div>
      <Header back />
      <header>
        <img src ={store.data.image.large} alt = "coin"/>
        <h2>
          {store.data.name} ({store.data.symbol})
        </h2>
      </header>
      <AreaChart
        width={500}
        height={400}
        data={store.graphData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="Price" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
      <div>
        <h4>Market Cap Rank</h4>
        <span>${store.data.market_cap_rank}</span>
      </div>
      <div>
        <h4>24H High</h4>
        <span>${store.data.market_data.high_24h.usd}</span>
      </div>
      <div>
        <h4>24H Low</h4>
        <span>${store.data.market_data.low_24h.usd}</span>
      </div>
      <div>
        <h4>Circulating Supply</h4>
        <span>${store.data.market_data.circulating_supply}</span>
      </div>
      <div>
        <h4>Current Price</h4>
        <span>${store.data.market_data.current_preice.usd}</span>
      </div>
      <div>
        <h4>1y change</h4>
        <span>${store.data.market_data.price_change_pecentage_1y.tofixed(2)}%</span>
      </div>
    </div>
  );
}
