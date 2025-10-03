import { useState, useMemo } from "react";
import { UserPlus } from "lucide-react";
import { DriverStats } from "../DriverStats/DriverStats";
import { SearchAndFilters } from "../SearchAndFilter/SearchAndFilter";
import { DriverCard } from "../DriverCard/DriverCard";
import { DriverListTable } from "../DriverListTable/DriverListTable";
import { DriverDetails } from "../DriverDetails/DriverDetails";
import "./DriverList.css";

export function DriverList({
  drivers,
  onEditDriver,
  onToggleArchive,
  onAddDriver,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [licenceFilter, setlicenceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");

  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDriverModal = (driver) => {
    setSelectedDriver(driver);
    setIsModalOpen(true);
  };

  const closeDriverModal = () => {
    setSelectedDriver(null);
    setIsModalOpen(false);
  };

  const filteredAndSortedDrivers = useMemo(() => {
    let filtered = drivers.filter((driver) => {
      const matchesSearch =
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.mobile.includes(searchTerm);
      const matchesStatus =
        statusFilter === "all" || driver.status === statusFilter;
      const matcheslicence =
        licenceFilter === "all" || driver.licence === licenceFilter;

      return matchesSearch && matchesStatus && matcheslicence;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "rate-high":
          return b.perDayRate - a.perDayRate;
        case "rate-low":
          return a.perDayRate - b.perDayRate;
        case "recent":
          return a.id < b.id ? 1 : -1;
        default:
          return 0;
      }
    });

    return filtered;
  }, [drivers, searchTerm, statusFilter, licenceFilter, sortBy]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (statusFilter !== "all") count++;
    if (licenceFilter !== "all") count++;
    if (searchTerm) count++;
    return count;
  }, [statusFilter, licenceFilter, searchTerm]);

  return (
    <div className="driver-list-page">
      {/* Hero Section */}
      <div className="driver-hero">
        <div className="driver-hero-container">
          <div className="driver-hero-text">
            <h1>Driver Management Hub</h1>
            <p>
              Streamline your driver operations with our comprehensive
              management system. Track performance, manage schedules, and
              optimize your fleet efficiency.
            </p>

            <button onClick={onAddDriver} className="driver-add-btn">
              <UserPlus className="driver-add-icon" />
              <span>Add New Driver</span>
            </button>
          </div>

          <div className="driver-hero-image">
            <img
              src="https://images.unsplash.com/photo-1732203971761-e9d4a6f5e93f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
              alt="Dashboard Interface"
              className="driver-hero-img"
              onError={(e) => {
                e.currentTarget.src = "/fallback-image.jpg";
              }}
            />
          </div>
        </div>
      </div>

      <div className="driver-list-container">
        <DriverStats drivers={drivers} />

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

        <div className="driver-results-header">
          <h2>{filteredAndSortedDrivers.length} Drivers Found</h2>
          {activeFiltersCount > 0 && (
            <p>
              {activeFiltersCount} filters applied • Showing in {viewMode} view
            </p>
          )}
        </div>

        {filteredAndSortedDrivers.length === 0 ? (
          <div className="driver-no-results">No drivers found</div>
        ) : viewMode === "grid" ? (
          <div className="driver-grid">
            {filteredAndSortedDrivers.map((driver) => (
              <DriverCard
                key={driver._id}
                driver={driver}
                onEdit={onEditDriver}
                onToggleArchive={onToggleArchive}
                onClick={() => openDriverModal(driver)}
              />
            ))}
          </div>
        ) : (
          <DriverListTable
            drivers={filteredAndSortedDrivers}
            onEditDriver={onEditDriver}
            onToggleArchive={onToggleArchive}
            onRowClick={openDriverModal}
          />
        )}
      </div>

      <DriverDetails
        driver={selectedDriver}
        isOpen={isModalOpen}
        onClose={closeDriverModal}
      />
    </div>
  );
}
