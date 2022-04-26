import { Prisma, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

class UserService {
    constructor() {
        console.log("userService created");
        
    }

    public async createUser(userData: Prisma.UserCreateInput) {
        return await prisma.user.create({data: userData});
    }

    public async changePassword(userData: Prisma.UserCreateInput, newPassword: string) {
        const user = await prisma.user.findFirst({where: 
            {username: userData.username},
        })
        if (user?.password === userData.password) {
            user.password = newPassword;
            return await prisma.user.update({where: {id: user.id}, data: {...user}})
        }
        return null
    }

    public async checkUserExists(userData: Prisma.UserCreateInput) {
        const user = await prisma.user.findFirst({where: 
            {username: userData.username},
        })
        return user?.password === userData.password ? user : null
    }

    public async getUserInfoById(id: string) {
        return await prisma.user.findUnique({where: {id}})
    }

    public test() {
        console.log("hello from user test");
        
    }

}

export default new UserService();