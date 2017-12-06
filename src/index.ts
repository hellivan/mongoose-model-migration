import {connection, Model} from 'mongoose';

export interface CollectionVersion {
    _id: string;
    updated: Date;
    current: number;
    last: number;
}

export function writeVersion(versionCollection: any, version: number): Promise<CollectionVersion> {
    let update: any = {
	current: version,
	updated: new Date()
    };

    return readVersion(versionCollection)
	.then(currentVersion => {
	    if(!currentVersion) return versionCollection.insertOne(update);

	    update['last'] = currentVersion.current;

	    return versionCollection.findOneAndUpdate({_id: currentVersion._id}, update);
	});
}

export function readVersion(versionCollection: any): Promise<CollectionVersion> {
    return versionCollection.findOne({});
}


abstract class AbstractMigrator {

    constructor(
	protected collectionName: string,
	protected versionCollectionName?: string
    ) {}

    public migrate(version: number): Promise<any> {
	return readVersion(this.getVersionCollection())
	    .then(currentVersion => {
		if(currentVersion && currentVersion.current === version) return;

		// no version available
		const current = currentVersion && currentVersion.current;

		if(!current || current < version) {
		    return this.upgrade(current, version);
		} else {
		    return this.downgrade(current, version);
		}
	    })
	    .then(() => writeVersion(this.getVersionCollection(), version));
    }

    protected getCollection() {
	return connection.db.collection(this.collectionName);
    }

    protected getVersionCollection() {
	const collectionName = this.versionCollectionName || `${this.collectionName}.version`;
	return connection.db.collection(collectionName);
    }

    protected abstract upgrade(fromVersion: number, toVersion: number);

    protected abstract downgrade(fromVersion: number, toVersion: number);
}



export interface CollectionMigrationHandler {
    up(db: any, collection: any, fromVersion: number, toVersion: number): Promise<any>;
    down(db: any, collection: any, fromVersion: number, toVersion: number): Promise<any>;
}


class CollectionMigrator extends AbstractMigrator {

    constructor(
	collectionName: string,
	private migrationHandler: CollectionMigrationHandler,
	versionCollectionName?: string
    ) {
	super(collectionName, versionCollectionName);
    }

    protected upgrade(fromVersion: number, toVersion: number) {
	return this.migrationHandler.up(connection.db, this.getCollection(), fromVersion, toVersion);
    }

    protected downgrade(fromVersion: number, toVersion: number) {
	return Promise.reject(new Error(`Downgrading a collection from version ${fromVersion} to ${toVersion} not supported yet!`));
    }

}


export interface ModelMigrationHandler {
    up(db: any, model: Model<any>, fromVersion: number, toVersion: number): Promise<any>;
    down(db: any, model: Model<any>, fromVersion: number, toVersion: number): Promise<any>;
}


class ModelMigrator extends AbstractMigrator {

    constructor(
	private model: Model<any>,
	private migrationHandler: ModelMigrationHandler,
	versionCollectionName?: string
    ) {
	super(model.collection.name, versionCollectionName);
    }

    protected upgrade(fromVersion: number, toVersion: number) {
	return this.migrationHandler.up(connection.db, this.model, fromVersion, toVersion);
    }

    protected downgrade(fromVersion: number, toVersion: number) {
	return Promise.reject(new Error(`Downgrading a model version from ${fromVersion} to ${toVersion} not supported yet!`));
    }

}


export function migrateModel(model: Model<any>, version: number, migrationHandler: ModelMigrationHandler, versionCollectionName?: string): Promise<any> {
    const migrator = new ModelMigrator(model, migrationHandler, versionCollectionName);
    return migrator.migrate(version);
}


export function migrateCollection(collectionName: string, version: number, migrationHandler: CollectionMigrationHandler, versionCollectionName?: string): Promise<any> {
    const migrator = new CollectionMigrator(collectionName, migrationHandler, versionCollectionName);
    return migrator.migrate(version);
}
