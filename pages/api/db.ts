import { drizzle } from 'drizzle-orm/postgres-js';
import { pgTable, serial, varchar , text} from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { genSaltSync, hashSync } from 'bcrypt-ts';

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
let client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
let db = drizzle(client);

let users = pgTable('User', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 64 }),
  password: varchar('password', { length: 64 }),
});

export async function getUser(email: string) {
  return await db.select().from(users).where(eq(users.email, email));
}

export async function createUser(email: string, password: string) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);
  console.log(process.env.POSTGRES_URL);
  
  return await db.insert(users).values({ email, password: password });
}

// Define the schema for the BusinessCard table
const businessCards = pgTable('BusinessCard', {
  id: serial('id').primaryKey(),
  content: text('content'), // Using TEXT data type
});

// Function to retrieve a business card by its ID
export async function getBusinessCardById(id: number) {
  return await db.select().from(businessCards).where(eq(businessCards.id, id));
}

// Function to create a new business card
export async function createBusinessCard(id: number, content: string) {
  return await db.insert(businessCards).values({ id, content });
}

