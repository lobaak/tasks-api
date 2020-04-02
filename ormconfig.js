require('dotenv').config();

module.exports = {
  name: 'default',
  type: 'sqlite',
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
