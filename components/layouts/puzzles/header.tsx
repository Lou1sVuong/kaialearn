"use client";

import ConnectWalletBtn from "@/components/connect-wallet-btn";
import { KaialearnLogo } from "@/components/layouts/landing/header";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import React, { useState } from "react";

const MENU_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Docs", href: "/docs" },
];

export default function PuzzlesHeader() {
  return (
    <div>
      <div className="fixed left-0 right-0 top-0 z-50 flex w-full items-center justify-between gap-2 border-b border-border bg-background px-4 pb-2 pt-0 uppercase sm:items-center lg:py-0 lg:pb-4 lg:pt-2 xl:px-20">
        <DesktopMenu />
        <MobileMenu />
      </div>
    </div>
  );
}

function DesktopMenu() {
  return (
    <div className="hidden w-full lg:block">
      <div className="flex w-full items-center justify-between">
        <div>
          <KaialearnLogo />
        </div>
        <div>
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
      </div>
    </div>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <div className="w-full lg:hidden">
      <div className="flex w-full items-center justify-between">
        <KaialearnLogo />
        <IconMenu2 className="mt-4" onClick={handleOpen} />
      </div>
      {open && <MobileMenuItems />}
    </div>
  );
}

function MobileMenuItems() {
  return (
    <div className="w-full border-b border-border px-4">
      <div className="flex flex-col gap-8 px-4 py-4">
        <div className="flex flex-col gap-4">
          {MENU_ITEMS.map((item, index) => (
            <div key={index}>
              <Link href={`/${item.href}`}>{item.label}</Link>
            </div>
          ))}
          <Link href="/about-us">About Us</Link>
        </div>
        <div className="flex items-center gap-4">
          <ConnectWalletBtn />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
