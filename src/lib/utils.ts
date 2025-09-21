import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function generateTenantURL(tenantSlug:string){

  //in dev mode, use normal routing
  if(process.env.NODE_ENV === "development"){
    return `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${tenantSlug}`;
  }
  const protocol = "https";
  const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
  // if(process.env.NODE_ENV === "development"){
  //   protocol = "http";
  // }

  //in production,  use submain routing
  return `${protocol}://${tenantSlug}.${domain}`;
};

export function formatCurrency(value: number | string) {

  return new Intl.NumberFormat("end-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,

  }).format(Number(value));
};