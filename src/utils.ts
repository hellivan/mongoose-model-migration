import { Db } from 'mongodb';

export async function getGlobalMongooseConnectionDb(): Promise<Db> {
    const mongoose = await import('mongoose');
    return mongoose.connection.db;
}
