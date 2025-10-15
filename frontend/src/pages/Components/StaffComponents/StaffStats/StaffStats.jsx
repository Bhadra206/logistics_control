import { Users, UserCheck, Archive, TrendingUp } from "lucide-react";
import "./StaffStats.css";

export function StaffStats({ staffs }) {
  const totalStaffs = staffs.length;
  
  const stats = [
    {
      title: "Total Staffs",
      value: totalStaffs,
      icon: Users,
      color: "blue",
    },
  ];

  return (
    <div className="staffstats-grid">
      {stats.map((stat, index) => (
        <div key={index} className="staffstats-card">
          <div className="staffstats-cardcontent">
            <div className="staffstats-header">
              <div>
                <p className="staffstats-title">{stat.title}</p>
                <p className="staffstats-value">{stat.value}</p>
              </div>
              <div className={`staffstats-icon-wrapper ${stat.color}`}>
                <stat.icon className={`staffstats-icon ${stat.color}`} />
              </div>
            </div>
            <div className={`staffstats-bar ${stat.color}`} />
          </div>
        </div>
      ))}
    </div>
  );
}
