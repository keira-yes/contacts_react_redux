import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Contacts } from '../pages/Contacts';

const users = [
  {
    "gender": "female",
    "name": {
      "title": "Miss",
      "first": "Chloe",
      "last": "Moore"
    },
    "location": {
      "street": {
        "number": 7018,
        "name": "Marshland Road"
      },
      "city": "Dunedin",
      "state": "Manawatu-Wanganui",
      "country": "New Zealand",
      "postcode": 74710,
      "coordinates": {
        "latitude": "58.9624",
        "longitude": "85.7561"
      },
      "timezone": {
        "offset": "+5:00",
        "description": "Ekaterinburg, Islamabad, Karachi, Tashkent"
      }
    },
    "email": "chloe.moore@example.com",
    "login": {
      "uuid": "385ab825-bd68-4dfb-b90a-ee8b8819f372",
      "username": "purpletiger920",
      "password": "1125",
      "salt": "2yIZ8QUM",
      "md5": "850ab2edae6595db3ffea0ab338c0a1b",
      "sha1": "05c87ba05b3ff88a48d6fb6eac13ff708681b48c",
      "sha256": "c5b2cb1d2a3e851539dc88be5745e4b5b7b9e7b0aa8284187f08208b6ece92b4"
    },
    "dob": {
      "date": "1972-05-17T13:57:47.272Z",
      "age": 49
    },
    "registered": {
      "date": "2015-02-03T02:50:00.577Z",
      "age": 6
    },
    "phone": "(515)-914-1426",
    "cell": "(778)-232-8122",
    "id": {
      "name": "",
      "value": null
    },
    "picture": {
      "large": "https://randomuser.me/api/portraits/women/52.jpg",
      "medium": "https://randomuser.me/api/portraits/med/women/52.jpg",
      "thumbnail": "https://randomuser.me/api/portraits/thumb/women/52.jpg"
    },
    "nat": "NZ"
  }
]

const handlers = [
  rest.get('https://randomuser.me/api/?results=20', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        results: users
      }),
    )
  })
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test('Contacts get data success', async () => {
  render(<Contacts />);

  const loader = screen.getByTestId('contacts-loader');

  expect(loader).toBeInTheDocument();

  await waitForElementToBeRemoved(loader);

  expect(loader).not.toBeInTheDocument();

  const table = screen.getByTestId('contacts-table');

  expect(table).toBeInTheDocument();
})