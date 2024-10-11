"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

export function ProductsContentComponent() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Tomatoes",
      quantity: 100,
      price: 2.99,
      location: "Farm A",
      image: "https://cdn.britannica.com/77/170677-050-F7333D51/lettuce.jpg",
    },
    {
      id: 2,
      name: "Lettuce",
      quantity: 50,
      price: 1.99,
      location: "Farm B",
      image: "https://cdn.britannica.com/77/170677-050-F7333D51/lettuce.jpg",
    },
    {
      id: 3,
      name: "Carrots",
      quantity: 200,
      price: 1.49,
      location: "Farm C",
      image: "https://cdn.britannica.com/77/170677-050-F7333D51/lettuce.jpg",
    },
    {
      id: 4,
      name: "Potatoes",
      quantity: 150,
      price: 0.99,
      location: "Farm A",
      image: "https://cdn.britannica.com/77/170677-050-F7333D51/lettuce.jpg",
    },
    {
      id: 5,
      name: "Onions",
      quantity: 75,
      price: 1.29,
      location: "Farm B",
      image: "https://cdn.britannica.com/77/170677-050-F7333D51/lettuce.jpg",
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    location: "",
  });

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      newProduct.name &&
      newProduct.quantity &&
      newProduct.price &&
      newProduct.location
    ) {
      setProducts([
        ...products,
        {
          id: products.length + 1,
          name: newProduct.name,
          quantity: parseInt(newProduct.quantity),
          price: parseFloat(newProduct.price),
          location: newProduct.location,
          image:
            "https://cdn.britannica.com/77/170677-050-F7333D51/lettuce.jpg",
        },
      ]);
      setNewProduct({ name: "", quantity: "", price: "", location: "" });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Management</CardTitle>
        <CardDescription>
          Add, edit, or remove products from your inventory.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddProduct} className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                placeholder="Enter product name"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                value={newProduct.quantity}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, quantity: e.target.value })
                }
                placeholder="Enter quantity"
                type="number"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                placeholder="Enter price"
                type="number"
                step="0.01"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newProduct.location}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, location: e.target.value })
                }
                placeholder="Enter location"
              />
            </div>
          </div>
          <Button type="submit">Add Product</Button>
        </form>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.location}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
