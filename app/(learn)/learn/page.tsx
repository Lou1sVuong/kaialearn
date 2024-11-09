"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  Puzzle,
  BookOpen,
  Code2,
  Brain,
  GraduationCap,
  Gamepad2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const learningModules = [
  {
    title: "Smart Contract Puzzles",
    description: "Solve smart contract puzzles to enhance your skills",
    icon: <Puzzle className="h-8 w-8" />,
    href: "/learn/puzzles",
    status: "active",
  },
  {
    title: "Solidity Basics",
    description: "Learn the fundamental concepts of Solidity language",
    icon: <Code2 className="h-8 w-8" />,
    href: "/learn/solidity",
    status: "coming-soon",
  },
  {
    title: "Interactive Tutorials",
    description: "Step-by-step interactive guides for hands-on learning",
    icon: <BookOpen className="h-8 w-8" />,
    href: "/learn/tutorials",
    status: "coming-soon",
  },
  {
    title: "Mini Games",
    description: "Learn through fun and engaging mini-games",
    icon: <Gamepad2 className="h-8 w-8" />,
    href: "/learn/games",
    status: "coming-soon",
  },
  {
    title: "Challenge Mode",
    description: "Test yourself with advanced coding challenges",
    icon: <Brain className="h-8 w-8" />,
    href: "/learn/challenges",
    status: "coming-soon",
  },
  {
    title: "Learning Paths",
    description: "Structured learning paths designed for every level",
    icon: <GraduationCap className="h-8 w-8" />,
    href: "/learn/paths",
    status: "coming-soon",
  },
];

export default function LearnPage() {
  const { toast } = useToast();

  const handleComingSoonToast = (module: string) => {
    toast({
      title: `${module} is Coming Soon`,
      description: "This module is coming soon",
    });
  };
  return (
    <div className="container mt-24 p-4 lg:mt-32 xl:p-0">
      <div className="mb-8">
        <h1 className="text-2xl font-bold lg:text-4xl">
          Learn Web3 Development
        </h1>
        <p className="mt-2 text-base text-muted-foreground lg:text-lg">
          Choose a learning module to begin your journey
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {learningModules.map((module) => (
          <Link
            key={module.title}
            href={module.status === "coming-soon" ? "#" : module.href}
            className={
              module.status === "coming-soon" ? "cursor-not-allowed" : ""
            }
            onClick={() => {
              if (module.status === "coming-soon") {
                handleComingSoonToast(module.title);
              }
            }}
          >
            <Card
              className={`group transition-all ${
                module.status === "active"
                  ? "cursor-pointer hover:bg-accent"
                  : "opacity-70"
              }`}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-sm bg-accent p-3 transition-all duration-300 group-hover:scale-105 group-hover:bg-background/80">
                    {module.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="line-clamp-1 text-nowrap text-lg lg:text-xl">
                        {module.title}
                      </CardTitle>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {module.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mb-12 mt-12 border border-border p-6">
        <h2 className="text-2xl font-bold">Your Learning Progress</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-background p-4">
            <h3 className="font-semibold">Completed Puzzles</h3>
            <p className="text-3xl font-bold">0/10</p>
          </div>
          <div className="rounded-lg bg-background p-4">
            <h3 className="font-semibold">Completed Lessons</h3>
            <p className="text-3xl font-bold">0/20</p>
          </div>
          <div className="rounded-lg bg-background p-4">
            <h3 className="font-semibold">Achievement Level</h3>
            <p className="text-3xl font-bold">Beginner</p>
          </div>
        </div>
      </div>
    </div>
  );
}
