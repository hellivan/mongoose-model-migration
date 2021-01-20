import type { Document, Model } from 'mongoose';
import type { Db } from 'mongodb';

import type { ModelMigrationHandler } from './mongoose-model-migrator';
import { ModelMigrator } from './mongoose-model-migrator';
import { getGlobalMongooseConnectionDb } from './utils';
import type { VersionInformation } from './abstract-migrator';
import { MongodbCollectionVersionStorage } from './mongodb-collection-version-storage';

export interface ModelMigratorOptions {
    db?: Db;
    versionCollectionName?: string;
}

async function sanitizeModelMigratorOptions<TModelDocument extends Document>(
    model: Model<TModelDocument>,
    options?: ModelMigratorOptions
): Promise<Required<ModelMigratorOptions>> {
    const versionCollectionName = options?.versionCollectionName || `${model.collection.collectionName}.version`;
    const db = options?.db ?? (await getGlobalMongooseConnectionDb());
    return { db, versionCollectionName };
}

export async function migrateModel<TModelDocument extends Document>(
    model: Model<TModelDocument>,
    version: number,
    migrationHandler: ModelMigrationHandler<TModelDocument>,
    options?: ModelMigratorOptions
): Promise<void> {
    const { db, versionCollectionName } = await sanitizeModelMigratorOptions(model, options);
    const migrator = new ModelMigrator(db, model, versionCollectionName, migrationHandler);
    await migrator.migrate(version);
}

export async function writeModelVersion<TModelDocument extends Document>(
    model: Model<TModelDocument>,
    version: number,
    options?: ModelMigratorOptions
): Promise<VersionInformation> {
    const { db, versionCollectionName } = await sanitizeModelMigratorOptions(model, options);
    const versionStorage = new MongodbCollectionVersionStorage(db.collection(versionCollectionName));
    return versionStorage.writeVersion(version);
}

export async function readModelVersion<TModelDocument extends Document>(
    model: Model<TModelDocument>,
    options?: ModelMigratorOptions
): Promise<VersionInformation | null> {
    const { db, versionCollectionName } = await sanitizeModelMigratorOptions(model, options);
    const versionStorage = new MongodbCollectionVersionStorage(db.collection(versionCollectionName));
    return versionStorage.readVersion();
}
