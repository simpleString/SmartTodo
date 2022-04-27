import { Static } from "@sinclair/typebox";
import {
  TagShema,
  TagResponseShema,
  TodoShema,
  TodoResponseShema,
} from "../shemas/todo.shema";

export type TodoDtoWithUser = TodoDto & { userId: string };
export type TodoResponseDtoWithUser = Static<typeof TodoResponseShema> & {
  userId: string;
};

export type TodoResponseDto = Static<typeof TodoResponseShema>;

export type TodoDto = Static<typeof TodoShema>;
export type TagDto = Static<typeof TagShema>;

export type TagResponseDto = Static<typeof TagResponseShema>;
