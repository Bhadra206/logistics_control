import { UserCheck, Archive, TrendingUp, Car, CarFront } from "lucide-react";
import "./VehicleStats.css";

export function VehicleStats({ vehicles }) {
  const totalVehicles = vehicles.length;
  const activeVehicles = vehicles.filter((d) => d.status === "Active").length;

  const hmvVehicles = vehicles.filter(
    (d) => d.type === "HMV" && d.status === "Active"
  ).length;

  const avgRatePerKm = Math.round(
    vehicles.reduce((acc, d) => acc + d.ratePerKm, 0) / (vehicles.length || 1)
  );

  const stats = [
    {
      title: "Total Vehicles",
      value: totalVehicles,
      icon: Car,
      color: "blue",
    },
    {
      title: "Active Vehicles",
      value: activeVehicles,
      icon: CarFront,
      color: "green",
    },
    {
      title: "HMV Licensed",
      value: hmvVehicles,
      icon: TrendingUp,
      color: "purple",
    },
    {
      title: "Avg. Daily Rate",
      value: `₹${avgRatePerKm}`,
      icon: Archive,
      color: "orange",
    },
  ];

  return (
    <div className="vehiclestats-grid">
      {stats.map((stat, index) => (
        <div key={index} className="vehiclestats-card">
          <div className="vehiclestats-cardcontent">
            <div className="vehiclestats-header">
              <div>
                <p className="vehiclestats-title">{stat.title}</p>
                <p className="vehiclestats-value">{stat.value}</p>
              </div>
              <div className={`vehiclestats-icon-wrapper ${stat.color}`}>
                <stat.icon className={`vehiclestats-icon ${stat.color}`} />
              </div>
            </div>
            <div className={`vehiclestats-bar ${stat.color}`} />
          </div>
        </div>
      ))}
    </div>
  );
}
