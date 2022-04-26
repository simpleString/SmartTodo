import { Type } from "@sinclair/typebox";

export const TagShema = Type.Object({
  name: Type.String(),
  objectId: Type.Optional(Type.String({ format: "uuid" })),
});

export const TagResponseShema = Type.Object({
  id: Type.String(),
  name: Type.String(),
});

export const TagResponseShemaArray = Type.Array(TagResponseShema);

export const TodoShema = Type.Object({
  content: Type.String(),
  done: Type.Boolean({ default: false }),
});

export const TodoObjectShema = Type.Object({
  title: Type.String(),
  todos: Type.Optional(Type.Array(TodoShema)),
  tags: Type.Optional(Type.Array(TagShema)),
});

export const TodoObjectResponseShema = Type.Object({
  id: Type.String({ format: "uuid" }),
  title: Type.String(),
  todos: Type.Optional(Type.Array(TodoShema)),
  tags: Type.Optional(Type.Array(TagShema)),
  achived: Type.Optional(Type.String({ format: "date-time" })),
});

export const TodoObjectShemaArray = Type.Array(TodoObjectShema);
