import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Case } from "@/lib/types"
import Loader from "@/components/ui/loader"
import { Trash2, Plus, ArrowUp, ArrowDown } from "lucide-react"

export default function TestCase({ testCase, caseIndex , emitLoading }: { testCase: Case, caseIndex: number, emitLoading: (loading: boolean) => void }) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const [editableSteps, setEditableSteps] = useState<string[]>([]);
    const [hasChanges, setHasChanges] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setEditableSteps([...testCase.steps]);
        setHasChanges(false);
    }, [testCase]);

    function triggerCaseEdit(caseIndex: number, stepIndex: number, value: string) {
        const newSteps = [...editableSteps];
        newSteps[stepIndex] = value;
        setEditableSteps(newSteps);
        setHasChanges(true);
    }

    function addStep() {
        setEditableSteps([...editableSteps, ""]);
        setHasChanges(true);
    }

    function removeStep(index: number) {
        const newSteps = [...editableSteps];
        newSteps.splice(index, 1);
        setEditableSteps(newSteps);
        setHasChanges(true);
    }

    function moveStepUp(index: number) {
        if (index > 0) {
            const newSteps = [...editableSteps];
            const temp = newSteps[index];
            newSteps[index] = newSteps[index - 1];
            newSteps[index - 1] = temp;
            setEditableSteps(newSteps);
            setHasChanges(true);
        }
    }

    function moveStepDown(index: number) {
        if (index < editableSteps.length - 1) {
            const newSteps = [...editableSteps];
            const temp = newSteps[index];
            newSteps[index] = newSteps[index + 1];
            newSteps[index + 1] = temp;
            setEditableSteps(newSteps);
            setHasChanges(true);
        }
    }

    function saveChanges() {
        const updatedCase = {
            ...testCase,
            steps: editableSteps
        };
        console.log("Updated case:", updatedCase);
        setHasChanges(false);
    }

    function handleStart() {
        console.log("Starting test case execution...", testCase);
        const reqBody = {
            test_case: {
                ...testCase,
                steps: editableSteps
            },
        };
        emitLoading(true);
        fetch(`${baseUrl}/api/run-test`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reqBody),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", JSON.parse(JSON.stringify(data)));
        })
        .catch((error) => {
            console.error("Error:", error);
        })
        .finally(() => {
            emitLoading(false);
        });
    }

    return (
        <div className="relative">
            <AccordionItem key={caseIndex} value={`case-${caseIndex}`}>
                <AccordionTrigger>
                    <div className="text-left">{testCase.name}</div>
                </AccordionTrigger>
                <AccordionContent>
                    <Card>
                        <CardHeader>
                            <CardTitle>{testCase.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {editableSteps.map((step, stepIndex) => (
                                <div key={stepIndex} className="flex flex-col gap-1">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-medium">
                                            Step {stepIndex + 1}
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => moveStepUp(stepIndex)}
                                                className="text-gray-500 hover:text-gray-700 transition"
                                                type="button"
                                                title="Move step up"
                                                disabled={stepIndex === 0}
                                            >
                                                <ArrowUp size={16} className={stepIndex === 0 ? "opacity-50" : ""} />
                                            </button>
                                            <button
                                                onClick={() => moveStepDown(stepIndex)}
                                                className="text-gray-500 hover:text-gray-700 transition"
                                                type="button"
                                                title="Move step down"
                                                disabled={stepIndex === editableSteps.length - 1}
                                            >
                                                <ArrowDown size={16} className={stepIndex === editableSteps.length - 1 ? "opacity-50" : ""} />
                                            </button>
                                            {editableSteps.length > 1 && (
                                                <button
                                                    onClick={() => removeStep(stepIndex)}
                                                    className="text-red-500 hover:text-red-700 transition"
                                                    type="button"
                                                    title="Remove step"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <Textarea
                                        value={step}
                                        onChange={(e) => triggerCaseEdit(caseIndex, stepIndex, e.target.value)}
                                        placeholder="Edit this step..."
                                    />
                                </div>
                            ))}

                            <div>
                                <Button
                                    variant="outline"
                                    onClick={addStep}
                                    className="flex items-center gap-1"
                                    type="button"
                                >
                                    <Plus size={16} /> Add Step
                                </Button>
                            </div>

                            <div className="flex gap-2 mt-4">
                                <Button
                                    variant="secondary"
                                    onClick={saveChanges}
                                    disabled={!hasChanges}
                                >
                                    Save Changes
                                </Button>
                                <Button onClick={handleStart}>Senaryoyu Başlat</Button>
                            </div>
                        </CardContent>
                    </Card>
                </AccordionContent>
            </AccordionItem>
        </div>
    );
}