import { Static } from "@sinclair/typebox";
import {
  TagShema,
  TagResponseShema,
  TodoObjectShema,
  TodoObjectResponseShema,
} from "../shemas/todo.shema";

export type TodoObjectDtoWithUser = TodoObjectDto & { userId: string };
export type TodoObjectResponseDtoWithUser = Static<
  typeof TodoObjectResponseShema
> & { userId: string };

export type TodoObjectResponseDto = Static<typeof TodoObjectResponseShema>;

export type TodoObjectDto = Static<typeof TodoObjectShema>;
export type TagDto = Static<typeof TagShema>;

export type TagResponseDto = Static<typeof TagResponseShema>;
