import { neon, neonConfig, Pool } from '@neondatabase/serverless';
import { drizzle as drizzleHttp } from 'drizzle-orm/neon-http';
import { drizzle as drizzlePool } from 'drizzle-orm/neon-serverless';
import { NEON_DATABASE_URL } from '$env/static/private';
// @ts-ignore
import ws from 'ws';
 
neonConfig.fetchConnectionCache = true;
neonConfig.webSocketConstructor = ws;
 
export const pool = new Pool({ connectionString: NEON_DATABASE_URL})
export const dbPool = drizzlePool(pool);

export const http = neon(NEON_DATABASE_URL);
export const dbHttp = drizzleHttp(http);