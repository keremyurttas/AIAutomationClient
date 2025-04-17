"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "./ui/form";
import { Input } from "./ui/input";
import { on } from "events";

type FormProps = {
    onGenerate: (cases: any) => void

}


export default function GenerateCaseForm({ onGenerate }: FormProps) {
  const baseUrl=process.env.NEXT_PUBLIC_API_BASE_URL;
    const formSchema = z.object({
        url: z.string().min(2).max(500),
        description: z.string().min(2).max(10000),
        number_of_cases: z.coerce
          .number()
          .min(1, "Bu alan boş bırakılamaz.")
          .max(20, "En fazla 20 test vakası girebilirsiniz."),
      })
    const [formState, setFormState] = useState({
        url: "",
        description: "",
        number_of_cases:3,
      })
      const [isLoading, setIsLoading] = useState(false)
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          url: "",
          description: "",
          number_of_cases:3,
        },
      })
    
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        { console.log(values.url, values.description,values.number_of_cases); }
        const reqBody = {
          url: values.url,
          brief: values.description,
          number_of_cases: values.number_of_cases,
        }
        setIsLoading(true)
        fetch(`${baseUrl}/api/generate-test-cases`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data)
            onGenerate(data)
            // Handle success response here
          })
          .catch((error) => {
            console.error("Error:", error);
            // Handle error response here
          })
          .finally(() => {
            setIsLoading(false)
          });
      }
    return(
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-12 flex flex-col items-center">
          <h2 className="text-4xl">AI Test Automation</h2>

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full max-w-[40vw]">
                <FormLabel>Websitenin URL'si</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="https://" {...field} />
                </FormControl>
                <FormDescription>
                  Sitenin https:// ile başlaması gerekmektedir.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full max-w-[40vw]">
                <FormLabel>Açıklama</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="login testleri" {...field} />
                </FormControl>
                <FormDescription>
                  İstediğiniz test senaryolarını açıklayın
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="number_of_cases"
            render={({ field }) => (
              <FormItem className="w-full max-w-[40vw]">
                <FormLabel>Senaryo Sayısı</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} type="number" placeholder="3" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{isLoading ? <>Senaryolar Oluşturuluyor <Loader2 className="animate-spin"></Loader2></>:<>Oluştur!</>}</Button>
        </form>
      </Form>
    )
}