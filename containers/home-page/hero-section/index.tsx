import { Cover } from "@/components/ui/cover";
import { LinkButton } from "@/components/ui/link-button";

export default function HeroSection() {
  return (
    <section className="mt-12 border border-border p-4 lg:mt-14 lg:p-16">
      <div className="flex h-full min-h-[30rem] w-full flex-col justify-center gap-5 lg:items-center lg:text-center">
        <h1 className="text-4xl font-bold uppercase lg:px-28 lg:text-5xl">
          Hack, learn, and secure the future of{" "}
          <Cover className="select-none">decentralized</Cover> tech.
        </h1>
        <p className="w-[95%] text-xs font-medium lg:w-2/3 lg:text-sm">
          Master smart contract security through hands-on puzzles. Exploit
          vulnerabilities, learn best practices, and earn rewards for successful
          hacks.
        </p>
        <div className="flex h-12 w-2/3 gap-5 lg:w-1/3">
          <LinkButton className="h-full flex-1" href="/learn">
            Try It Now
          </LinkButton>
          <LinkButton
            variant="outline"
            className="h-full flex-1"
            href="https://docs.kaialearn.com/"
            blankTarget
          >
            View Docs
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
