"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

type PriorityChartProps = {
  highPriorityTickets: number;
  mediumPriorityTickets: number;
  lowPriorityTickets: number;
};

const PriorityChart = ({
  highPriorityTickets,
  mediumPriorityTickets,
  lowPriorityTickets,
}: PriorityChartProps) => {
  const data = [
    { name: "Alta", value: highPriorityTickets, color: "#ef4444" },
    { name: "Média", value: mediumPriorityTickets, color: "#f59e0b" },
    { name: "Baixa", value: lowPriorityTickets, color: "#6b7280" },
  ];

  return (
    <div className="h-75 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={110}
            label
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriorityChart;