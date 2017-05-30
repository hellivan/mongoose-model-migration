import {connection, Model} from 'mongoose';


function getVersionCollection(model: Model<any>) {
    const db = connection.db;
    const collectionName = model.collection.name;
    return db.collection(`${collectionName}.version`);
}

export function writeVersion(model: Model<any>, version: number): Promise<any> {
    let update = {
        current: version,
        updated: new Date()
    };

    return readVersion(model)
        .then(currentVersion => {
            if(!currentVersion) return getVersionCollection(model).insertOne(update);

            update['last'] = currentVersion.current;

            getVersionCollection(model).findOneAndUpdate({_id: currentVersion._id}, update);
        });
}

export function readVersion(model: Model<any>): Promise<any> {
    return getVersionCollection(model)
        .findOne({});
}

export interface Migration {
    up(db: any, model: Model<any>, version: number): Promise<any>;
    down(db: any, model: Model<any>, version: number): Promise<any>;
}

export function migrateDb(model: Model<any>, version: number, migration: Migration): Promise<any> {
    return readVersion(model)
        .then(currentVersion => {
            if(currentVersion && currentVersion.current === version) return;

            // no version available
            const current = currentVersion && currentVersion.current;

            if(!current || current < version) {
                return migration.up(connection.db, model, version);
            } else {
                throw new Error(`Downgrading model version from ${currentVersion.current} to ${version} not supported yet!`);
            }
        })
        .then(() => writeVersion(model, version));
}
