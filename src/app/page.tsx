"use client"
import CasesDisplayer from "@/components/cases-displayer";
import GenerateCaseForm from "@/components/generate-case-form"
import { Case } from "@/lib/types";
import { useState } from "react";
import Loader from "@/components/ui/loader";

export default function Home() {
  const [cases,setCases] = useState<Case[]|null>(null) 
  const [isLoading,setIsLoading] = useState(false)

  return (
    <main>
      {isLoading && <Loader/>}
      {cases && cases.length > 0 ?
        <><CasesDisplayer emitLoading={(isLoading)=>setIsLoading(isLoading)}  cases={cases}/></>:<GenerateCaseForm onGenerate={(cases) => setCases(cases)}></GenerateCaseForm>}
    </main>
  );
}
