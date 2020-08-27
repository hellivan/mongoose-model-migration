import { Db } from 'mongodb';

import { VersionInformation } from './abstract-migrator';
import { CollectionMigrationHandler, CollectionMigrator } from './mongodb-collection-migrator';
import { MongodbCollectionVersionStorage } from './mongodb-collection-version-storage';
import { getGlobalMongooseConnectionDb } from './utils';

export interface CollectionMigratorOptions {
    db?: Db;
    versionCollectionName?: string;
}

async function sanitizeCollectionMigratorOptions(
    collectionName: string,
    options?: CollectionMigratorOptions
): Promise<Required<CollectionMigratorOptions>> {
    const versionCollectionName = options?.versionCollectionName || `${collectionName}.version`;
    const db = options?.db ?? (await getGlobalMongooseConnectionDb());
    return { db, versionCollectionName };
}

export async function migrateCollection(
    collectionName: string,
    version: number,
    migrationHandler: CollectionMigrationHandler,
    options?: CollectionMigratorOptions
): Promise<void> {
    const { db, versionCollectionName } = await sanitizeCollectionMigratorOptions(collectionName, options);
    const migrator = new CollectionMigrator(db, collectionName, versionCollectionName, migrationHandler);
    await migrator.migrate(version);
}

export async function writeCollectionVersion(
    collectionName: string,
    version: number,
    options?: CollectionMigratorOptions
): Promise<VersionInformation> {
    const { db, versionCollectionName } = await sanitizeCollectionMigratorOptions(collectionName, options);
    const versionStorage = new MongodbCollectionVersionStorage(db.collection(versionCollectionName));
    return versionStorage.writeVersion(version);
}

export async function readCollectionVersion(
    collectionName: string,
    options?: CollectionMigratorOptions
): Promise<VersionInformation | null> {
    const { db, versionCollectionName } = await sanitizeCollectionMigratorOptions(collectionName, options);
    const versionStorage = new MongodbCollectionVersionStorage(db.collection(versionCollectionName));
    return versionStorage.readVersion();
}
