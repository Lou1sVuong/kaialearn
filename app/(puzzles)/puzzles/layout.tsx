export default function PuzzlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex flex-col gap-24 xl:px-20">{children}</main>;
}
