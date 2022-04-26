import { FastifyPluginAsync } from "fastify";
import { ParamsIdDto } from "../../dtos/common.dto";
import { TodoObjectDto, TodoObjectResponseDto } from "../../dtos/todos.dto";
import todoService from "../../services/Todo.service";
import { ParamsIdShema } from "../../shemas/common.shema";
import {
  TagResponseShema,
  TodoObjectResponseShema,
  TodoObjectShema,
} from "../../shemas/todo.shema";

const objects: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.get(
    "/",
    {
      schema: {
        // response: { 200: TodoObjectDtoArray },
        tags: ["objects"],
      },
    },
    async (request, reply) => {
      return todoService.getAllTodoObjects(request.user.id);
    }
  );

  fastify.post<{ Body: TodoObjectDto }>(
    "/",
    {
      schema: {
        body: TodoObjectShema,
        // response: { 200: TodoObjectResponseDto }, //TODO:: Adjust for response. Not return all data right now!!!
        tags: ["objects"],
      },
    },
    async (request, reply) => {
      return todoService.createTodoObject({
        userId: request.user.id,
        ...request.body,
      });
    }
  );

  fastify.delete<{ Params: ParamsIdDto }>(
    "/:id",
    {
      schema: {
        response: { 200: TodoObjectResponseShema },
        params: ParamsIdShema,
        tags: ["objects"],
      },
    },
    async (request, reply) => {
      return todoService.deleteTag(request.params.id);
    }
  );

  fastify.put<{ Params: ParamsIdDto; Body: TodoObjectResponseDto }>(
    "/:id",
    {
      schema: {
        response: { 200: TodoObjectResponseShema },
        body: TodoObjectShema,
        params: ParamsIdShema,
        tags: ["objects"],
      },
    },
    async (request, reply) => {
      return todoService.updateTodoObject({
        userId: request.user.id,
        ...request.body,
      });
    }
  );

  fastify.get<{ Params: ParamsIdDto }>(
    "/:id",
    {
      schema: {
        response: { 200: TagResponseShema },
        params: ParamsIdShema,
        tags: ["objects"],
      },
    },
    async (request, reply) => {
      return todoService.getTagById(request.params.id);
    }
  );
};

export default objects;
