import { Users, UserCog, User } from "lucide-react";
import "./StaffStats.css";

export function StaffStats({ staffs }) {
  const totalStaffs = staffs.length;
  const admin = staffs.filter((a) => a.type === "admin").length;
  const staff = staffs.filter((s) => s.type === "staff").length;

  const stats = [
    {
      title: "All Staffs",
      value: totalStaffs,
      icon: Users,
      color: "blue",
    },
    {
      title: "Total Admins",
      value: admin,
      icon: UserCog,
      color: "red",
    },
    {
      title: "Total Staffs",
      value: staff,
      icon: User,
      color: "green",
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
