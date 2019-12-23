import { Collection, Db } from 'mongodb';

import { AbstractMigrator } from './abstract-migrator';
import { MongodbCollectionVersionStorage } from './mongodb-collection-version-storage';
import { getGlobalMongooseConnectionDb } from './utils';

// TODO: remove
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CollectionMigrationHandler<TCollectionSchema = any> {
    up(db: Db, collection: Collection<TCollectionSchema>, fromVersion: number, toVersion: number): Promise<void>;
    down(db: Db, collection: Collection<TCollectionSchema>, fromVersion: number, toVersion: number): Promise<void>;
}

// TODO: remove
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class CollectionMigrator<TCollectionSchema = any> extends AbstractMigrator {
    constructor(
        private readonly db: Db,
        private readonly collectionName: string,
        versionCollectionName: string,
        private readonly migrationHandler: CollectionMigrationHandler<TCollectionSchema>
    ) {
        super(new MongodbCollectionVersionStorage(db.collection(versionCollectionName)));
    }

    protected async upgrade(fromVersion: number, toVersion: number): Promise<void> {
        await this.migrationHandler.up(this.db, this.db.collection(this.collectionName), fromVersion, toVersion);
    }

    protected async downgrade(fromVersion: number, toVersion: number): Promise<void> {
        throw new Error(`Downgrading a collection from version ${fromVersion} to ${toVersion} not supported yet!`);
    }
}

export interface CollectionMigratorOptions {
    db?: Db;
    versionCollectionName?: string;
}

export async function migrateCollection(
    collectionName: string,
    version: number,
    migrationHandler: CollectionMigrationHandler,
    options?: CollectionMigratorOptions
): Promise<void> {
    const versionCollectionName = options?.versionCollectionName || `${collectionName}.version`;
    const db = options?.db ?? (await getGlobalMongooseConnectionDb());
    const migrator = new CollectionMigrator(db, collectionName, versionCollectionName, migrationHandler);
    await migrator.migrate(version);
}
