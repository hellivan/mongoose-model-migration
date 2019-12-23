import { AbstractMigrator, VersionInformation, VersionStorage } from './abstract-migrator';

class TestMigrator extends AbstractMigrator {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async upgrade(fromVersion: number | null, toVersion: number): Promise<void> {
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async downgrade(fromVersion: number, toVersion: number): Promise<void> {
        return;
    }
}

class TestVersionStorage implements VersionStorage {
    private versionInformation: VersionInformation | null;

    constructor(versionInformation?: VersionInformation) {
        this.versionInformation = versionInformation ?? null;
    }

    public async readVersion(): Promise<VersionInformation | null> {
        return this.versionInformation;
    }
    public async writeVersion(version: number): Promise<VersionInformation> {
        const newVersionInformation: VersionInformation = {
            last: this.versionInformation?.current,
            current: version,
            updated: new Date()
        };
        this.versionInformation = newVersionInformation;
        return newVersionInformation;
    }
}

describe('AbstractMigrator', () => {
    test('Migrator should not update is existing version matches target version', async () => {
        const initialVersion = { current: 1, updated: new Date() };
        const versionStorage = new TestVersionStorage(initialVersion);
        const migrator = new TestMigrator(versionStorage);
        const upgradeSpy = jest.spyOn(migrator, 'upgrade');
        const downgradeSpy = jest.spyOn(migrator, 'downgrade');
        const writeVersionSpy = jest.spyOn(versionStorage, 'writeVersion');
        const readVersionSpy = jest.spyOn(versionStorage, 'readVersion');

        const result = await migrator.migrate(1);
        expect(result).toMatchObject(initialVersion);
        expect(upgradeSpy).toHaveBeenCalledTimes(0);
        expect(downgradeSpy).toHaveBeenCalledTimes(0);
        expect(writeVersionSpy).toHaveBeenCalledTimes(0);
        expect(readVersionSpy).toHaveBeenCalledTimes(1);
    });
});
