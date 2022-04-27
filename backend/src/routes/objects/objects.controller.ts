import { FastifyPluginAsync } from "fastify";
import { ParamsIdDto } from "../../dtos/common.dto";
import { TodoDto, TodoResponseDto } from "../../dtos/todos.dto";
import todoService from "../../services/Todo.service";
import { ParamsIdShema } from "../../shemas/common.shema";
import {
  TagResponseShema,
  TodoResponseShema,
  TodoShema,
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
      // return todoService.getAllItems(request.user.id);
    }
  );

  fastify.post<{ Body: TodoDto }>(
    "/",
    {
      schema: {
        body: TodoShema,
        // response: { 200: TodoObjectResponseDto }, //TODO:: Adjust for response. Not return all data right now!!!
        tags: ["objects"],
      },
    },
    async (request, reply) => {
      // return todoService.createTodoObject({
      //   userId: request.user.id,
      //   ...request.body,
      // });
    }
  );

  fastify.delete<{ Params: ParamsIdDto }>(
    "/:id",
    {
      schema: {
        response: { 200: TodoResponseShema },
        params: ParamsIdShema,
        tags: ["objects"],
      },
    },
    async (request, reply) => {
      return todoService.deleteTag(request.params.id);
    }
  );

  fastify.put<{ Params: ParamsIdDto; Body: TodoResponseDto }>(
    "/:id",
    {
      schema: {
        response: { 200: TodoResponseShema },
        body: TodoShema,
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
