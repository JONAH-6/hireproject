import { useState, useEffect } from 'react'
import { navigate } from '@redwoodjs/router'
import './UsersPage.scss'

const API_URL = 'https://raw.githubusercontent.com/JONAH-6/api/refs/heads/main/users.json'

const UsersPage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [page, setPage] = useState(1)
  const pageSize = 20

  useEffect(() => {
    setLoading(true)
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
      .catch(err => {
        setError('Failed to load users')
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading users...</div>
  if (error) return <div>{error}</div>

  const start = (page - 1) * pageSize
  const pageItems = users.slice(start, start + pageSize)
  const totalPages = Math.ceil(users.length / pageSize)

  const handleRowClick = (user) => {
    localStorage.setItem('selectedUser', JSON.stringify(user))
    navigate(`/users/${user.id}`)
  }

  return (
    <div className="users-page">
      <h2>Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Organization</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date Joined</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pageItems.map(u => (
            <tr key={u.id} onClick={() => handleRowClick(u)} style={{ cursor: 'pointer' }}>
              <td>{u.organization}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{new Date(u.dateJoined).toLocaleDateString()}</td>
              <td>{u.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span> Page {page} / {totalPages} </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  )
}

export default UsersPage
