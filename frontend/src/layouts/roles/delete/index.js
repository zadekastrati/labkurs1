import React, { useState } from 'react';

const DeleteRole = ({ roleId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteRole = async (roleId) => { // Define handleDeleteRole function
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:8080/api/roles/${roleId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete role');
      }

      setIsLoading(false);
      alert('Role deleted successfully');
    } catch (error) {
      console.error('Error deleting role:', error.message);
      setIsLoading(false);
      setError(error);
    }
  };

  return (
    <div>
      <h1>Delete Role</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <button onClick={() => handleDeleteRole(roleId)} disabled={isLoading}> {/* Pass roleId as argument */}
        Delete Role
      </button>
    </div>
  );
};

export default DeleteRole;
