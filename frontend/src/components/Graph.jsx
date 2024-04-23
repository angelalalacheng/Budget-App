import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Graph = ({ graphData }) => {
  const data = Object.entries(graphData).map(([k, v]) => ({
    name: v.key.charAt(0).toUpperCase() + v.key.slice(1),
    spent: v.amountSpent,
    remaining: v.amountRemaining,
  }));
  return (
    <ResponsiveContainer width="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval={0} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="spent" stackId="a" fill="#8884d8" name="Amount Spent" />
        <Bar
          dataKey="remaining"
          stackId="a"
          fill="#82ca9d"
          name="Amount Remaining"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Graph;
