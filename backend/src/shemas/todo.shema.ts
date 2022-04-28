import { Type } from "@sinclair/typebox";

export const TagShema = Type.Object({
  name: Type.String(),
  todoId: Type.Optional(Type.String({ format: "uuid" })),
});

export const ItemShema = Type.Object({
  content: Type.String(),
  done: Type.Boolean({ default: false }),
});

export const ItemResponseShema = Type.Object({
  id: Type.String({ format: "uuid" }),
  content: Type.String(),
  done: Type.Boolean({ default: false }),
  todoId: Type.String({ format: "uuid" }),
});

export const TodoShema = Type.Object({
  title: Type.String(),
});

export const TodoResponseShema = Type.Object({
  id: Type.String({ format: "uuid" }),
  title: Type.String(),
  updatedAt: Type.String({ format: "date-time" }),
  achived: Type.Optional(Type.String({ format: "date-time" })),
  tags: Type.Optional(
    Type.Array(Type.Object({ id: Type.String(), name: Type.String() }))
  ),
});

export const TagResponseShema = Type.Object({
  id: Type.String({ format: "uuid" }),
  name: Type.String(),
  objectId: Type.Optional(Type.Array(Type.String({ format: "uuid" }))),
  todos: Type.Optional(Type.Array(TodoResponseShema)),
});

export const TagResponseShemaArray = Type.Array(TagResponseShema);

export const TodoResponseShemaArray = Type.Array(TodoResponseShema);
export const ItemResponseShemaArray = Type.Array(ItemResponseShema);

export const TodoShemaArray = Type.Array(TodoShema);
