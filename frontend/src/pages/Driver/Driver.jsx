import { useEffect, useState } from "react";
import { DriverList } from "../Components/DriverComponents/DriverList/DriverList";
import { DriverForm } from "../Components/DriverComponents/DriverForm/DriverForm";
import { useLocation } from "react-router-dom";

function Driver() {
  const location = useLocation();
  const [drivers, setDrivers] = useState([]);
  const [currentView, setCurrentView] = useState("list");
  const [selectedDriver, setSelectedDriver] = useState(null);

  const fetchDrivers = async () => {
    try {
      const res = await fetch("http://localhost:3000/admin/drivers");
      const data = await res.json();

      if (res.ok) {
        setDrivers(Array.isArray(data.data.drivers) ? data.data.drivers : []);
      } else {
        setDrivers([]);
        console.error("Failed to fetch drivers:", data.message);
      }
    } catch (err) {
      console.error("Failed to fetch the drivers", err);
      setDrivers([]);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  useEffect(() => {
    if (location.state?.showAddForm) {
      setCurrentView("add");
    }
  }, [location.state]);

  const handleAddDriver = () => {
    setSelectedDriver(null);
    setCurrentView("add");
  };

  const handleEditDriver = (driver) => {
    setSelectedDriver(driver);
    setCurrentView("edit");
  };

  const handleSaveDriver = async (driverData) => {
    try {
      if (driverData._id) {
        await fetch(
          `http://localhost:3000/driver/updateDriver/${driverData._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(driverData),
          }
        );
        alert("Driver updated successfully ✅");
      } else {
        const res = await fetch("http://localhost:3000/admin/addDriver", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(driverData),
        });
        const data = await res.json();

        if (res.ok) {
          alert("Driver added successfully ✅");
        } else {
          alert(data.message || "Failed to add driver ❌");
        }
      }

      fetchDrivers();
      setCurrentView("list");
      setSelectedDriver(null);
    } catch (err) {
      console.error("Failed to save the driver", err);
    }
  };

  const handleDeleteDriver = async (id) => {
    if (!window.confirm("Are you sure you want to delete this driver?")) return;

    try {
      const res = await fetch(
        `http://localhost:3000/driver/deleteDriver/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        // ✅ Show alert if driver is allocated to an active order
        if (data.message?.includes("allocated")) {
          alert(
            "❌ Cannot delete driver. The driver is currently allocated to an active order."
          );
        } else {
          alert(data.message || "Failed to delete driver ❌");
        }
      } else {
        alert("✅ Driver deleted successfully");
        fetchDrivers();
      }
    } catch (err) {
      console.error("Error deleting driver:", err);
      alert("An unexpected error occurred while deleting the driver.");
    }
  };

  const handleToggleArchive = async (driver) => {
    try {
      if (driver.status === "Active") {
        await fetch(`http://localhost:3000/driver/${driver._id}/archive`, {
          method: "PATCH",
        });
      } else {
        await fetch(`http://localhost:3000/driver/${driver._id}/restore`, {
          method: "PATCH",
        });
      }

      fetchDrivers();
    } catch (err) {
      console.error("Error toggling archive/restore:", err);
    }
  };

  const handleCancel = () => {
    setCurrentView("list");
    setSelectedDriver(null);
  };

  return (
    <div className="driverContainer">
      {currentView === "list" && (
        <DriverList
          drivers={drivers}
          onEditDriver={handleEditDriver}
          onToggleArchive={handleToggleArchive}
          onDeleteDriver={handleDeleteDriver}
          onAddDriver={handleAddDriver}
        />
      )}
      {(currentView === "add" || currentView === "edit") && (
        <DriverForm
          driver={selectedDriver}
          onSave={handleSaveDriver}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default Driver;
