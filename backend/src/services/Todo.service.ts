import { Prisma, PrismaClient, Tag } from "@prisma/client";
import {
  TagResponseDto,
  TodoDto,
  TodoResponseDtoWithUser,
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
  public async getAllTodos(userId: string) {
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

  public async createTodoObject(todoObject: TodoDto, userId: string) {
    return await prisma.todo.create({
      data: { title: todoObject.title, userId },
    });
  }

  public async updateTodoObject(todoObject: TodoResponseDtoWithUser) {
    let tagList: Tag[] = [];
    // let todoList: Todo[] = [];
    if (todoObject.tags)
      tagList = await Promise.all(
        todoObject.tags.map(async (tag) => {
          return await this.createTag({
            name: tag.name,
            userId: todoObject.userId,
          });
        })
      );

    const newTodoObject = await prisma.todo.update({
      data: {
        title: todoObject.title,
        archived: todoObject.achived,
        tags: { connect: tagList.map((tag) => ({ id: tag.id })) },
      },
      where: { id: todoObject.id },
    });

    // if (todoObject.todos)
    // await Promise.all(
    //   todoObject.todos.map(async (todo) => {
    //     return await this.createItem({
    //       content: todo.content,
    //       todoObjectId: newTodoObject.id,
    //       done: todo.done,
    //     });
    //   })
    // );
    return newTodoObject;
  }

  public async deleteTodo(id: string, userId: string) {
    console.log("hello");
    return prisma.todo.delete({
      where: { id_userId: { id, userId } },
      include: { tags: true },
    });
  }

  public async getItemById() {}

  public async getAllItems() {}

  public async createItem(todo: Prisma.TodoCreateManyInput) {
    // return await prisma.todo.create({
    //   data: { content: todo.content, todoObjectId: todo.todoObjectId },
    // });
  }

  public async updateItem() {}

  public async deleteItem() {}

  public async createTag(tag: Prisma.TagCreateManyInput) {
    return await prisma.tag.create({ data: tag });
  }

  public async deleteTag(tagId: string) {
    return await prisma.tag.delete({ where: { id: tagId } });
  }

  public async updateTag(tag: TagResponseDto) {
    return await prisma.tag.update({ data: tag, where: { id: tag.id } });
  }

  public async getAllTags(userId: string) {
    return await prisma.tag.findMany({ where: { userId } });
  }

  public async getTagById(tagId: string) {
    return await prisma.tag.findUnique({ where: { id: tagId } });
  }
}

export default new TodoObjectService();
