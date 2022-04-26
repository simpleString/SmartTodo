import { FastifyPluginAsync } from "fastify";
import { ParamsIdDto } from "../../dtos/common.dto";
import { TagDto } from "../../dtos/todos.dto";
import todoService from "../../services/Todo.service";
import { ParamsIdShema } from "../../shemas/common.shema";
import {
  TagResponseShema,
  TagResponseShemaArray,
  TagShema,
} from "../../shemas/todo.shema";

const tags: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.get(
    "/",
    { schema: { response: { 200: TagResponseShemaArray }, tags: ["tags"] } }, //FIXME
    async (request, reply) => {
      return todoService.getAllTags(request.user.id);
    }
  );

  fastify.post<{ Body: TagDto }>(
    "/",
    {
      schema: {
        body: TagShema,
        response: { 200: TagResponseShema },
        tags: ["tags"],
      },
    },
    async (request, reply) => {
      return todoService.createTag({
        userId: request.user.id,
        ...request.body,
      });
    }
  );

  fastify.delete<{ Params: ParamsIdDto }>(
    "/:id",
    {
      schema: {
        response: { 200: TagResponseShema },
        params: ParamsIdShema,
        tags: ["tags"],
      },
    },
    async (request, reply) => {
      return todoService.deleteTag(request.params.id);
    }
  );

  fastify.put<{ Params: ParamsIdDto; Body: TagDto }>(
    "/:id",
    {
      schema: {
        response: { 200: TagResponseShema },
        body: TagShema,
        params: ParamsIdShema,
        tags: ["tags"],
      },
    },
    async (request, reply) => {
      return todoService.updateTag({
        id: request.params.id,
        name: request.body.name,
      });
    }
  );

  fastify.get<{ Params: ParamsIdDto }>(
    "/:id",
    {
      schema: {
        response: { 200: TagResponseShema },
        params: ParamsIdShema,
        tags: ["tags"],
      },
    },
    async (request, reply) => {
      return todoService.getTagById(request.params.id);
    }
  );
};

export default tags;
