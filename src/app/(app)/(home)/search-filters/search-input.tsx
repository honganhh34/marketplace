"use client";
import { Input } from "@/components/ui/input";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import { CustomCategory } from "../types";
import { CategoriesSidebar } from "./categories-sidebar";
import { da } from "date-fns/locale";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
    disabled?: boolean;
    data: CustomCategory[];
};
export const SearchInput = ({
    disabled,
    data
}:Props) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return(
        <div className="flex items-center gap-2 w-full">
            <CategoriesSidebar data={data} open={isSidebarOpen} onOpenChange={setIsSidebarOpen}/>
            <div className="relative w-full ">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral"/>
                <Input className="pl-8 border-b" placeholder="Search products" disabled={disabled}/>
            </div>
            {/*Add categories */}
            <Button
               variant="elevated"
               className="size-12 shrink-0 flex lg:hidden"
               onClick={() => setIsSidebarOpen(true)}
            
            >

                <ListFilterIcon/>
                
            </Button>
            {/*Add library button */}
        </div>
    );
};