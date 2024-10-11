"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  LineChart as RechartsLineChart,
  Line,
} from "recharts";

const supplyDemandData = [
  { name: "Urban Area 1", supply: 4000, demand: 2400 },
  { name: "Urban Area 2", supply: 3000, demand: 1398 },
  { name: "Urban Area 3", supply: 2000, demand: 9800 },
  { name: "Urban Area 4", supply: 2780, demand: 3908 },
  { name: "Urban Area 5", supply: 1890, demand: 4800 },
];

const priceTrendData = [
  { name: "Jan", price: 100 },
  { name: "Feb", price: 120 },
  { name: "Mar", price: 110 },
  { name: "Apr", price: 130 },
  { name: "May", price: 140 },
];

export function StatisticsContentComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
        <CardDescription>
          Overview of supply, demand, and market trends.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="supply-demand">
          <TabsList>
            <TabsTrigger value="supply-demand">Supply vs Demand</TabsTrigger>
            <TabsTrigger value="price-trends">Price Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="supply-demand">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsAreaChart data={supplyDemandData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="supply"
                  stroke="#008080"
                  fill="#008080"
                />
                <Area
                  type="monotone"
                  dataKey="demand"
                  stroke="#ff007f"
                  fill="#ff007f"
                />
              </RechartsAreaChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="price-trends">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsLineChart data={priceTrendData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#0000ff" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
