import { Car } from "lucide-react";
import { SearchAndFilters } from "../../VehicleComponents/SearchAndFilter/SearchAndFilter";
import { VehicleStats } from "../VehicleStats/VehicleStats";
import { VehicleCard } from "../VehicleCard/VehicleCard";
import { VehicleListTable } from "../VehicleListTable/VehicleListTable";
import "./VehicleList.css";
import { useState, useMemo } from "react";

export function VehicleList({
  vehicles,
  onEditVehicle,
  onToggleArchive,
  onDeleteVehicle,
  onAddVehicle,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [licenceFilter, setlicenceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("list");

  const openVehicleModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const filteredAndSortedVehicles = useMemo(() => {
    let filtered = vehicles.filter((vehicle) => {
      const matchesSearch =
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.registrationNo.includes(searchTerm);
      const matchesStatus =
        statusFilter === "all" || vehicle.status === statusFilter;
      const matcheslicence =
        licenceFilter === "all" || vehicle.type === licenceFilter;

      return matchesSearch && matchesStatus && matcheslicence;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "rate-high":
          return b.ratePerKm - a.ratePerKm;
        case "rate-low":
          return a.ratePerKm - b.ratePerKm;
        case "recent":
          return a.id < b.id ? 1 : -1;
        default:
          return 0;
      }
    });

    return filtered;
  }, [vehicles, searchTerm, statusFilter, licenceFilter, sortBy]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (statusFilter !== "all") count++;
    if (licenceFilter !== "all") count++;
    if (searchTerm) count++;
    return count;
  }, [statusFilter, licenceFilter, searchTerm]);

  return (
    <div className="vehicle-list-page">
      {/* Hero Section */}
      <div className="vehicle-hero">
        <div className="vehicle-hero-container">
          <div className="vehicle-hero-image">
            <img
              src="https://truckcdn.cardekho.com/in/tata/signa-3523-tk/tata-signa-3523-tk-98522.jpg"
              alt="DashBoard Interface"
              className="vehicle-hero-img"
              onError={(e) => {
                e.target.src = "/fallback-image.jpg";
              }}
            />
          </div>
          <div className="vehicle-hero-text">
            <h1>Vehicle Management Hub</h1>
            <p>
              Enhance your vehicle operations with our powerful Vehicle
              Management Hub. Easily monitor vehicle details, track maintenance
              schedules, manage availability, and streamline allocations — all
              in one centralized platform. Optimize efficiency, reduce downtime,
              and keep your fleet running smoothly.
            </p>

            <button onClick={onAddVehicle} className="vehicle-add-btn">
              <Car className="vehicle-add-icon" />
              <span>Add New Vehicle</span>
            </button>
          </div>
        </div>
      </div>

      <div className="vehicle-list-container">
        <VehicleStats vehicles={vehicles} />

        <SearchAndFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          licenceFilter={licenceFilter}
          onlicenceFilterChange={setlicenceFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          activeFiltersCount={activeFiltersCount}
        />

        <div className="vehicle-results-header">
          <h2>
            {filteredAndSortedVehicles.length > 1
              ? `${filteredAndSortedVehicles.length} Vehicles Found`
              : `${filteredAndSortedVehicles.length} Vehicle Found`}
          </h2>
          {activeFiltersCount > 0 && (
            <p>
              {activeFiltersCount} filters applies • Showing in {viewMode} view
            </p>
          )}
        </div>

        {filteredAndSortedVehicles.length === 0 ? (
          <div className="vehicle-no-results">No Vehicles found</div>
        ) : viewMode === "grid" ? (
          <div className="vehicle-grid">
            {filteredAndSortedVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle._id}
                vehicle={vehicle}
                onEdit={onEditVehicle}
                onToggleArchive={onToggleArchive}
                onDeleteVehicle={onDeleteVehicle}
                onClick={() => openVehicleModal(Vehicle)}
              />
            ))}
          </div>
        ) : (
          <VehicleListTable
            vehicles={filteredAndSortedVehicles}
            onEditVehicle={onEditVehicle}
            onToggleArchive={onToggleArchive}
            onDeleteVehicle={onDeleteVehicle}
            onRowClick={openVehicleModal}
          />
        )}
      </div>
    </div>
  );
}
