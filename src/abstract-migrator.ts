export interface VersionInformation {
    current: number;
    updated: Date;
    last?: number;
}

export interface VersionStorage {
    writeVersion(version: number): Promise<VersionInformation>;
    readVersion(): Promise<VersionInformation | null>;
}

export abstract class AbstractMigrator {
    constructor(protected readonly versionStorage: VersionStorage) {}

    public async migrate(version: number): Promise<VersionInformation> {
        const currentVersion = await this.versionStorage.readVersion();

        if (currentVersion?.current === version) return currentVersion;

        // no version available
        const current = currentVersion?.current;

        if (current == null || current < version) {
            await this.upgrade(current != null ? current : null, version);
        } else {
            await this.downgrade(current, version);
        }

        return this.versionStorage.writeVersion(version);
    }

    protected abstract async upgrade(fromVersion: number | null, toVersion: number): Promise<void>;

    protected abstract async downgrade(fromVersion: number, toVersion: number): Promise<void>;
}
