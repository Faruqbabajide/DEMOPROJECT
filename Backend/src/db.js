import pkg from 'pg';
const { Pool } = pkg;

// Your actual NeonDB connection string
const connectionString = "postgresql://neondb_owner:npg_UmDtWEYvgS97@ep-sparkling-shape-ad0hddhm-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

export const pool = new Pool({
  connectionString,
  // SSL is required for NeonDB connections
  ssl: true
});