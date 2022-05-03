import { FastifyPluginAsync } from "fastify";
import { ParamsIdDto } from "../../dtos/common.dto";
import {
  ItemDto,
  ItemResponseDto,
  ParamsIdWithItemIdDto,
  ParamsIdWithTagIdDto,
  TagDto,
  TagResponseDto,
  TodoDto,
  TodoResponseDto,
} from "../../dtos/todos.dto";
import todoService from "../../services/Todo.service";
import { ParamsIdShema } from "../../shemas/common.shema";
import {
  ItemResponseShema,
  ItemResponseShemaArray,
  ItemShema,
  ParamsIdWithItemIdShema,
  ParamsIdWithTagIdShema,
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

  fastify.get<{ Reply: TodoResponseDto[] }>(
    "/",
    { schema: { response: { 200: TodoResponseShemaArray }, tags: ["todos"] } },
    async (request, reply) => {
      return reply.send(await todoService.getAllTodos(request.user.id));
    }
  );

  fastify.post<{ Body: TodoDto; Reply: TodoResponseDto }>(
    "/",
    {
      schema: {
        body: TodoShema,
        response: { 201: TodoResponseShema },
        tags: ["todos"],
      },
    },
    async (request, reply) => {
      return reply
        .status(201)
        .send(await todoService.createTodo(request.body, request.user.id));
    }
  );

  fastify.delete<{ Params: ParamsIdDto; Reply: TodoResponseDto }>(
    "/:id",
    {
      schema: {
        params: ParamsIdShema,
        response: { 200: TodoResponseShema },
        tags: ["todos"],
      },
    },
    async (request, reply) => {
      return reply.send(
        await todoService.deleteTodo(request.params.id, request.user.id)
      );
    }
  );

  fastify.put<{ Body: TodoDto; Params: ParamsIdDto; Reply: TodoResponseDto }>(
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

  fastify.get<{ Params: ParamsIdDto; Reply: TodoResponseDto }>(
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

  fastify.get<{ Params: ParamsIdDto; Reply: TagResponseDto[] }>(
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

  fastify.post<{ Params: ParamsIdDto; Body: TagDto; Reply: TagResponseDto }>(
    "/:id/tags",
    {
      schema: {
        params: ParamsIdShema,
        body: TagShema,
        response: { 201: TagResponseShema },
        tags: ["todos, tags"],
      },
    },
    async (request, reply) => {
      reply.statusCode = 201;
      try {
        return await todoService.createTag(
          {
            name: request.body.name,
            todoId: request.params.id,
          },
          request.user.id
        );
      } catch (error) {
        return reply.badRequest("Tag with this name already exists.");
      }
    }
  );

  fastify.delete<{ Params: ParamsIdWithTagIdDto; Reply: TagResponseDto }>(
    "/:id/tags/:tagId",
    {
      schema: {
        params: ParamsIdWithTagIdShema,
        response: { 200: TagResponseShema },
        tags: ["todos, tags"],
      },
    },
    async (request, reply) => {
      try {
        return await todoService.deleteTagFromTodo(
          request.params.tagId,
          request.params.id,
          request.user.id
        );
      } catch (error) {
        return reply.notFound("Tag Not found.");
      }
    }
  );

  fastify.get<{ Params: ParamsIdDto; Reply: ItemResponseDto[] }>(
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

  fastify.post<{ Params: ParamsIdDto; Body: ItemDto; Reply: ItemResponseDto }>(
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
      reply.statusCode = 201;
      return todoService.createItem(
        {
          content: request.body.content,
          done: request.body.done,
        },
        request.params.id
      );
    }
  );

  fastify.delete<{ Params: ParamsIdWithItemIdDto; Reply: ItemResponseDto }>(
    "/:id/items/:itemId",
    {
      schema: {
        params: ParamsIdWithItemIdShema,
        response: { 200: ItemResponseShema },
        tags: ["todos, items"],
      },
    },
    async (request, reply) => {
      try {
        return await todoService.deleteItemFromTodo(request.params.itemId);
      } catch (error) {
        reply.notFound("Item Not found.");
      }
    }
  );
};

export default todos;
