import { useEffect, useState } from "react";
import { VehicleList } from "../Components/VehicleComponents/VehicleList/VehicleList";
import { VehicleForm } from "../Components/VehicleComponents/VehicleForm/VehicleForm";
import { useLocation } from "react-router-dom";

function Vehicle() {
  const location = useLocation();
  const [vehicles, setVehicles] = useState([]);
  const [currentView, setCurrentView] = useState("list");
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const fetchVehicles = async () => {
    try {
      const res = await fetch("http://localhost:3000/admin/vehicles");
      const data = await res.json();

      if (res.ok) {
        setVehicles(
          Array.isArray(data.data.vehicles) ? data.data.vehicles : []
        );
      } else {
        setVehicles([]);
        console.error("Failed to fetch vehicles", data.message);
      }
    } catch (err) {
      console.error("Failed to fetch vehicles", err);
      setVehicles([]);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    if (location.state?.showAddForm) {
      setCurrentView("add");
    }
  }, [location.state]);

  const handleAddVehicle = async () => {
    setSelectedVehicle(null);
    setCurrentView("add");
  };

  const handleEditVehicle = async (vehicle) => {
    setSelectedVehicle(vehicle);
    setCurrentView("edit");
  };

  const handleSaveVehicle = async (vehicleData) => {
    try {
      if (vehicleData._id) {
        await fetch(
          `http://localhost:3000/vehicle/updateVehicle/${vehicleData._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(vehicleData),
          }
        );
        alert("Vehicle updated successfully ✅");
      } else {
        const res = await fetch("http://localhost:3000/admin/addVehicle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(vehicleData),
        });
        const data = await res.json();
        if (res.ok) {
          alert("Vehicle added successfully ✅");
        } else {
          alert(data.message || "Failed to add vehicle ❌");
        }
      }

      fetchVehicles();
      setCurrentView("list");
      setSelectedVehicle(null);
    } catch (err) {
      console.log("Failed to save the vehicle", err);
    }
  };

  const handleDeleteVehicle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?"))
      return;
    try {
      await fetch(`http://localhost:3000/vehicle/deleteVehicle/${id}`, {
        method: "DELETE",
      });
      fetchVehicles();
    } catch (err) {
      console.error("Error deleting vehicle", err);
    }
  };

  const handleToggleArchive = async (vehicle) => {
    try {
      if (vehicle.status === "Active") {
        await fetch(`http://localhost:3000/vehicle/${vehicle._id}/archive`, {
          method: "PATCH",
        });
      } else {
        await fetch(`http://localhost:3000/vehicle/${vehicle._id}/restore`, {
          method: "PATCH",
        });
      }
      fetchVehicles();
    } catch (err) {
      console.error("Error toggling archive/restore:", err);
    }
  };

  const handleCancel = () => {
    setCurrentView("list");
    setSelectedVehicle(null);
  };

  return (
    <div className="vehicleContainer">
      {currentView === "list" && (
        <VehicleList
          vehicles={vehicles}
          onEditVehicle={handleEditVehicle}
          onToggleArchive={handleToggleArchive}
          onDeleteVehicle={handleDeleteVehicle}
          onAddVehicle={handleAddVehicle}
        />
      )}
      {(currentView === "add" || currentView === "edit") && (
        <VehicleForm
          vehicle={selectedVehicle}
          onSave={handleSaveVehicle}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default Vehicle;
