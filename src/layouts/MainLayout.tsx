import Navbar from "@/components/Navbar";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}

export default MainLayout;
