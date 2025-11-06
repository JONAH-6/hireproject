import { ReactNode, useState, useEffect } from 'react'
import {
  ChevronDown,
  Home,
  Users,
  UserCheck,
  HandCoins,
  Scale,
  PiggyBank,
  FileText,
  UserCog,
  BarChart3,
  Search,
  Bell,
  Briefcase,
  Building,
  Coins,
  FileSearch,
  TrendingUp,
  CreditCard,
  Wallet,
  Menu,
  X
} from 'lucide-react'
import './MainLayout.scss'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Close sidebar when clicking on overlay or resizing to desktop
  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(false)
    }
  }, [isMobile])

  const menuSections = [
    {
      title: '',
      items: [
        { icon: Home, label: 'Dashboard', active: false }
      ]
    },
    {
      title: 'CUSTOMERS',
      items: [
        { icon: Users, label: 'Users', active: true },
        { icon: UserCheck, label: 'Guarantors', active: false },
        { icon: HandCoins, label: 'Loans', active: false },
        { icon: Scale, label: 'Decision Models', active: false },
        { icon: PiggyBank, label: 'Savings', active: false },
        { icon: FileText, label: 'Loan Requests', active: false },
        { icon: UserCog, label: 'Whitelist', active: false },
        { icon: BarChart3, label: 'Karma', active: false }
      ]
    },
    {
      title: 'BUSINESSES',
      items: [
        { icon: Briefcase, label: 'Organization', active: false },
        { icon: FileText, label: 'Loan Products', active: false },
        { icon: Building, label: 'Savings Products', active: false },
        { icon: Coins, label: 'Fees and Charges', active: false },
        { icon: FileSearch, label: 'Transactions', active: false },
        { icon: TrendingUp, label: 'Services', active: false },
        { icon: UserCog, label: 'Service Account', active: false },
        { icon: BarChart3, label: 'Settlements', active: false },
        { icon: CreditCard, label: 'Reports', active: false }
      ]
    },
    {
      title: 'SETTINGS',
      items: [
        { icon: UserCog, label: 'Preferences', active: false },
        { icon: Wallet, label: 'Fees and Pricing', active: false },
        { icon: BarChart3, label: 'Audit Logs', active: false }
      ]
    }
  ]

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  const handleNavClick = () => {
    if (isMobile) {
      closeSidebar()
    }
  }

  return (
    <div className="main-layout">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="switch-org">
            <button className="org-switcher">
              <Briefcase size={16} />
              <span>Switch Organization</span>
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Close button for mobile */}
          {isMobile && (
            <button className="sidebar-close" onClick={closeSidebar}>
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          {menuSections.map((section, index) => (
            <div key={index} className="nav-section">
              {section.title && <h3 className="section-title">{section.title}</h3>}
              <div className="nav-items">
                {section.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    className={`nav-item ${item.active ? 'active' : ''}`}
                    onClick={handleNavClick}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleNavClick}>
            <UserCog size={20} />
            <span>Logout</span>
          </button>
          <div className="app-version">v1.2.0</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar - Full Width */}
        <header className="topbar">
          <div className="topbar-left">
            {/* Hamburger Menu Button */}
            <button
              className="hamburger-btn"
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>

            <div className="logo">
              <img src="/logo-bg.png" alt="Lendsqr Logo" />
            </div>
          </div>

          <div className="topbar-center">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search........."
                className="search-input"
              />
              <button className="search-btn">
                <Search size={16} />
              </button>
            </div>
          </div>

          <div className="topbar-right">
            <a href="/docs" className="docs-link">Docs</a>

            <button className="notifications-btn">
              <Bell size={20} />
              <span className="notification-badge"></span>
            </button>

            <div className="user-profile">
              <img
                src="/user-avatar.jpg"
                alt="User avatar"
                className="user-avatar"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMyMTNGN0QiLz4KPHBhdGggZD0iTTIwIDIyQzIzLjMxMzcgMjIgMjYgMTkuMzEzNyAyNiAxNkMyNiAxMi42ODYzIDIzLjMxMzcgMTAgMjAgMTBDMTYuNjg2MyAxMCAxNCAxMi42ODYzIDE0IDE2QzE0IDE5LjMxMzcgMTYuNjg2MyAyMiAyMCAyMloiIGZpbGw9IiMzOUNEQ0MiLz4KPHBhdGggZD0iTTI2IDI2QzI2IDI5LjMzNzcgMjMuMzEzNyAzMiAyMCAzMkMxNi42ODYzIDMyIDE0IDI5LjMzNzcgMTQgMjZWMjRDMjYgMjQgMjYgMjQgMjYgMjZaIiBmaWxsPSIjMzlDREMzIi8+Cjwvc3ZnPgo='
                }}
              />
              <span className="username">Adedeji</span>
              <ChevronDown size={16} className="dropdown-icon" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <section className="content-area">
          {children}
        </section>
      </main>
    </div>
  )
}

export default MainLayout
