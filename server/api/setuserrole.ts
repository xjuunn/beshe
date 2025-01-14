export default defineEventHandler(async (event) => {
  const user_id = getQuery(event).user_id;
  const role_id = getQuery(event).role_id;
  return await prisma.user.update({
    where: { id: Number(user_id) },
    include: { role: true },
    data: { role_id: Number(role_id) }
  })
})
