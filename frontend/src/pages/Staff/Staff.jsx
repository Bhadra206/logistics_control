import { useEffect, useState } from "react";
import { StaffList } from "../Components/StaffComponents/StaffList/StaffList";
import { StaffForm } from "../Components/StaffComponents/StaffForm/StaffForm";
import { useLocation } from "react-router-dom";

function Staff() {
  const location = useLocation();
  const [staffs, setStaffs] = useState([]);
  const [currentView, setCurrentView] = useState("list");
  const [selectedStaff, setSelectedStaff] = useState(null);

  const fetchStaffs = async () => {
    try {
      const res = await fetch("http://localhost:3000/staff/getstaff");
      const data = await res.json();
      console.log("Fetched staff data:", data);

      if (res.ok) {
        setStaffs(Array.isArray(data.data) ? data.data : []);
      } else {
        setStaffs([]);
        console.error("Failed to fetch staffs:", data.message);
      }
    } catch (err) {
      console.error("Failed to fetch the staffs", err);
      setStaffs([]);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  useEffect(() => {
    if (location.state?.showAddForm) {
      setCurrentView("add");
    }
  }, [location.state]);

  const handleAddStaff = () => {
    setSelectedStaff(null);
    setCurrentView("add");
  };

  const handleEditStaff = (staff) => {
    setSelectedStaff(staff);
    setCurrentView("edit");
  };

  const handleSaveStaff = async (staffData) => {
    try {
      if (staffData._id) {
        await fetch(
          `http://localhost:3000/staff/updateStaff/${staffData._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(staffData),
          }
        );
        alert("Staff updated successfully ✅");
      } else {
        const res = await fetch("http://localhost:3000/admin/addStaff", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(staffData),
        });
        const data = await res.json();

        if (res.ok) {
          alert("Staff added successfully ✅");
        } else {
          alert(data.message || "Failed to add staff ❌");
        }
      }

      fetchStaffs();
      setCurrentView("list");
      setSelectedStaff(null);
    } catch (err) {
      console.error("Failed to save the staff", err);
    }
  };

  const handleDeleteStaff = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff?")) return;
    try {
      await fetch(`http://localhost:3000/staff/deleteStaff/${id}`, {
        method: "DELETE",
      });
      fetchStaffs();
    } catch (err) {
      console.error("Error deleting staff:", err);
    }
  };

  const handleCancel = () => {
    setCurrentView("list");
    setSelectedStaff(null);
  };

  return (
    <div className="staffContainer">
      {currentView === "list" && (
        <StaffList
          staffs={staffs}
          onEditStaff={handleEditStaff}
          onDeleteStaff={handleDeleteStaff}
          onAddStaff={handleAddStaff}
        />
      )}
      {(currentView === "add" || currentView === "edit") && (
        <StaffForm
          staff={selectedStaff}
          onSave={handleSaveStaff}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default Staff;
