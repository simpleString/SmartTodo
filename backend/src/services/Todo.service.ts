import { Prisma, PrismaClient, Tag } from "@prisma/client";
import {
  TagResponseDto,
  TodoObjectDtoWithUser,
  TodoObjectResponseDtoWithUser,
} from "../dtos/todos.dto";

const prisma = new PrismaClient();

class TodoObjectService {
  public async getAllTodoObjects(userId: string) {
    const data = await prisma.todoObject.findMany({ where: { userId } });
    console.log(data);
    return data;
  }

  public async getTodoObjectById(userId: string, todoObjectId: string) {
    return await prisma.todoObject.findFirst({
      where: { userId, id: todoObjectId },
    });
  }

  public async createTodoObject(todoObject: TodoObjectDtoWithUser) {
    return await prisma.todoObject.create({
      data: { title: todoObject.title, userId: todoObject.userId },
    });
  }

  public async updateTodoObject(todoObject: TodoObjectResponseDtoWithUser) {
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

    const newTodoObject = await prisma.todoObject.update({
      data: {
        title: todoObject.title,
        archived: todoObject.achived,
        tags: { connect: tagList.map((tag) => ({ id: tag.id })) },
      },
      where: { id: todoObject.id },
    });

    if (todoObject.todos)
      await Promise.all(
        todoObject.todos.map(async (todo) => {
          return await this.createTodo({
            content: todo.content,
            todoObjectId: newTodoObject.id,
            done: todo.done,
          });
        })
      );
    return newTodoObject;
  }

  public async deleteTodoObject() {}

  public async getTodoById() {}

  public async getAllTodos() {}

  public async createTodo(todo: Prisma.TodoCreateManyInput) {
    return await prisma.todo.create({
      data: { content: todo.content, todoObjectId: todo.todoObjectId },
    });
  }

  public async updateTodo() {}

  public async deleteTodo() {}

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
