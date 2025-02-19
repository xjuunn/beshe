
export default defineEventHandler(async (event) => {
  if (await useStorage().getItem('view:num') == null) 
    await useStorage().setItem('view:num', 0)
  return await useStorage().getItem('view:num')
})
