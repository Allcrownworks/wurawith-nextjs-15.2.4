"use client";
import DashboardHub from "@/app/Components/dashboard/dashboardhub/dashboardhub";
import { Orders } from "@/app/Components/dashboard/orders/orders";
import { Transaction } from "@/app/Components/dashboard/transaction";


const Dashboard = () => {
  return (
    <main className=" p-6 overflow-y-auto">
      <Transaction />
      <Orders />
      <DashboardHub />
    </main>
  );
}
export default Dashboard;



