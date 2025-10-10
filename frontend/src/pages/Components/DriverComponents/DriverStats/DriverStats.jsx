import { Users, UserCheck, Archive, TrendingUp } from "lucide-react";
import "./DriverStats.css";

export function DriverStats({ drivers }) {
  const totalDrivers = drivers.length;
  const activeDrivers = drivers.filter((d) => d.status === "Active").length;

  const hmvDrivers = drivers.filter(
    (d) => d.licence === "HMV" && d.status === "Active"
  ).length;

  const avgPerDayRate = Math.round(
    drivers.reduce((acc, d) => acc + d.perDayRate, 0) / (drivers.length || 1)
  );

  const stats = [
    {
      title: "Total Drivers",
      value: totalDrivers,
      icon: Users,
      color: "blue",
    },
    {
      title: "Active Drivers",
      value: activeDrivers,
      icon: UserCheck,
      color: "green",
    },
    {
      title: "HMV Licensed",
      value: hmvDrivers,
      icon: TrendingUp,
      color: "purple",
    },
    {
      title: "Avg. Daily Rate",
      value: `₹${avgPerDayRate}`,
      icon: Archive,
      color: "orange",
    },
  ];

  return (
    <div className="driverstats-grid">
      {stats.map((stat, index) => (
        <div key={index} className="driverstats-card">
          <div className="driverstats-cardcontent">
            <div className="driverstats-header">
              <div>
                <p className="driverstats-title">{stat.title}</p>
                <p className="driverstats-value">{stat.value}</p>
              </div>
              <div className={`driverstats-icon-wrapper ${stat.color}`}>
                <stat.icon className={`driverstats-icon ${stat.color}`} />
              </div>
            </div>
            <div className={`driverstats-bar ${stat.color}`} />
          </div>
        </div>
      ))}
    </div>
  );
}
