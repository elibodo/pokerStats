import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const PokerStatGraph = ({ stats }) => {
  const chartData = stats.map((stat) => ({
    date: new Date(stat.datePlayed).toLocaleDateString("en-US"),
    netProfit: stat.moneyOut - stat.moneyIn,
  }));

  return (
    <div style={{ width: "100%", height: 300, marginTop: "20px" }}>
      <h3>Wins & Losses Over Time</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="netProfit" stroke="#007bff" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PokerStatGraph;
