import { Type } from "@sinclair/typebox";

export const TagResponseShema = Type.Object({
  id: Type.String({ format: "uuid" }),
  name: Type.String(),
  todos: Type.Array(Type.Object({ id: Type.String({ format: "uuid" }) })),
});

export const TagShema = Type.Object({
  name: Type.String(),
});

export const TagResponseShemaArray = Type.Array(TagResponseShema);
