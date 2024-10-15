import Navbar from "@/components/Navbar";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <Navbar />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}

export default MainLayout;
