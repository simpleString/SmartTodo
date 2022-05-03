import { Static } from "@sinclair/typebox";
import {
  TagShema,
  TagResponseShema,
  TodoShema,
  TodoResponseShema,
  ItemShema,
  ItemResponseShema,
  ParamsIdWithTagIdShema,
  ParamsIdWithItemIdShema,
} from "../shemas/todo.shema";

export type TodoDtoWithUser = TodoDto & { userId: string };
export type TodoResponseDtoWithUser = Static<typeof TodoResponseShema> & {
  userId: string;
};

export type TodoResponseDto = Static<typeof TodoResponseShema>;

export type TodoDto = Static<typeof TodoShema>;
export type TagDto = Static<typeof TagShema>;

export type ItemDto = Static<typeof ItemShema>;
export type ItemResponseDto = Static<typeof ItemResponseShema>;

export type TagResponseDto = Static<typeof TagResponseShema>;

export type ParamsIdWithTagIdDto = Static<typeof ParamsIdWithTagIdShema>;
export type ParamsIdWithItemIdDto = Static<typeof ParamsIdWithItemIdShema>;
