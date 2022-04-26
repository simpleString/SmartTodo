import { Type } from "@sinclair/typebox";

export const UserShema = Type.Object({
  username: Type.String(),
  password: Type.String({ minLength: 6 }),
});

export const UserResponseShema = Type.Object({
  id: Type.String(),
  username: Type.String(),
  password: Type.String(),
});
