const app = require('./app');
const env = require('./config/env');
const prisma = require('./config/db');

const server = app.listen(env.PORT, () => {
  console.log(`[INFO] TransitOps API server started on port ${env.PORT} in ${env.NODE_ENV} mode`);
});

const shutdown = () => {
  console.log('[INFO] Shutting down API server gracefully...');
  server.close(async () => {
    console.log('[INFO] Express server closed. Disconnecting database client...');
    await prisma.$disconnect();
    console.log('[INFO] Database disconnected. Exit complete.');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
