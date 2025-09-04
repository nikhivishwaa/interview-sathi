import React from "react";

const DashboardStats = ({
  totalInterviews,
  completedInterviews,
  upcomingInterviews,
  averageScore,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="sathi-card flex flex-col">
        <span className="text-sm font-medium text-gray-500">
          Total Interviews
        </span>
        <span className="text-3xl font-bold text-sathi-dark mt-2">
          {totalInterviews}
        </span>
      </div>

      <div className="sathi-card flex flex-col">
        <span className="text-sm font-medium text-gray-500">Completed</span>
        <span className="text-3xl font-bold text-sathi-dark mt-2">
          {completedInterviews}
        </span>
      </div>

      <div className="sathi-card flex flex-col">
        <span className="text-sm font-medium text-gray-500">Upcoming</span>
        <span className="text-3xl font-bold text-sathi-dark mt-2">
          {upcomingInterviews}
        </span>
      </div>

      <div className="sathi-card flex flex-col">
        <span className="text-sm font-medium text-gray-500">Average Score</span>
        <span className="text-3xl font-bold text-sathi-dark mt-2">
          {averageScore !== undefined ? `${averageScore}%` : "-"}
        </span>
      </div>
    </div>
  );
};

export default DashboardStats;
