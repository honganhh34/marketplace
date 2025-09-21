import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({ subsets: ['latin'], weight: ['700'] });
export const Footer = () => {
    return (
        <nav className=" border-t font-medium bg-white">
            <div className="max-w-(--breakpoint-xl) mx-auto h-full flex items-center gap-2 px-4 lg:px-12 py-6">
                <p >Powered by</p>
                <Link href={process.env.NEXT_PUBLIC_APP_URL!}>
                     <span className={cn("text-2xl font-semibold",poppins.className)}>
                        funroad
                     </span>
                </Link>
            </div>
        </nav>
    )
}