import { useState, useEffect } from 'react'
import { navigate } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import MainLayout from 'src/layouts/MainLayout/MainLayout' // ADD THIS
import {
  Users,
  HandCoins,
  PiggyBank,
  ChevronDown,
  MoreVertical,
  Eye,
  UserX,
  UserCheck as UserCheckIcon
} from 'lucide-react'
import './DashboardPage.scss'

const API_URL = 'https://raw.githubusercontent.com/JONAH-6/api-link/refs/heads/main/user.json'

const DashboardPage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [activeFilter, setActiveFilter] = useState(null)
  const [activeActionMenu, setActiveActionMenu] = useState(null)
  const [filters, setFilters] = useState({
    organization: '',
    username: '',
    email: '',
    phone: '',
    dateJoined: '',
    status: ''
  })

  const pageSize = 20

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(API_URL)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then(data => {
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format: expected array')
        }
        setUsers(data)
        setLoading(false)
      })
      .catch(err => {
        setError(`Failed to load users: ${err.message}`)
        setLoading(false)
      })
  }, [])

  // Close action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveActionMenu(null)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'status-active'
      case 'inactive': return 'status-inactive'
      case 'pending': return 'status-pending'
      case 'blacklisted': return 'status-blacklisted'
      default: return 'status-inactive'
    }
  }

  const handleRowClick = (user) => {
    try {
      localStorage.setItem('selectedUser', JSON.stringify(user))
      navigate(`/users/${user.id}`)
    } catch (err) {
      console.error('Navigation error:', err)
    }
  }

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleApplyFilters = () => {
    setActiveFilter(null)
    console.log('Applying filters:', filters)
  }

  const handleResetFilters = () => {
    setFilters({
      organization: '',
      username: '',
      email: '',
      phone: '',
      dateJoined: '',
      status: ''
    })
    setActiveFilter(null)
  }

  const handleFilterClick = (column) => {
    setActiveFilter(activeFilter === column ? null : column)
  }

  const handleActionMenuClick = (userId, event) => {
    event.stopPropagation()
    setActiveActionMenu(activeActionMenu === userId ? null : userId)
  }

  const handleViewDetails = (user, event) => {
    event.stopPropagation()
    handleRowClick(user)
    setActiveActionMenu(null)
  }

  const handleBlacklistUser = (user, event) => {
    event.stopPropagation()
    console.log('Blacklisting user:', user.id)
    setActiveActionMenu(null)
  }

  const handleActivateUser = (user, event) => {
    event.stopPropagation()
    console.log('Activating user:', user.id)
    setActiveActionMenu(null)
  }

  // Calculate pagination
  const start = (page - 1) * pageSize
  const pageItems = users.slice(start, start + pageSize)
  const totalPages = Math.ceil(users.length / pageSize)

  // Get unique organizations and statuses for dropdowns
  const organizations = [...new Set(users.map(user => user.organization).filter(Boolean))]
  const statuses = [...new Set(users.map(user => user.status).filter(Boolean))]

  const statsData = [
    {
      icon: Users,
      label: 'USERS',
      value: users.length.toLocaleString(),
      className: 'users-icon'
    },
    {
      icon: Users,
      label: 'ACTIVE USERS',
      value: users.filter(u => u.status?.toLowerCase() === 'active').length.toLocaleString(),
      className: 'active-users-icon'
    },
    {
      icon: HandCoins,
      label: 'USERS WITH LOANS',
      value: users.filter(u => u.loans && u.loans > 0).length.toLocaleString(),
      className: 'loans-icon'
    },
    {
      icon: PiggyBank,
      label: 'USERS WITH SAVINGS',
      value: users.filter(u => u.savings && u.savings > 0).length.toLocaleString(),
      className: 'savings-icon'
    }
  ]

  return (
    <>
      <Metadata title="Dashboard" description="User Dashboard" />

      {/* ADD MainLayout wrapper */}
      <MainLayout>
        <div className="dashboard-container">
          <h1 className="page-title">Users</h1>

          {/* Stats Cards */}
          <div className="stats-container">
            {statsData.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className={`stat-icon ${stat.className}`}>
                  <stat.icon size={24} />
                </div>
                <p className="stat-label">{stat.label}</p>
                <h2 className="stat-value">{stat.value}</h2>
              </div>
            ))}
          </div>

          {/* Users Table Section */}
          <section className="users-table-section">
            {loading && (
              <div className="loading-state">
                <div>Loading users...</div>
              </div>
            )}

            {error && (
              <div className="error-state">
                <div>{error}</div>
              </div>
            )}

            {!loading && !error && (
              <>
                <div className="table-container">
                  <table className="users-table">
                    <thead>
                      <tr>
                        {[
                          'organization',
                          'username',
                          'email',
                          'phone',
                          'dateJoined',
                          'status'
                        ].map((column) => (
                          <th key={column}>
                            <div
                              className="table-header-with-filter"
                              onClick={() => handleFilterClick(column)}
                            >
                              <span>{column.replace(/([A-Z])/g, ' $1').toUpperCase()}</span>
                              <ChevronDown size={16} className="filter-icon" />
                            </div>
                            {activeFilter === column && (
                              <div className="filter-dropdown">
                                <div className="filter-section">
                                  <label>Organization</label>
                                  <select
                                    value={filters.organization}
                                    onChange={(e) => handleFilterChange('organization', e.target.value)}
                                  >
                                    <option value="">Select</option>
                                    {organizations.map(org => (
                                      <option key={org} value={org}>{org}</option>
                                    ))}
                                  </select>
                                </div>
                                <div className="filter-section">
                                  <label>Username</label>
                                  <input
                                    type="text"
                                    placeholder="User"
                                    value={filters.username}
                                    onChange={(e) => handleFilterChange('username', e.target.value)}
                                  />
                                </div>
                                <div className="filter-section">
                                  <label>Email</label>
                                  <input
                                    type="email"
                                    placeholder="Email"
                                    value={filters.email}
                                    onChange={(e) => handleFilterChange('email', e.target.value)}
                                  />
                                </div>
                                <div className="filter-section">
                                  <label>Date</label>
                                  <input
                                    type="date"
                                    placeholder="Date"
                                    value={filters.dateJoined}
                                    onChange={(e) => handleFilterChange('dateJoined', e.target.value)}
                                  />
                                </div>
                                <div className="filter-section">
                                  <label>Phone Number</label>
                                  <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={filters.phone}
                                    onChange={(e) => handleFilterChange('phone', e.target.value)}
                                  />
                                </div>
                                <div className="filter-section">
                                  <label>Status</label>
                                  <select
                                    value={filters.status}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                  >
                                    <option value="">Select</option>
                                    {statuses.map(status => (
                                      <option key={status} value={status}>{status}</option>
                                    ))}
                                  </select>
                                </div>
                                <div className="filter-buttons">
                                  <button
                                    className="reset-btn"
                                    onClick={handleResetFilters}
                                  >
                                    Reset
                                  </button>
                                  <button
                                    className="filter-btn"
                                    onClick={handleApplyFilters}
                                  >
                                    Filter
                                  </button>
                                </div>
                              </div>
                            )}
                          </th>
                        ))}
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageItems.map((user) => (
                        <tr
                          key={user.id}
                          className="clickable-row"
                          onClick={() => handleRowClick(user)}
                        >
                          <td>{user.organization || 'N/A'}</td>
                          <td>{user.username || 'N/A'}</td>
                          <td>{user.email || 'N/A'}</td>
                          <td>{user.phone || 'N/A'}</td>
                          <td>
                            {user.dateJoined
                              ? new Date(user.dateJoined).toLocaleDateString()
                              : 'N/A'
                            }
                          </td>
                          <td>
                            <span className={`status-badge ${getStatusClass(user.status)}`}>
                              {user.status || 'Unknown'}
                            </span>
                          </td>
                          <td>
                            <div className="action-menu-container">
                              <button
                                className="action-menu-btn"
                                onClick={(e) => handleActionMenuClick(user.id, e)}
                              >
                                <MoreVertical size={16} />
                              </button>
                              {activeActionMenu === user.id && (
                                <div className="action-dropdown">
                                  <button
                                    className="action-item"
                                    onClick={(e) => handleViewDetails(user, e)}
                                  >
                                    <Eye size={14} />
                                    <span>View Details</span>
                                  </button>
                                  <button
                                    className="action-item"
                                    onClick={(e) => handleBlacklistUser(user, e)}
                                  >
                                    <UserX size={14} />
                                    <span>Blacklist User</span>
                                  </button>
                                  <button
                                    className="action-item"
                                    onClick={(e) => handleActivateUser(user, e)}
                                  >
                                    <UserCheckIcon size={14} />
                                    <span>Activate User</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="pagination">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="pagination-btn"
                  >
                    Prev
                  </button>
                  <span className="pagination-info">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    disabled={page === totalPages || totalPages === 0}
                    onClick={() => setPage(page + 1)}
                    className="pagination-btn"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      </MainLayout>
    </>
  )
}

export default DashboardPage
