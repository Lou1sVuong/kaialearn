import { Button } from "@/components/ui/button";
import { Cover } from "@/components/ui/cover";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="mt-10 border border-border p-16 lg:mt-20">
      <div className="flex h-full min-h-[30rem] w-full flex-col justify-center gap-5 lg:items-center lg:text-center">
        <h1 className="text-5xl font-bold uppercase lg:px-28 lg:text-5xl">
          Hack, learn, and secure the future of <Cover>decentralized</Cover>{" "}
          tech.
        </h1>
        <p className="w-[90%] text-sm font-medium lg:w-2/3 lg:text-sm">
          Master smart contract security through hands-on puzzles. Exploit
          vulnerabilities, learn best practices, and earn rewards for successful
          hacks.
        </p>
        <div className="flex h-12 w-2/3 gap-5 lg:w-1/3">
          <Button className="h-full flex-1">
            <Link href="/puzzles">Try It Now</Link>
          </Button>
          <Button variant="outline" className="h-full flex-1">
            <Link href="/docs">View Docs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
