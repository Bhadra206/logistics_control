import "./DriverListTable.css";

export function DriverListTable({
  drivers,
  onEditDriver,
  onToggleArchive,
  onDeleteDriver,
  onRowClick,
}) {
  return (
    <table className="driver-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>License</th>
          <th>Rate</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map((driver) => (
          <tr
            key={driver._id}
            onClick={() => onRowClick(driver)}
            className="driver-table-row"
          >
            <td>{driver.name}</td>
            <td>{driver.licenseType}</td>
            <td>₹{driver.perDayRate}</td>
            <td>
              <span
                className={`driver-status ${
                  driver.status === "Active" ? "active" : "archived"
                }`}
              >
                {driver.status}
              </span>
            </td>
            <td>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditDriver(driver);
                }}
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleArchive(driver._id);
                }}
              >
                {driver.status === "Active" ? "Archive" : "Restore"}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteDriver(driver._id);
                }}
                className="delete-btn"
              >
                Del
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
