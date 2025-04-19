"use client";
import dynamic from 'next/dynamic';

// Dynamically import problematic components
const Transaction = dynamic(
  () => import("@/app/Components/dashboard/transaction"),
  { ssr: false }
);

const Orders = dynamic(
  () => import("@/app/Components/dashboard/orders/orders"),
  { ssr: false }
);

const DashboardHub = dynamic(
  () => import("@/app/Components/dashboard/dashboardhub/dashboardhub"), 
  { ssr: false }
);

const Dashboard = () => {
  return (
    <main className="p-6 overflow-y-auto">
      <Transaction />
      <Orders />
      <DashboardHub />
    </main>
  );
}

export default Dashboard;



