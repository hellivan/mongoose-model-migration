import { MongodbCollectionVersionStorage } from './mongodb-collection-version-storage';
import { VersionInformation } from './abstract-migrator';

class VersionCollectionMock {
    private versionInformation: VersionInformation | null;

    constructor(versionInformation?: VersionInformation) {
        this.versionInformation = versionInformation ?? null;
    }

    public async findOne(_filter: unknown): Promise<VersionInformation | null> {
        return this.versionInformation;
    }
    public async insertOne(versionInformation: VersionInformation): Promise<void> {
        this.versionInformation = versionInformation;
    }
    public async findOneAndUpdate(filter: unknown, updateOptions: { $set: VersionInformation }): Promise<void> {
        this.versionInformation = { ...this.versionInformation, ...updateOptions.$set };
    }
}

describe('MongodbCollectionVersionStorage', () => {
    test('read version should return the current version information', async () => {
        const currentVersion = { current: 1, updated: new Date() };
        const collectionMock = new VersionCollectionMock(currentVersion);
        const versionStorage = new MongodbCollectionVersionStorage(collectionMock as any);
        const findOneSpy = jest.spyOn(collectionMock, 'findOne');

        const resultVersion = await versionStorage.readVersion();
        expect(resultVersion).toEqual(currentVersion);
        expect(findOneSpy).toHaveBeenCalledWith({});
    });
});
