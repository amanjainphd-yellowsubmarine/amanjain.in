import { Sidebar } from "@/components/layout/Sidebar";
import { TabGate } from "@/components/layout/TabGate";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TabGate>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </TabGate>
  );
}
