import React from "react";
import { ClipboardList, CheckCircle, Calendar, Star } from "lucide-react";

const DashboardStats = ({
  totalInterviews,
  completedInterviews,
  upcomingInterviews,
  averageScore,
}) => {
  const stats = [
    {
      label: "Total Interviews",
      value: totalInterviews,
      icon: <ClipboardList className="w-6 h-6 text-blue-600" />,
      iconBg: "bg-blue-100",
    },
    {
      label: "Completed",
      value: completedInterviews,
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      iconBg: "bg-green-100",
    },
    {
      label: "Upcoming",
      value: upcomingInterviews,
      icon: <Calendar className="w-6 h-6 text-yellow-600" />,
      iconBg: "bg-yellow-100",
    },
    {
      label: "Average Score",
      value: averageScore !== undefined ? `${averageScore}%` : "-",
      icon: <Star className="w-6 h-6 text-purple-600" />,
      iconBg: "bg-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="sathi-card flex flex-col items-center justify-center rounded-2xl p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white"
        >
          {/* Icon */}
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-full ${stat.iconBg} mb-4`}
          >
            {stat.icon}
          </div>

          {/* Value */}
          <span className="text-4xl font-extrabold text-sathi-dark">
            {stat.value}
          </span>

          {/* Label */}
          <span className="text-sm font-medium text-gray-500 mt-2">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
