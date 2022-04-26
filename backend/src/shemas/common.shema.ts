import { Type } from "@sinclair/typebox";

export const ParamsIdShema = Type.Object({
  id: Type.String({ format: "uuid" }),
});
