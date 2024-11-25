import PuzzlesHeader from "@/components/layouts/learn/header";

export default function PuzzlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col xl:px-20">
      <PuzzlesHeader />
      {children}
    </main>
  );
}
