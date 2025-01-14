export default defineEventHandler(async (event) => {
  const roles = await prisma.role.findMany()
  return roles;
})
