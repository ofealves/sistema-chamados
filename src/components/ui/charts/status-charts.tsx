"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type StatusChartProps = {
  openTickets: number;
  inProgressTickets: number;
  resolvedTickets: number;
};

const StatusChart = ({
  openTickets,
  inProgressTickets,
  resolvedTickets,
}: StatusChartProps) => {
  const data = [
    { status: "Aberto", quantidade: openTickets, color: "#22c55e" },
    { status: "Em andamento", quantidade: inProgressTickets, color: "#eab308" },
    { status: "Resolvido", quantidade: resolvedTickets, color: "#3b82f6" },
  ];

  return (
    <div className="h-75 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantidade" radius={[8, 8, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.status} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusChart;