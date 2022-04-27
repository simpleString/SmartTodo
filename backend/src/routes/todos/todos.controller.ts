import { FastifyPluginAsync } from "fastify";
import { ParamsIdDto } from "../../dtos/common.dto";
import { TodoDto } from "../../dtos/todos.dto";
import todoService from "../../services/Todo.service";
import { ParamsIdShema } from "../../shemas/common.shema";
import {
  TodoResponseShema,
  TodoResponseShemaArray,
  TodoShema,
} from "../../shemas/todo.shema";

const todos: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.get(
    "/",
    { schema: { response: { 200: TodoResponseShemaArray }, tags: ["todos"] } },
    async (request, reply) => {
      return todoService.getAllTodos(request.user.id);
    }
  );

  fastify.post<{ Body: TodoDto }>(
    "/",
    { schema: { body: TodoShema, response: { 200: TodoShema } } },
    async (request, reply) => {
      return todoService.createTodoObject(request.body, request.user.id);
    }
  );

  fastify.delete<{ Params: ParamsIdDto }>(
    "/:id",
    { schema: { params: ParamsIdShema, response: { 200: TodoResponseShema } } },
    async (request, reply) => {
      return todoService.deleteTodo(request.params.id, request.user.id);
    }
  );

  fastify.put("/:id", async (request, reply) => {});

  fastify.get<{ Params: ParamsIdDto }>(
    "/:id",
    {
      schema: {
        params: ParamsIdShema,
        response: { 200: TodoResponseShema },
        tags: ["todos"],
      },
    },
    async (request, reply) => {
      const result = await todoService.getTodoById(
        request.user.id,
        request.params.id
      );
      if (!result) return reply.notFound("Todo is not found.");
      return result;
    }
  );

  fastify.get("/:id/items", async (request, reply) => {});

  fastify.get("/:id/tags", async (requst, reply) => {});
};

export default todos;
