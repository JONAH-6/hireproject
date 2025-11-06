// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage
import { Router, Route, Set } from '@redwoodjs/router'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const Routes = () => {
  return (
    <Router>
        <Route path="/users/{id}" page={UserDetailsPage} name="userDetails" />
        <Route path="/users" page={UsersPage} name="users" />
        <Route path="/dashboard" page={DashboardPage} name="dashboard" />
      <Route path="/" page={LoginPage} name="login" />
      <Route notfound page={LoginPage} />
    </Router>
  )
}

export default Routes
