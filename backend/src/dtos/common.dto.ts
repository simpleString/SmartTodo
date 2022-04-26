import { Static } from "@sinclair/typebox";
import { ParamsIdShema } from "../shemas/common.shema";

export type ParamsIdDto = Static<typeof ParamsIdShema>;
