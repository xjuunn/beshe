import UserA from "~/types/UserA";
import { query } from "../utils/mysql";

export default defineEventHandler(async (event) => {
  try {
    const users = await query<UserA>('SELECT * FROM user');
    return users;
  } catch (error) {
    return { error: 'Error querying the database' };
  }
});
