"use client";


import { generateTenantURL } from "@/lib/utils";
// import { CheckoutButton } from "@/modules/checkout/ui/components/checkout-button";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";

const CheckoutButton = dynamic(
    () => import("@/modules/checkout/ui/components/checkout-button").then(
        (mod) =>mod.CheckoutButton,
    ),
    {
        ssr:false,
       loading: () => (
       <Button disabled className=" bg-white">
        <ShoppingCartIcon className="text-black"/>
        </Button>
    )
    },
);
interface Props {
    slug:string
}
export const Navbar = ({slug}:Props) => {
    const trpc  = useTRPC();
    const {data} = useSuspenseQuery(trpc.tenants.getOne.queryOptions({
        slug
    }))

    return (
        <nav className="h-20 border-b font-medium bg-white">
  <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between px-4 lg:px-12">
    {/* Bên trái: logo + tên */}
    <div className="flex items-center">
      <Link href={generateTenantURL(slug)} className="flex items-center gap-2">
        {data?.image?.url && (
          <Image
            src={data.image.url}
            height={32}
            width={32}
            alt="slug"
            className="rounded-full border shrink-0 size-[32px]"
          />
        )}
      </Link>
      <p className="text-xl pl-4">{data.name}</p>
    </div>

    {/* Bên phải: Checkout */}
    <CheckoutButton hideIfEmpty tenantSlug={slug} />
  </div>
</nav>

    )
}
export const NavbarSkeleton = () => {
    return (
        <nav className="h-20 border-b font-medium bg-white">
            <div className="max-w-(--breakpoint-xl) mx-auto h-full flex items-center justify-between px-4 lg:px-12">
                <div/>
                <Button disabled className=" bg-white">
                  <ShoppingCartIcon className="text-black"/>
                </Button>
            </div>
        </nav>
    )
}