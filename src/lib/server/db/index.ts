import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { NEON_DATABASE_URL } from '$env/static/private';
 
neonConfig.fetchConnectionCache = true;
 
export const sql = neon(NEON_DATABASE_URL);
const db = drizzle(sql);

export default db; 