import { useState, useMemo } from "react";
import { UserPlus } from "lucide-react";
import { StaffStats } from "../StaffStats/StaffStats";
import { SearchAndFilters } from "../SearchAndFilter/SearchAndFilter";
// import { StaffCard } from "../StaffCard/StaffCard";
// import { StaffListTable } from "../StaffListTable/StaffListTable";
import "./StaffList.css";

export function StaffList({ staffs, onEditStaff, onDeleteStaff, onAddStaff }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");

  const openStaffModal = (staff) => {
    setSelectedStaff(staff);
    setIsModalOpen(true);
  };

  const filteredAndSortedStaffs = useMemo(() => {
    let filtered = staffs.filter((staff) => {
      const matchesSearch =
        staff.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.mobile.includes(searchTerm);
      const matchesType = typeFilter === "all" || staff.type === typeFilter;

      return matchesSearch && matchesType;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.firstName.localeCompare(b.firstName);
        case "recent":
          return a.id < b.id ? 1 : -1;
        default:
          return 0;
      }
    });

    return filtered;
  }, [staffs, searchTerm, typeFilter, sortBy]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (typeFilter !== "all") count++;
    if (searchTerm) count++;
    return count;
  }, [typeFilter, searchTerm]);

  return (
    <div className="staff-list-page">
      {/* Hero Section */}
      <div className="staff-hero">
        <div className="staff-hero-container">
          <div className="staff-hero-text">
            <h1>Staff Management Hub</h1>
            <p>
              Streamline your staff operations with our comprehensive management
              system.
            </p>

            <button onClick={onAddStaff} className="staff-add-btn">
              <UserPlus className="staff-add-icon" />
              <span>Add New Staff</span>
            </button>
          </div>

          <div className="staff-hero-image">
            <img
              src="https://t4.ftcdn.net/jpg/02/63/76/75/360_F_263767541_MP04Nw3RwWewgF8FmdRtx3OzEQZOo1w0.jpg"
              alt="Dashboard Interface"
              className="staff-hero-img"
              onError={(e) => {
                e.currentTarget.src = "/fallback-image.jpg";
              }}
            />
          </div>
        </div>
      </div>

      <div className="staff-list-container">
        <StaffStats staffs={staffs} />

        <SearchAndFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          typeFilter={typeFilter}
          ontypeFilterChange={setTypeFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          activeFiltersCount={activeFiltersCount}
        />

        <div className="staff-results-header">
          <h2>{filteredAndSortedStaffs.length} Staffs Found</h2>
          {activeFiltersCount > 0 && (
            <p>
              {activeFiltersCount} filters applied • Showing in {viewMode} view
            </p>
          )}
        </div>

        {filteredAndSortedStaffs.length === 0 ? (
          <div className="staff-no-results">No staffs found</div>
        ) : viewMode === "grid" ? (
          <div className="staff-grid">
            {filteredAndSortedStaffs.map((staff) => (
              <StaffCard
                key={staff._id}
                staff={staff}
                onEdit={onEditStaff}
                onDeleteStaff={onDeleteStaff}
                onClick={() => openStaffModal(staff)}
              />
            ))}
          </div>
        ) : (
          <StaffListTable
            staffs={filteredAndSortedStaffs}
            onEditStaff={onEditStaff}
            onDeleteStaff={onDeleteStaff}
            onRowClick={openStaffModal}
          />
        )}
      </div>
    </div>
  );
}
