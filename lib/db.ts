import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), 'db/database.sqlite');

const globalfordb = global as unknown as { db: Database.Database};

const db = globalfordb.db || new Database(dbPath);

if(process.env.NODE_ENV !== 'production'){
    globalfordb.db  = db;
}

// db.pragma('journal_mode = WAL');
// db.pragma('foreign_keys = ON');

// db.exec(`
//     CREATE TABLE IF NOT EXISTS categories (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     title TEXT NOT NULL,
//     slug TEXT UNIQUE NOt NULL,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//     );
    
    
//     CREATE TABLE IF NOT EXISTS products (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     title TEXT NOT NULL,
//     slug TEXT UNIQUE NOt NULL,
//     price DECIMAL(10, 2) NOT NULL,
//     category_id INTEGER NOT NULL,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
//     );
    
// `);

export default db;