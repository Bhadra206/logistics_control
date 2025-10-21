import React from "react";
import {
  Edit,
  Trash2,
  Phone,
  Mail,
  CalendarDays,
  MapPin,
  UserCog,
  Users,
  Mars,
  Venus,
} from "lucide-react";
import "./StaffCard.css";

export function StaffCard({ staff, onEdit, onDeleteStaff, onViewDetails }) {
  const getInitials = (firstName, lastName) =>
    `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();

  // Role-based icon and color
  const roleIcon =
    staff.type === "admin" ? (
      <UserCog className="role-icon admin-icon" />
    ) : (
      <Users className="role-icon staff-icon" />
    );

  return (
    <div className="staff-card">
      <div className="card-content">
        {/* Header */}
        <div className="card-header">
          <div className="staff-info">
            <div className="avatar">
              {getInitials(staff.firstName, staff.lastName)}
            </div>
            <div>
              <h3 className="staff-name">
                {staff.firstName} {staff.lastName}
              </h3>
              <div className="position-gender">
                <p className="staff-position">{staff.position}</p>
                <p className="staff-gender">
                  {staff.gender === "Male" ? (
                    <Mars size={18} />
                  ) : (
                    <Venus size={18} />
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Role / Type badge with icon */}
          <span className={`type-badge ${staff.type}`}>
            {roleIcon} {staff.type}
          </span>
        </div>

        {/* Contact & Details */}
        <div className="card-details">
          <div className="detail-item">
            <Mail className="icon" />
            <span>{staff.email}</span>
          </div>
          <div className="detail-item">
            <Phone className="icon" />
            <span>{staff.mobile}</span>
          </div>
          <div className="detail-item">
            <CalendarDays className="icon" />
            <span>
              {new Date(staff.dob).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="detail-item">
            <MapPin className="icon" />
            <span>{staff.address}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="card-actions">
          <button className="btn edit" onClick={() => onEdit(staff)}>
            <Edit className="btn-icon" /> Edit
          </button>
          <button
            className="btn delete"
            onClick={() => onDeleteStaff(staff._id)}
          >
            <Trash2 className="btn-icon" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
