import { rest } from "msw";
import { setupServer } from "msw/node";
import { users } from "./__textures__/users";

const handlers = [
  rest.get('https://randomuser.me/api/', (req, res, ctx) => {

    return res(
      ctx.status(200),
      ctx.json({
        results: users
      }),
    )
  })
];

export const server = setupServer(...handlers);