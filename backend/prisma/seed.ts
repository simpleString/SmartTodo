import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  const admin = await prisma.user.upsert({
    create: {
      password: "admin1",
      username: "admin",
      todos: {
        create: [
          {
            title: "test1",
            items: { create: [{ content: "item1" }, { content: "item2" }] },
          },
          {
            title: "test2",
            items: { create: [{ content: "item3" }, { content: "item4" }] },
          },
        ],
      },
    },
    where: { username: "admin" },
    update: {},
  });
  const notAdmin = await prisma.user.upsert({
    create: {
      password: "notAdmin",
      username: "notAdmin",
      todos: {
        create: [
          {
            title: "test1",
            items: { create: [{ content: "item1" }, { content: "item2" }] },
          },
          {
            title: "test2",
            items: { create: [{ content: "item3" }, { content: "item4" }] },
          },
        ],
      },
    },
    where: { username: "notAdmin" },
    update: {},
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
