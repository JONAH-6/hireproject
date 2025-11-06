import { render } from '@redwoodjs/testing/web'

import UserDetailsPage from './UserDetailsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UserDetailsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserDetailsPage />)
    }).not.toThrow()
  })
})
