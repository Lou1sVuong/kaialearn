"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { puzzles } from "./data";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function PuzzlesPage() {
  return (
    <div className="mt-20 flex h-screen flex-col p-4">
      <h1 className="mb-6 text-2xl font-bold">Contract Puzzles</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {puzzles.map((puzzle) => (
          <Link key={puzzle.id} href={`/puzzles/level/${puzzle.id}`}>
            <Card className="cursor-pointer transition-all hover:bg-accent">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle>{puzzle.title}</CardTitle>
                  <Badge variant="outline">{puzzle.difficulty}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {puzzle.description}
                </p>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
