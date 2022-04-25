import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify"
import { Static, Type } from "@sinclair/typebox"
import usersService from "../../services/Users.service"


const UserDto = Type.Object({
  username: Type.String(),
  password: Type.String({minLength: 6})
})

const UserResponseDto = Type.Object({
  id: Type.String(),
  username: Type.String(),
  password: Type.String()
})


declare module 'fastify' {
  interface FastifyInstance {
    authenticate : any
  }
}

declare module 'fastify-jwt' {
  interface FastifyJWT {
    payload : {id: string}, 
    user: {
      id: string
    }
  }
}


type UserShemeDto = Static<typeof UserDto>


const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {


  fastify.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })

  fastify.post<{Body: UserShemeDto}>('/login',{schema: {
    body: UserDto
  }}, async (request, reply) => {
    const userData = await usersService.checkUserExists(request.body);
    if (userData !== null) {
      return {token: fastify.jwt.sign({id: userData.id}, {expiresIn: '24h'})}
    }
    reply.notFound("User not found.")
  })

  fastify.post<{Body: UserShemeDto}>('/signup',{schema: {
    body: UserDto
  }}, async (request, reply) => {
    return await usersService.createUser(request.body);
  })

  fastify.get('/user',{schema: {tags: ["WithToken"], response: {200 : UserResponseDto}},onRequest: [fastify.authenticate]},async (request, reply) => {
    return await usersService.getUserInfoById(request.user.id);
  })


}

export default auth;
