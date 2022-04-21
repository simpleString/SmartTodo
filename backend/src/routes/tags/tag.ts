import { FastifyPluginAsync } from "fastify"
import { TodoObject, TodoObjectDto } from "../../Dtos/todos.dto"
import todoObjectService from "../../services/TodoObject.service"


const tags: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

    fastify.get('/',async (request, reply) => {
        return todoObjectService.getAllTodoObjects(request.user.id);
    })
    
    fastify.post<{Body: TodoObject}>('/', 
    {schema: {body: TodoObjectDto, response: {200: TodoObjectDto}}}, 
    async (request, reply) => {
        return todoObjectService.createTodoObject(request.body, request.user.id)
    })

    fastify.delete('/:id',async (request, reply) => {
        
    })

    fastify.put('/:id',async (request, reply) => {
        
    })

    fastify.get('/:id',async (request, reply) => {
        
    })


}

export default tags;
