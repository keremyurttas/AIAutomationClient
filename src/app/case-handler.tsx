"use client";
import { useState } from "react";
import CasesDisplayer from "@/components/cases-displayer";
import GenerateCaseForm from "@/components/generate-case-form";
import Loader from "@/components/ui/loader";
import { Case } from "@/lib/types";

export default function CaseHandler() {
  const [cases, setCases] = useState<Case[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading && <Loader />}
      {cases && cases.length > 0 ? (
        <CasesDisplayer onGoBack={()=>setCases(null)} emitLoading={(isLoading) => setIsLoading(isLoading)} cases={cases} />
      ) : (
        <GenerateCaseForm onGenerate={(cases) => setCases(cases)} />
      )}
    </>
  );
}
