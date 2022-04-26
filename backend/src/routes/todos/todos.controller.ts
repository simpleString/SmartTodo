import { FastifyPluginAsync } from "fastify";
import { TodoObjectDto } from "../../dtos/todos.dto";
import { TodoObjectShema } from "../../shemas/todo.shema";

const todos: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.post<{ Body: TodoObjectDto }>(
    "/",
    { schema: { body: TodoObjectShema, response: { 200: TodoObjectShema } } },
    async (request, reply) => {
      // return todoService.createTodoObject(request.body, request.user.id)
    }
  );

  fastify.delete("/:id", async (request, reply) => {});

  fastify.put("/:id", async (request, reply) => {});

  fastify.get("/:id", async (request, reply) => {});
};

export default todos;
