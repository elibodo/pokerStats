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

  // Calculate the cumulative profit
  let cumulativeProfit = 0;
  const cumulativeChartData = chartData.map((data) => {
    cumulativeProfit += data.netProfit;
    return {
      ...data,
      cumulativeProfit: cumulativeProfit,
    };
  });

  return (
    <div style={{ width: "100%", height: 300, marginTop: "20px" }}>
      <h3>Cumulative Wins & Losses Over Time</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={cumulativeChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="cumulativeProfit" stroke="#28a745" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PokerStatGraph;
