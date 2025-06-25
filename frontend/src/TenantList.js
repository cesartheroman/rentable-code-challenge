import React, { useEffect, useState } from "react";
import TenantLedger from "./components/TenantLedger";

/**
 * Renders a list of all tenants, allowing users to view each tenant's financial ledger.
 */
function TenantList() {
  const [tenants, setTenants] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTenant, setSelectedTenant] = useState(null);

  useEffect(() => {
    fetch("/api/tenants/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setTenants(data))
      .catch((error) => {
        console.error("Error fetching tenants:", error);
        setError(error);
      });
  }, []);

  const handleViewLedger = (tenant) => {
    setSelectedTenant(tenant);
  };

  const handleCloseLedger = () => {
    setSelectedTenant(null);
  };

  if (error) {
    return <div>Error loading tenants: {error.message}</div>;
  }

  return (
    <div className="tenant-list">
      <h2>Tenants</h2>
      {tenants.length === 0 ? (
        <p>No tenants found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Unit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant) => (
              <tr key={tenant.id}>
                <td>{tenant.id}</td>
                <td>{tenant.name}</td>
                <td>{tenant.unit}</td>
                <td>
                  <button onClick={() => handleViewLedger(tenant)}>
                    View Ledger
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedTenant && (
        <TenantLedger
          tenantId={selectedTenant.id}
          tenantName={selectedTenant.name}
          onClose={handleCloseLedger}
        />
      )}
    </div>
  );
}

export default TenantList;
