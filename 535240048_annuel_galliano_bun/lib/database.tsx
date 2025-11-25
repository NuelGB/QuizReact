
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';


export interface Cocktail {
  id: number;
  name: string;
  ingredients: string; 
  instructions: string;
}

const DB_PATH = './cocktails.sqlite';

async function getDb() {
  const db = await sqlite.open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  });
  return db;
}


export async function initializeDatabase() {
  const db = await getDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS cocktails (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      instructions TEXT NOT NULL
    );
  `);
  console.log("Database initialized and 'cocktails' table ensured.");
}



export async function createCocktail(name: string, ingredients: string, instructions: string): Promise<number> {
  const db = await getDb();
  const result = await db.run(
    'INSERT INTO cocktails (name, ingredients, instructions) VALUES (?, ?, ?)',
    [name, ingredients, instructions]
  );
  
  return result.lastID!; 
}

export async function getAllCocktails(): Promise<Cocktail[]> {
  await initializeDatabase(); 
  const db = await getDb();

  return db.all<Cocktail[]>('SELECT * FROM cocktails ORDER BY name ASC');
}


export async function getCocktailById(id: number): Promise<Cocktail | undefined> {
  const db = await getDb();

  return db.get<Cocktail>('SELECT * FROM cocktails WHERE id = ?', id);
}


export async function updateCocktail(id: number, name: string, ingredients: string, instructions: string): Promise<void> {
  const db = await getDb();
  await db.run(
    'UPDATE cocktails SET name = ?, ingredients = ?, instructions = ? WHERE id = ?',
    [name, ingredients, instructions, id]
  );
}


export async function deleteCocktail(id: number): Promise<void> {
  const db = await getDb();
  await db.run('DELETE FROM cocktails WHERE id = ?', id);
}