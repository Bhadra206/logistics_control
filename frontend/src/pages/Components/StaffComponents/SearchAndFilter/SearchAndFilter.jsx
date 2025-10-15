import { Search, SortAsc, Grid, List } from "lucide-react";
import "./SearchAndFilter.css";

export function SearchAndFilters({
  searchTerm,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
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
            placeholder="Search staff by name or mobile..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="searchfilters-input"
          />
        </div>

        {/* Filters */}
        <div className="searchfilters-filters">
          {/* type */}
          <select
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value)}
            className="searchfilters-select"
          >
            <option value="all">All Types</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>

          {/* Sort */}
          <div className="searchfilters-sort">
            <SortAsc className="searchfilters-sorticon" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="searchfilters-select"
            >
              <option value="firstName">Name (A-Z)</option>
              <option value="lastName">Last Name</option>
              <option value="recent">Recently Added</option>
            </select>
          </div>

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
