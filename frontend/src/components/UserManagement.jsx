import React from "react";

function UserManagement({ users, isLoading, onDeleteUser }) {
  return (
    <div style={{ padding: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1 style={{ margin: 0 }}>User Management</h1>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <p>Loading users...</p>
        </div>
      ) : users.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 0',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <p>No users found.</p>
        </div>
      ) : (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr>
                <th style={{
                  padding: '15px',
                  textAlign: 'left',
                  borderBottom: '1px solid #eee',
                  backgroundColor: '#f9f9f9'
                }}>
                  User
                </th>
                <th style={{
                  padding: '15px',
                  textAlign: 'left',
                  borderBottom: '1px solid #eee',
                  backgroundColor: '#f9f9f9'
                }}>
                  Email
                </th>
                <th style={{
                  padding: '15px',
                  textAlign: 'left',
                  borderBottom: '1px solid #eee',
                  backgroundColor: '#f9f9f9'
                }}>
                  UID
                </th>
                <th style={{
                  padding: '15px',
                  textAlign: 'center',
                  borderBottom: '1px solid #eee',
                  backgroundColor: '#f9f9f9'
                }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id || user.uid} style={{
                  borderBottom: '1px solid #eee',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#e1e1e1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '10px',
                        fontSize: '16px',
                        color: '#555'
                      }}>
                        {(user.name || user.email || '').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 'bold' }}>{user.name || 'User'}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {user.role || 'Customer'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '15px' }}>
                    {user.email}
                  </td>
                  <td style={{ padding: '15px' }}>
                    <span style={{
                      display: 'inline-block',
                      maxWidth: '150px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {user.id || user.uid}
                    </span>
                  </td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this user?')) {
                          onDeleteUser(user.id || user.uid);
                        }
                      }}
                      style={{
                        backgroundColor: '#F44336',
                        color: 'white',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserManagement;