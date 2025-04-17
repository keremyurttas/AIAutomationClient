"use client"

import { Case } from "@/lib/types"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import { useState } from "react"
import TestCase from "./test-case"

export default function CasesDisplayer({ cases,emitLoading }: { cases: Case[] | null,emitLoading: (loading: boolean) => void }) {
  const [editableCases, setEditableCases] = useState<Case[]>(cases || [])

  const handleStepChange = (caseIndex: number, stepIndex: number, value: string) => {
    const updated = [...editableCases]
    updated[caseIndex].steps[stepIndex] = value
    setEditableCases(updated)
  }
  const handleStart = () => {
    console.log("Starting test case execution...")
    // Implement the logic to start the test case execution here

  }

  return (<div className="flex flex-col items-center p-4">
    <h2 className="text-4xl">Oluşturulan Senaryolar</h2>
    <Accordion type="multiple" className="w-full max-w-3xl mx-auto mt-8">
      {editableCases.map((caseItem, caseIndex) => (
        <TestCase emitLoading={(bool)=>emitLoading(bool)} key={caseIndex} testCase={caseItem} caseIndex={caseIndex} />
      ))}
    </Accordion>
    </div>
  )
}
