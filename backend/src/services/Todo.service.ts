import { PrismaClient } from "@prisma/client";
import { TagResponseDto } from "../dtos/tags.dto";
import {
  ItemDto,
  ItemResponseDto,
  TagDto,
  TodoDto,
  TodoResponseDto,
} from "../dtos/todos.dto";

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

prisma.$on("query", async (e) => {
  console.log(`${e.query} ${e.params}`);
});

class TodoObjectService {
  public async getAllTodos(userId: string): Promise<TodoResponseDto[]> {
    return prisma.todo.findMany({
      where: { userId },
      include: { tags: true },
    });
  }

  public async getTodoById(userId: string, todoId: string) {
    return prisma.todo.findFirst({
      where: { userId, id: todoId },
      include: { tags: true },
    });
  }

  public async createTodo(
    todoObject: TodoDto,
    userId: string
  ): Promise<TodoResponseDto> {
    return await prisma.todo.create({
      data: { title: todoObject.title, userId },
      include: { tags: true },
    });
  }

  public async deleteTodo(
    id: string,
    userId: string
  ): Promise<TodoResponseDto> {
    return prisma.todo.delete({
      where: { id_userId: { id, userId } },
      include: { tags: true },
    });
  }

  public async updateTodo(todoObject: TodoDto, userId: string, todoId: string) {
    return prisma.todo.update({
      where: { id_userId: { id: todoId, userId } },
      data: { ...todoObject },
      include: { tags: true },
    });
  }

  public async getItemById() {}

  public async getAllItems(todoId: string): Promise<ItemResponseDto[]> {
    return prisma.item.findMany({ where: { todoId } });
  }

  public async createItem(todo: ItemDto, todoId: string) {
    return prisma.item.create({ data: { todoId, ...todo } });
  }

  public async updateItem() {}

  public async deleteItemFromTodo(itemId: string) {
    return prisma.item.delete({ where: { id: itemId } });
  }

  public async createTag(tag: TagDto, userId: string) {
    if (tag.todoId)
      return prisma.tag.create({
        data: {
          name: tag.name,
          todos: {
            connect: [{ id: tag.todoId }],
          },
          userId,
        },
        include: { todos: { select: { id: true } } },
      });
    return prisma.tag.create({
      data: {
        name: tag.name,
        userId,
      },
      include: { todos: { select: { id: true } } },
    });
  }

  public async deleteTag(tagId: string) {
    return prisma.tag.delete({
      where: { id: tagId },
      include: { todos: { select: { id: true } } },
    });
  }

  public async deleteTagFromTodo(
    tagId: string,
    todoId: string,
    userId: string
  ) {
    return prisma.tag.update({
      where: { id: tagId },
      data: { todos: { disconnect: { id_userId: { id: todoId, userId } } } },
    });
  }

  public async updateTag(tag: TagDto, tagId: string) {
    return prisma.tag.update({ data: tag, where: { id: tagId } });
  }

  public async getAllTags(userId: string): Promise<TagResponseDto[]> {
    return prisma.tag.findMany({
      where: { userId },
      include: { todos: { select: { id: true } } },
    });
  }

  public async getAllTagsForTodo(userId: string, todoId: string) {
    return prisma.tag.findMany({
      where: { todos: { some: { id: todoId } }, userId },
    });
  }

  public async getTagById(tagId: string) {
    return prisma.tag.findUnique({ where: { id: tagId } });
  }
}

export default new TodoObjectService();
