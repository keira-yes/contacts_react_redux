import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import { server } from '../serverTests';
import { Contacts } from '../pages/Contacts';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Contacts get data', () => {

  test('loading', async () => {
    render(<Contacts />);
    const loader = screen.getByTestId('contacts-loader');
    expect(loader).toBeInTheDocument();
    await waitForElementToBeRemoved(loader);
  })

  test('success', async () => {
    render(<Contacts />);
    const loader = screen.getByTestId('contacts-loader');
    await waitForElementToBeRemoved(loader);
    expect(screen.getByTestId('contacts-table')).toBeInTheDocument();
  })

  test('fail', async () => {
    server.use(
      rest.get('https://randomuser.me/api/', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            error: "Internal server error"
          }),
        )
      })
    )
    render(<Contacts />);
    const loader = screen.getByTestId('contacts-loader');
    await waitForElementToBeRemoved(loader);
    expect(screen.getByTestId('contacts-error')).toBeInTheDocument();
  })
})

describe('Contacts view mode', () => {

  test('should equal table', async () => {
    render(<Contacts />);
    await waitForElementToBeRemoved(screen.getByTestId('contacts-loader'));
    expect(screen.getByTestId('contacts-table')).toBeInTheDocument();
    expect(screen.getByTestId('table-view-mode-button')).toHaveClass('Mui-selected');
    expect(screen.queryByTestId('contacts-grid')).not.toBeInTheDocument();
    expect(screen.queryByTestId('grid-view-mode-button')).not.toHaveClass('Mui-selected');
  })

  test('switch from grid to table', async () => {
    render(<Contacts />);
    await waitForElementToBeRemoved(screen.getByTestId('contacts-loader'));
    const toggleGridButton = screen.queryByTestId('grid-view-mode-button');
    const toggleTableButton = screen.queryByTestId('table-view-mode-button');
    userEvent.click(toggleGridButton);
    userEvent.click(toggleTableButton);
    expect(screen.getByTestId('contacts-table')).toBeInTheDocument();
    expect(screen.getByTestId('table-view-mode-button')).toHaveClass('Mui-selected');
    expect(screen.queryByTestId('contacts-grid')).not.toBeInTheDocument();
    expect(screen.queryByTestId('grid-view-mode-button')).not.toHaveClass('Mui-selected');
    expect(window.localStorage.getItem('viewMode')).toEqual('table');
  })

  test('should equal grid', async () => {
    render(<Contacts />);
    await waitForElementToBeRemoved(screen.getByTestId('contacts-loader'));
    const toggleGridButton = screen.queryByTestId('grid-view-mode-button');
    userEvent.click(toggleGridButton);
    expect(screen.getByTestId('contacts-grid')).toBeInTheDocument();
    expect(screen.getByTestId('grid-view-mode-button')).toHaveClass('Mui-selected');
    expect(screen.queryByTestId('contacts-table')).not.toBeInTheDocument();
    expect(screen.queryByTestId('table-view-mode-button')).not.toHaveClass('Mui-selected');
    expect(window.localStorage.getItem('viewMode')).toEqual('grid');
  })

  test('should equal grid after page reloading', async () => {
    window.localStorage.setItem('viewMode', 'grid');
    render(<Contacts />);
    await waitForElementToBeRemoved(screen.getByTestId('contacts-loader'));
    expect(screen.getByTestId('contacts-grid')).toBeInTheDocument();
    expect(screen.getByTestId('grid-view-mode-button')).toHaveClass('Mui-selected');
    expect(screen.queryByTestId('contacts-table')).not.toBeInTheDocument();
    expect(screen.queryByTestId('table-view-mode-button')).not.toHaveClass('Mui-selected');
    window.localStorage.clear();
  })
})