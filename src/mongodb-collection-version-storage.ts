import type { Collection } from 'mongodb';

import type { VersionStorage, VersionInformation } from './abstract-migrator';

export class MongodbCollectionVersionStorage implements VersionStorage {
    constructor(private readonly versionCollection: Collection<VersionInformation>) {}

    public async writeVersion(version: number): Promise<VersionInformation> {
        const update: VersionInformation = {
            current: version,
            updated: new Date()
        };

        const currentVersion = await this.readVersion();

        if (!currentVersion) {
            await this.versionCollection.insertOne(update);
            return update;
        } else {
            update.last = currentVersion.current;
            await this.versionCollection.findOneAndUpdate({}, { $set: update });
            return update;
        }
    }

    public readVersion(): Promise<VersionInformation | null> {
        return this.versionCollection.findOne({});
    }
}
