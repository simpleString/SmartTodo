import { Static } from "@sinclair/typebox";
import { TagResponseShema, TagShema } from "../shemas/tags.shema";

export type TagResponseDto = Static<typeof TagResponseShema>;
export type TagDto = Static<typeof TagShema>;
