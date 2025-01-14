import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config(); // 显式加载 .env 文件

const prisma = new PrismaClient();
export default prisma;
