import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "lucide-react";


interface ProductCardProps {
id: string;
name: string;
imageUrl?: string | null;
tenantSlug: string;
tenantSlugUrl?: string | null;
reviewRating: number;
reviewCount: number;

}

export const ProductCard = ({
    id,
    name,
    imageUrl,
    tenantSlug,
    tenantSlugUrl,
    reviewCount,
    reviewRating,

}:ProductCardProps)=>{
    return(
        <Link prefetch href={`/library/${id}`} >
    <div className="hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow border rounded-md overflow-hidden bg-white flex flex-col">
        <div className="relative aspect-square">
            <Image alt={name} fill src={imageUrl||""} className="object-cover"/>
        </div>
        <div className="p-4 flex flex-col gap-3 flex-1 border-y">
            <h2 className="text-lg font-medium line-clamp-4">{name}</h2>
            <div className="flex items-center gap-2" >
                {tenantSlugUrl && (
                    
                        <Image alt={tenantSlugUrl} width={16} height={16} src={tenantSlugUrl} className="rounded-full border shrink-0 size-[16px]"/>
                   
                )}
                <p className="text-sm underline font-medium">{tenantSlug}</p>
            </div>
            {reviewCount > 0 && (
                <div className="flex items-center gap-1">
                    <StarIcon className="size-3.5 fill-black"/>
                    <p className="text-sm font-medium">{reviewRating}</p>
                    <p className="text-sm text-gray-500">({reviewCount} reviews)</p>
                </div>
            )}
        </div>
    </div>
    </Link>
    )
}

export const ProductCardSkeleton = ()=>{
    return(
        <div className="w-full aspect-3/4 bg-neutral-200 rounded-lg animate-pulse"></div>
    )
}