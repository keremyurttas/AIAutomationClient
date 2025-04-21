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
import { Textarea } from "./ui/textarea";

type FormProps = {
    onGenerate: (cases: any) => void

}
const exampleCases = [
  {
    title: "Jira Issue Testi",
    url: "https://jiradcprp.turkcell.com.tr/",
    description: "'KULLANICI_ADINIZ' kullanıcı adını ve 'SIFRENIZ' şifresini kullanarak giriş yap, navbardan create butonuna bas. Açılan modalda Project kısmına 'ICT REQUEST' yazıp entera bas. Issue Type kısmına 'Request' yazıp entera bas. Summary kısmına 'Bu task AI Otomasyonu tarafından yazılmıştır' yaz. Description kısmına 'Bu bir açıklamadır' yaz. Customer kısmına 'TURKCELL ILETISIM' yaz entera bas. İlgili Portföy alanına 'Transition and GRC' yaz entera bas.Talebi değerlendirecek squad var mı kısmında 'EVET' seç. İlgili Squad alanı 'SPLINTER' yaz entera bas. Beklenen lansman tarihine '26/May/27' yaz entera bas. Hedeflenen iş gücü kazanımı var mı ? kısmında hayırı seç. Anahtar Performans Göstergeleri kısmından 'Gider azaltıcı' seç. Teknoloji Harici Maliyet (TL) kısmına 0 yaz. Talepleriniz ile ilgili Hukuk/Regülasyon görüşü ve onayı gerekiyor mu? kısmından hayırı seç. Business Tahmini Efor kısmından 'S' seçeneğini seç. Talep Öncelik kısmından '2' seç. Create butonuna bas. Modaldaki validasyonlarda herhangi bir sorun var mi kontrol et. Başarılı bir şekilde issue'yı oluşturduktan sonra 25 saniye bekle.",
    number_of_cases: 1
  },
  {
    title: "Dummy Data ile Jira Issue Testi",
    url: "https://example.com/register",
    description: "'KULLANICI_ADINIZ' kullanıcı adını ve 'SIFRENIZ' şifresini kullanarak giriş yap, navbardan create butonuna bas. Açılan modaldan projesi 'ICT REQUEST' tipi de 'Request' olan bir issue oluştur. İhtiyacın olan bilgileri seçenekler arasında seç veya dummy textler ile doldur.",
    number_of_cases: 1
  },
  {
    title: "Turkcell.com Navbar Testleri",
    url: "https://www.turkcell.com.tr/",
    description: "Navbar testleri",
    number_of_cases: 12
  }
];



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

          <div className="flex flex-col items-center gap-2">
  <p className="text-muted-foreground">Örnek kullanım için hızlı senaryolar:</p>
  <div className="flex gap-4 flex-wrap">
    {exampleCases.map((example, index) => (
      <Button
        key={index}
        variant="outline"
        onClick={() => form.reset(example)}
      >
        {example.title}
      </Button>
    ))}
  </div>
</div>


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
                  <Textarea disabled={isLoading} placeholder="login testleri" {...field} />
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