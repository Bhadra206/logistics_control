import { Search, SortAsc, Grid, List } from "lucide-react";
import "./SearchAndFilter.css";

export function SearchAndFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  licenceFilter,
  onlicenceFilterChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  activeFiltersCount,
}) {
  return (
    <div className="searchfilters-container">
      <div className="searchfilters-row">
        {/* Search */}
        <div className="searchfilters-search">
          <Search className="searchfilters-searchicon" />
          <input
            type="text"
            placeholder="Search drivers by name or mobile..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="searchfilters-input"
          />
        </div>

        {/* Filters */}
        <div className="searchfilters-filters">
          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="searchfilters-select"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Archived">Archived</option>
          </select>

          {/* licence */}
          <select
            value={licenceFilter}
            onChange={(e) => onlicenceFilterChange(e.target.value)}
            className="searchfilters-select"
          >
            <option value="all">All licences</option>
            <option value="LMV">LMV</option>
            <option value="HMV">HMV</option>
          </select>

          {/* Sort */}
          <div className="searchfilters-sort">
            <SortAsc className="searchfilters-sorticon" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="searchfilters-select"
            >
              <option value="name">Name (A-Z)</option>
              <option value="rate-high">Rate (High to Low)</option>
              <option value="rate-low">Rate (Low to High)</option>
              <option value="recent">Recently Added</option>
            </select>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <span className="searchfilters-badge">
              {activeFiltersCount} filters applied
            </span>
          )}

          {/* View Toggle */}
          <div className="searchfilters-toggle">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`searchfilters-btn ${
                viewMode === "grid" ? "active" : ""
              }`}
            >
              <Grid className="searchfilters-icon" />
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`searchfilters-btn ${
                viewMode === "list" ? "active" : ""
              }`}
            >
              <List className="searchfilters-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
