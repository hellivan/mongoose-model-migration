import { Document, Model } from 'mongoose';
import { Db } from 'mongodb';

import { AbstractMigrator } from './abstract-migrator';
import { MongodbCollectionVersionStorage } from './mongodb-collection-version-storage';

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
