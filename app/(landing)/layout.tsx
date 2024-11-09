import Header from "@/components/layouts/landing/header";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-2 py-20 xl:px-40">{children}</main>
    </>
  );
}
