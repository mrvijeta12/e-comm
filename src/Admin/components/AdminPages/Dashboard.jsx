import React from "react";
import AchievementCard from "../cards/AchievementCard";
import MonthlyOverview from "../cards/MonthlyOverview";

import DashboardRecentOrderTable from "../../view/DashboardRecentOrderTable.jsx";
import DashboardProductTable from "../../view/DashboardProductTable.jsx";

const Dashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-3  gap-2  items-stretch mb-5">
        <div className="col-span-1 ">
          <AchievementCard />
        </div>
        <div className="col-span-2 ">
          <MonthlyOverview />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-5 h-[400px]">
        <div className="h-full overflow-auto ">
          <DashboardRecentOrderTable />
        </div>

        <div className="h-full overflow-auto ">
          <DashboardProductTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
