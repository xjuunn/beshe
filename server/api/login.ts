import jwt from 'jsonwebtoken';
export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);
  const validUsername = 'test';
  const validPassword = '123123';
  if (username === validUsername && password === validPassword) {
    const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });
    return { token };
  } else {
    throw createError({ statusCode: 401, message: 'Invalid username or password' });
  }
});
