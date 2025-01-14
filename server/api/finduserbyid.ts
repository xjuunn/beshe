export default defineEventHandler(async (event) => {
    return await prisma.user.findUnique({
      where:{
        id:Number(getQuery(event).id)
      }
    })

})
