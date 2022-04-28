import { FastifyPluginAsync } from "fastify";
import { ParamsIdDto } from "../../dtos/common.dto";
import { ItemDto, TagDto, TodoDto } from "../../dtos/todos.dto";
import todoService from "../../services/Todo.service";
import { ParamsIdShema } from "../../shemas/common.shema";
import {
  ItemResponseShema,
  ItemResponseShemaArray,
  ItemShema,
  TagResponseShema,
  TagResponseShemaArray,
  TagShema,
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
    {
      schema: {
        body: TodoShema,
        response: { 201: TodoShema },
        tags: ["todos"],
      },
    },
    async (request, reply) => {
      return todoService.createTodo(request.body, request.user.id);
    }
  );

  fastify.delete<{ Params: ParamsIdDto }>(
    "/:id",
    {
      schema: {
        params: ParamsIdShema,
        response: { 200: TodoResponseShema },
        tags: ["todos"],
      },
    },
    async (request, reply) => {
      return todoService.deleteTodo(request.params.id, request.user.id);
    }
  );

  fastify.put<{ Body: TodoDto; Params: ParamsIdDto }>(
    "/:id",
    {
      schema: {
        body: TodoShema,
        params: ParamsIdShema,
        response: { 200: TodoResponseShema },
        tags: ["todos"],
      },
    },
    async (request, reply) => {
      return todoService.updateTodo(
        request.body,
        request.user.id,
        request.params.id
      );
    }
  );

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

  fastify.get<{ Params: ParamsIdDto }>(
    "/:id/tags",
    {
      schema: {
        params: ParamsIdShema,
        response: { 200: TagResponseShemaArray },
        tags: ["todos, tags"],
      },
    },
    async (request, reply) => {
      return todoService.getAllTagsForTodo(request.user.id, request.params.id);
    }
  );

  fastify.post<{ Params: ParamsIdDto; Body: TagDto }>(
    "/:id/tags",
    {
      schema: {
        params: ParamsIdShema,
        body: TagShema,
        response: { 200: TagResponseShema },
        tags: ["todos, tags"],
      },
    },
    async (request, reply) => {
      return todoService.createTag(
        {
          name: request.body.name,
          todoId: request.params.id,
        },
        request.user.id
      );
    }
  );

  fastify.get<{ Params: ParamsIdDto }>(
    "/:id/items",
    {
      schema: {
        params: ParamsIdShema,
        response: { 200: ItemResponseShemaArray },
        tags: ["todos, items"],
      },
    },
    async (requst, reply) => {
      return todoService.getAllItems(requst.params.id);
    }
  );

  fastify.post<{ Params: ParamsIdDto; Body: ItemDto }>(
    "/:id/items",
    {
      schema: {
        params: ParamsIdShema,
        body: ItemShema,
        response: { 201: ItemResponseShema },
        tags: ["todos, items"],
      },
    },
    async (request, reply) => {
      return todoService.createItem(
        {
          content: request.body.content,
          done: request.body.done,
        },
        request.params.id
      );
    }
  );
};

export default todos;
