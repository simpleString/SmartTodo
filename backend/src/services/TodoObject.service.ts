import { PrismaClient } from "@prisma/client";
import { TodoObject } from "../Dtos/todos.dto";


const prisma = new PrismaClient()

class TodoObjectService {
    
    public async getAllTodoObjects(userId: string) {
        return await prisma.todoObject.findMany({where: {userId}});
    }

    public async getTodoObjectById(userId: string, todoObjectId: string){
        return await prisma.todoObject.findFirst({where: {userId, id: todoObjectId}})
    }

    public async createTodoObject(todoObject: TodoObject, userId: string) {
       
        // return await prisma.todoObject.create({data: {}})
    }


    public async updateTodoObject(){}
    public async deleteTodoObject(){}
    public async getTodoById(){}
    public async getAllTodos(){}
    public async createTodo(){}
    public async updateTodo(){}
    public async deleteTodo(){}

    public async createTag(){}
    public async deleteTag(){}
    public async updateTag(){}
    public async getAllTags(){}
}


export default new TodoObjectService()