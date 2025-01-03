import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (price: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(price);
};
