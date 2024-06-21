export default {
  // 服务基本配置
  SERVICE_CONFIG: {
    // 端口
    port: 3000,
  },

  // 数据库配置
  DATABASE_CONFIG: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    // password: 'root1234',
    password: '123456',
    database: 'meeting_room',
    autoLoadEntities: true,
    logging: false,
    synchronize: true,
  },
};
