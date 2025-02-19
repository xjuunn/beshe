export default defineEventHandler(async (event) => {
  let num = await useStorage().get('view:num');
  if (num == undefined) await useStorage().set('view:num', 0);
  await useStorage().set('view:num', Number(num) + 1);
  return await useStorage().get('view:num');
})
