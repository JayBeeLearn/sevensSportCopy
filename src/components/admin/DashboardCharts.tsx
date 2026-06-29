"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const pageViewsData = [
  { date: "Mon", views: 4000 },
  { date: "Tue", views: 3000 },
  { date: "Wed", views: 5000 },
  { date: "Thu", views: 8780 },
  { date: "Fri", views: 5890 },
  { date: "Sat", views: 10230 },
  { date: "Sun", views: 12400 },
];

const adClicksData = [
  { name: "Sidebar", clicks: 4000 },
  { name: "Inline", clicks: 6000 },
  { name: "Hero", clicks: 2400 },
];

export function TrafficChart() {
  return (
    <div className="h-[250px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={pageViewsData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
            itemStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AdPerformanceChart() {
  return (
    <div className="h-[250px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={adClicksData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
            cursor={{ fill: 'hsl(var(--muted))' }}
          />
          <Bar dataKey="clicks" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
