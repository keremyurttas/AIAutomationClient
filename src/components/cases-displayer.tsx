"use client"

import { Case } from "@/lib/types"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import { useState } from "react"
import TestCase from "./test-case"
import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"

export default function CasesDisplayer({ cases,emitLoading, onGoBack }: { cases: Case[] | null,emitLoading: (loading: boolean) => void ,onGoBack :()=>void}) {
  const [editableCases, setEditableCases] = useState<Case[]>(cases || [])

  // const handleStepChange = (caseIndex: number, stepIndex: number, value: string) => {
  //   const updated = [...editableCases]
  //   updated[caseIndex].steps[stepIndex] = value
  //   setEditableCases(updated)
  // }
  // const handleStart = () => {
  //   console.log("Starting test case execution...")
  //   // Implement the logic to start the test case execution here

  // }

  return (<div className="flex flex-col items-center p-4">
<Button 
  variant="outline" 
 
  
  onClick={() => onGoBack()} 
  className="mb-6 hover:bg-blue-50 transition-colors flex items-center gap-2"
>
  <ArrowLeft size={16} />
  Senaryo oluşturma adımına geri dön
</Button>   <h2 className="text-4xl">Oluşturulan Senaryolar</h2>
    <Accordion type="multiple" className="w-full max-w-3xl mx-auto mt-8">
      {editableCases.map((caseItem, caseIndex) => (
        <TestCase emitLoading={(bool)=>emitLoading(bool)} key={caseIndex} testCase={caseItem} caseIndex={caseIndex} />
      ))}
    </Accordion>
    </div>
  )
}
