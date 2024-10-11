'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function UnauthorizedContentComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Unauthorized Access</CardTitle>
        <CardDescription>You do not have permission to view this content.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Please contact an administrator if you believe you should have access to this section.</p>
      </CardContent>
    </Card>
  )
}