
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient, trpc } from '@/trpc/server';
import { Suspense } from 'react';
import { Navbar, NavbarSkeleton } from '@/modules/tenants/ui/components/navbar';
import { Footer } from '@/modules/tenants/ui/components/footer';



interface Props {
    children: React.ReactNode;
    params: Promise<{slug:string}>;
};

const Layout = async ({children,params}: Props) => {
    const {slug} = await params;
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({
        slug,
    }))
    return (
        <div  className='min-h-screen flex flex-col bg-[#F4F4F0]'>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<NavbarSkeleton/>}>
                    <Navbar slug={slug}/>
                </Suspense>
            </HydrationBoundary>
            <div className='flex-1'>
                <div className='max-w-(--breakpoint-xl) mx-auto '>
                    {children}
                </div>
            </div>
            <Footer/>
        </div>

    );
}

export default Layout;