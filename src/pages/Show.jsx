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

    return () => {
      store.reset();
    };
  }, []);

  return (
    <div>
      <Header back />

      {store.data && (
        <>
          <header className="show-header">
            <img src={store.data.image.large} alt="coin" />
            <h2>
              {store.data.name} ({store.data.symbol})
            </h2>
          </header>
          <div className="width">
            <div className="show-graph">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
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
                  <Area
                    type="monotone"
                    dataKey="Price"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

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
            <Area
              type="monotone"
              dataKey="Price"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>

          <div className="show-details">
            <div className="width">
              <h2>Details</h2>
              <div className="show-details-row">
                <h3>Market Cap Rank</h3>
                <span>${store.data.market_cap_rank}</span>
              </div>
              <div className="show-details-row">
                <h3>24H High</h3>
                <span>${store.data.market_data.high_24h.usd}</span>
              </div>
              <div className="show-details-row">
                <h3>24H Low</h3>
                <span>${store.data.market_data.low_24h.usd}</span>
              </div>
              <div className="show-details-row">
                <h3>Circulating Supply</h3>
                <span>${store.data.market_data.circulating_supply}</span>
              </div>
              <div className="show-details-row">
                <h3>Current Price</h3>
                <span>${store.data.market_data.current_preice.usd}</span>
              </div>
              <div className="show-details-row">
                <h3>1y change</h3>
                <span>
                  ${store.data.market_data.price_change_pecentage_1y.tofixed(2)}
                  %
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
