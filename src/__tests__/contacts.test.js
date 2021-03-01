import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '../serverTests';
import { Contacts } from '../pages/Contacts';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Contacts get data', () => {

  test('loading', async () => {
    render(<Contacts />);
    await expect(screen.getByTestId('contacts-loader')).toBeInTheDocument();
  })

  test('success', async () => {
    render(<Contacts />);
    await waitForElementToBeRemoved(screen.getByTestId('contacts-loader'));
    expect(screen.getByTestId('contacts-table')).toBeInTheDocument();
  })

  test('fail', async () => {
    server.use(
      rest.get('https://randomuser.me/api/?results=20', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            error: "Internal server error"
          }),
        )
      })
    )
    render(<Contacts />);
    await waitForElementToBeRemoved(screen.getByTestId('contacts-loader'));
    expect(screen.getByTestId('contacts-error')).toBeInTheDocument();
  })
})