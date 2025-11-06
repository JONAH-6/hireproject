import { useEffect, useState } from 'react'
import { useParams, navigate } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
import { ArrowLeft, Star } from 'lucide-react'
import './UserDetailsPage.scss'

const UserDetailsPage = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get user data from localStorage (set from previous page)
    try {
      const savedUser = localStorage.getItem('selectedUser')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setLoading(false)
    }
  }, [id])

  const handleBack = () => {
    navigate('/dashboard')
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="loading">Loading user details...</div>
      </MainLayout>
    )
  }

  if (!user) {
    return (
      <MainLayout>
        <div className="error-state">
          <p>User not found</p>
          <button onClick={handleBack} className="back-btn">
            Back to Users
          </button>
        </div>
      </MainLayout>
    )
  }

  return (
    <>
      <Metadata title="User Details" description="User Details Page" />
      <MainLayout>
        <div className="user-details-container">
          {/* Back Button */}
          <button onClick={handleBack} className="back-btn">
            <ArrowLeft size={16} />
            Back to Users
          </button>

          {/* Page Header */}
          <div className="page-header">
            <h1 className="page-title">User Details</h1>
            <div className="action-buttons">
              <button className="blacklist-btn">BLACKLIST USER</button>
              <button className="activate-btn">ACTIVATE USER</button>
            </div>
          </div>

          {/* User Summary Card */}
          <div className="user-summary-card">
            <div className="user-profile">
              <div className="avatar-section">
                <div className="user-avatar">
                  <img src="/user-avatar.jpg" alt="User avatar" />
                </div>
                <div className="user-name">
                  <h2>Grace Effiom</h2>
                  <p>LSQFf587g90</p>
                </div>
              </div>

              <div className="user-tier">
                <p>User's Tier</p>
                <div className="stars">
                  <Star fill="#E9B200" color="#E9B200" size={16} />
                  <Star color="#E9B200" size={16} />
                  <Star color="#E9B200" size={16} />
                </div>
              </div>

              <div className="user-balance">
                <h3>₦200,000.00</h3>
                <p>9912345678 / Providus Bank</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="user-tabs">
              <button className="tab active">General Details</button>
              <button className="tab">Documents</button>
              <button className="tab">Bank Details</button>
              <button className="tab">Loans</button>
              <button className="tab">Savings</button>
              <button className="tab">App and System</button>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="details-section">
            <h3 className="section-title">Personal Information</h3>

            <div className="details-grid">
              <div className="detail-item">
                <label>FULL NAME</label>
                <p>Grace Effiom</p>
              </div>
              <div className="detail-item">
                <label>PHONE NUMBER</label>
                <p>07060780922</p>
              </div>
              <div className="detail-item">
                <label>EMAIL ADDRESS</label>
                <p>grace@gmail.com</p>
              </div>
              <div className="detail-item">
                <label>BVN</label>
                <p>07060780922</p>
              </div>
              <div className="detail-item">
                <label>GENDER</label>
                <p>Female</p>
              </div>
              <div className="detail-item">
                <label>MARITAL STATUS</label>
                <p>Single</p>
              </div>
              <div className="detail-item">
                <label>CHILDREN</label>
                <p>None</p>
              </div>
              <div className="detail-item">
                <label>TYPE OF RESIDENCE</label>
                <p>Parent's Apartment</p>
              </div>
            </div>
          </div>

          {/* Education and Employment Section */}
          <div className="details-section">
            <h3 className="section-title">Education and Employment</h3>

            <div className="details-grid">
              <div className="detail-item">
                <label>LEVEL OF EDUCATION</label>
                <p>B.Sc</p>
              </div>
              <div className="detail-item">
                <label>EMPLOYMENT STATUS</label>
                <p>Employed</p>
              </div>
              <div className="detail-item">
                <label>SECTOR OF EMPLOYMENT</label>
                <p>FinTech</p>
              </div>
              <div className="detail-item">
                <label>DURATION OF EMPLOYMENT</label>
                <p>2 years</p>
              </div>
              <div className="detail-item">
                <label>OFFICE EMAIL</label>
                <p>grace@lendsqr.com</p>
              </div>
              <div className="detail-item">
                <label>MONTHLY INCOME</label>
                <p>₦200,000.00 - ₦400,000.00</p>
              </div>
              <div className="detail-item">
                <label>LOAN REPAYMENT</label>
                <p>₦40,000.00</p>
              </div>
            </div>
          </div>

          {/* Socials Section */}
          <div className="details-section">
            <h3 className="section-title">Socials</h3>

            <div className="details-grid">
              <div className="detail-item">
                <label>TWITTER</label>
                <p>@grace_effiom</p>
              </div>
              <div className="detail-item">
                <label>FACEBOOK</label>
                <p>Grace Effiom</p>
              </div>
              <div className="detail-item">
                <label>INSTAGRAM</label>
                <p>@grace_effiom</p>
              </div>
            </div>
          </div>

          {/* Guarantor Section */}
          <div className="details-section">
            <h3 className="section-title">Guarantor</h3>

            <div className="details-grid">
              <div className="detail-item">
                <label>FULL NAME</label>
                <p>Debby Ogana</p>
              </div>
              <div className="detail-item">
                <label>PHONE NUMBER</label>
                <p>07060780922</p>
              </div>
              <div className="detail-item">
                <label>EMAIL ADDRESS</label>
                <p>debby@gmail.com</p>
              </div>
              <div className="detail-item">
                <label>RELATIONSHIP</label>
                <p>Sister</p>
              </div>
            </div>
          </div>

          {/* Second Guarantor */}
          <div className="details-section no-border">
            <div className="details-grid">
              <div className="detail-item">
                <label>FULL NAME</label>
                <p>Debby Ogana</p>
              </div>
              <div className="detail-item">
                <label>PHONE NUMBER</label>
                <p>07060780922</p>
              </div>
              <div className="detail-item">
                <label>EMAIL ADDRESS</label>
                <p>debby@gmail.com</p>
              </div>
              <div className="detail-item">
                <label>RELATIONSHIP</label>
                <p>Sister</p>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default UserDetailsPage
