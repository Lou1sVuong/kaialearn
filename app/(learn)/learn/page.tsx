"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  Puzzle,
  BookOpen,
  Code2,
  Brain,
  GraduationCap,
  Coins,
  Trophy,
  Calendar,
  Star,
  Gift,
  Hammer,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const learningModules = [
  {
    title: "Smart Contract Puzzles",
    description: "Solve smart contract puzzles to enhance your Solidity skills",
    icon: <Puzzle className="h-8 w-8" />,
    href: "/learn/puzzles",
    status: "active",
  },
  {
    title: "Kaia Bootcamp",
    description:
      "Intensive program covering all aspects of blockchain development",
    icon: <GraduationCap className="h-8 w-8" />,
    href: "/learn/blockchain-bootcamp",
    status: "coming-soon",
  },
  {
    title: "Blockchain Fundamentals",
    description: "Learn the core concepts of blockchain technology",
    icon: <BookOpen className="h-8 w-8" />,
    href: "/learn/blockchain-fundamentals",
    status: "coming-soon",
  },
  {
    title: "Solidity Deep Dive",
    description: "Master advanced Solidity programming techniques",
    icon: <Code2 className="h-8 w-8" />,
    href: "/learn/solidity-advanced",
    status: "coming-soon",
  },
  {
    title: "DeFi Protocols",
    description: "Explore decentralized finance protocols and implementations",
    icon: <Coins className="h-8 w-8" />,
    href: "/learn/defi-protocols",
    status: "coming-soon",
  },
  {
    title: "Blockchain Security",
    description: "Learn best practices for securing smart contracts and dApps",
    icon: <Brain className="h-8 w-8" />,
    href: "/learn/blockchain-security",
    status: "coming-soon",
  },
  {
    title: "Hackathon Challenges",
    description: "Participate in coding hackathons to showcase your skills",
    icon: <Hammer className="h-8 w-8" />,
    href: "/learn/hackathons",
    status: "coming-soon",
  },
];

export default function LearnPage() {
  const { toast } = useToast();

  const handleComingSoonToast = (module: string) => {
    toast({
      title: `${module} is Coming Soon`,
      description: "This module is not yet available. Stay tuned!",
    });
  };

  return (
    <div className="container mt-24 p-4 lg:mt-32 xl:p-0">
      <div className="mb-8">
        <h1 className="text-2xl font-bold lg:text-4xl">
          Blockchain Development Bootcamp
        </h1>
        <p className="mt-2 text-base text-muted-foreground lg:text-lg">
          Master blockchain development through our comprehensive learning
          modules
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
        <h2 className="text-2xl font-bold">Your Bootcamp Progress</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-background p-4">
            <h3 className="font-semibold">Completed Puzzles</h3>
            <p className="text-3xl font-bold">0/10</p>
          </div>
          <div className="rounded-lg bg-background p-4">
            <h3 className="font-semibold">Modules Completed</h3>
            <p className="text-3xl font-bold">0/6</p>
          </div>
          <div className="rounded-lg bg-background p-4">
            <h3 className="font-semibold">Bootcamp Progress</h3>
            <p className="text-3xl font-bold">0%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
