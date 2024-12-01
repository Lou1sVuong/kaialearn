"use client";

import { useState, useEffect, use } from "react";
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
import { CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { puzzles } from "@/app/(learn)/learn/puzzles/data";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { LinkButton } from "@/components/ui/link-button";
import { useMintNFT } from "@/lib/mint-certificate";
import { toast } from "@/hooks/use-toast";

export default function PuzzlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const puzzleId = parseInt(id);
  const currentPuzzleIndex = puzzles.findIndex((p) => p.id === puzzleId);
  const { mintNFT, isPending, isConfirming, isConfirmed } = useMintNFT();

  if (currentPuzzleIndex === -1) {
    notFound();
  }

  const [currentPuzzle, setCurrentPuzzle] = useState(currentPuzzleIndex);
  const [userSolution, setUserSolution] = useState(
    puzzles[currentPuzzleIndex].testTemplate,
  );
  const [feedback, setFeedback] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [infoCertificate, setInfoCertificate] = useState({
    title: "",
    description: "",
    score: 0,
  });

  useEffect(() => {
    setInfoCertificate({
      title: puzzles[currentPuzzle].title,
      description: puzzles[currentPuzzle].description,
      score: puzzles[currentPuzzle].score,
    });
    setUserSolution(puzzles[currentPuzzle].testTemplate);
    setIsCompleted(false);
    setFeedback("");
    router.push(`/learn/puzzles/level/${puzzles[currentPuzzle].id}`);
  }, [currentPuzzle, router]);

  useEffect(() => {
    if (isConfirmed) {
      toast({
        title: "Minted Certificate Successfully",
        description: "You can now view your certificate in your wallet",
      });
    }
  }, [isConfirmed]);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setUserSolution(value);
    }
  };

  const handleCertificate = () => {
    mintNFT(infoCertificate);
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
    <div className="mt-20 flex h-screen flex-col">
      {/* Selector */}
      <div className="relative flex items-start justify-between gap-2 p-4 sm:items-center lg:py-4 xl:px-0">
        <div className="flex w-full items-center justify-between">
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
          <LinkButton
            className="hidden md:flex"
            variant="outline"
            href="/learn/puzzles"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Puzzles
          </LinkButton>
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
                loading={
                  <div>Kaialearn is preparing the puzzle for you...</div>
                }
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
          {/* Hint */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Hint</AlertTitle>
            <AlertDescription>{puzzles[currentPuzzle].hint}</AlertDescription>
          </Alert>
        </div>
        <div className="w-full lg:w-1/2">
          <Card>
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
                loading={
                  <div>Kaialearn is preparing the editor for you...</div>
                }
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  suggestOnTriggerCharacters: true,
                  quickSuggestions: true,
                }}
              />
              <div className="flex flex-col items-start gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <Button onClick={checkSolution}>Check Solution</Button>
                  {isCompleted && (
                    <Button
                      variant="outline"
                      onClick={handleCertificate}
                      disabled={isPending || isConfirmed}
                    >
                      {isPending
                        ? "Confirming..."
                        : isConfirming
                          ? "Minting"
                          : isConfirmed
                            ? "Minted"
                            : "Mint Certificate"}
                    </Button>
                  )}
                </div>
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
