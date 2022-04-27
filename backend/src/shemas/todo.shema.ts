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

export const ItemShema = Type.Object({
  content: Type.String(),
  done: Type.Boolean({ default: false }),
});

export const TodoShema = Type.Object({
  title: Type.String(),
  // todos: Type.Optional(Type.Array(ItemShema)),
  // tags: Type.Optional(Type.Array(TagShema)),
});

export const TodoResponseShema = Type.Object({
  id: Type.String({ format: "uuid" }),
  title: Type.String(),
  updatedAt: Type.String({ format: "date-time" }),
  achived: Type.Optional(Type.String({ format: "date-time" })),
  tags: Type.Array(Type.Object({ id: Type.String(), name: Type.String() })),
});

export const TodoResponseShemaArray = Type.Array(TodoResponseShema);

export const TodoShemaArray = Type.Array(TodoShema);
