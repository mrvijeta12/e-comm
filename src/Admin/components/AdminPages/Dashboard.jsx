import React from "react";
import AchievementCard from "../cards/AchievementCard";
import MonthlyOverview from "../cards/MonthlyOverview";

import DashboardRecentOrderTable from "../../view/DashboardRecentOrderTable.jsx";
import DashboardProductTable from "../../view/DashboardProductTable.jsx";

const Dashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-3  gap-4  items-stretch mb-5">
        <div className="lg:col-span-1 col-span-3 ">
          <AchievementCard />
        </div>
        <div className="lg:col-span-2 col-span-3 ">
          <MonthlyOverview />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-5 overflow-auto ">
        <div className="h-full  lg:col-span-1 col-span-2 max-h-[400px] ">
          <DashboardRecentOrderTable />
        </div>

        <div className="h-full  lg:col-span-1 col-span-2 max-h-[400px] ">
          <DashboardProductTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
