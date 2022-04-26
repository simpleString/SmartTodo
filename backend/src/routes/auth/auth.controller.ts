import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { UserDto } from "../../dtos/auth.dto";
import usersService from "../../services/Users.service";
import { UserResponseShema, UserShema } from "../../shemas/auth.shema";

// TODO: It's work on all project. Scope it's working!!!
declare module "fastify" {
  interface FastifyInstance {
    authenticate: any;
  }
}

declare module "fastify-jwt" {
  interface FastifyJWT {
    payload: { id: string };
    user: {
      id: string;
    };
  }
}
//////////

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );

  fastify.post<{ Body: UserDto }>(
    "/login",
    {
      schema: {
        body: UserShema,
      },
    },
    async (request, reply) => {
      const userData = await usersService.checkUserExists(request.body);
      if (userData !== null) {
        return {
          token: fastify.jwt.sign({ id: userData.id }, { expiresIn: "24h" }),
        };
      }
      reply.notFound("User not found.");
    }
  );

  fastify.post<{ Body: UserDto }>(
    "/signup",
    {
      schema: {
        body: UserShema,
      },
    },
    async (request, reply) => {
      return await usersService.createUser(request.body);
    }
  );

  fastify.get(
    "/user",
    {
      schema: { tags: ["WithToken"], response: { 200: UserResponseShema } },
      onRequest: [fastify.authenticate],
    },
    async (request, reply) => {
      return await usersService.getUserInfoById(request.user.id);
    }
  );
};

export default auth;
