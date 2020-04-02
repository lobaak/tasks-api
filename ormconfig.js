module.exports = {
  name: 'default',
  type: 'sqlite',
  database: 'chores.db',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  // logging: true
};
