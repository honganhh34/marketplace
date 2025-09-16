"use client";


import { generateTenantURL } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
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
            <div className="max-w-(--breakpoint-xl) mx-auto h-full flex items-center px-4 lg:px-12">
                <Link href={generateTenantURL(slug)} className="flex items-center gap-2" >
                    {data?.image?.url &&(
                    <Image src={data.image.url} height={32} width={32} alt="slug" className="rounded-full border shrink-0 size-[32px]"/>
                    )}
                </Link>
                <p className="text-xl pl-4">{data.name}</p>
            </div>
        </nav>
    )
}
export const NavbarSkeleton = () => {
    return (
        <nav className="h-20 border-b font-medium bg-white">
            <div className="max-w-(--breakpoint-xl) mx-auto h-full flex items-center justify-between px-4 lg:px-12">
                
            </div>
        </nav>
    )
}