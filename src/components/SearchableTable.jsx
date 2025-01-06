import React, { useState } from "react";
import "../styles/styles.css";

const SearchableTable = () => {
  const initialData = [
    { id: 1, name: "Alice", role: "Developer" },
    { id: 2, name: "Bob", role: "Designer" },
    { id: 3, name: "Charlie", role: "Product Manager" },
  ];

  const [data] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState({ field: null, ascending: true });

  const handleSort = (field) => {
    setSortBy({
      field,
      ascending: sortBy.field === field ? !sortBy.ascending : true,
    });
  };

  const sortedAndFilteredData = [...data]
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (!sortBy.field) return 0;

      const aValue = a[sortBy.field];
      const bValue = b[sortBy.field];

      if (aValue < bValue) return sortBy.ascending ? -1 : 1;
      if (aValue > bValue) return sortBy.ascending ? 1 : -1;
      return 0;
    });

  return (
    <div className="card">
      <h2>Searchable Table</h2>

      <input
        type="text"
        className="input"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>
              Name {sortBy.field === "name" && (sortBy.ascending ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("role")}>
              Role {sortBy.field === "role" && (sortBy.ascending ? "↑" : "↓")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchableTable;
