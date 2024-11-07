import { Brain, Shield, Terminal, type LucideIcon } from "lucide-react";
import React from "react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Terminal,
    title: "Interactive Testing",
    description:
      "Deploy and test your exploits in a safe, sandboxed environment.",
  },
  {
    icon: Brain,
    title: "Learn by Doing",
    description:
      "Understand common vulnerabilities through practical challenges.",
  },
  {
    icon: Shield,
    title: "Earn Rewards",
    description:
      "Get tokens and NFT badges for successfully completing challenges.",
  },
];

export default function FeatureSection() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="border border-border p-6">
              <Icon className="mb-4 h-12 w-12" />
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
