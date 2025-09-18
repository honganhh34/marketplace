"use client"
import { generateTenantURL } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";



interface Props {
    slug:string
}
export const Navbar = ({slug}:Props) => {


    return (
        <nav className="h-20 border-b font-medium bg-white">
  <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between px-4 lg:px-12">
    {/* Bên trái: logo + tên */}
    <div className="flex items-center">
      <p className="text-xl pl-4">Checkout</p>
    </div>

    {/* Bên phải: Checkout */}
    <Button
      variant="elevated"
      asChild
    >
        <Link href={generateTenantURL(slug)}>
           Continue Shopping
        </Link>

    </Button>
  </div>
</nav>

    );
};
