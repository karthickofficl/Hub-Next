import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Navbar */}
        <Navbar />
        {/* Main Content */}
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};