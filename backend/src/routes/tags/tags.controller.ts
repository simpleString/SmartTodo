import { FastifyPluginAsync } from "fastify";
import { ParamsIdDto } from "../../dtos/common.dto";
import { TagDto, TagResponseDto } from "../../dtos/tags.dto";
import todoService from "../../services/Todo.service";
import { ParamsIdShema } from "../../shemas/common.shema";
import {
  TagResponseShema,
  TagResponseShemaArray,
  TagShema,
} from "../../shemas/tags.shema";

const tags: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.get<{ Reply: TagResponseDto[] }>(
    "/",
    { schema: { response: { 200: TagResponseShemaArray }, tags: ["tags"] } },
    async (request, reply) => {
      return reply.send(await todoService.getAllTags(request.user.id));
    }
  );

  fastify.post<{ Body: TagDto; Reply: TagResponseDto }>(
    "/",
    {
      schema: {
        body: TagShema,
        response: { 201: TagResponseShema },
        tags: ["tags"],
      },
    },
    async (request, reply) => {
      try {
        reply.statusCode = 201;
        return await todoService.createTag(
          {
            ...request.body,
          },
          request.user.id
        );
      } catch (error) {
        reply.badRequest("Tag with this name already exists.");
      }
    }
  );

  fastify.delete<{ Params: ParamsIdDto; Reply: TagResponseDto }>(
    "/:id",
    {
      schema: {
        response: { 200: TagResponseShema },
        params: ParamsIdShema,
        tags: ["tags"],
      },
    },
    async (request, reply) => {
      try {
        return await todoService.deleteTag(request.params.id);
      } catch (error) {
        return reply.notFound("Tag Not found.");
      }
    }
  );

  // fastify.put<{ Params: ParamsIdDto; Body: TagDto }>(
  //   "/:id",
  //   {
  //     schema: {
  //       response: { 200: TagResponseShema },
  //       body: TagShema,
  //       params: ParamsIdShema,
  //       tags: ["tags"],
  //     },
  //   },
  //   async (request, reply) => {
  //     return todoService.updateTag(request.body, request.params.id);
  //   }
  // );

  // fastify.get<{ Params: ParamsIdDto }>(
  //   "/:id",
  //   {
  //     schema: {
  //       response: { 200: TagResponseShema },
  //       params: ParamsIdShema,
  //       tags: ["tags"],
  //     },
  //   },
  //   async (request, reply) => {
  //     return todoService.getTagById(request.params.id);
  //   }
  // );
};

export default tags;
