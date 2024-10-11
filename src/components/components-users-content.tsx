'use client'

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function UsersContentComponent({ users, onUpdateUser }) {
  const [editingUser, setEditingUser] = useState(null)

  const handleEditUser = (user) => {
    setEditingUser({ ...user })
  }

  const handleSaveUser = () => {
    onUpdateUser(editingUser)
    setEditingUser(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>Manage user profiles and permissions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>Edit</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>Make changes to the user profile here.</DialogDescription>
                      </DialogHeader>
                      {editingUser && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input
                              id="name"
                              value={editingUser.name}
                              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input
                              id="email"
                              value={editingUser.email}
                              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role" className="text-right">Role</Label>
                            <Select
                              value={editingUser.role}
                              onValueChange={(value) => setEditingUser({ ...editingUser, role: value })}
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="administrator">Administrator</SelectItem>
                                <SelectItem value="ffo">FFO</SelectItem>
                                <SelectItem value="producer">Producer</SelectItem>
                                <SelectItem value="cooperative">Cooperative</SelectItem>
                                <SelectItem value="consumer">Consumer</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button type="submit" onClick={handleSaveUser}>Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}