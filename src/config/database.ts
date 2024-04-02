import { MongoClient } from 'mongodb';

const mongoClient = new MongoClient(process.env.MONGODB_URI);

export const database = mongoClient.db(process.env.MONGODB_DATABASE);
