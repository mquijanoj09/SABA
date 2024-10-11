"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, BarChart2, TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
} from "recharts";

const supplyDemandData = [
  { month: "Jan", supply: 4000, demand: 2400 },
  { month: "Feb", supply: 3000, demand: 1398 },
  { month: "Mar", supply: 2000, demand: 9800 },
  { month: "Apr", supply: 2780, demand: 3908 },
  { month: "May", supply: 1890, demand: 4800 },
  { month: "Jun", supply: 2390, demand: 3800 },
];

const harvestData = [
  { name: "Tomatoes", quantity: 4000 },
  { name: "Lettuce", quantity: 3000 },
  { name: "Carrots", quantity: 2000 },
  { name: "Potatoes", quantity: 2780 },
  { name: "Onions", quantity: 1890 },
  { name: "Cucumbers", quantity: 2390 },
];

const revenueData = [
  { month: "Jan", revenue: 10000 },
  { month: "Feb", revenue: 12000 },
  { month: "Mar", revenue: 9000 },
  { month: "Apr", revenue: 15000 },
  { month: "May", revenue: 18000 },
  { month: "Jun", revenue: 20000 },
];
export function HomeContentComponent() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">254</div>
          <p className="text-xs text-muted-foreground">+20% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">45</div>
          <p className="text-xs text-muted-foreground">+15% from last week</p>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Supply vs Demand
          </CardTitle>
          <BarChart2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={supplyDemandData}>
              <XAxis dataKey="month" />
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
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Harvest</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsBarChart data={harvestData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#008000" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsLineChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#0000ff" />
            </RechartsLineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
