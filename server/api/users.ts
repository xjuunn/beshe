import prisma from '../utils/prisma';
export default defineEventHandler(async (event) => {
  const users = await prisma.user.findMany();
  return users
})