import mysql, { RowDataPacket, FieldPacket } from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123123',
  database: 'test',
});

export const query = async <T>(sql: string, values?: any[]): Promise<T[]> => {
  const [rows]: [RowDataPacket[], FieldPacket[]] = await pool.execute(sql, values);
  return rows as T[];
};

export const close = async () => {
  await pool.end();
};
