import { Static, Type } from "@sinclair/typebox"

export const TagDto = Type.Object({
    name: Type.String()
})


export const TodoDto = Type.Object({
    content: Type.String(),
    tags: Type.Array(TagDto),
    done: Type.Boolean({default: false})
})

export const TodoObjectDto = Type.Object({
    title: Type.String(),
    todos: Type.Array(TodoDto)
})


export type TodoObject = Static<typeof TodoObjectDto>