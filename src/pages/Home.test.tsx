import { render, screen } from '@testing-library/react'
import Home from './Home'

it('Checks for Hello World', () => {
  render(<Home />)

  expect(screen.findByText('Hello World')).toBeTruthy()
})
