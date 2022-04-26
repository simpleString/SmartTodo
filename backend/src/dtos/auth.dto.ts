import { Static } from "@sinclair/typebox";
import { UserShema } from "../shemas/auth.shema";

export type UserDto = Static<typeof UserShema>;
