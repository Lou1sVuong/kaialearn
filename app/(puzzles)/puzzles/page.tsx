"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Editor from "@monaco-editor/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { KaialearnLogo } from "@/components/layouts/landing/header";
import { puzzles } from "@/app/(puzzles)/puzzles/data";
import { IconPoint, IconPointFilled } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import ConnectWalletBtn from "@/components/connect-wallet-btn";
import { Separator } from "@/components/ui/separator";

const MENU_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Docs", href: "/docs" },
];

function DifficultyStars({ difficulty }: { difficulty: number }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) =>
        i < difficulty ? (
          <IconPointFilled key={i} className="size-5" />
        ) : (
          <IconPoint key={i} className="size-5" />
        ),
      )}
    </div>
  );
}

export default function ContractPuzzles() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [userSolution, setUserSolution] = useState(puzzles[0].testTemplate);
  const [feedback, setFeedback] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setUserSolution(puzzles[currentPuzzle].testTemplate);
    setIsCompleted(false);
    setFeedback("");
  }, [currentPuzzle]);

  const handleEditorChange = (value: any) => {
    setUserSolution(value);
  };

  const checkSolution = () => {
    const solution = puzzles[currentPuzzle].solution;
    if (userSolution.includes(solution)) {
      setIsCompleted(true);
      setFeedback("Congratulations! You've solved the puzzle correctly.");
    } else {
      setIsCompleted(false);
      setFeedback("Not quite right. Keep trying!");
    }
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="border-borderpx-4 flex w-full items-center justify-between gap-2 border-b px-4 pb-2 pt-0 sm:items-center lg:p-0 lg:pb-4 lg:pt-2">
        <div>
          <KaialearnLogo />
        </div>
        <div className="mt-4 flex h-7 items-center gap-4">
          {MENU_ITEMS.map((item, index) => (
            <div key={index}>
              <Link
                className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
                href={`/${item.href}`}
              >
                {item.label}
              </Link>
            </div>
          ))}
          <Separator className="" orientation="vertical" />
          <ThemeToggle />
          <ConnectWalletBtn />
        </div>
      </div>
      {/* Puzzle Selector */}
      <div className="relative flex items-start justify-between gap-2 p-4 sm:items-center lg:p-0 lg:py-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Contract Puzzles</h1>
          <Select
            value={currentPuzzle.toString()}
            onValueChange={(value) => setCurrentPuzzle(parseInt(value))}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select a puzzle" />
            </SelectTrigger>
            <SelectContent>
              {puzzles.map((puzzle, index) => (
                <SelectItem key={puzzle.id} value={index.toString()}>
                  {puzzle.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Puzzle */}
      <div className="flex flex-col gap-2 lg:flex-row">
        <div className="w-full lg:w-1/2">
          <Card className="mb-4">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{puzzles[currentPuzzle].title}</CardTitle>
                  <CardDescription className="min-h-[2.5rem]">
                    {puzzles[currentPuzzle].description}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {puzzles[currentPuzzle].difficulty}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Editor
                height="300px"
                defaultLanguage="javascript"
                value={puzzles[currentPuzzle].contract}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 14,
                }}
              />
            </CardContent>
          </Card>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Hint</AlertTitle>
            <AlertDescription>{puzzles[currentPuzzle].hint}</AlertDescription>
          </Alert>
        </div>
        <div className="w-full lg:w-1/2">
          <Card>
            {/* Editor */}
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Test Template</CardTitle>
                  <CardDescription className="min-h-[2.5rem]">
                    Write your solution in the editor below.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Editor
                height="300px"
                defaultLanguage="javascript"
                value={userSolution}
                onChange={handleEditorChange}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  suggestOnTriggerCharacters: true,
                  quickSuggestions: true,
                }}
              />
              <div className="flex flex-col items-start gap-4 pt-4">
                <Button onClick={checkSolution}>Check Solution</Button>
                {feedback && (
                  <Alert variant={isCompleted ? "success" : "destructive"}>
                    {isCompleted ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertTitle>
                      {isCompleted ? "Success!" : "Not quite..."}
                    </AlertTitle>
                    <AlertDescription>{feedback}</AlertDescription>
                  </Alert>
                )}
              </div>
              <h2 className="mb-4 text-xl font-bold">Console Output</h2>
              <div className="overflow-auto bg-gray-900 p-4 font-mono text-sm text-gray-100">
                <div className="text-green-400">$ npx hardhat test</div>
                {feedback && (
                  <div
                    className={`mt-2 ${isCompleted ? "text-green-400" : "text-red-400"}`}
                  >
                    {isCompleted ? "✓ Test passed" : "✗ Test failed"}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
