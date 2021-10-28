import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ContactForm from './ContactForm'

test('renders without errors', () => {
  render(<ContactForm />)
})

test('renders the contact form header', () => {
  render(<ContactForm />)

  const header = screen.getByText(/Contact Form/i)
  expect(header).toBeInTheDocument()
  expect(header).toBeTruthy()
  expect(header).toHaveTextContent(/Contact Form/i)
})

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  render(<ContactForm />)

  const input = screen.getByLabelText(/First Name*/i)
  userEvent.type(input, 'ttt')

  await waitFor(() => {
    const error = screen.getByTestId('error')
    expect(error).toHaveTextContent(/Error: firstName must have at least 5 characters./i)
  })
})

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm />)

  const button = screen.getByRole('button')
  userEvent.click(button)

  await waitFor(() => {
    const errors = screen.getAllByTestId('error')
    expect(errors).toHaveLength(3)
  })
})

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render(<ContactForm />)

  const firstName = screen.getByLabelText(/First Name*/i)
  userEvent.type(firstName, 'Jacob')

  const lastName = screen.getByLabelText(/Last Name*/i)
  userEvent.type(lastName, 'Sullivan')

  const button = screen.getByRole('button')
  userEvent.click(button)

  await waitFor(() => {
    const errors = screen.getAllByTestId('error')
    expect(errors).toHaveLength(1)
  })
})

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />)

  const email = screen.getByLabelText(/Email*/i)
  userEvent.type(email, 'test')

  await waitFor(() => {
    const error = screen.getByTestId('error')
    expect(error).toHaveTextContent(/Error: email must be a valid email address./i)
  })
})

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />)

  const firstName = screen.getByLabelText(/First Name*/i)
  userEvent.type(firstName, 'Jacob')

  const email = screen.getByLabelText(/Email*/i)
  userEvent.type(email, 'j@email.com')

  const button = screen.getByRole('button')
  userEvent.click(button)

  await waitFor(() => {
    const error = screen.getByTestId('error')
    expect(error).toHaveTextContent(/Error: lastName is a required field./i)
  })
})

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {})

test('renders all fields text when all fields are submitted.', async () => {})
