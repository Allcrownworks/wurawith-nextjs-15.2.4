" use client "
import DashboardHub from "@/app/Components/dashboard/dashboardhub/dashboardhub";
import { Orders } from "@/app/Components/dashboard/orders/orders";


const Dashboard = () => {
  return (
    <main className=" p-6 overflow-y-auto">
      <Orders />
      <DashboardHub />
    </main>
  );
}
export default Dashboard;



