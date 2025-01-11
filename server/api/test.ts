import { query } from "../utils/mysql";

type User = {
  id: number,
  name: string,
  age: number,
}

export default defineEventHandler(async (event) => {
  try {
    const users = await query<User>('SELECT * FROM user');
    return users;
  } catch (error) {
    return { error: 'Error querying the database' };
  }
});
