import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ReviewGetOneOutput } from "@/modules/reviews/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form } from "@/components/ui/form"; 
import { useForm } from "react-hook-form";
import z from "zod";
import { StarPicker } from "@/components/star-picker";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


interface Props {
  productId: string;
  initialData?: ReviewGetOneOutput
}
const formSchema =z.object({
    rating: z.number().min(1, { message: "Rating is required" }).max(5),
    description: z.string().min(1, { message: "Description is required" }),
})
export const ReviewForm = ({productId, initialData}:Props) => {
    const [isPreview, setIsPreview] = useState(!!initialData);
    const trpc = useTRPC()
    const queryCLient  = useQueryClient();
    const createReview = useMutation(trpc.reviews.create.mutationOptions(
     {
        onSuccess: () => {
            queryCLient.invalidateQueries(trpc.reviews.getOne.queryOptions({productId}))
            setIsPreview(true);
        },
        onError: (error) => {
            toast.error(error.message)
        }
     }
    ));
    const updateReview = useMutation(trpc.reviews.update.mutationOptions(
    {
        onSuccess: () => {
            queryCLient.invalidateQueries(trpc.reviews.getOne.queryOptions({productId}))
            setIsPreview(true);
        },
        onError: (error) => {
            toast.error(error.message)
        }
     }
    ));
   const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues: {
        rating: initialData?.rating || 5,
        description: initialData?.description || "",
    }})
    const onSubmit = (values:z.infer<typeof formSchema>) => {
        if(initialData){
            updateReview.mutate({
                reviewId: initialData.id,
                rating: values.rating,
                description: values.description,
            })
        }
        else{
            createReview.mutate({
                productId,
                rating: values.rating,
                description: values.description,
            })
        }
    }
  return (
     <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
         <p className="font-medium text-lg">
            {isPreview ? "Your rating" : "Like it? Give it a review!"}
         </p>

            <FormField
            control={form.control}
            name='rating'
            render={({field}) => (
                <FormItem>
                    <FormControl>
                        <StarPicker value={field.value} onChange={field.onChange} disabled={isPreview}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            
         />
        <FormField
            control={form.control}
            name='description'
            render={({field}) => (
                <FormItem>
                    <FormControl>
                        <Textarea placeholder="Want to leave a written review?" disabled={isPreview} {...field}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            
         />
         {!isPreview && (
            <Button variant={'elevated'} disabled={createReview.isPending||updateReview.isPending} size={"lg"} type="submit" className="bg-black text-white hover:bg-pink-400 hover:text-primary w-fit">
                {initialData ? "Update Review" : "Post Review"}
            </Button>
         )}
         </form>
         {isPreview && (
            <Button variant={'elevated'} type="button" disabled={false} size={"lg"} onClick={() => setIsPreview(false)} className=" mt-4 w-fit">
                Edit Review
            </Button>
         )}
     </Form>
    )
    }