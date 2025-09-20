"use client"

import { useTRPC } from "@/trpc/client"
import { useMutation } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useEffect } from "react";

const Page = ()=>{
    const trpc = useTRPC();
    const { mutate: verify } = useMutation(trpc.checkout.verify.mutationOptions({
         onSuccess:(data)=>{
            window.location.href = data.url;
         },
            onError:()=>{
               window.location.href = "/";
            }
    }))
    useEffect(()=>{
        verify();
    }, [verify])
    return (
     
            <div className="flex justify-center items-center min-h-screen">
                <LoaderIcon className="animate-spin text-muted-foreground"/>
            </div>
  
    )
}
export default Page;