import { Document, Model } from 'mongoose';
import { Db } from 'mongodb';

import { AbstractMigrator } from './abstract-migrator';
import { MongodbCollectionVersionStorage } from './mongodb-collection-version-storage';
import { getGlobalMongooseConnectionDb } from './utils';

export interface ModelMigrationHandler<TModelDocument extends Document> {
    up(db: Db, model: Model<TModelDocument>, fromVersion: number, toVersion: number): Promise<void>;
    down(db: Db, model: Model<TModelDocument>, fromVersion: number, toVersion: number): Promise<void>;
}

export class ModelMigrator<TModelDocument extends Document> extends AbstractMigrator {
    constructor(
        private readonly db: Db,
        private readonly model: Model<TModelDocument>,
        versionCollectionName: string,
        private readonly migrationHandler: ModelMigrationHandler<TModelDocument>
    ) {
        super(new MongodbCollectionVersionStorage(db.collection(versionCollectionName)));
    }

    protected async upgrade(fromVersion: number, toVersion: number): Promise<void> {
        await this.migrationHandler.up(this.db, this.model, fromVersion, toVersion);
    }

    protected async downgrade(fromVersion: number, toVersion: number): Promise<void> {
        throw new Error(`Downgrading a model version from ${fromVersion} to ${toVersion} not supported yet!`);
    }
}

export interface ModelMigratorOptions {
    db?: Db;
    versionCollectionName?: string;
}

export async function migrateModel<TModelDocument extends Document>(
    model: Model<TModelDocument>,
    version: number,
    migrationHandler: ModelMigrationHandler<TModelDocument>,
    options?: ModelMigratorOptions
): Promise<void> {
    const versionCollectionName = options?.versionCollectionName || `${model.collection.collectionName}.version`;
    const db = options?.db ?? (await getGlobalMongooseConnectionDb());
    const migrator = new ModelMigrator(db, model, versionCollectionName, migrationHandler);
    await migrator.migrate(version);
}
