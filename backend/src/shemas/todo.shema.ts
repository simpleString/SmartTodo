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
});

export const TodoShema = Type.Object({
  title: Type.String(),
});

export const TodoResponseShema = Type.Object({
  id: Type.String({ format: "uuid" }),
  title: Type.String(),
  updatedAt: Type.Any(),
  archived: Type.Union([Type.Any(), Type.Null()]),
  tags: Type.Optional(
    Type.Array(Type.Object({ id: Type.String(), name: Type.String() }))
  ),
});

export const TagResponseShema = Type.Object({
  id: Type.String({ format: "uuid" }),
  name: Type.String(),
});

export const ParamsIdWithTagIdShema = Type.Object({
  id: Type.String({ format: "uuid" }),
  tagId: Type.String({ format: "uuid" }),
});

export const ParamsIdWithItemIdShema = Type.Object({
  id: Type.String({ format: "uuid" }),
  itemId: Type.String({ format: "uuid" }),
});

export const TagResponseShemaArray = Type.Array(TagResponseShema);

export const TodoResponseShemaArray = Type.Array(TodoResponseShema);
export const ItemResponseShemaArray = Type.Array(ItemResponseShema);

export const TodoShemaArray = Type.Array(TodoShema);
