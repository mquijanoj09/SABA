'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell } from "lucide-react"

export function AlertsContentComponent() {
  const alerts = [
    { id: 1, type: "supply", message: "Tomatoes are in short supply in Urban Area 2." },
    { id: 2, type: "weather", message: "Heavy rain expected in Rural Area 1 next week." },
    { id: 3, type: "demand", message: "High demand for organic vegetables in Urban Area 3." },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alerts</CardTitle>
        <CardDescription>Important notifications and weather alerts.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-center space-x-4 rounded-md border p-4">
              <Bell className={`h-4 w-4 ${alert.type === 'weather' ? 'text-blue-500' : 'text-amber-500'}`} />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {alert.type === 'weather' ? 'Weather Alert' : alert.type === 'supply' ? 'Supply Alert' : 'Demand Alert'}
                </p>
                <p className="text-sm text-muted-foreground">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}